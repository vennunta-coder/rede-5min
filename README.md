# Rede dos 5 Minutos — estático (GitHub Pages)

Site estático com cadastro simples no Supabase (sem confirmação por e-mail).

## Estrutura
- `index.html` — landing + formulário (email, username, idade, gênero). Salva no Supabase e libera o conteúdo.
- `perfil.html` — página pública de perfil (mostra apenas username e avatar).

## Banco de dados (Supabase)
Crie a tabela **users** e políticas:

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

create policy "allow insert for anyone"
on public.users
for insert
to public
with check (true);

create policy "allow select public fields"
on public.users
for select
to public
using (true);
```

## Deploy (GitHub Pages)
1. Suba estes arquivos na **raiz** do repositório.
2. GitHub → **Settings → Pages** → *Deploy from a branch*.
3. Branch `main` e pasta `/ (root)`.
4. Acesse a URL gerada.

## Dicas
- O avatar é gerado com Dicebear (identicon) usando o username.
- Idade e gênero ficam armazenados, mas não são exibidos em perfis públicos.
- Para ver um perfil: `perfil.html?u=nome_de_usuario`.
