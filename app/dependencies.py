from app.clients.accounting_api import AccountingApiClient
from app.clients.monitoring_api import MonitoringApiClient
from app.config import settings
from app.services.access_service import AccessService
from app.services.billing_service import BillingService
from app.services.email_service import EmailService

monitoring_api = MonitoringApiClient(settings.monitoring_api_base_url, settings.monitoring_api_token)
accounting_api = AccountingApiClient(settings.accounting_api_base_url, settings.accounting_api_token)
email_service = EmailService(
    host=settings.smtp_host,
    port=settings.smtp_port,
    username=settings.smtp_username,
    password=settings.smtp_password,
    use_tls=settings.smtp_use_tls,
    sender=settings.email_sender,
)

billing_service = BillingService(monitoring_api, accounting_api, email_service)
access_service = AccessService(
    monitoring_api=monitoring_api,
    accounting_api=accounting_api,
    default_disable_after_day=settings.default_disable_after_day,
)
