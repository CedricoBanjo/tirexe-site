# Tirexe — Site vitrine

## Stack
- Next.js 14 (App Router, export statique)
- CSS pur (pas de Tailwind)
- Formspree pour le formulaire de contact

## Mise en ligne

### 1. Préparer le formulaire de contact
1. Créer un compte gratuit sur [formspree.io](https://formspree.io)
2. Créer un nouveau formulaire → copier l'ID
3. Dans `components/Contact.jsx`, remplacer `VOTRE_ID_FORMSPREE` par ton ID

### 2. Ajouter le logo
- Copier `logo.png` (fond transparent) dans le dossier `public/`

### 3. Pusher sur GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TON_USER/tirexe-site.git
git push -u origin main
```

### 4. Déployer sur Vercel
1. Aller sur [vercel.com](https://vercel.com) → New Project
2. Importer le repo GitHub `tirexe-site`
3. Settings : Framework = Next.js, tout le reste par défaut
4. Cliquer Deploy → le site est en ligne en 2 minutes

### 5. Pointer tirexe.com vers Vercel
Dans la console Hostinger (DNS) :
- Supprimer les enregistrements A et CNAME existants
- Ajouter : `A @ 76.76.21.21`
- Ajouter : `CNAME www cname.vercel-dns.com`

Dans Vercel → Settings → Domains → ajouter `tirexe.com`

Propagation DNS : 5 min à 48h (généralement < 1h)

## Développement local
```bash
npm install
npm run dev
# → http://localhost:3000
```

## Blog automatisé

### Configuration
1. Dans GitHub → Settings → Secrets → Actions, ajouter :
   - `ANTHROPIC_API_KEY` : ta clé API Anthropic

2. Le workflow `.github/workflows/generate-blog.yml` tourne automatiquement chaque lundi à 7h (Paris)

3. Pour tester manuellement : GitHub → Actions → "Générer article blog" → Run workflow

### Ajouter des sujets
Dans `scripts/generate-article.js`, ajoute tes sujets dans le tableau `TOPICS`.
