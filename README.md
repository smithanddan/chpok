# GPS Billing MVP

Локальный MVP для ежемесячного биллинга клиентов сервиса GPS-мониторинга.

## Что делает

1. В последний день месяца получает количество активных машин по каждому активному клиенту.
2. Считает сумму: `машины * price_per_vehicle`.
3. Создает документы через API бухгалтерии: `Счет` + `УПД`.
4. Отправляет клиенту email с ссылками на документы.
5. Хранит историю, статусы отправки и оплаты.
6. Ежедневно проверяет просрочку и отключает доступ в мониторинге после настроенного дня.

## Бизнес-правила оплаты и отключения

- `payment_term_days` задается на клиенте (например, 7, 10, 14 дней).
- `due_date = дата выставления + payment_term_days`.
- Отключение при просрочке:
  - глобальный fallback: `DEFAULT_DISABLE_AFTER_DAY` (например, `10`),
  - либо персональный `disable_after_day` у клиента.
- Отключение происходит только если:
  1. текущий день месяца >= `disable_after_day`;
  2. `due_date` уже прошел;
  3. оплата по счету не `paid` и не `partially_paid`.

## Стек

- FastAPI
- SQLAlchemy + SQLite (по умолчанию)
- APScheduler
- SMTP для email

## Быстрый запуск

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

API будет доступно на `http://127.0.0.1:8000`.
UI будет доступен на `http://127.0.0.1:8000/`.

## Demo / просмотр интерфейса

1. Откройте `http://127.0.0.1:8000/`.
2. Нажмите `Загрузить демо-данные`.
3. В интерфейсе появятся:
   - контрагенты,
   - системы мониторинга,
   - клиенты,
   - реестр документов и dashboard.

Также можно загрузить тестовые данные через API:

```bash
curl -X POST http://127.0.0.1:8000/demo/seed
```

## Основные API

- `POST /contractors` - добавить контрагента.
- `GET /contractors` - список контрагентов (для выбора в карточке клиента).
- `PATCH /contractors/{id}/api-key` - обновить API-ключ бухгалтерии для выбранной организации.
- `POST /monitoring-systems` - добавить систему мониторинга (например, CMT).
- `GET /monitoring-systems` - список систем мониторинга.
- `PATCH /monitoring-systems/{id}/admin-api-key` - обновить админ-ключ системы мониторинга.
- `POST /clients` - создать клиента.
- `GET /clients` - список клиентов.
- `POST /jobs/billing/run?month=YYYY-MM` - ручной запуск биллинга.
- `POST /jobs/overdue/check?today=YYYY-MM-DD` - ручная проверка просрочек и отключений.
- `GET /billing/documents?month=YYYY-MM&client_id=1&email_status=sent` - реестр документов с фильтрами.
- `POST /billing/documents/{id}/retry-email` - повторная отправка email.

### Поля клиента

- `contractor_id` - выбранный контрагент.
- `monitoring_system_id` - выбранная система мониторинга.
- `monitoring_account_id` - аккаунт/идентификатор клиента в выбранной системе.
- `monitoring_api_key` - ключ API клиента в системе мониторинга (для подсчета активных машин).
- `price_per_vehicle` - цена за 1 активную машину.
- `payment_term_days` - срок оплаты.
- `block_after_due_days` - через сколько дней после дедлайна блокировать.
- `disable_after_day` - доп. ограничение по дню месяца (опционально).

### Контрагент (организация-выставитель)

- `name` - название организации (например, ООО "Навео").
- `external_contractor_id` - идентификатор контрагента в бухгалтерии.
- `accounting_provider` - провайдер бухгалтерии (`moedelo`).
- `accounting_api_key` - API ключ этой организации (хранится в БД, в ответах API не возвращается).

### Система мониторинга

- `api_base_url` - базовый URL API системы (для Navixy обычно `https://api.eu.navixy.com`).
- `admin_api_key` - админ-ключ системы для операций блокировки (хранится в БД, в ответах API не возвращается).

## Ожидаемые интеграции API

### Monitoring API

- Generic fallback:
  - `GET /accounts/{monitoring_account_id}/active-vehicles?date=YYYY-MM-DD`
  - `POST /accounts/{monitoring_account_id}/disable`

#### Navixy (интегрировано)

- Подсчет активных машин: `POST /v2/tracker/list` с `{"hash": monitoring_api_key}`.
- Блокировка пользователя:
  - `POST /v2/panel/user/read` с `{"hash": admin_api_key, "user_id": monitoring_account_id}`
  - `POST /v2/panel/user/update` c `activated=false`.

### Accounting API

- `POST /documents/invoice-upd`
  - Тело:
    - `external_contractor_id`
    - `amount`
    - `vehicle_count`
    - `period_month` (YYYY-MM-01)
    - `due_date`
  - Ответ:
    - `invoice_id`
    - `upd_id`
    - `invoice_pdf_url`
    - `upd_pdf_url`
- `GET /documents/invoices/{invoice_id}/status`
  - Ответ: `{ "payment_status": "paid|partially_paid|unpaid|unknown" }`

## Важно

В текущем MVP email отправляет ссылки на PDF, а не вложения. Если нужно, можно доработать на загрузку PDF и отправку вложениями.

---

## Project setup

Для фронтенд‑частей проекта **CHPOK**:

1. **Создайте Supabase project.**
2. В Supabase откройте **Project Settings → API**.
3. Возьмите оттуда:
   - `Project URL`,
   - **publishable** (public) key.
4. В корне репозитория скопируйте `.env.example` в `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

5. В `.env.local` заполните переменные:
   - `EXPO_PUBLIC_SUPABASE_URL` и `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` для мобильного (Expo),
   - `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` для Next.js админки.
6. **Service role key не хранить во фронтенд env** и не коммитить в репозиторий. Она должна использоваться только на бэкенде или через Supabase Edge Functions.
