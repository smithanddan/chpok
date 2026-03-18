# Chpok Mobile App

Mobile-first client for **Chpok**, a civic-tech app for fast urban incident reporting.

## What this app is

- **Primary entry point** for city residents to report issues like broken street lights, potholes, unsafe crossings, or overflowing trash.
- **Skeleton only**: just enough structure to run Expo and start building flows for:
  - creating a new incident report,
  - attaching photos and precise location,
  - tracking status updates from the city side.

## Tech stack

- Expo + React Native
- TypeScript

## Getting started

From the monorepo root:

```bash
npm install
npm run dev:mobile
```

Then open the Expo dev tools and run the app on a simulator or physical device.

## Environment

Configure mobile-specific variables in `.env` (see `.env.example` in this folder), for example:

- `CHPOK_API_BASE_URL`
- `CHPOK_SUPABASE_URL`
- `CHPOK_SUPABASE_ANON_KEY`

