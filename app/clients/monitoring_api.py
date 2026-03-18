from __future__ import annotations

from datetime import date

import httpx


class MonitoringApiClient:
    def __init__(self, base_url: str, token: str):
        self.base_url = base_url.rstrip("/")
        self.token = token

    def get_active_vehicle_count(
        self,
        system_code: str,
        base_url: str,
        monitoring_account_id: str,
        on_date: date,
        monitoring_api_key: str | None = None,
    ) -> int:
        if system_code.lower() == "navixy":
            return self._navixy_active_vehicle_count(
                base_url=base_url,
                monitoring_api_key=monitoring_api_key,
            )

        with httpx.Client(timeout=20.0) as client:
            response = client.get(
                f"{base_url.rstrip('/')}/accounts/{monitoring_account_id}/active-vehicles",
                params={"date": on_date.isoformat()},
                headers={"Authorization": f"Bearer {self.token}"},
            )
            response.raise_for_status()
            payload = response.json()
            return int(payload["active_vehicle_count"])

    def disable_account(
        self,
        system_code: str,
        base_url: str,
        monitoring_account_id: str,
        reason: str,
        admin_api_key: str | None = None,
    ) -> None:
        if system_code.lower() == "navixy":
            self._navixy_disable_user(
                base_url=base_url,
                monitoring_account_id=monitoring_account_id,
                admin_api_key=admin_api_key,
            )
            return

        with httpx.Client(timeout=20.0) as client:
            response = client.post(
                f"{base_url.rstrip('/')}/accounts/{monitoring_account_id}/disable",
                json={"reason": reason},
                headers={"Authorization": f"Bearer {self.token}"},
            )
            response.raise_for_status()

    def _navixy_active_vehicle_count(self, base_url: str, monitoring_api_key: str | None) -> int:
        if not monitoring_api_key:
            raise ValueError("monitoring_api_key is required for Navixy tracker/list")
        with httpx.Client(timeout=20.0) as client:
            response = client.post(
                f"{base_url.rstrip('/')}/v2/tracker/list",
                json={"hash": monitoring_api_key},
            )
            response.raise_for_status()
            payload = response.json()
            if not payload.get("success"):
                raise RuntimeError(f"Navixy tracker/list failed: {payload}")
            trackers = payload.get("list", [])
            active = 0
            for tracker in trackers:
                source = tracker.get("source") or {}
                if source.get("blocked"):
                    continue
                active += 1
            return active

    def _navixy_disable_user(
        self,
        base_url: str,
        monitoring_account_id: str,
        admin_api_key: str | None,
    ) -> None:
        if not admin_api_key:
            raise ValueError("admin_api_key is required for Navixy panel/user/update")
        try:
            user_id = int(monitoring_account_id)
        except ValueError as exc:
            raise ValueError("Navixy monitoring_account_id must be numeric user_id") from exc

        with httpx.Client(timeout=20.0) as client:
            read_response = client.post(
                f"{base_url.rstrip('/')}/v2/panel/user/read",
                json={"hash": admin_api_key, "user_id": user_id},
            )
            read_response.raise_for_status()
            read_payload = read_response.json()
            if not read_payload.get("success"):
                raise RuntimeError(f"Navixy panel/user/read failed: {read_payload}")

            user = read_payload.get("value") or {}
            for key in ("balance", "bonus_balance", "creation_date", "trackers_count", "comment"):
                user.pop(key, None)
            user["activated"] = False

            update_response = client.post(
                f"{base_url.rstrip('/')}/v2/panel/user/update",
                json={"hash": admin_api_key, "user": user},
            )
            update_response.raise_for_status()
            update_payload = update_response.json()
            if not update_payload.get("success"):
                raise RuntimeError(f"Navixy panel/user/update failed: {update_payload}")

    def navixy_panel_auth(self, base_url: str, login: str, password: str) -> str:
        with httpx.Client(timeout=20.0) as client:
            response = client.post(
                f"{base_url.rstrip('/')}/v2/panel/account/auth",
                json={"login": login, "password": password},
            )
            response.raise_for_status()
            payload = response.json()
            if not payload.get("success"):
                raise RuntimeError(f"Navixy panel/account/auth failed: {payload}")
            return str(payload["hash"])

    def navixy_panel_user_read(self, base_url: str, admin_api_key: str, user_id: int) -> dict:
        with httpx.Client(timeout=20.0) as client:
            response = client.post(
                f"{base_url.rstrip('/')}/v2/panel/user/read",
                json={"hash": admin_api_key, "user_id": user_id},
            )
            response.raise_for_status()
            payload = response.json()
            if not payload.get("success"):
                raise RuntimeError(f"Navixy panel/user/read failed: {payload}")
            return payload.get("value") or {}
