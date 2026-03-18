# Chpok Supabase Setup

This folder contains **database and auth foundations** for Chpok.

## Structure

- `config.toml` – Supabase CLI project config.
- `migrations/` – SQL migrations for incident reporting, users, and supporting tables.

## Getting started

1. Install the Supabase CLI.
2. From the monorepo root, run:

```bash
supabase init --project-name chpok
```

You can then adjust the generated `config.toml` to match this skeleton or replace it entirely.

## Environment

See `.env.example` in this folder for database-related variables that should be shared between the API, admin, and mobile apps.

