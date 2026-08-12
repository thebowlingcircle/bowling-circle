Last updated: 2026-08-12

# The Bowling Circle — Pune Bowling Social Platform

Full-stack web app where the admin manually pairs Pune strangers into bowling sessions. Not a marketplace — admin-curated. Users submit an intake form (login optional), and the admin manually matches them into sessions via an admin dashboard.

## Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (Neon)
- **Auth**: JWT

## Repo & Hosting
_Current, as of Aug 12 2026._

- **GitHub**: `https://github.com/thebowlingcircle/bowling-circle` (org: `thebowlingcircle` — moved from the old `Sonic337` / `GeneralHatim` accounts).
- **Vercel**: project `bowling-circle`, under the "Night" account (hatimlaila23@gmail.com), connected to the repo above. Live at `bowling-social-sandy.vercel.app` and custom domain `thebowlingcircle.com` (GoDaddy DNS).
- **Database**: Neon Postgres — the **ORIGINAL** Neon project (not the newer "Bowling Social" Neon project created Aug 12, which is unused/near-empty — do not point `DATABASE_URL` at it).
- **Local working copy**: `C:\Users\user\Projects\bowling-circle` (fresh clone from the new repo).
- **Hosting history**: Vercel (abandoned, cold starts) → Render (abandoned, free DB expired) → Railway/Fly.io (unusable, signup issues) → back to **Vercel + Neon**, now stable, with the `vercel.json` API-routing bug fixed.

## Known gotchas

### Schema changes require a manual step
Editing `server/db/schema.sql` does **NOT** apply the change to the live database on deploy. Any new/changed column must **ALSO** be run manually as SQL in the Neon SQL Editor (e.g. `ALTER TABLE users ADD COLUMN IF NOT EXISTS ...`) against the live database, or the live app will throw 500 errors on any query touching that column.

This already caused one incident: the `instagram` / `marketing_opt_in` columns were deployed in code before being run in Neon, causing the admin Users tab to 500 and appear as "all users missing." Data was never lost — the column simply didn't exist in the live DB yet.

## Pages
- `/` — **Intake form.** Login optional (guest submission supported); returning visitors auto-resume via localStorage. Sections: About You (name, age, gender), Bowling Arena (venue selector), Contact (WhatsApp, email, Instagram — optional), Availability, Preferences (group size, interests, bio), marketing opt-in checkbox, Submit.
- `/signup`, `/login` — Account creation / sign-in. Optional for regular users, required for admin.
- `/admin` — **Admin dashboard** (Users / Sessions / Access tabs). Requires admin role.
  - **Users tab**: filter by gender/area/day, "Giveaway-eligible only" filter (Instagram present), Instagram column (clickable `@handle`), Marketing badge, "Showing X of Y users" count (safeguard against filters silently hiding users).
  - **Sessions tab**: create/manage sessions, status `pending` / `confirmed` / `completed`.
  - **Access tab**: grant/revoke admin by email.
- `/admin/sessions/:id` — Session detail, WhatsApp export.
- `/privacy-policy`, `/terms-of-service` — Legal pages, linked in the site footer on every page.

## Venues
Multi-venue architecture (`VENUES` array: `id`, `name`, `comingSoon`, `prices`). Currently:
- **The Game Palacio Pune - The Mills, Sangamwadi** — live. Afternoon ₹600, Night ₹850 (informational pricing).
- **KOPA** — added as "Coming Soon" (locked), not yet operational.

Sessions currently run weekly (Wednesdays), afternoon/night slots.

## Payments
_Business model, updated Aug 12 2026._

The Bowling Circle now collects payment **directly from users via UPI** (QR code / UPI ID, admin-managed manually) — users do **NOT** pay the venue directly. No payment gateway integration exists in the codebase; this is manual, off-platform-processing, on-platform-disclosure. No refunds, no cancellations once paid — strict policy, stated in Terms of Service §4a. If a session is cancelled by The Bowling Circle itself, full refund.

## Auth
- JWT stored in localStorage.
- `SUPER_ADMIN_EMAIL` env var auto-promotes that account to admin on first login (the account must sign up via `/signup` first — an empty DB has no accounts until one registers).
- Forgot-password uses a hashed "secret word" system (not OTP/email — no email service is configured).
- Admins can promote/revoke other users via the Access tab.

## Database tables
- `accounts`
- `users` — includes `instagram` (nullable text), `marketing_opt_in` (boolean, default false), `edit_key`, and secret-word fields from the forgot-password rework.
- `sessions`
- `session_members`

## Env vars
Set in Vercel project settings (this project, **not** the abandoned Render one):
- `DATABASE_URL`
- `SUPER_ADMIN_EMAIL`
- `SUPER_ADMIN_PASSWORD`
- `JWT_SECRET`
- `NODE_ENV=production`

## Legal pages
Privacy Policy and Terms of Service are live and reflect:
- 18+ minimum age (stated in policy, not enforced on the form).
- Data deleted on request only (no automatic retention limit).
- Instagram optional but required for giveaway eligibility.
- Marketing opt-in is giveaway/event emails only.
- Direct-payment / no-refund terms (§4, §4a).

## Working conventions
- CSS custom properties for theming, single indigo accent, pill-style toggles, sectioned card layout, mobile-first (most traffic is via WhatsApp-shared links on phone).
- Stored option `value`s (e.g. `afternoon` / `night`) stay stable even when display `label`s change, to preserve compatibility with existing submitted data.
- Locked/unavailable features (e.g. a "Coming Soon" venue) are disabled inline with an explanatory message, not hidden.

## Open items / not yet done
- **KOPA venue** — no live pricing yet, still "Coming Soon."
- **No payment gateway integration** — payment is fully manual (UPI QR/ID shared by admin after matching).
- **No automated pairing** — intentional, admin does all matching manually by design.
- **No native mobile app.**
- **Formal alley/venue partnership terms** beyond the original pitch — not confirmed as formally signed.
- **Per-video YouTube content strategy** — only channel-level keywords/description were finalized; individual video titles need to be written per-upload.
