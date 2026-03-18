# Chpok – Product Overview

Chpok is a **mobile-first civic-tech platform** for fast, structured reporting of urban incidents (potholes, broken lights, unsafe crossings, overflowing trash, etc.) with a lightweight admin console for city teams.

## Problem

Cities receive resident feedback through scattered, slow channels: emails, hotlines, social media complaints, and generic portals. This leads to:

- lost or duplicated reports,
- unclear ownership and slow routing to responsible services,
- no clear feedback loop back to residents.

## Solution

Chpok provides:

- **Mobile app for residents** – quick, guided incident reporting with photos and precise geolocation.
- **Admin panel for operators** – triage, assignment, and status tracking for the city’s operations team.
- **Single source of truth** – Supabase-backed storage for incidents, their lifecycle, and audit history.

## Core user groups

- **Residents (reporters)** – people living in the city, reporting issues they see on the street.
- **Operators** – city staff or contractors handling the queue of incoming incidents.
- **Supervisors / admins** – oversee performance and maintain taxonomies, SLAs, and integrations.

## Initial scope (MVP)

- Submit an incident with:
  - category,
  - short description,
  - location (map + address),
  - one or more photos.
- View basic incident status from the mobile app.
- Operator view of a simple queue:
  - list of new incidents,
  - changing status from `submitted` → `in_review` → `in_progress` → `resolved` / `rejected`.

## Out of scope (for now)

- Complex multi-tenant setup for many cities.
- Heavy analytics dashboards or BI exports.
- Deep integration into existing municipal ERP systems.

