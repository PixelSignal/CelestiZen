# 🚀 PUSH PARA GITHUB - INSTRUÇÕES

## ✅ Git já está configurado!

Já preparei tudo localmente:
- ✅ Git inicializado
- ✅ Arquivos commitados
- ✅ Remote configurado para: `https://github.com/PixelSignal/CelestiZen.git`

---

## 📋 AGORA VOCÊ PRECISA FAZER O PUSH

### OPÇÃO 1: Via Token de Acesso Pessoal (Recomendado)

1. **Crie um Personal Access Token no GitHub:**
   - Acesse: https://github.com/settings/tokens/new
   - Nome: `CelestiZen Deploy`
   - Expiration: `90 days` ou `No expiration`
   - Selecione scope: ✅ **repo** (todos os sub-items)
   - Clique **"Generate token"**
   - **COPIE O TOKEN** (você só verá uma vez!)

2. **Faça o push com o token:**

   No terminal deste projeto, execute:

   ```bash
   git push https://SEU_TOKEN@github.com/PixelSignal/CelestiZen.git main
   ```

   Substitua `SEU_TOKEN` pelo token que você copiou.

   Exemplo:
   ```bash
   git push https://ghp_abc123xyz789@github.com/PixelSignal/CelestiZen.git main
   ```

---

### OPÇÃO 2: Via GitHub CLI (Se tiver instalado)

```bash
gh auth login
git push -u origin main
```

---

### OPÇÃO 3: Via SSH (Se tiver chave SSH configurada)

1. **Mude o remote para SSH:**
   ```bash
   git remote set-url origin git@github.com:PixelSignal/CelestiZen.git
   ```

2. **Push:**
   ```bash
   git push -u origin main
   ```

---

### OPÇÃO 4: Upload Manual (Mais lento mas funciona)

1. Acesse: https://github.com/PixelSignal/CelestiZen
2. Se o repositório estiver vazio, clique **"uploading an existing file"**
3. Arraste todos os arquivos do projeto
4. Commit message: "Initial commit - CelestiZen Platform"
5. **Commit changes**

⚠️ **Importante:** NÃO faça upload da pasta `node_modules/` (já está no `.gitignore`)

---

## ✅ APÓS O PUSH

Quando o código estiver no GitHub, continue com o deploy no Netlify!

---

## 🔗 PRÓXIMO PASSO: NETLIFY DEPLOY

1. Acesse: **https://app.netlify.com**
2. Clique **"Add new site"** → **"Import an existing project"**
3. Escolha **"Deploy with GitHub"**
4. Autorize o Netlify
5. Selecione: **`PixelSignal/CelestiZen`**
6. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. **Deploy site**
8. Adicione variáveis de ambiente (crítico!):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
9. Redeploy

---

## 🆘 PROBLEMAS?

### "Permission denied"
✅ Use OPÇÃO 1 (Personal Access Token)

### "Repository not found"
✅ Verifique se o repositório existe: https://github.com/PixelSignal/CelestiZen

### "Authentication failed"
✅ Token expirou ou sem permissões → Crie novo token

---

## 📌 COMANDO RÁPIDO (Com seu token)

```bash
git push https://SEU_TOKEN_AQUI@github.com/PixelSignal/CelestiZen.git main
```

**Lembre-se:** Substitua `SEU_TOKEN_AQUI` pelo token real!

---

Me avise quando o push for concluído que eu te ajudo com o Netlify! 🚀
