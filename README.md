# Rede dos 5 Minutos — v6 (Capa + Bio + Posts)

## Novidades
- Campo **Bio** no cadastro (até 160 caracteres).
- Geração automática de **capa** (cover_url).
- Perfil mostra **capa + avatar sobreposto**.
- Exibe bio abaixo do username.
- Contador de **Posts** (fixo 0 por enquanto).

## SQL — atualização da tabela users
```sql
alter table public.users add column if not exists bio text;
alter table public.users add column if not exists cover_url text;
```

## Deploy
1. Rode o SQL acima no Supabase (SQL Editor).
2. Suba `index.html` e `perfil.html` no GitHub Pages.
3. Cadastre-se em `index.html` → redireciona ao perfil com capa e bio.
