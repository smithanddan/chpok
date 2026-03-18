from __future__ import annotations

from datetime import date, datetime, timedelta

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.clients.accounting_api import AccountingApiClient
from app.clients.monitoring_api import MonitoringApiClient
from app.models import BillingDocument, Client


class AccessService:
    def __init__(
        self,
        monitoring_api: MonitoringApiClient,
        accounting_api: AccountingApiClient,
        default_disable_after_day: int,
    ):
        self.monitoring_api = monitoring_api
        self.accounting_api = accounting_api
        self.default_disable_after_day = default_disable_after_day

    def check_and_disable_overdue(self, db: Session, today: date | None = None) -> dict:
        check_date = today or date.today()
        disabled_clients = 0

        clients = db.scalars(select(Client).where(Client.status == "active")).all()
        for client in clients:
            disable_day = client.disable_after_day or self.default_disable_after_day
            if check_date.day < disable_day:
                continue

            latest_doc = db.scalar(
                select(BillingDocument)
                .where(BillingDocument.client_id == client.id)
                .order_by(BillingDocument.period_month.desc())
                .limit(1)
            )
            if not latest_doc:
                continue

            if latest_doc.accounting_invoice_id:
                payment_status = self.accounting_api.get_payment_status(
                    latest_doc.accounting_invoice_id,
                    api_key=client.contractor.accounting_api_key,
                )
            else:
                payment_status = "unknown"
            latest_doc.payment_status = payment_status
            db.add(latest_doc)

            overdue_limit_date = latest_doc.due_date
            if client.block_after_due_days > 0:
                overdue_limit_date = latest_doc.due_date + timedelta(days=client.block_after_due_days)

            if payment_status in {"paid", "partially_paid"} or overdue_limit_date >= check_date:
                db.commit()
                continue

            self.monitoring_api.disable_account(
                system_code=client.monitoring_system.code,
                base_url=client.monitoring_system.api_base_url,
                monitoring_account_id=client.monitoring_account_id,
                reason=f"Overdue payment for invoice {latest_doc.accounting_invoice_id}",
                admin_api_key=client.monitoring_system.admin_api_key,
            )
            client.status = "disabled_overdue"
            client.disabled_at = datetime.utcnow()
            db.add(client)
            db.commit()
            disabled_clients += 1

        return {"date": check_date.isoformat(), "disabled_clients": disabled_clients}
