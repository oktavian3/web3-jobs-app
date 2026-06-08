create table job_updates (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  company text not null,
  description text not null,
  url text not null,
  tags text[],
  is_featured boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table job_updates enable row level security;

-- Allow read access to everyone
create policy "Allow read access" on job_updates
  for select using (true);

-- Allow insert/update/delete only with service role (admin API)
create policy "Allow admin write access" on job_updates
  for all using (false) with check (false);
