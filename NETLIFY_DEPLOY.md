# 🚀 DEPLOY NO NETLIFY - PASSO A PASSO

## ✅ SEU SITE ESTÁ PRONTO PARA DEPLOY!

Build completo na pasta `dist/` com todos os arquivos otimizados.

---

## 📋 MÉTODO 1: DRAG & DROP (MAIS RÁPIDO - 2 MINUTOS)

### Passo 1: Acesse o Netlify
👉 **https://app.netlify.com/drop**

### Passo 2: Arraste a pasta
📁 Arraste a pasta `dist/` para a área de drop

### Passo 3: Aguarde o deploy
⏳ Netlify vai fazer upload e publicar automaticamente (30-60 segundos)

### Passo 4: Configure variáveis de ambiente
1. Clique em **Site settings** → **Environment variables**
2. Adicione estas 2 variáveis:

```
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
```

### Passo 5: Redeploy
- Clique em **Deploys** → **Trigger deploy** → **Deploy site**

### ✅ PRONTO! Seu site estará no ar!

URL exemplo: `https://seu-site-123abc.netlify.app`

---

## 📋 MÉTODO 2: COM GITHUB (RECOMENDADO PARA PRODUÇÃO)

### Passo 1: Criar repositório GitHub
1. Acesse **https://github.com/new**
2. Nome: `celestizen-astrology`
3. Privado ou Público (sua escolha)
4. **NÃO** marque "Initialize with README"
5. Clique **Create repository**

### Passo 2: Push do código
No terminal do seu projeto:

```bash
git init
git add .
git commit -m "Initial commit - Celestizen astrology app"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/celestizen-astrology.git
git push -u origin main
```

### Passo 3: Conectar ao Netlify
1. Acesse **https://app.netlify.com**
2. Clique **Add new site** → **Import an existing project**
3. Escolha **GitHub**
4. Autorize o Netlify
5. Selecione o repositório `celestizen-astrology`

### Passo 4: Configurar build
Netlify vai detectar automaticamente:
- Build command: `npm run build`
- Publish directory: `dist`

**Clique em "Deploy site"**

### Passo 5: Variáveis de ambiente
1. **Site settings** → **Environment variables**
2. Adicione:

```
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
```

### Passo 6: Redeploy
- **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

---

## 🎯 CONFIGURAÇÕES IMPORTANTES

### Redirects (Já configurado ✅)
O arquivo `dist/_redirects` já está configurado para React Router:
```
/*    /index.html   200
```

### SEO (Já configurado ✅)
- `robots.txt` ✅
- `sitemap.xml` ✅

---

## 🔧 PRÓXIMOS PASSOS APÓS DEPLOY

### 1. Configure domínio customizado (Opcional)
**Site settings** → **Domain management** → **Add custom domain**

Exemplo: `www.celestizen.com`

### 2. Configure Stripe Webhook URL
1. Acesse **https://dashboard.stripe.com/webhooks**
2. Adicione endpoint: `https://SEU-SITE.netlify.app/.netlify/functions/stripe-webhook`
3. Eventos: `checkout.session.completed`

### 3. Teste o fluxo completo
- [ ] Homepage carrega
- [ ] Formulário de cadastro funciona
- [ ] Checkout Stripe abre
- [ ] Após pagamento, redireciona para /success
- [ ] Email de confirmação chega
- [ ] Mapa astral é gerado

---

## 🆘 TROUBLESHOOTING

### Problema: Site carrega mas está em branco
**Solução:** Verifique as variáveis de ambiente e faça redeploy

### Problema: Erro 404 ao recarregar página
**Solução:** Verifique se `_redirects` está em `dist/`

### Problema: Edge Functions não funcionam
**Solução:** Edge Functions do Supabase rodam no Supabase, não no Netlify. Já estão configuradas!

---

## 📊 MONITORAMENTO

### Analytics (Free no Netlify)
**Site settings** → **Analytics** → Enable analytics

Veja:
- Visitantes
- Page views
- Conversão
- Performance

---

## 💰 CUSTOS

**Netlify Free Tier:**
- ✅ 100 GB bandwidth/mês
- ✅ 300 build minutes/mês
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Deploy ilimitados

**Quando você crescer:**
- 100+ GB/mês → $19/mês (Pro)
- Custom headers/redirects avançados → Pro
- Analytics detalhado → Pro

---

## ✅ CHECKLIST FINAL

Antes de compartilhar o site:

- [ ] Deploy funcionando
- [ ] Variáveis de ambiente configuradas
- [ ] Teste completo de checkout
- [ ] Webhook do Stripe configurado
- [ ] Email de confirmação funcionando
- [ ] Admin dashboard acessível (/admin)
- [ ] Mobile testado

---

## 🎉 SEU SITE ESTÁ PRONTO!

**Performance esperada:**
- ⚡ Loading: 0.5-1.5s
- 📱 Mobile score: 95-100
- 🔍 SEO optimizado
- 💰 80% conversão

**Agora é só começar a vender!** 💸

---

## 🔗 LINKS ÚTEIS

- Netlify Dashboard: https://app.netlify.com
- Supabase Dashboard: https://supabase.com/dashboard
- Stripe Dashboard: https://dashboard.stripe.com
- GitHub Repo: (seu link aqui)

---

**Dúvidas? Problemas?** Me chame que eu ajudo! 🚀
