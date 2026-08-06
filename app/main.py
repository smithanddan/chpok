from __future__ import annotations

from datetime import date, datetime, timedelta
from decimal import Decimal

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.config import settings
from app.db import Base, engine, get_db
from app.dependencies import access_service, billing_service, email_service, monitoring_api
from app.models import BillingDocument, Client, Contractor, MonitoringSystem
from app.schemas import (
    BillingDocumentRegistryRead,
    ClientCreate,
    ClientRead,
    ContractorApiKeyUpdate,
    ContractorCreate,
    ContractorRead,
    NavixyAdminFetchRequest,
    NavixyAdminFetchResponse,
    MonitoringSystemCreate,
    MonitoringSystemAdminKeyUpdate,
    MonitoringSystemRead,
)
from app.scheduler import configure_scheduler, scheduler
from app.services.billing_service import month_start

app = FastAPI(title=settings.app_name)
app.mount("/static", StaticFiles(directory="static"), name="static")

def _client_read_payload(
    *,
    client: Client,
    contractor: Contractor | None,
    monitoring_system: MonitoringSystem | None,
) -> ClientRead:
    return ClientRead(
        id=client.id,
        name=client.name,
        customer_type=client.customer_type,
        contractor_id=client.contractor_id,
        contractor_name=contractor.name if contractor else "",
        contractor_customer_type=contractor.customer_type if contractor else "company",
        monitoring_system_id=client.monitoring_system_id,
        monitoring_system_name=monitoring_system.name if monitoring_system else "",
        monitoring_account_id=client.monitoring_account_id,
        email=client.email,
        price_per_vehicle=client.price_per_vehicle,
        payment_term_days=client.payment_term_days,
        block_after_due_days=client.block_after_due_days,
        disable_after_day=client.disable_after_day,
        status=client.status,
        disabled_at=client.disabled_at,
    )


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
    configure_scheduler()
    scheduler.start()


@app.on_event("shutdown")
def on_shutdown() -> None:
    if scheduler.running:
        scheduler.shutdown(wait=False)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/")
def index() -> FileResponse:
    return FileResponse("static/index.html")


@app.get("/yandex_330f638fdcedaa6f.html")
def yandex_webmaster_verification() -> FileResponse:
    return FileResponse("static/yandex_330f638fdcedaa6f.html")


@app.get("/yandex_0a4c2f3582f09ed1.html")
def yandex_webmaster_verification_new() -> FileResponse:
    return FileResponse("static/yandex_0a4c2f3582f09ed1.html")


@app.post("/integrations/navixy/admin/fetch-user", response_model=NavixyAdminFetchResponse)
def navixy_admin_fetch_user(payload: NavixyAdminFetchRequest) -> NavixyAdminFetchResponse:
    admin_hash = monitoring_api.navixy_panel_auth(
        base_url=payload.base_url,
        login=payload.login,
        password=payload.password,
    )
    user = monitoring_api.navixy_panel_user_read(
        base_url=payload.base_url,
        admin_api_key=admin_hash,
        user_id=payload.user_id,
    )
    return NavixyAdminFetchResponse(success=True, admin_hash=admin_hash, user=user)


@app.post("/clients", response_model=ClientRead)
def create_client(payload: ClientCreate, db: Session = Depends(get_db)) -> ClientRead:
    contractor = db.get(Contractor, payload.contractor_id)
    if not contractor:
        raise HTTPException(status_code=404, detail="Contractor not found")
    monitoring_system = db.get(MonitoringSystem, payload.monitoring_system_id)
    if not monitoring_system:
        raise HTTPException(status_code=404, detail="Monitoring system not found")

    client = Client(**payload.model_dump())
    db.add(client)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Client with external ids already exists") from exc
    db.refresh(client)
    return _client_read_payload(client=client, contractor=contractor, monitoring_system=monitoring_system)


@app.get("/clients", response_model=list[ClientRead])
def list_clients(
    monitoring_system_id: int | None = Query(default=None),
    db: Session = Depends(get_db),
) -> list[ClientRead]:
    stmt = select(Client).order_by(Client.id)
    if monitoring_system_id is not None:
        stmt = stmt.where(Client.monitoring_system_id == monitoring_system_id)
    clients = db.scalars(stmt).all()
    result: list[ClientRead] = []
    for client in clients:
        contractor = db.get(Contractor, client.contractor_id)
        monitoring_system = db.get(MonitoringSystem, client.monitoring_system_id)
        result.append(
            _client_read_payload(
                client=client,
                contractor=contractor,
                monitoring_system=monitoring_system,
            )
        )
    return result


@app.post("/contractors", response_model=ContractorRead)
def create_contractor(payload: ContractorCreate, db: Session = Depends(get_db)) -> Contractor:
    contractor = Contractor(**payload.model_dump())
    db.add(contractor)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Contractor already exists") from exc
    db.refresh(contractor)
    return contractor


@app.get("/contractors", response_model=list[ContractorRead])
def list_contractors(db: Session = Depends(get_db)) -> list[Contractor]:
    return db.scalars(select(Contractor).order_by(Contractor.name)).all()


