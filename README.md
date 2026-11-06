# Tirexe — Site vitrine

## Améliorer le site avec Claude

1. Ouvre l'application Claude (ou claude.ai/code dans le navigateur), onglet **Code**.
2. Environnement : **Default** (sous Cloud).
3. Dépôt : **CedricoBanjo/tirexe-site**, seul.
4. Écris « améliore le site », ou ce que tu veux changer, avec tes mots.

Claude fait un bilan, puis propose les améliorations par étapes, chacune avec un aperçu. Rien n'est mis en ligne sans ton « OK ». Ses consignes : `CLAUDE.md` et `.claude/skills/ameliorer-site/SKILL.md`.

## Stack
- Next.js 16 (App Router, pages statiques générées à chaque mise en ligne)
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
