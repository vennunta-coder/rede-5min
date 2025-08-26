 # Rede dos 5 Minutos — PRO PLUS

 ## O que tem
 - Janela diária SURPRESA (determinística por dia, fuso Europe/Lisbon por padrão)
 - Relatório semanal `/api/reports/weekly` com envio opcional via Resend
 - Cron Vercel (segunda 07:00 UTC ~ 08:00 Lisboa) em `vercel.json`
 - RLS estrita, multi-auth (Google, Apple, Magic Link), uploads imagem/áudio
 - Rate limit (Upstash), branding, testes Vitest

 ## Variáveis (.env.local)
 Ver `.env.local.example` — configure Supabase, TZ e opções de janela, Upstash e Resend.

 ## Deploy na Vercel (passo a passo)
 1. `pnpm i` (ou npm/yarn)
2. Crie projeto no Supabase; copie URL/Anon para `.env.local`.
3. Execute `supabase.sql` no SQL Editor (tabelas + storage policies).
4. Crie buckets `images` e `audio` (públicos) no Storage.
5. Ative OAuth (Google/Apple) e Magic Link no Supabase.
6. Faça push para GitHub e **Import Project** na Vercel.
7. Em **Settings → Environment Variables**, cole as mesmas variáveis.
8. Confirme `vercel.json` com o cron (ou ajuste o horário em UTC).
9. Deploy ✅

 ## Endpoints
 - GET `/api/window` → { open, start, end, nextStart, remainingMs }
 - GET `/api/posts` → feed do dia
 - POST `/api/posts` → criar post (server valida sessão + janela + 1/dia)
 - GET `/api/reports/weekly` → JSON + tenta enviar e-mail se `RESEND_API_KEY` e `REPORT_EMAILS` definidos
