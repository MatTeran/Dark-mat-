# Dark Mat → TestFlight (PC-friendly)

Use **EAS Build** so you can ship to TestFlight from Windows without Xcode.

## Prerequisites

1. [Apple Developer Program](https://developer.apple.com/programs/) enrollment (paid)
2. [Expo account](https://expo.dev/signup) (free)
3. Node.js LTS on your PC
4. This repo on branch `cursor/dark-mat-initial-architecture-acbd`

## One-time Apple setup (browser)

1. Open [App Store Connect](https://appstoreconnect.apple.com) → **Apps** → **+**
2. Create app:
   - **Name:** Dark Mat
   - **Bundle ID:** `com.darkmat.app` (register in [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/identifiers/list) first if needed)
   - **SKU:** `dark-mat-ios` (any unique string)
3. Note your **Team ID** (Membership details) and the app’s **Apple ID** (App Information → General → Apple ID)

## One-time project setup (PC Terminal)

```bash
cd Dark-mat-
git checkout cursor/dark-mat-initial-architecture-acbd
npm install
npm install -g eas-cli

eas login
eas init
```

`eas init` writes a real `extra.eas.projectId` into `app.json`.  
Commit that change after it succeeds.

Update `eas.json` → `submit.production.ios.appleTeamId` (and preview) with your Team ID.

Optional — store secrets for production builds:

```bash
eas secret:create --name EXPO_PUBLIC_SUPABASE_URL --value "https://....supabase.co"
eas secret:create --name EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY --value "sb_publishable_..."
eas secret:create --name EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY --value "pk_live_or_test_..."
```

## Build for TestFlight

```bash
eas build --platform ios --profile production
```

- First run: allow EAS to create/manage iOS credentials (recommended)
- Wait for the cloud build to finish (often 15–40 minutes)
- Confirm the build is **Finished** on [expo.dev](https://expo.dev)

## Submit to TestFlight

```bash
eas submit --platform ios --profile production --latest
```

Or link a specific build URL from the Expo dashboard.

You’ll sign in with an Apple ID that has App Store Connect access.  
App-specific password: [appleid.apple.com](https://appleid.apple.com) → Sign-In and Security → App-Specific Passwords.

## Enable testing

1. App Store Connect → your app → **TestFlight**
2. Wait for processing (“Ready to Test”)
3. Add yourself as an **Internal Tester**
4. Install **TestFlight** on your iPhone and accept the invite

## Useful scripts

```bash
npm run build:ios      # eas build ios production
npm run submit:ios     # eas submit ios production --latest
```

## Notes

- Expo Go is **not** TestFlight. TestFlight installs a real `.ipa` build.
- Push notifications work more fully in this build than in Expo Go.
- Stripe Apple Pay needs `merchant.com.darkmat.app` configured in Apple Developer if you enable it.
- Do **not** put a fake `projectId` in `app.json` before `eas init` (breaks Expo Go).
