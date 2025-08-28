# Rede dos 5 Minutos — v10 (Notificações seguras)

## Novidades
- 🔔 Ícone de notificações no header.
- Exibe últimas interações: seguir, curtir, comentar.
- Mostra badge com número de notificações não vistas.
- Somente o dono do perfil pode ver suas notificações.

## SQL — criar tabela de notificações (seguro)
```sql
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade,
  actor_id uuid references public.users(id) on delete cascade,
  type text not null,
  post_id uuid references public.posts(id),
  content text,
  created_at timestamptz default now(),
  seen boolean default false
);

alter table public.notifications enable row level security;

create policy if not exists "owner can view notifications"
on public.notifications
for select
to public
using (auth.uid() = user_id);

create policy if not exists "anyone can insert notifications"
on public.notifications
for insert
to public
with check (true);

create policy if not exists "owner can update notifications"
on public.notifications
for update
to public
using (auth.uid() = user_id);
```

## Deploy
1. Rode o SQL acima no Supabase.
2. Suba `index.html` e `perfil.html` no GitHub Pages.
3. Acesse seu perfil → clique no 🔔 → veja notificações.
