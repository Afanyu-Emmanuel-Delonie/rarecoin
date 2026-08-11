# Rarecoin

Marketing site for Rarecoin (RARE), a fixed-supply, fair-launch SPL token on Solana. Built with Next.js App Router, Tailwind CSS, GSAP, and Firebase.

> **Note for contributors (human or AI):** this repo runs a customized fork of Next.js. Read [`AGENTS.md`](./AGENTS.md) before touching framework-level code (routing, Server Actions, config) — APIs and conventions may differ from what you'd expect from a stock Next.js install.

## Tech stack

- **Framework:** Next.js 16 (App Router, Server Actions, Turbopack), React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Animation:** GSAP + ScrollTrigger
- **Data:** Firebase (Firestore for storage, Firebase Auth for the admin dashboard, Firebase Analytics for GA4)
- **Email:** Resend
- **Hosting:** Vercel

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Environment variables

All secrets live in `.env.local` (gitignored — never commit real values). Set the same variables in Vercel's project settings for production.

| Variable | Where to get it | Notes |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Console → Project Settings → General → Your apps | Public web config — safe to expose client-side |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | same | |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | same | |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | same | |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | same | |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | same | |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | same | GA4 measurement ID, powers Analytics |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Firebase Console → Project Settings → Service Accounts → Generate new private key | **Server-only.** Paste the entire downloaded JSON as one line |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys | **Server-only.** Sends contact/waitlist notification emails |
| `RESEND_FROM_EMAIL` | — | Must be a verified sender/domain in Resend. Falls back to `onboarding@resend.dev` if unset |
| `ADMIN_EMAIL` | — | Where contact/waitlist notification emails are sent |
| `ADMIN_CC` | — | Optional, comma-separated extra recipients |

## Project structure

```
src/
  app/
    page.tsx              Homepage (hero, features, tokenomics, roadmap, community, utility — all scroll-anchored sections)
    about/, faq/, docs/, join/, contact/   Standalone routed pages
    vault/                 Internal admin dashboard (see below)
    api/vault/              Auth-gated JSON endpoints the dashboard reads from
    actions/                Server Actions: contact form + waitlist submission
    sitemap.ts, robots.ts   SEO
  components/               UI building blocks (nav, footer, hero, sections, analytics tracker)
  lib/
    firebase.ts              Client-side Firebase SDK (auth, firestore, analytics)
    firebaseAdmin.ts          Server-only Firebase Admin SDK singleton
    vaultAuth.ts              ID-token verification for /vault's API routes and Server Actions
    analytics.ts              GA4 event/page-view helpers
    hash-nav.ts               Scroll-to-section nav behavior
    collections.ts            Firestore collection name constants
```

## Features

**Single-page navigation** — Utility, Tokenomics, Roadmap, and Community are sections on the homepage (`/#section`), not separate routes. `lib/hash-nav.ts` handles smooth-scrolling to them, including from other pages. About and Contact remain standalone routes.

**Contact form & waitlist** (`app/actions/sendNotification.ts`, `app/actions/waitlist.ts`) — submissions write straight to Firestore (`contacts` / `waitlist` collections) via the client SDK, gated by `firestore.rules` (write-only, field-validated, no public read), then best-effort email a notification via Resend to `ADMIN_EMAIL`.

**Vault admin dashboard** (`/vault`) — internal view of collected contacts and waitlist signups (CSV/Excel export, delete). Protected by Firebase Authentication (Google or email/password); `/api/vault/contacts` and `/api/vault/waitlist` verify the caller's Firebase ID token server-side before returning any data — being signed in is required, there's no separate admin role. Create your own login in Firebase Console → Authentication → Users (no public sign-up).

**Analytics** — Firebase Analytics (GA4 property `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`) tracks page views on every route change plus key interactions (waitlist joins, contact submissions, nav/CTA clicks, social link clicks). See Firebase Console → Analytics → DebugView for real-time verification.

## Firebase setup

1. Enable **Firestore** (production mode) and deploy the rules in this repo:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy --only firestore:rules,firestore:indexes
   ```
2. Enable **Authentication** → Sign-in method → Google, and/or Email/Password.
3. Create your own admin login under Authentication → Users (used to sign in to `/vault`).
4. Generate a service account key (Project Settings → Service Accounts) for `FIREBASE_SERVICE_ACCOUNT_KEY`.

## Deployment

Deploys to Vercel (`vercel.json` sets the `iad1` region and clean URLs). Set all the environment variables above in the Vercel project settings — `.env.local` is not deployed.
