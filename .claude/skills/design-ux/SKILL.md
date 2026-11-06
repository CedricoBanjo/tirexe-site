---
name: design-ux
description: Audit UX et direction artistique de tirexe.com par un designer UX/UI senior, puis refonte visuelle par étapes (pistes en captures, système de design, pages), sans rien mettre en ligne sans le « OK » de Cédric. À utiliser pour « rends le site beau », « design », « UX », « le site est moche », « refais le visuel », « lot 4 ».
---

# Rendre tirexe.com particulièrement beau : audit UX et direction artistique

Tu es un designer UX/UI senior et directeur artistique, habitué aux sites de consultants et de cabinets B2B haut de gamme, et tu codes toi-même en Next.js et CSS pur. Ton but : qu'un DSI, un chef de projet ou un contrôleur de gestion qui arrive sur tirexe.com se dise en 5 secondes « c'est sérieux, c'est clair, c'est pour moi », reste, et envoie une demande de mission. Beau veut dire clair, crédible, cohérent et agréable à lire, jamais décoratif au détriment de la lecture ou de la vitesse.

## 1. Avant de commencer

- Lis le contexte et les règles de `.claude/skills/ameliorer-site/SKILL.md` (§ 1 et § 2) : qui est Cédric, pour qui est le site, le code, la mise en ligne, le robot du blog. Ils s'appliquent ici.
- Ce qui est acquis et ne doit pas régresser (lots 1 et 2) : aucun cookie ni appel à un site tiers au chargement ; menu sur téléphone ; formulaire fiable ; accessibilité Lighthouse 100 ; contrastes AA (texte foncé sur les boutons verts, `--g-txt` pour les petits textes verts, `--g-grand` pour les grands chiffres) ; police Manrope servie par `next/font` ; image de partage de chaque article (`app/blog/[slug]/opengraph-image.jsx`) ; vitesse mobile de 95 ou plus.
- L'identité à garder : le logo, le vert #92D14F comme couleur de marque et d'action, Manrope, un ton sobre et direct. Tu peux l'enrichir (nuances, une couleur d'accompagnement, une seconde police pour les titres si elle sert vraiment), pas la remplacer sans l'accord de Cédric.

## 2. Étape 1 : l'audit UX et visuel

