// Les 4 services de Cédric : les 4 cartes « Expertise » de l'accueil, chacune avec sa page
// /services/<slug>. Les textes reprennent ce que le site dit déjà (expertises, secteurs,
// outils, fonctionnement) : rien d'inventé, ni chiffre, ni client, ni référence.
// Dans les textes, [mots](/adresse) devient un lien et **mots** passe en gras.
//
// motsCles : bouts d'adresse d'article (sans accents) qui rattachent un article du blog
// à ce service, pour le lien « service lié » en bas de l'article.

export const SERVICES = [
  {
    slug: 'controle-donnees-excel-vba',
    etiquette: 'Contrôle & vérification',
    titreCarte: 'Algorithmes de contrôle & vérification',
    titreCourt: 'Contrôle de données',
    resumeCarte: "Conception d'algorithmes de cohérence et de conformité pour des projets à enjeux critiques. Vérification automatique de données complexes, détection d'anomalies, validation croisée multi-sources sur de grands volumes.",
    tags: ['Contrôle cohérence', 'Validation données', 'Détection anomalies', 'Conformité règles métier'],
    titre: 'Contrôle et vérification de données en VBA Excel',
    titreSeo: 'Contrôle et vérification de données en VBA Excel · Tirexe',
    description: "Algorithmes de contrôle en VBA Excel : cohérence, conformité aux règles métier, détection d'anomalies, validation croisée de sources sur de grands volumes.",
    accroche: "Je conçois des algorithmes de cohérence et de conformité pour des projets à enjeux critiques. Vos données sont vérifiées automatiquement, et les anomalies remontent d'elles-mêmes au lieu d'être cherchées à la main.",
    besoin: {
      titre: 'Quand un contrôle automatique devient nécessaire',
      intro: "Un contrôle fait à la main dépend de la vigilance de chacun. Il devient fragile dès que l'un de ces signes apparaît :",
      points: [
        "les volumes rendent la vérification à l'œil impossible ;",
        'les données arrivent de plusieurs sources (exports de logiciels métier, fichiers de partenaires, saisies) qui ne concordent pas toujours ;',
        'les mêmes vérifications se refont à chaque nouvelle livraison de données ;',
        'une erreur qui passe coûte cher : un rapport faux, une non-conformité, une décision prise sur de mauvais chiffres.',
      ],
    },
    prestations: {
      titre: 'Ce que je mets en place',
      points: [
        ['Contrôles de cohérence', 'les règles qui relient vos données entre elles (totaux, dates, références, statuts) sont vérifiées à chaque exécution.'],
        ['Validation des données', "chaque valeur est confrontée à ce qu'elle doit être (format, plage autorisée, liste de référence) avant d'être utilisée."],
        ["Détection d'anomalies", 'écarts, doublons et valeurs manquantes sont repérés et listés, avec la ligne et la source concernées.'],
        ['Conformité aux règles métier', 'vos règles, même complexes, deviennent des contrôles automatiques, appliqués de la même façon à chaque fois.'],
        ['Validation croisée multi-sources', 'deux systèmes censés dire la même chose sont rapprochés, et chaque écart est signalé.'],
      ],
    },
    apport: {
      titre: 'Ce que vous y gagnez',
      texte: "Le contrôle ne repose plus sur la mémoire d'une personne : il est écrit, reproductible et rapide à relancer. Vos équipes ne cherchent plus les erreurs, elles traitent une liste d'écarts claire. Sur de grands volumes, le contrôle porte sur toutes les lignes, et plus seulement sur un échantillon. Il peut aussi s'intégrer à un [reporting automatisé](/services/automatisation-reporting-excel), pour que les chiffres soient vérifiés avant d'être diffusés.",
    },
    secteurs: [
      ['Nucléaire et énergie', 'contrôle de conformité et vérification de données techniques critiques, sur des projets de grande envergure.'],
      ['Génie électrique et infrastructure', 'gestion de données techniques complexes et vérification de cohérence, sur des projets de longue durée.'],
      ['Finance et contrôle de gestion', 'modèles financiers complexes et reportings de gestion.'],
    ],
    outils: [
      ['VBA Excel', "macros avancées, automatisation complète, API Windows, gestion d'événements."],
      ['Power Query', 'connexions multi-sources et transformations complexes, directement dans Excel.'],
      ['Access et SQL', 'requêtes SQL depuis VBA et liaisons multi-tables, sur des bases .mdb, .accdb et .mde.'],
    ],
    motsCles: ['controle', 'coherence', 'fiabiliser', 'verification', 'validation', 'anomalie', 'doublon', 'conformite', 'saisie', 'erreur', 'proteger', 'securiser'],
  },
  {
    slug: 'application-excel-sur-mesure',
    etiquette: 'Outils métier',
    titreCarte: 'Applications Excel sur mesure',
    titreCourt: 'Applications Excel sur mesure',
    resumeCarte: 'Facturation spécifique, outils de suivi, calculs avec règles métier avancées, tarifications fournisseurs pour grands groupes, interfaces ergonomiques avec UserForms.',
    tags: ['Facturation', 'Suivi & pilotage', 'Tarifications complexes', 'UserForms avancés'],
    titre: 'Applications Excel sur mesure, développées en VBA',
    titreSeo: "Développement d'applications Excel VBA sur mesure · Tirexe",
    description: "Développement d'applications Excel VBA sur mesure : facturation spécifique, outils de suivi et de pilotage, tarifications complexes, saisie par UserForms.",
    accroche: "Quand aucun logiciel standard ne colle à vos règles, je construis l'outil dans Excel : vos calculs, vos cas particuliers, et des écrans de saisie clairs pour ceux qui l'utilisent chaque jour.",
    besoin: {
      titre: "Quand un outil sur mesure s'impose",
      intro: "Excel est souvent l'outil le plus proche du métier. Un développement sur mesure se justifie quand :",
      points: [
        "vos calculs suivent des règles qu'aucun logiciel standard ne gère : tarifs négociés, remises, exceptions ;",
        "le suivi d'une activité (projets, chantiers, commandes, ressources) est éparpillé dans des tableaux disparates ;",
        'plusieurs personnes saisissent dans le même fichier, sans garde-fou ;',
        'un calcul ou une mise en forme se refait à la main, encore et encore.',
      ],
    },
    prestations: {
      titre: 'Ce que je développe',
      points: [
        ['Facturation spécifique', 'des factures calculées selon vos règles, cas particuliers compris.'],
        ['Suivi et pilotage', "l'avancement de vos projets, chantiers ou ressources, à jour et lisible d'un coup d'œil."],
        ['Tarifications complexes', 'grilles fournisseurs, conditions négociées, calculs à plusieurs niveaux, comme les tarifications fournisseurs de grands groupes.'],
        ['Calculs métier avancés', 'vos règles de gestion, même avancées, traduites en calculs automatiques.'],
        ['Interfaces avec UserForms', "des écrans de saisie ergonomiques qui guident l'utilisateur et limitent les erreurs."],
      ],
    },
    apport: {
      titre: 'Pourquoi rester dans Excel',
      texte: "Vos équipes connaissent déjà Excel : l'outil s'adopte vite, sans nouveau logiciel à déployer. Les données restent sous la main, dans un format que tout le monde sait ouvrir. Quand les saisies doivent être fiables, l'outil intègre ses propres [contrôles de données](/services/controle-donnees-excel-vba). Et quand le volume grandit, il peut s'appuyer sur une [base Access ou SQL](/services/access-sql-excel-vba).",
    },
    secteurs: [
      ['BTP et génie civil', "suivi de chantier, gestion des ressources et reporting d'avancement pour de grands projets de construction."],
      ['Finance et contrôle de gestion', 'tarification fournisseurs pour de grands groupes et modèles financiers complexes.'],
      ['Industrie lourde', 'outils de production et gestion de stocks.'],
      ['Tertiaire et services', 'outils de gestion et optimisation de processus bureautiques sur mesure.'],
    ],
    outils: [
      ['VBA Excel', "macros avancées, automatisation complète, API Windows, gestion d'événements."],
      ['Excel avancé', 'formules matricielles, tableaux croisés, fonctions avancées.'],
      ['UserForms', 'des interfaces de saisie et de consultation intégrées au classeur.'],
    ],
    motsCles: ['userform', 'facturation', 'facture', 'tarification', 'outil', 'menu-deroulant', 'suivi', 'planning', 'gantt', 'stock', 'formulaire', 'tableaux-structures', 'plages'],
  },
  {
    slug: 'automatisation-reporting-excel',
    etiquette: 'Automatisation',
    titreCarte: 'Reporting & processus automatisés',
    titreCourt: 'Automatisation du reporting',
    resumeCarte: 'Automatisation complète des processus récurrents — reporting, consolidation multi-sources, génération de documents Word et PowerPoint, envois Outlook programmés. Zéro intervention manuelle sur les tâches répétitives.',
    tags: ['Reporting auto', 'Consolidation données', 'Génération docs', 'Outlook VBA'],
    titre: 'Automatisation de reporting et de processus Excel en VBA',
    titreSeo: 'Automatisation de reporting Excel en VBA · Tirexe',
    description: 'Reporting Excel automatisé en VBA : consolidation multi-sources, documents Word et PowerPoint générés, envois Outlook programmés, sans copier-coller.',
    accroche: "Votre reporting se prépare à la main chaque semaine ou chaque mois ? J'automatise tout le processus : collecte, consolidation, mise en forme et diffusion. Les tâches répétitives se font sans intervention manuelle.",
    besoin: {
      titre: "Les signes qu'il est temps d'automatiser",
      intro: "Un processus récurrent mérite d'être automatisé quand :",
      points: [
        'le même reporting se refait à chaque période, avec les mêmes copier-coller ;',
        "les chiffres viennent de plusieurs fichiers, sites ou logiciels qu'il faut rapprocher à la main ;",
        "la production du rapport repose sur une seule personne, et tout s'arrête quand elle est absente ;",
        'une erreur de copier-coller suffit à fausser un tableau de bord.',
      ],
    },
    prestations: {
      titre: "Ce que j'automatise",
      points: [
        ['Le reporting', "tableaux de bord et indicateurs mis à jour en une action, au lieu d'être reconstruits à la main."],
        ['La consolidation', 'les données de plusieurs fichiers, sites ou logiciels réunies et rapprochées automatiquement.'],
        ['La génération de documents', 'rapports Word et présentations PowerPoint produits directement depuis Excel.'],
        ['La diffusion', 'envois Outlook programmés : les bons fichiers aux bons destinataires.'],
      ],
    },
    apport: {
      titre: 'Ce que ça change',
      texte: "Le reporting ne dépend plus d'une personne ni d'une série de manipulations fragiles : il suit toujours les mêmes étapes, dans le même ordre. Vos équipes passent leur temps à analyser les chiffres plutôt qu'à les recopier. Et puisque les données sont rapprochées par un programme, on peut y ajouter des [contrôles automatiques](/services/controle-donnees-excel-vba) avant chaque diffusion.",
    },
    secteurs: [
      ['Finance et contrôle de gestion', 'reportings de gestion automatisés et modèles financiers.'],
      ['BTP et génie civil', "reporting d'avancement pour de grands projets de construction."],
      ['Industrie lourde', 'traitement de données issues de systèmes industriels.'],
      ['Tertiaire et services', 'automatisation administrative et optimisation de processus bureautiques.'],
    ],
    outils: [
      ['VBA Excel', 'macros avancées et automatisation complète des tâches répétitives.'],
      ['Power Query', 'connexions multi-sources et transformations complexes, directement dans Excel.'],
      ['Word et PowerPoint', 'génération automatique de documents et de présentations depuis Excel.'],
      ['Outlook VBA', "automatisation d'envois, gestion d'agenda, traitement de messagerie."],
    ],
    motsCles: ['reporting', 'rapport', 'consolidation', 'automatis', 'outlook', 'email', 'word', 'powerpoint', 'tableau-de-bord', 'indicateur', 'kpi', 'import', 'csv', 'power-query', 'fusionner', 'graphique', 'tableaux-croises', 'tableaux-de-bord', 'performance'],
  },
  {
    slug: 'access-sql-excel-vba',
    etiquette: 'Données',
    titreCarte: 'Bases de données & interopérabilité',
    titreCourt: 'Access et SQL',
    resumeCarte: 'Bases Access (.MDB, .ACCDB, .MDE), requêtes SQL depuis Excel, migrations et transformations entre logiciels métier, traitement de sources hétérogènes.',
    tags: ['Access multi-formats', 'SQL / VBA', 'Migration données', 'Sources hétérogènes'],
    titre: 'Bases Access, SQL et migration de données avec Excel',
    titreSeo: 'Access, SQL et migration de données avec Excel VBA · Tirexe',
    description: 'Bases Access (.mdb, .accdb, .mde), requêtes SQL depuis Excel VBA, migrations entre logiciels métier et sources hétérogènes. En régie, PACA ou à distance.',
    accroche: 'Quand Excel ne suffit plus à stocker vos données, ou quand vos logiciels ne se parlent pas, je fais le lien : bases Access, requêtes SQL depuis Excel, migrations et transformations entre logiciels métier.',
    besoin: {
      titre: 'Les situations typiques',
      intro: 'Ce besoin apparaît souvent quand :',
      points: [
        'un classeur Excel sert de base de données et devient lourd, lent et fragile ;',
        'une base Access ancienne (.mdb, .mde) tourne encore et doit évoluer ;',
        "les données passent d'un logiciel métier à un autre au prix de retraitements manuels ;",
        'les sources sont hétérogènes : exports, fichiers et bases de formats différents.',
      ],
    },
    prestations: {
      titre: 'Ce que je fais',
      points: [
        ['Bases Access multi-formats', 'des bases .mdb, .accdb et .mde, avec des liaisons entre tables.'],
        ['SQL depuis Excel et VBA', "Excel interroge directement la base par des requêtes SQL, au lieu d'empiler des copies de données."],
        ['Migration de données', 'migrations et transformations entre logiciels métier, sans ressaisie.'],
        ['Sources hétérogènes', 'fichiers, exports et bases de formats différents, traités dans un même flux.'],
      ],
    },
    apport: {
      titre: 'Excel et Access, chacun son rôle',
      texte: "Excel est fait pour calculer, analyser et présenter. Une base Access ou SQL garde les données à un seul endroit, propres et partagées. En reliant les deux, vos équipes gardent les classeurs qu'elles connaissent, branchés sur des données fiables. C'est aussi le socle des [applications Excel sur mesure](/services/application-excel-sur-mesure) et du [reporting automatisé](/services/automatisation-reporting-excel) quand les volumes grandissent.",
    },
    secteurs: [
      ['Industrie lourde', 'traitement de données issues de systèmes industriels.'],
      ['Génie électrique et infrastructure', 'gestion de données techniques complexes.'],
      ['Nucléaire et énergie', 'vérification de données techniques critiques.'],
    ],
    outils: [
      ['Access et SQL', 'bases .mdb, .accdb et .mde, requêtes SQL depuis VBA, liaisons multi-tables.'],
      ['VBA Excel', 'macros avancées et automatisation complète.'],
      ['Power Query', 'connexions multi-sources et transformations complexes.'],
    ],
    motsCles: ['access', 'sql', 'base-de-donnees', 'requete', 'migration'],
  },
]

export function getService(slug) {
  return SERVICES.find(s => s.slug === slug) || null
}

// Le service le plus proche d'un article, d'après son adresse. Les tutoriels de formules,
// qui ne parlent d'aucun service en particulier, renvoient vers les applications sur mesure.
export function serviceDeLArticle(article) {
  const adresse = article.slug || ''
  let meilleur = null
  let meilleurScore = 0
  for (const service of SERVICES) {
    const score = service.motsCles.filter(m => adresse.includes(m)).length
    if (score > meilleurScore) { meilleur = service; meilleurScore = score }
  }
  return meilleur || getService('application-excel-sur-mesure')
}
