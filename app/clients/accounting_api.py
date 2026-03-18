from __future__ import annotations

from datetime import date
from decimal import Decimal

import httpx


class AccountingApiClient:
    def __init__(self, base_url: str, token: str):
        self.base_url = base_url.rstrip("/")
        self.token = token

    def _headers(self, api_key: str | None = None) -> dict[str, str]:
        token = api_key or self.token
        return {"Authorization": f"Bearer {token}"}

    def create_invoice_and_upd(
        self,
        external_contractor_id: str,
        amount: Decimal,
        vehicle_count: int,
        period_month: date,
        due_date: date,
        api_key: str | None = None,
    ) -> dict:
        with httpx.Client(timeout=30.0) as client:
            response = client.post(
                f"{self.base_url}/documents/invoice-upd",
                json={
                    "external_contractor_id": external_contractor_id,
                    "amount": str(amount),
                    "vehicle_count": vehicle_count,
                    "period_month": period_month.isoformat(),
                    "due_date": due_date.isoformat(),
                },
                headers=self._headers(api_key=api_key),
            )
            response.raise_for_status()
            return response.json()

    def get_payment_status(self, accounting_invoice_id: str, api_key: str | None = None) -> str:
        with httpx.Client(timeout=15.0) as client:
            response = client.get(
                f"{self.base_url}/documents/invoices/{accounting_invoice_id}/status",
                headers=self._headers(api_key=api_key),
            )
            response.raise_for_status()
            payload = response.json()
            return str(payload.get("payment_status", "unknown"))
