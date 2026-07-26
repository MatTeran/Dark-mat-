-- Dark Mat · push token storage for Expo Notifications
-- Apply in the Supabase SQL editor or via CLI migrations.

create table if not exists public.push_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  expo_push_token text not null,
  platform text,
  device_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint push_tokens_user_token_unique unique (user_id, expo_push_token)
);

create index if not exists push_tokens_user_id_idx on public.push_tokens (user_id);
create index if not exists push_tokens_active_idx on public.push_tokens (is_active);

alter table public.push_tokens enable row level security;

create policy "Users can read own push tokens"
  on public.push_tokens
  for select
  using (auth.uid() = user_id);

create policy "Users can insert own push tokens"
  on public.push_tokens
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update own push tokens"
  on public.push_tokens
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own push tokens"
  on public.push_tokens
  for delete
  using (auth.uid() = user_id);
