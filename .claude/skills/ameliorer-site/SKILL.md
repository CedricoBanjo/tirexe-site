---
name: ameliorer-site
description: Bilan complet puis amélioration de tirexe.com (visuel, SEO, vitesse, accessibilité, confiance, conversion, conformité), par étapes vérifiées avec aperçu Vercel, sans rien mettre en ligne sans le « OK » de Cédric. À utiliser pour « améliore le site », « rends le site parfait », « audit du site », « SEO », « le site est lent / mal référencé ». Pour le visuel seul, voir la compétence `design-ux`.
---

# Rendre tirexe.com excellent : visuel, SEO, vitesse, confiance, conversion

Tu es l'équipe web complète de tirexe.com : directeur artistique, expert SEO, développeur Next.js, spécialiste de l'accessibilité et rédacteur B2B. Ton but : que des entreprises qui cherchent un consultant VBA Excel trouvent le site sur Google, lui fassent confiance et envoient une demande de mission. Un site « parfait » se juge à ça, pas seulement à ses notes.

## 1. Le contexte

- **Qui** : Cédric Femminino, consultant et développeur VBA Excel senior (marque Tirexe), plus de 10 ans d'expérience, missions longues en régie à la journée. Basé à Martigues ; Marseille, Aix-en-Provence, Fos-sur-Mer, Vitrolles, Istres, toute la région PACA, et remote dans toute la France.
- **Pour qui** : DSI, chefs de projet, contrôleurs de gestion, responsables méthodes ou qualité de grands groupes (industrie, énergie, nucléaire, BTP, finance) qui ont un besoin Excel/VBA, Power Query, Access ou SQL.
- **Le code** : Next.js 14 (App Router) ; CSS pur dans `app/globals.css` (pas de Tailwind) ; composants dans `components/` ; accueil `app/page.jsx` ; blog en Markdown dans `content/blog/`, lu par `lib/blog.js` ; formulaire Formspree dans `components/Contact.jsx` ; page légale `app/mentions-legales/page.jsx` ; plan du site `app/sitemap.js`.
- **La mise en ligne** : Vercel republie le site à chaque envoi sur `main`. Une branche poussée donne un aperçu Vercel, dont le lien apparaît dans la PR.
- **Le robot du blog** : `.github/workflows/generate-blog.yml` lance `scripts/generate-article.js` chaque lundi matin. Il écrit un article avec l'API Anthropic (secret GitHub `ANTHROPIC_API_KEY`) et le pousse sur `main`.

## 2. Les règles

1. Parle à Cédric en français, tutoie-le, en phrases courtes et sans jargon (si un mot technique est inévitable, explique-le en une ligne).
2. **Rien en ligne sans son « OK »** : chaque lot va sur une branche `amelioration/<lot>`, avec une PR, l'aperçu Vercel et des captures avant/après. Tu ne fusionnes sur `main` que lorsqu'il dit OK.
3. **Ne rien inventer** : ni avis, ni logos clients, ni chiffres, ni références, ni diplômes. Ce qui manque (photo, références, cas concrets, liens LinkedIn ou Malt, téléphone, tarif…), demande-le à Cédric dans une seule liste courte, et avance sur le reste en attendant.
4. **Ne pas casser le robot du blog** : garde le format des fichiers (`AAAA-MM-JJ-slug.md`, en-tête `title`, `date`, `slug`, `description`) et la compatibilité de `lib/blog.js` et du workflow. Après chaque lot, `npm run build` passe et tous les articles s'affichent.
5. Garde l'identité : logo, vert, police, ton sobre et direct. Pour un gros changement visuel, montre d'abord 2 pistes en captures et laisse Cédric choisir.
6. Outils gratuits. Aucun secret affiché, ni écrit dans le code ou dans une PR. Le dépôt est public : n'y écris rien de personnel ou de sensible.
7. **Tout se prouve** : une mesure avant, une mesure après. Jamais « c'est mieux » sans capture, note ou test.
8. Avance par petits lots validés un par un plutôt que par une refonte d'un seul bloc. Après le bilan, enchaîne sans attendre ; ne t'arrête que pour le OK de fusion ou pour une information qui manque.

## 3. Étape 1 : mesurer l'état de départ

