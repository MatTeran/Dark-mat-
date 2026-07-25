# Dark Mat

Premium Brazilian Jiu-Jitsu academy management app.

Built with React Native, Expo SDK 54, TypeScript, Supabase, NativeWind, React Navigation, Stripe, and React Query.

> **Note:** The project targets **Expo SDK 54** so it opens in the App Store / Play Store Expo Go app. Newer SDKs (55+) are not yet available in store Expo Go.

## Architecture

Clean, modular structure designed to scale:

```
components/     Reusable UI primitives and layout pieces
screens/        Feature screens (auth + main)
navigation/     Typed navigators (auth stack + main tabs)
services/       Supabase, Stripe, and API facades
hooks/          Shared hooks and React Query keys
lib/            Theme, env, providers, query client
types/          Domain and navigation types
utils/          Formatting and validation helpers
assets/         Images and static media
```

## Brand

| Token | Value |
| --- | --- |
| Primary background | `#0D0D0D` |
| Secondary background | `#181818` |
| Gold accent | `#D4AF37` |
| Text | `#FFFFFF` |
| Secondary text | `#A0A0A0` |
| Error | `#FF4D4D` |
| Success | `#22C55E` |

Typography: **Syne** (display/brand) + **Outfit** (UI).

## Getting started

```bash
npm install
cp .env.example .env
npm start
```

Fill `.env` with your Supabase and Stripe keys before enabling live auth/payments.

## Scripts

- `npm start` — Expo dev server
- `npm run ios` / `npm run android` / `npm run web`
- `npm run typecheck` — TypeScript check

## Navigation map

1. **Auth stack** — Splash → Login / Register
2. **Main tabs** — Home · Schedule · Workout Log · Profile

Auth is currently a local placeholder gate so UI can be developed without backend credentials.
