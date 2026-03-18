# Chpok Admin Panel

Admin interface for **Chpok**, a civic-tech platform for fast urban incident reporting.

## What this app is

- **Lightweight operator console** for city teams that receive and process reports from residents.
- Focused on:
  - triaging and categorising incoming incidents,
  - assigning them to responsible services,
  - tracking progress until resolution.
- This repository contains only the **foundation**: layout, design system wiring (Tailwind + shadcn-style button), and basic theming.

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS

## Getting started

From the monorepo root:

```bash
npm install
npm run dev:admin
```

The admin will be available at `http://localhost:3000` by default.

## Environment

Configure admin variables in `.env` (see `.env.example` in this folder), for example:

- `CHPOK_API_BASE_URL`
- `CHPOK_SUPABASE_URL`
- `CHPOK_SUPABASE_SERVICE_ROLE_KEY`