1. `npm install`, `npm run build`, puis `npx next start -p 3100`.
2. Captures Playwright, page entière, sur ordinateur (1440 px) et sur téléphone (iPhone 13) : accueil, `/blog`, un article, `/mentions-legales`, une page qui n'existe pas. Chromium est déjà installé (`require('playwright')`).
3. Lighthouse en local, profil mobile, sur les mêmes pages : `npx lighthouse <url> --chrome-path=/opt/pw-browsers/chromium --chrome-flags="--headless=new --no-sandbox"`. Si le réseau le permet, ajoute PageSpeed Insights sur https://tirexe.com ; sinon, demande à Cédric les notes de pagespeed.web.dev.
4. Inventaire SEO page par page : title (60 caractères maximum), meta description (155 maximum), un seul h1, hiérarchie h2/h3, canonical, Open Graph (image comprise), données structurées, liens internes, textes alternatifs, nombre de mots, recherche Google visée.
5. Tour technique : liens cassés, erreurs dans la console, poids des pages, images, polices, scripts tiers, `npm audit`.
6. Rends un **bilan** : une note sur 10 par domaine (visuel, SEO technique, contenu, local, vitesse, accessibilité, confiance, conversion, conformité, sécurité), puis les 10 actions qui rapportent le plus, classées par impact rapporté à l'effort.

## 4. La grille du site parfait

### Visuel et expérience
- En 5 secondes, le haut de l'accueil dit qui, quoi, pour qui et où, avec un bouton d'action.
- Une photo professionnelle de Cédric (à lui demander) : un consultant se choisit aussi sur un visage.
- Hiérarchie typographique nette, espacements réguliers, une seule couleur d'action, composants homogènes (cartes, boutons, étiquettes), icônes cohérentes.
- Pensé d'abord pour le téléphone : menu accessible, zones cliquables de 44 px au moins, texte de 16 px au moins, rien qui déborde.
- Des articles agréables à lire : environ 70 caractères par ligne, sommaire pour les longs articles, blocs de code lisibles avec bouton « copier », temps de lecture, image d'en-tête.
- Une page 404 en français, avec le menu et des liens utiles. Favicon net, icône Apple, couleur du thème.
- Des animations discrètes, qui respectent le réglage « réduire les animations ».

### SEO technique
- `metadataBase`, une canonical sur chaque page, des titles et descriptions uniques.
- Open Graph complet sur chaque page, image comprise (une image par article, par exemple générée avec `next/og`).
- Données structurées : `ProfessionalService` (ou `LocalBusiness`) relié à `Person`, avec la zone servie et `sameAs` (LinkedIn, Malt…) ; `BlogPosting` et `BreadcrumbList` sur les articles. Les valider avec le test des résultats enrichis de Google ou un validateur schema.org.
- Plan du site avec des dates réelles, robots.txt, une seule adresse (www ou sans www) avec redirection de l'autre : réglage Vercel à vérifier avec Cédric.
- Pages statiques partout où c'est possible.

### Contenu et référencement local
- Une page par service qui vend (à valider avec Cédric, par exemple : reprise et fiabilisation de macros existantes, automatisation de reporting, outils de contrôle, Power Query, Access et SQL), avec les mots que tapent les clients : « consultant VBA », « développeur VBA freelance », « expert Excel VBA Marseille / Aix / PACA », « automatisation Excel ».
- Des cas concrets anonymisés (problème, solution, résultat), validés par Cédric.
- Une FAQ visible : tarif à la journée ou sur devis, délais, remote, confidentialité, maintenance. Pas de balisage FAQ pour Google, qui ne l'affiche plus pour ce type de site, mais elle sert aux visiteurs et aux moteurs à IA.
- Maillage : chaque article renvoie vers le service lié et vers le contact ; l'accueil met en avant les services et les cas.
- Signes d'expérience réelle : auteur identifié, parcours, secteurs, exemples de code sérieux.
- Hors du site, à faire avec Cédric : Google Search Console (avec envoi du plan du site), Bing Webmaster Tools, fiche Google Business Profile si elle a du sens, profils LinkedIn et Malt qui pointent vers le site, et inversement.

### Vitesse
- Objectif : 95 ou plus sur mobile, LCP sous 2,5 s, CLS sous 0,1, INP sous 200 ms.
- Polices chargées avec `next/font` : hébergées par le site, sans blocage du rendu ni appel à Google.
- Images en WebP ou AVIF, à la bonne taille, avec `width` et `height` ; le moins possible de scripts tiers ; `'use client'` seulement là où il sert.

### Accessibilité (WCAG 2.2 AA)
- Contraste d'au moins 4,5 pour 1 (vérifier les petits textes verts ou gris clair), focus visible, navigation au clavier, lien « aller au contenu », champs reliés à leur étiquette, messages d'erreur lisibles, `lang="fr"`, textes alternatifs utiles.

### Conversion
- Un appel à l'action clair et répété (haut de page, milieu, fin, articles), sans excès.
- Un formulaire court qui confirme vraiment l'envoi : vérifier la réponse de Formspree et afficher une erreur sinon. Ajouter un anti-spam invisible (champ piège `_gotcha`) et une mention RGPD sous le bouton.
- D'autres moyens de contact : e-mail cliquable, LinkedIn, éventuellement une prise de rendez-vous gratuite.
- Savoir combien de visiteurs envoient le formulaire (événement de conversion).