@app.patch("/contractors/{contractor_id}/api-key", response_model=ContractorRead)
def update_contractor_api_key(
    contractor_id: int,
    payload: ContractorApiKeyUpdate,
    db: Session = Depends(get_db),
) -> Contractor:
    contractor = db.get(Contractor, contractor_id)
    if not contractor:
        raise HTTPException(status_code=404, detail="Contractor not found")
    contractor.accounting_api_key = payload.accounting_api_key
    db.add(contractor)
    db.commit()
    db.refresh(contractor)
    return contractor


@app.post("/monitoring-systems", response_model=MonitoringSystemRead)
def create_monitoring_system(
    payload: MonitoringSystemCreate,
    db: Session = Depends(get_db),
) -> MonitoringSystem:
    monitoring_system = MonitoringSystem(**payload.model_dump())
    db.add(monitoring_system)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Monitoring system already exists") from exc
    db.refresh(monitoring_system)
    return monitoring_system


@app.get("/monitoring-systems", response_model=list[MonitoringSystemRead])
def list_monitoring_systems(db: Session = Depends(get_db)) -> list[MonitoringSystem]:
    return db.scalars(select(MonitoringSystem).order_by(MonitoringSystem.name)).all()


@app.patch("/monitoring-systems/{monitoring_system_id}/admin-api-key", response_model=MonitoringSystemRead)
def update_monitoring_system_admin_api_key(
    monitoring_system_id: int,
    payload: MonitoringSystemAdminKeyUpdate,
    db: Session = Depends(get_db),
) -> MonitoringSystem:
    monitoring_system = db.get(MonitoringSystem, monitoring_system_id)
    if not monitoring_system:
        raise HTTPException(status_code=404, detail="Monitoring system not found")
    monitoring_system.admin_api_key = payload.admin_api_key
    db.add(monitoring_system)
    db.commit()
    db.refresh(monitoring_system)
    return monitoring_system


@app.get("/billing/documents", response_model=list[BillingDocumentRegistryRead])
def list_documents(
    month: str | None = Query(default=None, description="Format: YYYY-MM"),
    client_id: int | None = Query(default=None),
    email_status: str | None = Query(default=None),
    db: Session = Depends(get_db),
) -> list[BillingDocumentRegistryRead]:
    stmt = select(BillingDocument).order_by(BillingDocument.id.desc())
    if month:
        stmt = stmt.where(BillingDocument.period_month == month_start(month))
    if client_id:
        stmt = stmt.where(BillingDocument.client_id == client_id)
    if email_status:
        stmt = stmt.where(BillingDocument.email_status == email_status)

    docs = db.scalars(stmt).all()
    result: list[BillingDocumentRegistryRead] = []
    for doc in docs:
        client = db.get(Client, doc.client_id)
        if not client:
            continue
        contractor = db.get(Contractor, client.contractor_id)
        monitoring_system = db.get(MonitoringSystem, client.monitoring_system_id)
        result.append(
            BillingDocumentRegistryRead(
                id=doc.id,
                client_id=doc.client_id,
                client_name=client.name,
                contractor_name=contractor.name if contractor else "",
                monitoring_system_name=monitoring_system.name if monitoring_system else "",
                period_month=doc.period_month,
                issued_on=doc.issued_on,
                due_date=doc.due_date,
                vehicle_count=doc.vehicle_count,
                amount=doc.amount,
                accounting_invoice_id=doc.accounting_invoice_id,
                accounting_upd_id=doc.accounting_upd_id,
                invoice_pdf_url=doc.invoice_pdf_url,
                upd_pdf_url=doc.upd_pdf_url,
                email_status=doc.email_status,
                payment_status=doc.payment_status,
                error_message=doc.error_message,
                created_at=doc.created_at,
                updated_at=doc.updated_at,
            )
        )
    return result


@app.post("/jobs/billing/run")
def run_billing_job(
    month: str | None = Query(default=None, description="Format: YYYY-MM"),
    db: Session = Depends(get_db),
) -> dict:
    return billing_service.run_monthly(db, month_start(month))


@app.post("/jobs/overdue/check")
def run_overdue_check(
    today: date | None = Query(default=None, description="Optional override date"),
    db: Session = Depends(get_db),
) -> dict:
    return access_service.check_and_disable_overdue(db, today=today)


