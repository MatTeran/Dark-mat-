# Dark Mat

Premium Brazilian Jiu-Jitsu academy management app.

Built with React Native, Expo SDK 54, TypeScript, Supabase, NativeWind, React Navigation, Stripe, and React Query.

> **Note:** The project targets **Expo SDK 54** so it opens in the App Store / Play Store Expo Go app. Newer SDKs (55+) are not yet available in store Expo Go.

## Architecture

Monorepo with a Member app at the repository root and a Coach app under `apps/coach`.

```
apps/coach/           Coach Expo app (Phase 1)
packages/shared/      Shared theme, UI, auth, types, repositories
supabase/migrations/  Coach Phase 1 tables (announcements, attendance, coach notes, classes)
components/           Member UI primitives and feature components
screens/              Member feature screens
navigation/           Member navigators
services/             Member Supabase/Stripe facades
hooks/                Shared hooks and React Query keys
lib/                  Member theme, env, providers, query client
types/                Member domain and navigation types
utils/                Formatting and validation helpers
assets/               Images and static media
```

### Scripts

- `npm start` / `npm run start:member` — Member Expo app
- `npm run start:coach` — Coach Expo app
- `npm run typecheck:all` — Member + Coach TypeScript checks

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

### Supabase auth setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy **Project URL** and **anon public** key into `.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
```

3. In Supabase → **Authentication → URL Configuration**, add redirect URLs:
   - `darkmat://`
   - `darkmat://auth/reset`
   - Expo Go URLs as needed for local testing
4. Restart Expo after changing `.env` (`npx expo start --clear`)

Auth features included:

- Email/password **Login** and **Register**
- **Forgot Password** reset email
- Form validation, loading states, inline errors
- **Persistent sessions** via AsyncStorage
- Auto-route to **Home** after login
- Sign out from **Profile**

## Scripts

- `npm start` — Expo dev server
- `npm run ios` / `npm run android` / `npm run web`
- `npm run typecheck` — TypeScript check

## Navigation map

1. **Auth stack** — Splash → Login / Register / Forgot Password
2. **Main tabs** — Home · Schedule · Workout Log · Profile
