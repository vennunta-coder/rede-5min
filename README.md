# Rede dos 5 Minutos — v8 (Curtidas em posts)

## Novidades
- Cada post tem botão **Curtir/Descurtir**.
- Contador de curtidas aparece ao lado do botão.
- Atualiza ao vivo após clique.

## SQL — criar tabela de curtidas em posts
```sql
create table if not exists public.post_likes (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid references public.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique (post_id, user_id)
);

alter table public.post_likes enable row level security;

create policy if not exists "anyone can insert post_likes"
on public.post_likes
for insert
to public
with check (true);

create policy if not exists "anyone can delete post_likes"
on public.post_likes
for delete
to public
using (true);

create policy if not exists "anyone can select post_likes"
on public.post_likes
for select
to public
using (true);
```

## Deploy
1. Rode o SQL acima no Supabase.
2. Suba `index.html` e `perfil.html` no GitHub Pages.
3. Entre em um perfil, publique posts.
4. Clique em **Curtir** para curtir/descurtir cada post.
