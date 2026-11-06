# Site tirexe.com

Site vitrine de Cédric Femminino (Tirexe), consultant et développeur VBA Excel senior : missions en régie, basé à Martigues, région PACA et remote France. L'utilisateur est Cédric, le propriétaire : réponds en français et tutoie-le, en phrases courtes et sans jargon. Il ne retient pas les commandes : il dit les choses avec ses mots.

## À chaque session
Commence ta première réponse par ce rappel, en deux lignes :
« Site tirexe : dis « améliore le site » pour un bilan complet puis des améliorations par étapes, ou demande un changement précis avec tes mots. Rien ne part en ligne sans ton OK. »

## Ce que Cédric dit
- « améliore le site », « audit », « SEO », « rends le site parfait » → compétence `ameliorer-site` (`.claude/skills/ameliorer-site/SKILL.md`).
- « rends le site beau », « design », « UX », « le site est moche », « refais le visuel » → compétence `design-ux` (`.claude/skills/design-ux/SKILL.md`).
- Un changement précis (un texte, une page, une couleur, un article) → fais-le sur une branche, montre l'aperçu, attends son OK.
- « OK » sur une proposition → fusionne sur `main` : Vercel met le site en ligne.

## Règles
- `main` = le site en ligne : Vercel publie chaque envoi sur `main`. Tout passe par une branche et une PR (aperçu Vercel), fusionnée seulement sur le « OK » de Cédric.
- Ne casse pas le robot du blog : `.github/workflows/generate-blog.yml` lance `scripts/generate-article.js` chaque lundi, qui écrit un article dans `content/blog/` (`AAAA-MM-JJ-slug.md`, en-tête `title`, `date`, `slug`, `description`), lu par `lib/blog.js`. Après un changement, `npm run build` passe et tous les articles s'affichent.
- N'invente rien : ni avis, ni clients, ni chiffres, ni références. Demande à Cédric ce qui manque.
- Cédric ne raconte pas ses missions : pas de cas concrets, et aucun texte (articles du robot compris) ne dit ce qu'il aurait fait, vu ou mesuré en mission. Il fait généralement des missions longues ; son tarif est sur devis.
- Outils gratuits. Aucun secret affiché ni écrit : la clé Anthropic du robot est dans les secrets GitHub. Le dépôt est public : rien de personnel ni de sensible dans les fichiers.
- Vérifie avant de dire que c'est fait : `npm run build`, captures ordinateur et téléphone (Playwright), Lighthouse.

## Où sont les choses
- Accueil : `app/page.jsx`, sections dans `components/` ; styles : `app/globals.css` (CSS pur) ; métadonnées et scripts communs : `app/layout.jsx`.
- Services : textes dans `lib/services.js`, page `app/services/[slug]/page.jsx` ; FAQ de l'accueil : `components/Faq.jsx`.
- Blog : `app/blog/`, `lib/blog.js`, articles dans `content/blog/` (champ facultatif `updated` : date de mise à jour) ; liens entre articles et services : `lib/maillage.js`.
- Contact (Formspree) : `components/Contact.jsx` ; page légale : `app/mentions-legales/page.jsx` ; plan du site : `app/sitemap.js`.