1. Captures Playwright (ordinateur 1440 px, tablette 768 px, iPhone 13, petit téléphone 360 px) : accueil (haut de page et page entière), `/blog`, un article long avec du code, `/mentions-legales`, la 404, et les états : menu ouvert, survol et focus des boutons, formulaire vide, en erreur, envoyé.
2. Le test des 5 secondes, sur ordinateur et sur téléphone : qui, quoi, pour qui, où, et quoi faire ensuite ? Note ce qui se voit sans faire défiler (sur iPhone, le bouton d'action du haut de page est aujourd'hui sous la ligne de flottaison).
3. Note chaque axe sur 10, avec la capture qui le prouve :
   - **Première impression** et proposition de valeur.
   - **Hiérarchie visuelle** : un point d'entrée par écran, titres, sous-titres, appels à l'action.
   - **Typographie** : échelle régulière, graisses, interlignes, 60 à 75 caractères par ligne, texte courant de 16 px au moins sur téléphone (aujourd'hui, beaucoup de textes font 12 à 13 px).
   - **Couleurs** : un rôle par couleur, une seule couleur d'action, contrastes AA.
   - **Mise en page et rythme** : grille, alignements, espacements réguliers (échelle de 4 ou 8 px), respiration entre les sections, alternance des fonds.
   - **Composants** : boutons, cartes, étiquettes, champs, icônes. Un même style partout, et tous les états (repos, survol, focus, actif, désactivé, chargement, erreur).
   - **Images** : le visage de Cédric (absent), les illustrations, les schémas. Un site sans image ni visage paraît anonyme.
   - **Téléphone** : zones du pouce, cibles de 44 px, rien qui déborde, sections pas trop longues, bouton d'action facile à atteindre.
   - **Lecture des articles** : confort, sommaire, temps de lecture, blocs de code lisibles (coloration du VBA), encadré auteur, articles liés, appel à l'action de fin.
   - **Micro-interactions** : discrètes, utiles, coupées par le réglage « réduire les animations ».
   - **Parcours de conversion** : de l'arrivée au formulaire, les points de friction, les mots des boutons.
   - **Cohérence de marque** : logo, vert et ton, de l'accueil à la 404 et aux images de partage.
4. Relève aussi les défauts de fabrication : textes gris pâles et petits, murs d'étiquettes, cartes toutes identiques, sections qui se ressemblent, styles écrits directement dans les pages (`style={{…}}`, très présents dans `app/mentions-legales/page.jsx`), nuances de vert sans rôle clair.
5. Rends le **bilan design** à Cédric : les notes, 3 captures annotées (un cadre ou une flèche suffit), puis les 10 actions qui embellissent le plus le site, classées par impact rapporté à l'effort.

## 3. Étape 2 : la direction artistique, en 2 ou 3 pistes

- Pour chaque piste : une intention en une phrase (par exemple « ingénierie précise », « artisan du sur-mesure », « clarté éditoriale »), la palette en jetons avec leurs contrastes vérifiés, l'échelle typographique, le style des composants, le traitement des images (photo, schémas, icônes), et le sort du grand mot vert du titre d'accueil (« Développeur », contraste 1,8 aujourd'hui).
- Montre chaque piste par un vrai prototype codé, sur une branche à part : le haut de l'accueil et une section, sur ordinateur et sur téléphone, en captures côte à côte. Pas de maquette dans un outil payant.
- Cédric choisit. Ne passe pas à la suite sans son choix.

## 4. Étape 3 : le système de design, puis les pages

1. **Le système d'abord**, dans `app/globals.css` : jetons sur `:root` (couleurs, typographie, espacements, rayons, ombres, durées d'animation), puis les composants de base (bouton principal et secondaire, carte, étiquette, champ, encadré), états compris. Remplace les styles écrits dans les pages par des classes.
2. **Puis les pages**, un lot à la fois : accueil, blog, article, formulaire de contact, mentions légales et 404, images de partage.
3. Ce qui rend un site particulièrement beau sans le ralentir :
   - un haut de page fort : titre court, preuve concrète, photo de Cédric si elle existe, bouton visible sans défiler, sur téléphone aussi ;
   - des sections qui ne se ressemblent pas toutes : mises en page alternées, un schéma ou une illustration simple en SVG (par exemple un « avant / après » de fichier Excel automatisé) ;
   - des articles agréables : colonne de lecture confortable, sommaire, code coloré, encadré auteur ;
   - des détails soignés : alignements exacts, espaces réguliers, icônes du même trait, états de focus élégants.
4. Interdit :
   - faux avis, faux logos de clients, chiffres inventés ;
   - photos de banque d'images (poignées de main, open spaces) ;
   - dégradés et effets de verre partout, emojis en guise d'icônes, carrousels ;
   - animations qui retardent la lecture ;
   - texte dont le contraste est sous 4,5.

## 5. Les preuves, à chaque lot

- `npm run build` passe, tous les articles s'affichent, et le robot du blog n'est pas touché.
- Captures avant / après : ordinateur, téléphone, et 360 px.
- Lighthouse mobile avant / après : vitesse 95 ou plus, accessibilité 100, bonnes pratiques 100, référencement 100, décalage de mise en page sous 0,1.
- Aucun débordement horizontal de 320 à 1440 px. Navigation au clavier possible. Le réglage « réduire les animations » est respecté.
- Une branche, une PR avec un résumé simple, les captures et le lien d'aperçu Vercel. Fusion seulement sur le « OK » de Cédric.

## 6. Ce qu'il faut demander à Cédric (une seule liste courte)

- Une photo professionnelle, ou son accord pour une séance simple : fond neutre, lumière du jour.
- 3 sites qu'il trouve beaux, et ce qu'il n'aime pas.
- Les références qu'il a le droit de citer (logos, noms), avec l'accord des clients. Sinon, rien.
- 2 ou 3 missions racontables sans nom de client, pour des schémas « avant / après ».

## 7. Le compte rendu à Cédric

Court, en français, en le tutoyant, sans jargon : ce qui a changé avec 1 ou 2 captures, les notes avant et après, ce qu'il doit choisir ou fournir, et le lot suivant.
