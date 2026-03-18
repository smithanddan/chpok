# Chpok – Architecture Overview

This document describes the **high-level architecture** for Chpok as a monorepo.

## Monorepo layout

- `apps/mobile` – Expo + React Native mobile app for residents.
- `apps/admin` – Next.js + Tailwind admin panel for operators and supervisors.
- `packages/types` – shared TypeScript domain types (incidents, users, roles).
- `supabase` – database migrations and Supabase CLI config.
- `docs` – product and technical documentation.

## High-level components

- **Mobile client (Chpok Mobile)** – captures incidents, uploads media, and subscribes to status updates.
- **Admin client (Chpok Admin)** – presents queues, filters, and basic actions on incidents.
- **Backend / API** (to be defined) – REST or GraphQL API backed by Supabase Postgres, handling:
  - authentication and role-based access,
  - incident creation and updates,
  - media handling via Supabase storage or similar.
- **Database** – Postgres schema managed via Supabase migrations.

## Data flow (MVP)

1. Resident submits an incident from the mobile app.
2. API validates input, stores incident and location in Postgres, and enqueues it as `submitted`.
3. Admin panel fetches incidents by status and allows operators to move them through the lifecycle.
4. Incident status updates are reflected back to the mobile app via polling or subscriptions.

## Technology choices

- **TypeScript everywhere** – shared types in `@chpok/types` to reduce schema drift.
- **Supabase** – for authentication, Postgres database, and storage.
- **React Native (Expo)** – to ship fast, brand-aligned mobile experiences.
- **Next.js** – for a modern, fast admin experience with server rendering where needed.

