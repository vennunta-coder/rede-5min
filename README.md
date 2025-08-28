# Rede dos 5 Minutos — v5 (UI melhorada)

## O que mudou
- Botões **Seguir** e **Gostar** agora mudam de texto/estado (Seguindo ✓ / Gostado ❤).
- Mostra uma lista dos **10 seguidores mais recentes** no perfil.
- Contadores atualizam na hora.

## SQL extra (se precisar)
Para listar seguidores recentes com join, garanta que `follows` tem referência válida para `users`:
```sql
-- já existe constraint follower uuid references public.users(id)
-- para facilitar join:
alter table public.follows drop constraint if exists follows_follower_fkey;
alter table public.follows add constraint follows_follower_fkey foreign key (follower) references public.users(id);
```

## Deploy
- Suba `index.html` e `perfil.html` no GitHub Pages.
- Abra `index.html`, cadastre alguns usuários.
- Em `perfil.html?u=usuario`, teste seguir/gostar. Botões mudam de texto.
- Lista de seguidores recentes aparece.
