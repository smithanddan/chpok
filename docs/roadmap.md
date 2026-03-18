# Chpok – Roadmap (High Level)

This is a lightweight, product-focused roadmap for Chpok.

## Phase 1 – Foundations

- Monorepo skeleton with mobile app, admin app, shared types, Supabase config, and docs.
- Basic incident domain model shared via `@chpok/types`.
- Local Supabase setup for development.

## Phase 2 – Incident MVP

- Mobile:
  - basic incident creation form (category + description + location + photo).
  - simple “my incidents” list.
- Admin:
  - queue of new incidents,
  - status changes (`submitted` → `in_review` → `in_progress` → `resolved` / `rejected`),
  - minimal filters (status, category).

## Phase 3 – Feedback Loop

- Push or in-app notifications for key status changes.
- Public-friendly status phrasing and timelines in the mobile app.
- Basic SLA tracking in the admin panel (simple counters, not heavy dashboards).

## Phase 4 – Integrations and Policies

- Connect to city-specific ticketing systems where needed.
- Add configurable SLAs and categories per city.
- Harden security, audit logging, and data retention policies.

