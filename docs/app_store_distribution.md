# Distributing Physiome on Google Play & the App Store

Physiome's PWA (`apps/web`) is now wrapped with [Capacitor](https://capacitorjs.com/),
which packages the existing web build into a native Android project
(`apps/web/android`) and iOS project (`apps/web/ios`). No UI code was rewritten —
both native shells load the same React app in a full-screen WebView.

- App ID (bundle identifier): `com.physiome.app`
- App name: `Physiome`

## Everyday workflow

```bash
cd apps/web
npm run cap:sync          # builds the web app, then copies it into android/ and ios/
npm run cap:open:android  # opens the project in Android Studio
npm run cap:open:ios      # opens the project in Xcode (macOS only)
```

Run `cap:sync` after every change you want reflected in the native apps —
it rebuilds the web bundle and re-copies it into both native projects.

## Android — Google Play

Requirements: Android Studio, a [Google Play Console](https://play.google.com/console)
account (one-time $25 fee).

1. `npm run cap:open:android` to open the project in Android Studio.
2. Build > Generate Signed Bundle / APK, create an upload keystore (keep it
   safe — losing it means you can't update the app under the same listing),
   and produce an `.aab` (Android App Bundle).
3. Create the app listing in Play Console, fill in the store listing
   (description, screenshots, privacy policy URL, data-safety form — Physiome
   handles health data, so this section needs care), upload the `.aab`, and
   submit for review.

## iOS — App Store

Requirements: a Mac with Xcode, an
[Apple Developer Program](https://developer.apple.com/programs/) account
($99/year). If you don't have a Mac, a cloud Mac/CI service (e.g. Codemagic,
Ionic Appflow, GitHub Actions macOS runners) can build and sign instead.

1. `npm run cap:open:ios` to open the project in Xcode.
2. Set your Apple Developer Team under Signing & Capabilities.
3. Product > Archive, then distribute via App Store Connect.
4. Create the app listing in [App Store Connect](https://appstoreconnect.apple.com/),
   fill in the store listing and privacy details, upload the build via Xcode
   or Transporter, and submit for review.

## Icons & splash screens

Capacitor generated placeholder icons/splash screens from the existing PWA
icons in `apps/web/public/icons`. To regenerate polished, correctly-sized
assets for every platform from a single source image, use
[`@capacitor/assets`](https://github.com/ionic-team/capacitor-assets):

```bash
npm install -D @capacitor/assets --workspace=apps/web
npx capacitor-assets generate
```

## Notes

- The native shells point at the bundled web build, not a live URL — so the
  apps work offline the same way the PWA's service worker does, and store
  reviewers aren't depending on your hosting uptime.
- Environment variables (Supabase URL/keys) are baked in at build time via
  Vite, same as the web deploy — make sure `apps/web/.env` is set correctly
  before running `cap:sync` for a release build.
- Keystores, provisioning profiles, and signing certificates are not part of
  this repo and must never be committed — manage them via Android
  Studio/Xcode or a secrets manager.
