from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

from app.config import settings
from app.db import SessionLocal
from app.dependencies import access_service, billing_service
from app.services.billing_service import month_start

scheduler = BackgroundScheduler(timezone="Europe/Moscow")


def run_monthly_job() -> None:
    db = SessionLocal()
    try:
        billing_service.run_monthly(db, month_start(None))
    finally:
        db.close()


def run_overdue_job() -> None:
    db = SessionLocal()
    try:
        access_service.check_and_disable_overdue(db)
    finally:
        db.close()


def configure_scheduler() -> None:
    scheduler.add_job(
        run_monthly_job,
        CronTrigger(day="last", hour=settings.monthly_billing_hour, minute=settings.monthly_billing_minute),
        id="monthly_billing",
        replace_existing=True,
    )
    scheduler.add_job(
        run_overdue_job,
        CronTrigger(hour=settings.overdue_check_hour, minute=settings.overdue_check_minute),
        id="overdue_check_daily",
        replace_existing=True,
    )
