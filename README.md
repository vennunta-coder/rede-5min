# Rede dos 5 Minutos — v4 (perfil com seguir/gostar)

## O que há de novo
- Botões **Seguir** e **Gostar** no `perfil.html` (modo demo). 
- Pergunta “quem é você?” (username) e guarda em `localStorage` para registrar ações.
- Atualização dos contadores **ao vivo** após cada ação.

## Políticas RLS adicionais (para permitir UNFOLLOW/UNLIKE)
> Se você quiser permitir **remover** seguir/gosto pelo site, adicione estas políticas de **DELETE**:

```sql
-- FOLLOWS: permitir delete a qualquer um (ambiente demo)
create policy if not exists "anyone can delete follows"
on public.follows
for delete
to public
using (true);

-- LIKES: permitir delete a qualquer um (ambiente demo)
create policy if not exists "anyone can delete likes"
on public.likes
for delete
to public
using (true);
```

> ⚠️ Em produção, você deve restringir para que apenas o próprio autor possa deletar:
> 
> ```sql
> -- Exemplo mais seguro (precisa autenticação de usuário real via Supabase Auth)
> create policy "owner can delete own follow"
> on public.follows for delete to authenticated
> using (auth.uid() = follower);
> 
> create policy "owner can delete own like"
> on public.likes for delete to authenticated
> using (auth.uid() = user_id);
> ```

## Outras tabelas (caso não tenha criado ainda)
Veja o README da v3 para `users`, `follows` e `likes` com políticas de insert/select.

## Como usar
1. Suba `index.html` e `perfil.html` na raiz do repositório (GitHub Pages).
2. Abra `index.html`, crie alguns usuários.
3. Vá em `perfil.html?u=alguem` e teste os botões. 
   - Na primeira ação, informe seu username (quem está fazendo a ação).
   - Os contadores serão atualizados logo após.

## Observação
Este é um modo **demo** sem autenticação real. Para produção, implemente login (Supabase Auth) e substitua o prompt por `session.user`.
