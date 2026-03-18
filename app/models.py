from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import Date, DateTime, ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base


class Client(Base):
    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    customer_type: Mapped[str] = mapped_column(String(32), nullable=False, default="company")
    contractor_id: Mapped[int] = mapped_column(ForeignKey("contractors.id"), nullable=False, index=True)
    monitoring_system_id: Mapped[int] = mapped_column(
        ForeignKey("monitoring_systems.id"), nullable=False, index=True
    )
    monitoring_account_id: Mapped[str] = mapped_column(String(128), unique=True, nullable=False)
    monitoring_api_key: Mapped[str | None] = mapped_column(String(255), nullable=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    price_per_vehicle: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    payment_term_days: Mapped[int] = mapped_column(nullable=False, default=10)
    block_after_due_days: Mapped[int] = mapped_column(nullable=False, default=0)
    disable_after_day: Mapped[int | None] = mapped_column(nullable=True)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="active")
    disabled_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    contractor: Mapped["Contractor"] = relationship(back_populates="clients")
    monitoring_system: Mapped["MonitoringSystem"] = relationship(back_populates="clients")
    documents: Mapped[list["BillingDocument"]] = relationship(back_populates="client")


class Contractor(Base):
    __tablename__ = "contractors"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    customer_type: Mapped[str] = mapped_column(String(32), nullable=False, default="company")
    external_contractor_id: Mapped[str] = mapped_column(String(128), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    accounting_provider: Mapped[str] = mapped_column(String(64), nullable=False, default="moedelo")
    accounting_api_key: Mapped[str | None] = mapped_column(String(255), nullable=True)

    clients: Mapped[list["Client"]] = relationship(back_populates="contractor")


class MonitoringSystem(Base):
    __tablename__ = "monitoring_systems"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    code: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    api_base_url: Mapped[str] = mapped_column(String(255), nullable=False, default="https://api.eu.navixy.com")
    admin_api_key: Mapped[str | None] = mapped_column(String(255), nullable=True)

    clients: Mapped[list["Client"]] = relationship(back_populates="monitoring_system")


class BillingDocument(Base):
    __tablename__ = "billing_documents"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id"), nullable=False)
    period_month: Mapped[date] = mapped_column(Date, nullable=False)
    issued_on: Mapped[date] = mapped_column(Date, nullable=False)
    due_date: Mapped[date] = mapped_column(Date, nullable=False)
    vehicle_count: Mapped[int] = mapped_column(nullable=False)
    amount: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    accounting_invoice_id: Mapped[str] = mapped_column(String(128), nullable=False)
    accounting_upd_id: Mapped[str] = mapped_column(String(128), nullable=False)
    invoice_pdf_url: Mapped[str] = mapped_column(Text, nullable=False)
    upd_pdf_url: Mapped[str] = mapped_column(Text, nullable=False)
    email_status: Mapped[str] = mapped_column(String(32), nullable=False, default="pending")
    payment_status: Mapped[str] = mapped_column(String(32), nullable=False, default="unknown")
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    client: Mapped["Client"] = relationship(back_populates="documents")
