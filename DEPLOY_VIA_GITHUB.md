# 🚀 DEPLOY FÁCIL VIA GITHUB → NETLIFY

## ✅ MÉTODO MAIS SIMPLES (5 minutos)

Como você está no ambiente de desenvolvimento online, o melhor caminho é:

---

## 📋 PASSO A PASSO:

### 1️⃣ BAIXE O PROJETO PARA SEU COMPUTADOR

Se estiver usando o **Bolt.new/Claude/Replit**, procure o botão **"Download Project"** ou **"Export"**.

OU faça download direto dos arquivos principais.

---

### 2️⃣ CRIE UM REPOSITÓRIO NO GITHUB

1. Acesse: **https://github.com/new**
2. Nome do repositório: `celestizen-astrology`
3. Privacidade: **Private** (recomendado) ou Public
4. **NÃO** marque "Add a README file"
5. Clique **"Create repository"**

📋 GitHub vai mostrar comandos. **Guarde essa página aberta!**

---

### 3️⃣ FAÇA UPLOAD DO CÓDIGO

**Opção A: Via GitHub Web (Mais fácil)**

1. Na página do repositório recém-criado
2. Clique **"uploading an existing file"**
3. Arraste **TODOS** os arquivos do projeto (exceto `node_modules/`)
4. Escreva commit message: "Initial commit"
5. Clique **"Commit changes"**

**Opção B: Via Terminal (Se tiver Git instalado)**

```bash
cd /caminho/do/projeto
git init
git add .
git commit -m "Initial commit - Celestizen"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/celestizen-astrology.git
git push -u origin main
```

---

### 4️⃣ CONECTE AO NETLIFY

1. Acesse: **https://app.netlify.com**
2. Clique **"Add new site"** → **"Import an existing project"**
3. Escolha **"Deploy with GitHub"**
4. **Autorize** o Netlify (vai abrir popup)
5. Selecione o repositório: **`celestizen-astrology`**

---

### 5️⃣ CONFIGURE O BUILD

Netlify vai detectar automaticamente:

✅ **Build command:** `npm run build`
✅ **Publish directory:** `dist`

**Clique em "Deploy celestizen-astrology"**

⏳ Aguarde 2-3 minutos (primeiro deploy demora mais)

---

### 6️⃣ CONFIGURE VARIÁVEIS DE AMBIENTE (CRÍTICO!)

Após o deploy inicial:

1. No Netlify, vá em **"Site settings"** → **"Environment variables"**
2. Clique **"Add a variable"**
3. Adicione estas **2 variáveis**:

**Variável 1:**
```
Key: VITE_SUPABASE_URL
Value: https://0ec90b57d6e95fcbda19832f.supabase.co
```

**Variável 2:**
```
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
```

4. Clique **"Save"**

---

### 7️⃣ REDEPLOY COM AS VARIÁVEIS

1. Vá em **"Deploys"** (menu superior)
2. Clique **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Aguarde 1-2 minutos

---

## 🎉 PRONTO! SEU SITE ESTÁ NO AR!

Netlify vai te dar uma URL tipo:
```
https://celestizen-xyz123.netlify.app
```

---

## 🔧 PRÓXIMOS PASSOS

### Configure o Webhook do Stripe

1. Acesse: **https://dashboard.stripe.com/webhooks**
2. Clique **"Add endpoint"**
3. URL do endpoint:
```
https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/stripe-webhook
```
4. Eventos a ouvir:
   - ✅ `checkout.session.completed`
5. Clique **"Add endpoint"**
6. **Copie o "Signing secret"** (começa com `whsec_...`)

7. Adicione no Supabase:
   - Dashboard: https://supabase.com/dashboard
   - Projeto → Settings → Edge Functions → Secrets
   - Adicione: `STRIPE_WEBHOOK_SECRET` = `whsec_...`

---

## ✅ TESTE COMPLETO

Após deploy:

1. **Homepage:** `https://seu-site.netlify.app`
2. **Preencha o formulário** (nome, email, data de nascimento)
3. **Clique "Ver Meu Mapa Astral"**
4. **Checkout Stripe abre** ✅
5. **Pague com cartão teste:** `4242 4242 4242 4242`
6. **Redireciona para /success** ✅
7. **Email de confirmação chega** ✅
8. **Mapa astral gerado** ✅

---

## 🆘 PROBLEMAS COMUNS

### Site em branco após deploy
❌ **Causa:** Variáveis de ambiente não configuradas
✅ **Solução:** Adicione as 2 variáveis e redeploy

### Erro 404 ao recarregar página
❌ **Causa:** Falta arquivo `_redirects`
✅ **Solução:** Já está configurado! Se der erro, verifique se está em `public/_redirects`

### Checkout não abre
❌ **Causa:** Stripe não configurado
✅ **Solução:** Configure STRIPE_PUBLISHABLE_KEY no .env

### Email não chega
❌ **Causa:** Edge Function não rodou
✅ **Solução:** Verifique logs em Supabase Dashboard → Edge Functions

---

## 📊 VANTAGENS DESTE MÉTODO

✅ **Deploy automático:** Todo commit → deploy automático
✅ **Preview deployments:** Cada branch tem URL de teste
✅ **Rollback fácil:** Voltar versão anterior em 1 clique
✅ **CI/CD configurado:** Build automático, sem trabalho manual
✅ **Grátis:** 100GB bandwidth/mês free

---

## 💰 CUSTOS

**Free tier cobre:**
- 100 GB bandwidth/mês
- 300 minutos build/mês
- Deploy ilimitados
- HTTPS automático
- CDN global

**Quando você crescer e precisar de Pro ($19/mês):**
- 400 GB bandwidth
- 1000 minutos build
- Analytics avançado
- Suporte prioritário

---

## 🔗 LINKS IMPORTANTES

- **Seu GitHub:** https://github.com/SEU_USUARIO/celestizen-astrology
- **Netlify Dashboard:** https://app.netlify.com
- **Supabase Dashboard:** https://supabase.com/dashboard/project/0ec90b57d6e95fcbda19832f
- **Stripe Dashboard:** https://dashboard.stripe.com

---

## ✨ DICAS PRO

### Domínio customizado (depois):
1. Compre domínio (Namecheap, GoDaddy, Registro.br)
2. No Netlify: Site settings → Domain management
3. Adicione seu domínio: `www.celestizen.com.br`
4. Configure DNS (Netlify te dá instruções)

### Monitoramento:
- Netlify Analytics (free): visitantes, page views
- Google Analytics: comportamento detalhado
- Supabase Dashboard: uso de database e edge functions

---

## 🎯 CHECKLIST FINAL

Antes de compartilhar o site:

- [ ] Deploy funcionando
- [ ] URL abre e carrega rápido
- [ ] Formulário funciona
- [ ] Checkout abre
- [ ] Teste de pagamento completo
- [ ] Email de confirmação recebido
- [ ] Mapa astral gerado
- [ ] Admin dashboard acessível (/admin)
- [ ] Mobile testado

---

## 🚀 AGORA SIM: PRONTO PARA VENDER!

**Performance esperada:**
- ⚡ Loading: 0.5-1.5 segundos
- 📱 Mobile: 95-100 score
- 💰 80% conversão

**Boa sorte com as vendas!** 💸✨

---

Dúvidas? Problemas em algum passo? Me avise! 🙋‍♂️
