# Dark Mat · Expo Notifications

## Packages

- `expo-notifications`
- `expo-device`
- `expo-constants` (already present)

## app.json

- Plugin: `expo-notifications`
- iOS `UIBackgroundModes` includes `remote-notification`
- Android `POST_NOTIFICATIONS` permission
- `extra.eas.projectId` placeholder — replace with your EAS project UUID before production push tokens

## Physical device testing

1. Create an EAS project (`eas init`) and paste the projectId into `app.json` → `extra.eas.projectId`.
2. Build a development client or use a custom dev build (Expo Go supports many notification APIs; push tokens need a projectId).
3. Sign in (not Guest) so `push_tokens` upsert can run against Supabase.
4. Apply `supabase/migrations/20260727_push_tokens.sql`.
5. From Home, tap **Enable Notifications**, or use Profile → Notifications → Settings → Enable.
6. In `__DEV__`, open Notification Settings → Developer tests to fire local mock notifications.

## What still needs an Edge Function

Remote delivery for waitlist openings, cancellations, and coach announcements.
The app models payloads + deep links; it does not send Expo Push from a server yet.
