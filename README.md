# Rede dos 5 Minutos — v3 (perfil com estatísticas)

## Arquivos
- `index.html` — cadastro (email, username, idade, gênero), logo e favicon. Redireciona para `perfil.html?u=username`.
- `perfil.html` — perfil público com avatar, username e contadores: **A seguir**, **Seguidores**, **Gostos**.
- `README.md` — SQL das tabelas e exemplos de teste.

## SQL — Tabela de usuários
```sql
create table if not exists public.users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  username text unique not null,
  avatar_url text not null,
  age int,
  gender text,
  created_at timestamptz default now()
);

alter table public.users enable row level security;

create policy if not exists "allow insert for anyone"
on public.users
for insert
to public
with check (true);

create policy if not exists "allow select public fields"
on public.users
for select
to public
using (true);
```

## SQL — Seguidores
```sql
create table if not exists public.follows (
  id uuid default gen_random_uuid() primary key,
  follower uuid references public.users(id) on delete cascade,
  following uuid references public.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(follower, following)
);

alter table public.follows enable row level security;

create policy if not exists "anyone can insert follows"
on public.follows
for insert
to public
with check (true);

create policy if not exists "anyone can select follows"
on public.follows
for select
to public
using (true);
```

## SQL — Gostos (likes)
```sql
create table if not exists public.likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade,
  target_user uuid references public.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, target_user)
);

alter table public.likes enable row level security;

create policy if not exists "anyone can insert likes"
on public.likes
for insert
to public
with check (true);

create policy if not exists "anyone can select likes"
on public.likes
for select
to public
using (true);
```

## Testes rápidos
### Pegar id de um usuário pelo username
```sql
select id from users where username = 'alice';
```

### Criar relação de seguir (alice segue bob)
```sql
insert into follows (follower, following)
values (
  (select id from users where username = 'alice'),
  (select id from users where username = 'bob')
);
```

### Dar “gosto” (alice curte o perfil de bob)
```sql
insert into likes (user_id, target_user)
values (
  (select id from users where username = 'alice'),
  (select id from users where username = 'bob')
);
```

### Contar seguidores/seguindo/likes do bob
```sql
-- seguidores do bob
select count(*) from follows where following = (select id from users where username = 'bob');

-- quem bob segue
select count(*) from follows where follower = (select id from users where username = 'bob');

-- likes recebidos pelo bob
select count(*) from likes where target_user = (select id from users where username = 'bob');
```

## Deploy
- Suba os 2 HTMLs na raiz do repositório GitHub.
- Ative GitHub Pages: Settings → Pages → Deploy from a branch (main, root).
- Abra `index.html`, cadastre-se e será redirecionado para `perfil.html?u=seuusername`.
