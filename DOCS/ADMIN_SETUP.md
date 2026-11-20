# KRAFT Admin — setup

The admin dashboard lives at **/admin**. It uses Supabase Auth (email + password) plus an email allowlist, and Postgres Row Level Security (RLS) so only admins can write to the `jobs` table. Published jobs appear on **/jobs** next to the curated jobs synced from the KRAFT Job Bot (Notion).

## 1. Environment variables (Vercel → Project → Settings → Environment Variables)

| Name | Value | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<project-ref>.supabase.co` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | the project's **anon / publishable** key | Safe to expose; RLS protects data |
| `ADMIN_EMAILS` | `you@example.com` (comma-separate for several) | App-level allowlist |

Set them for Production **and** Preview, then redeploy.
Not needed any more (safe to delete): `ADMIN_PASSWORD`, `SUPABASE_SERVICE_ROLE_KEY`. No service-role key is used anywhere.

## 2. Database

Supabase → SQL Editor → run the contents of `supabase/migrations/002_create_jobs_admin.sql` (safe to re-run). Then add your admin email to the RLS allowlist:

```sql
insert into public.admin_users (email) values ('you@example.com') on conflict do nothing;
```

The email must be lowercase and must match the one in `ADMIN_EMAILS`.

## 3. Create the admin login

Supabase → Authentication → Users → **Add user** → *Create new user* with the same email and a strong password, tick **Auto Confirm User**.
Recommended: Authentication → Sign In / Providers → turn **off** "Allow new users to sign up" (the allowlist blocks strangers anyway, but this keeps the user list clean).

## 4. Use it

Open `https://<your-domain>/admin` → sign in → **Post a job**. Drafts stay private; tick **Published on /jobs** to make a job live. You can edit, unpublish, or delete (with confirmation) from the list. Changes show on /jobs immediately.

## How it's protected

- `proxy.ts` refreshes the Supabase session and redirects anyone who is not signed in with an allowlisted email to `/admin/login` (also sends `noindex`, `no-store`).
- Every server action re-checks the signed-in user against `ADMIN_EMAILS`.
- RLS: anyone can read **published** jobs; only emails in `public.admin_users` can read drafts or insert/update/delete.