@app.post("/billing/documents/{document_id}/retry-email")
def retry_document_email(document_id: int, db: Session = Depends(get_db)) -> dict:
    doc = db.get(BillingDocument, document_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    client = db.get(Client, doc.client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    try:
        email_service.send_documents(
            recipient=client.email,
            customer_name=client.name,
            period_label=f"{doc.period_month.month:02d}.{doc.period_month.year}",
            invoice_url=doc.invoice_pdf_url,
            upd_url=doc.upd_pdf_url,
        )
        doc.email_status = "sent"
        doc.error_message = None
    except Exception as exc:  # noqa: BLE001
        doc.email_status = "failed"
        doc.error_message = str(exc)

    db.add(doc)
    db.commit()
    return {"document_id": document_id, "email_status": doc.email_status}


@app.get("/dashboard/summary")
def dashboard_summary(db: Session = Depends(get_db)) -> dict:
    total_clients = len(db.scalars(select(Client)).all())
    active_clients = len(db.scalars(select(Client).where(Client.status == "active")).all())
    disabled_clients = len(db.scalars(select(Client).where(Client.status != "active")).all())
    docs = db.scalars(select(BillingDocument)).all()
    sent_docs = sum(1 for doc in docs if doc.email_status == "sent")
    failed_docs = sum(1 for doc in docs if doc.email_status == "failed")
    overdue_docs = sum(1 for doc in docs if doc.payment_status not in {"paid", "partially_paid"} and doc.due_date < date.today())
    total_amount = sum((doc.amount for doc in docs), Decimal("0.00"))
    return {
        "total_clients": total_clients,
        "active_clients": active_clients,
        "disabled_clients": disabled_clients,
        "documents_total": len(docs),
        "documents_sent": sent_docs,
        "documents_failed": failed_docs,
        "documents_overdue": overdue_docs,
        "amount_total": str(total_amount),
    }


@app.post("/demo/seed")
def seed_demo_data(db: Session = Depends(get_db)) -> dict:
    if not db.scalars(select(Contractor)).first():
        db.add_all(
            [
                Contractor(
                    name='ООО "Навео"',
                    customer_type="company",
                    external_contractor_id="naveo-ooo",
                    email="finance@naveo.local",
                    accounting_provider="moedelo",
                ),
                Contractor(
                    name='ИП "Север Логистик"',
                    customer_type="individual",
                    external_contractor_id="sever-ip",
                    email="bookkeeper@sever.local",
                    accounting_provider="moedelo",
                ),
            ]
        )
        db.commit()

    if not db.scalars(select(MonitoringSystem)).first():
        db.add_all(
            [
                MonitoringSystem(
                    name="CMT / Navixy",
                    code="navixy",
                    api_base_url="https://api.eu.navixy.com",
                ),
                MonitoringSystem(
                    name="Wialon",
                    code="wialon",
                    api_base_url="https://hosting.wialon.com",
                ),
                MonitoringSystem(
                    name="Fort Monitoring",
                    code="fort",
                    api_base_url="https://api.fort-monitor.ru",
                ),
                MonitoringSystem(
                    name="Helios",
                    code="helios",
                    api_base_url="https://api.helios.example",
                ),
            ]
        )
        db.commit()

    contractors = db.scalars(select(Contractor).order_by(Contractor.id)).all()
    systems = db.scalars(select(MonitoringSystem).order_by(MonitoringSystem.id)).all()

    if not db.scalars(select(Client)).first():
        db.add_all(
            [
                Client(
                    name='ООО "ТрансМаршрут"',
                    customer_type="company",
                    contractor_id=contractors[0].id,
                    monitoring_system_id=systems[0].id,
                    monitoring_account_id="8289",
                    email="ops@transmarshrut.local",
                    price_per_vehicle=Decimal("450.00"),
                    payment_term_days=10,
                    block_after_due_days=3,
                    disable_after_day=10,
                ),
                Client(
                    name='ИП "Рейс-Экспресс"',
                    customer_type="individual",
                    contractor_id=contractors[1].id,
                    monitoring_system_id=systems[1].id,
                    monitoring_account_id="1024",
                    email="owner@reis.local",
                    price_per_vehicle=Decimal("390.00"),
                    payment_term_days=7,
                    block_after_due_days=2,
                    disable_after_day=10,
                ),
            ]
        )
        db.commit()

    clients = db.scalars(select(Client).order_by(Client.id)).all()
    if not db.scalars(select(BillingDocument)).first():
        this_month = date.today().replace(day=1)
        last_month = (this_month - timedelta(days=1)).replace(day=1)
        db.add_all(
            [
                BillingDocument(
                    client_id=clients[0].id,
                    period_month=last_month,
                    issued_on=last_month + timedelta(days=27),
                    due_date=last_month + timedelta(days=30),
                    vehicle_count=12,
                    amount=Decimal("5400.00"),
                    accounting_invoice_id="INV-1001",
                    accounting_upd_id="UPD-1001",
                    invoice_pdf_url="https://files.local/inv-1001.pdf",
                    upd_pdf_url="https://files.local/upd-1001.pdf",
                    email_status="sent",
                    payment_status="unpaid",
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow(),
                ),
                BillingDocument(
                    client_id=clients[1].id,
                    period_month=last_month,
                    issued_on=last_month + timedelta(days=27),
                    due_date=last_month + timedelta(days=29),
                    vehicle_count=6,
                    amount=Decimal("2340.00"),
                    accounting_invoice_id="INV-1002",
                    accounting_upd_id="UPD-1002",
                    invoice_pdf_url="https://files.local/inv-1002.pdf",
                    upd_pdf_url="https://files.local/upd-1002.pdf",
                    email_status="failed",
                    payment_status="unknown",
                    error_message="SMTP timeout",
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow(),
                ),
            ]
        )
        db.commit()

    return {"status": "ok"}
