# Chpok – Database Overview

Chpok uses **Postgres via Supabase** as the primary database for all incident and user data.

## Core entities (conceptual)

- `users` – residents and staff with roles like `resident`, `operator`, `supervisor`, `admin`.
- `incidents` – individual urban issues reported by users.
- `incident_status_history` – audit trail of status changes.
- `incident_media` – photos or other attachments linked to incidents.
- `incident_categories` – configurable taxonomy for classifying incidents.

## Identity and auth

- Supabase Auth handles basic user identities.
- Application roles are mapped in app tables (for example, `app_user_roles`) using the `UserRole` type from `@chpok/types`.

## Migrations

- All schema changes should be captured as SQL files in `supabase/migrations`.
- Migrations should be:
  - **forward-only**,
  - **reviewed** for impact on existing data,
  - small and focused on specific entities or relationships.

Detailed table definitions will be added as the schema stabilises.

