from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "gps-billing-mvp"
    database_url: str = "sqlite:///./billing.db"

    default_disable_after_day: int = 10
    monthly_billing_hour: int = 21
    monthly_billing_minute: int = 0
    overdue_check_hour: int = 7
    overdue_check_minute: int = 0

    monitoring_api_base_url: str = "https://monitoring.local/api"
    monitoring_api_token: str = "replace-me"

    accounting_api_base_url: str = "https://accounting.local/api"
    accounting_api_token: str = "replace-me"

    smtp_host: str = "localhost"
    smtp_port: int = 1025
    smtp_username: str = ""
    smtp_password: str = ""
    smtp_use_tls: bool = False
    email_sender: str = "billing@example.com"

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False, extra="ignore")


settings = Settings()
