-- KRAFT: admin-posted jobs + admin allowlist.
-- Run once in the Supabase SQL editor (or `supabase db push`).
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS.

-- 1. Admin allowlist (who may write). Keep in sync with the ADMIN_EMAILS env var.
create table if not exists public.admin_users (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
-- No policies on admin_users: not readable or writable through the public API.

create or replace function public.is_kraft_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_kraft_admin() from public;
grant execute on function public.is_kraft_admin() to anon, authenticated;

-- 2. Jobs table
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 2 and 140),
  company text not null check (char_length(company) between 1 and 100),
  company_logo_url text not null default '' check (company_logo_url = '' or company_logo_url ~* '^https://'),
  lane text not null,
  work_type text not null default 'Remote' check (work_type in ('Remote', 'Hybrid', 'On-site')),
  employment_type text,
  location text not null default '',
  seniority text not null default 'Not specified',
  salary text not null default '',
  apply_url text not null check (apply_url ~* '^https://'),
  description text not null default '' check (char_length(description) <= 8000),
  role_slug text not null default '',
  tags text[] not null default '{}',
  is_published boolean not null default false,
  posted_at date not null default current_date,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jobs_published_posted_idx on public.jobs (is_published, posted_at desc);

create or replace function public.jobs_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
drop trigger if exists jobs_touch_updated_at on public.jobs;
create trigger jobs_touch_updated_at before update on public.jobs
  for each row execute function public.jobs_touch_updated_at();

-- 3. Row Level Security
alter table public.jobs enable row level security;

drop policy if exists "Public can read published jobs" on public.jobs;
create policy "Public can read published jobs" on public.jobs
  for select to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins can read all jobs" on public.jobs;
create policy "Admins can read all jobs" on public.jobs
  for select to authenticated
  using (public.is_kraft_admin());

drop policy if exists "Admins can insert jobs" on public.jobs;
create policy "Admins can insert jobs" on public.jobs
  for insert to authenticated
  with check (public.is_kraft_admin());

drop policy if exists "Admins can update jobs" on public.jobs;
create policy "Admins can update jobs" on public.jobs
  for update to authenticated
  using (public.is_kraft_admin())
  with check (public.is_kraft_admin());

drop policy if exists "Admins can delete jobs" on public.jobs;
create policy "Admins can delete jobs" on public.jobs
  for delete to authenticated
  using (public.is_kraft_admin());

-- 4. Add yourself as admin (replace with your login email, lowercase):
-- insert into public.admin_users (email) values ('you@example.com') on conflict do nothing;

-- 5. Optional hardening for the legacy table from 001 (its old password-cookie
--    API is removed in this release). It stays readable; nothing writes to it.