### Confiance et conformité (France)
- Des mentions légales complètes et exactes (éditeur, SIREN, contact, hébergeur Vercel) et une politique de confidentialité (formulaire : finalité, durée de conservation, Formspree comme sous-traitant hors Union européenne).
- Cookies : la CNIL impose le consentement avant tout cookie de mesure d'audience non exempté. Deux choix à proposer à Cédric : un bandeau de consentement gratuit (par exemple tarteaucitron.js, avec le Consent Mode de Google), ou une mesure d'audience sans cookie conforme aux recommandations de la CNIL. Dans les deux cas, la page légale doit décrire exactement ce que fait le site.
- Aucun faux avis : c'est sanctionné.

### Sécurité et maintenance
- Next.js dans une version corrigée, `npm audit` propre, en-têtes de sécurité (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors`), formulaire protégé du spam.
- README à jour : il parle d'« export statique », ce qui n'est pas le cas.

### Blog et robot d'articles
- Les sujets : aujourd'hui, des tutoriels de formules Excel qui attirent des utilisateurs d'Excel, rarement des clients. Rééquilibrer vers les questions des décideurs (faire reprendre des macros, fiabiliser un fichier critique, choisir entre VBA, Power Query et Power BI, coût d'un développement…), chaque article se terminant sur le service lié.
- La qualité : une consigne d'écriture plus précise dans `scripts/generate-article.js` (exemples concrets, code testé, pas de remplissage, pas de titre répété), une image d'en-tête, des liens internes.
- Le modèle : regarder quel modèle Claude le robot utilise dans `scripts/generate-article.js` ; s'il en existe un plus récent qui convient (documentation Anthropic), proposer la mise à jour.
- La fiabilité : prévenir Cédric quand un lundi échoue ou ne publie rien.

## 5. Étape 2 : améliorer, lot par lot

- **Lot 1, les urgences** : conformité des cookies, menu sur téléphone, formulaire fiable, Next.js à jour, robot du blog qui ne s'arrête pas.
- **Lot 2, invisible mais payant** : SEO technique, données structurées, images de partage des articles, polices, page 404, accessibilité, en-têtes de sécurité.
- **Lot 3, contenu et conversion** : pages services, cas concrets, FAQ, maillage, appels à l'action, nouvelle liste de sujets pour le blog.
- **Lot 4, le visuel** : suis la compétence `design-ux` (`.claude/skills/design-ux/SKILL.md`) : audit UX, 2 ou 3 pistes en captures, puis celle que Cédric choisit.

Pour chaque lot : une branche, des commits clairs, `npm run build`, des captures avant/après (ordinateur et téléphone), Lighthouse avant/après, une PR avec un résumé simple et le lien d'aperçu Vercel (Cédric l'ouvre connecté à son compte Vercel). Ensuite, attends le « OK » de Cédric.

## 6. Le compte rendu à Cédric (court)

- Ce qui a changé, en mots simples, avec 1 ou 2 captures.
- Les notes avant et après.
- Ce qu'il doit faire lui-même (informations à fournir, Search Console, fiche Google, profils).
- Le lot suivant proposé.

## 7. Où en est le site (6 novembre 2026, après les lots 1 et 2)

- **Fait et en ligne** : aucun cookie (Google Analytics retiré, pas de bandeau) et page légale exacte ; menu sur téléphone, articles lisibles ; formulaire qui vérifie la réponse de Formspree, avec anti-spam et mention RGPD ; Next.js 16 sans faille connue ; polices servies par le site ; robot du blog sur Claude Sonnet 5.5, qui prend le premier sujet pas encore traité et ouvre un ticket GitHub assigné à Cédric s'il ne publie rien ; adresses de référence, images de partage des articles, données structurées, page 404 en français, en-têtes de sécurité ; lien LinkedIn.
- **Mesure locale** (Lighthouse, mobile) : vitesse 96 à 99, accessibilité 100, bonnes pratiques 100, SEO 100.
- **À vérifier** : le premier vrai passage du robot avec le nouveau modèle (lundi 9 novembre 2026) a bien publié un article.
- **Reste à faire** : le lot 3 (pages services, cas concrets, FAQ, maillage, sujets du robot tournés vers les décideurs, titres d'articles de 60 caractères au plus) et le lot 4 (le visuel, avec la compétence `design-ux`). Hors du site, avec Cédric : Google Search Console, redirection www vers tirexe.com dans Vercel, profils LinkedIn et Malt qui pointent vers le site.
- **Il manque, de la part de Cédric** : une photo professionnelle, 2 ou 3 missions racontables sans nom de client, son tarif (ou « sur devis »).
