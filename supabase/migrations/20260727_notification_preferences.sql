-- RECOMMENDED (future): notification preference sync
-- Local AsyncStorage is the source of truth until this table exists.
-- The app already attempts a soft upsert and ignores missing-table errors.

create table if not exists public.notification_preferences (
  user_id uuid primary key references auth.users (id) on delete cascade,
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.notification_preferences enable row level security;

create policy "Users can read own notification preferences"
  on public.notification_preferences
  for select
  using (auth.uid() = user_id);

create policy "Users can upsert own notification preferences"
  on public.notification_preferences
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update own notification preferences"
  on public.notification_preferences
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- TODO(backend): Edge Function ideas
-- 1. waitlist_opening — when a reservation frees a spot, query waitlisted users
--    and send Expo Push to their active push_tokens rows.
-- 2. class_cancelled / class_updated — academy staff mutations fan out to reserved athletes.
-- 3. coach_announcement — insert into announcements + push to academy members.
-- Do not claim remote delivery works until one of these senders exists.
