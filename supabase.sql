create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);
alter table posts enable row level security;
create policy if not exists "Public read" on posts for select using (true);
create policy if not exists "User insert" on posts for insert with check (auth.uid() = user_id);

-- Storage policies (create buckets images/audio in UI)
create policy if not exists "images-read" on storage.objects
  for select using ( bucket_id = 'images' );
create policy if not exists "images-insert-own" on storage.objects
  for insert with check ( bucket_id = 'images' and auth.role() = 'authenticated' );
create policy if not exists "audio-read" on storage.objects
  for select using ( bucket_id = 'audio' );
create policy if not exists "audio-insert-own" on storage.objects
  for insert with check ( bucket_id = 'audio' and auth.role() = 'authenticated' );
