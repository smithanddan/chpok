from __future__ import annotations

from calendar import monthrange
from datetime import date, timedelta
from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.clients.accounting_api import AccountingApiClient
from app.clients.monitoring_api import MonitoringApiClient
from app.models import BillingDocument, Client
from app.services.email_service import EmailService


def month_start(input_month: str | None) -> date:
    if not input_month:
        today = date.today()
        return date(today.year, today.month, 1)
    year_str, month_str = input_month.split("-")
    return date(int(year_str), int(month_str), 1)


def month_end(month_date: date) -> date:
    days = monthrange(month_date.year, month_date.month)[1]
    return date(month_date.year, month_date.month, days)


class BillingService:
    def __init__(
        self,
        monitoring_api: MonitoringApiClient,
        accounting_api: AccountingApiClient,
        email_service: EmailService,
    ):
        self.monitoring_api = monitoring_api
        self.accounting_api = accounting_api
        self.email_service = email_service

    def run_monthly(self, db: Session, target_month: date) -> dict:
        period_end = month_end(target_month)
        period_label = f"{target_month.month:02d}.{target_month.year}"
        clients = db.scalars(select(Client).where(Client.status == "active")).all()

        created = 0
        failed = 0

        for client in clients:
            exists = db.scalar(
                select(BillingDocument).where(
                    BillingDocument.client_id == client.id,
                    BillingDocument.period_month == target_month,
                )
            )
            if exists:
                continue

            try:
                vehicle_count = self.monitoring_api.get_active_vehicle_count(
                    system_code=client.monitoring_system.code,
                    base_url=client.monitoring_system.api_base_url,
                    monitoring_account_id=client.monitoring_account_id,
                    on_date=period_end,
                    monitoring_api_key=client.monitoring_api_key,
                )
                amount = Decimal(vehicle_count) * Decimal(client.price_per_vehicle)
                due_date = period_end + timedelta(days=client.payment_term_days)

                accounting_doc = self.accounting_api.create_invoice_and_upd(
                    external_contractor_id=client.contractor.external_contractor_id,
                    amount=amount,
                    vehicle_count=vehicle_count,
                    period_month=target_month,
                    due_date=due_date,
                    api_key=client.contractor.accounting_api_key,
                )

                billing_doc = BillingDocument(
                    client_id=client.id,
                    period_month=target_month,
                    issued_on=period_end,
                    due_date=due_date,
                    vehicle_count=vehicle_count,
                    amount=amount,
                    accounting_invoice_id=accounting_doc["invoice_id"],
                    accounting_upd_id=accounting_doc["upd_id"],
                    invoice_pdf_url=accounting_doc["invoice_pdf_url"],
                    upd_pdf_url=accounting_doc["upd_pdf_url"],
                )

                self.email_service.send_documents(
                    recipient=client.email,
                    customer_name=client.name,
                    period_label=period_label,
                    invoice_url=billing_doc.invoice_pdf_url,
                    upd_url=billing_doc.upd_pdf_url,
                )
                billing_doc.email_status = "sent"
                billing_doc.error_message = None
                created += 1
            except Exception as exc:  # noqa: BLE001
                billing_doc = BillingDocument(
                    client_id=client.id,
                    period_month=target_month,
                    issued_on=period_end,
                    due_date=period_end + timedelta(days=client.payment_term_days),
                    vehicle_count=0,
                    amount=Decimal("0.00"),
                    accounting_invoice_id="",
                    accounting_upd_id="",
                    invoice_pdf_url="",
                    upd_pdf_url="",
                    email_status="failed",
                    error_message=str(exc),
                )
                failed += 1

            db.add(billing_doc)
            db.commit()

        return {"month": target_month.isoformat(), "created": created, "failed": failed}
