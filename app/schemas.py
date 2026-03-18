from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ClientCreate(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    customer_type: str = Field(default="company", pattern="^(company|individual)$")
    contractor_id: int = Field(ge=1)
    monitoring_system_id: int = Field(ge=1)
    monitoring_account_id: str = Field(min_length=1, max_length=128)
    monitoring_api_key: str | None = Field(default=None, min_length=10, max_length=255)
    email: EmailStr
    price_per_vehicle: Decimal = Field(gt=0)
    payment_term_days: int = Field(default=10, ge=1, le=90)
    block_after_due_days: int = Field(default=0, ge=0, le=60)
    disable_after_day: int | None = Field(default=None, ge=1, le=31)


class ContractorCreate(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    customer_type: str = Field(default="company", pattern="^(company|individual)$")
    external_contractor_id: str = Field(min_length=1, max_length=128)
    email: EmailStr
    accounting_provider: str = Field(default="moedelo", min_length=2, max_length=64)
    accounting_api_key: str | None = Field(default=None, min_length=10, max_length=255)


class ContractorRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    customer_type: str
    external_contractor_id: str
    email: str
    accounting_provider: str


class ContractorApiKeyUpdate(BaseModel):
    accounting_api_key: str = Field(min_length=10, max_length=255)


class MonitoringSystemCreate(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    code: str = Field(min_length=2, max_length=64)
    api_base_url: str = Field(min_length=10, max_length=255)
    admin_api_key: str | None = Field(default=None, min_length=10, max_length=255)


class MonitoringSystemRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    code: str
    api_base_url: str


class MonitoringSystemAdminKeyUpdate(BaseModel):
    admin_api_key: str = Field(min_length=10, max_length=255)


class NavixyAdminFetchRequest(BaseModel):
    base_url: str = Field(default="https://api.eu.navixy.com", min_length=10, max_length=255)
    login: str = Field(min_length=1, max_length=128)
    password: str = Field(min_length=1, max_length=255)
    user_id: int = Field(ge=1)


class NavixyAdminFetchResponse(BaseModel):
    success: bool
    admin_hash: str
    user: dict


class ClientRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    customer_type: str
    contractor_id: int
    contractor_name: str
    contractor_customer_type: str
    monitoring_system_id: int
    monitoring_system_name: str
    monitoring_account_id: str
    email: str
    price_per_vehicle: Decimal
    payment_term_days: int
    block_after_due_days: int
    disable_after_day: int | None
    status: str
    disabled_at: datetime | None


class BillingDocumentRegistryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    client_id: int
    client_name: str
    contractor_name: str
    monitoring_system_name: str
    period_month: date
    issued_on: date
    due_date: date
    vehicle_count: int
    amount: Decimal
    accounting_invoice_id: str
    accounting_upd_id: str
    invoice_pdf_url: str
    upd_pdf_url: str
    email_status: str
    payment_status: str
    error_message: str | None
    created_at: datetime
    updated_at: datetime
