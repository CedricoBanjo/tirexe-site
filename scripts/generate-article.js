#!/usr/bin/env node
// Robot du blog tirexe.com, lancé chaque lundi par .github/workflows/generate-blog.yml.
// Il écrit un article dans content/blog/AAAA-MM-JJ-slug.md, avec l'en-tête
// title, date, slug, description, lu par lib/blog.js. Ne pas changer ce format.

const fs = require('fs')
const path = require('path')
const Anthropic = require('@anthropic-ai/sdk')

// Claude Sonnet 4.5 est retiré par Anthropic le 30 novembre 2026 : Sonnet 5.5 le remplace.
const MODELE = 'claude-sonnet-5-5'
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog')

// Le robot prend le premier sujet de la liste qui n'a pas encore d'article.
// Quand la liste est épuisée, Claude propose un nouveau sujet (le robot ne s'arrête jamais).
const TOPICS = [
  // Prochains sujets, dans l'ordre. Les questions de décideurs (DSI, chefs de projet,
  // contrôleurs de gestion) alternent avec les sujets VBA métier : ce sont elles qui
  // amènent des demandes de mission. Ajoute tes idées où tu veux dans cette partie.
  "Faire reprendre des macros VBA existantes : par où commencer",
  "Comment automatiser un reporting mensuel Excel en VBA",
  "Fiabiliser un fichier Excel critique : la méthode pas à pas",
  "VBA Excel : lire et ecrire dans une base Access depuis une macro",
  "Ce qui fait le coût d'un développement VBA Excel sur mesure",
  "Power Query vs VBA : quand utiliser l'un ou l'autre",
  "Macro Excel qui plante : diagnostiquer avant de tout réécrire",
  "Creer un UserForm Excel professionnel : bonnes pratiques",
  "Documenter un outil Excel VBA pour qu'il survive à son auteur",
  "Algorithmes de controle de coherence en VBA",
  "Excel, Access ou base SQL : quand changer d'outil",
  "Automatiser l'envoi d'emails Outlook depuis Excel en VBA",
  "Power BI ou Excel : que choisir pour vos tableaux de bord",
  "Generer un rapport Word automatiquement depuis Excel avec VBA",
  "Préparer une mission de développement Excel : la check-list",
  "VBA Excel : traiter de gros volumes de donnees sans ralentir",
  "Remplacer les copier-coller manuels par un processus automatisé",
  "Construire un outil de suivi de chantier BTP sur Excel en VBA",
  "SQL dans Excel VBA : requetes sur bases Access",
  "Automatiser une consolidation multi-fichiers Excel avec VBA",
  "Comment creer un tableau de bord financier automatise sous Excel",
  "VBA Excel : gestion des erreurs et debogage avance",
  "Creer un outil de facturation sur mesure sous Excel avec VBA",
  "VBA Excel : travailler avec les tableaux structures ListObjects",
  "Automatiser la generation de presentations PowerPoint depuis Excel",
  "Controle de coherence de donnees en VBA pour l'industrie",
  "VBA Excel : optimiser les performances de vos macros",
  "Creer un outil de tarification fournisseurs sous Excel",
  "Gestion des erreurs dans les formules Excel : SIERREUR ESTNA",
  "Creer un tableau de bord de suivi de projet sous Excel",
  "Modele de suivi budgetaire Excel pour chef de projet",
  "Tableau de bord RH Excel : indicateurs et automatisation",
  "Suivi des echeances et relances automatiques sous Excel",
  "Creer un planning Gantt automatique dans Excel",
  "Outil de gestion des stocks Excel avec alertes automatiques",
  "Calculer des indicateurs financiers KPI sous Excel",
  "Tableau de bord commercial Excel : CA marges et objectifs",

  // Déjà publiés : gardés pour mémoire, le robot les saute.
  "Les dictionnaires VBA Scripting.Dictionary pour la performance",
  "RECHERCHEV vs INDEX EQUIV : lequel choisir et pourquoi",
  "SOMMEPROD : la formule la plus puissante d'Excel expliquee",
  "Les formules matricielles Excel : guide complet",
  "Comment utiliser RECHERCHEX la nouvelle formule de recherche Excel",
  "Formules conditionnelles Excel : IF IFS SWITCH et cas pratiques",
  "La fonction INDIRECT Excel : utilisation avancee et pieges",
  "NB.SI et SOMME.SI : formules de comptage et somme conditionnelle",
  "Les fonctions texte Excel : GAUCHE DROITE STXT CONCATENER",
  "Formules de dates Excel : DATEDIF MOIS.DECALER FIN.MOIS",
  "INDEX et EQUIV : la combinaison la plus flexible d'Excel",
  "La fonction DECALER Excel : dynamiser vos plages de donnees",
  "EQUIV et GRANDE.VALEUR : classer et extraire des donnees Excel",
  "Power Query : nettoyer et transformer des donnees en 10 minutes",
  "Fusionner des tables avec Power Query : guide pas a pas",
  "Power Query : supprimer les doublons et nettoyer les données",
  "Automatiser l'import de fichiers CSV avec Power Query",
  "Power Query vs formules Excel : quand utiliser l'un ou l'autre",
  "10 raccourcis Excel indispensables pour gagner du temps",
  "Les tableaux structures Excel : pourquoi les utiliser systematiquement",
  "Nommer ses plages Excel : bonnes pratiques et avantages",
  "Tableaux croises dynamiques : guide complet et bonnes pratiques",
  "Mise en forme conditionnelle Excel : exemples avances",
  "Proteger et securiser un classeur Excel : toutes les options",
  "Validation des donnees Excel : controler les saisies utilisateurs",
  "Creer un menu deroulant dynamique dans Excel",
  "Les graphiques Excel avances : sparklines bulles et radar",
]

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

function getTodayISO() {
  return new Date().toISOString().split('T')[0]
}

function articlesExistants() {
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(fichier => {
      const contenu = fs.readFileSync(path.join(BLOG_DIR, fichier), 'utf8')
      const titre = (contenu.match(/^title:\s*"(.*)"\s*$/m) || [])[1] || fichier
      return { fichier, titre }
    })
}

function dejaTraite(sujet, existants) {
  const slug = slugify(sujet)
  return existants.some(a => a.fichier.includes(slug))
}

// Texte d'un bout de Markdown, sans la mise en forme
function texteBrut(md) {
  return md
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Premier vrai paragraphe d'un article (ni titre, ni code, ni liste, ni tableau)
function premierParagraphe(md) {
  return md.split(/\n\s*\n/).map(b => b.trim()).find(b => b && !/^(#|```|[-*>|]|\d+\.)/.test(b)) || ''
}

// Coupe un texte trop long à la fin d'un mot, avec « … »
function limiter(texte, max) {
  if (texte.length <= max) return texte
  const coupe = texte.slice(0, max - 1)
  return coupe.slice(0, coupe.lastIndexOf(' ')).replace(/[\s,;:.–-]+$/, '') + '…'
}

// Valeur d'en-tête sans guillemets droits (lib/blog.js ne sait pas lire \") : "mot" devient « mot »
function sansGuillemets(texte) {
  return texte.replace(/"([^"]*)"/g, '« $1 »').replace(/"/g, '')
}

// La clé est lue dans ANTHROPIC_API_KEY (secret GitHub). En cas de surcharge passagère
// de l'API, le SDK officiel réessaie tout seul.
const client = new Anthropic({ maxRetries: 4 })

async function demanderClaude(prompt, { maxTokens = 16000, effort = 'medium' } = {}) {
  const reponse = await client.beta.messages.create({
    model: MODELE,
    max_tokens: maxTokens,
    output_config: { effort },
    // Si Claude refuse par erreur (du code VBA pris pour un virus, par exemple),
    // Anthropic réessaie automatiquement avec un modèle de secours.
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    messages: [{ role: 'user', content: prompt }],
  })
  if (reponse.stop_reason === 'refusal') {
    throw new Error(`Claude a refusé d'écrire (catégorie : ${reponse.stop_details?.category || 'inconnue'})`)
  }
  if (reponse.stop_reason === 'max_tokens') {
    throw new Error('Réponse coupée avant la fin (limite de longueur atteinte)')
  }
  // La réponse peut commencer par des blocs de réflexion : on ne garde que le texte.
  const texte = reponse.content.filter(b => b.type === 'text').map(b => b.text).join('').trim()
  if (!texte) throw new Error('Réponse vide')
  return texte
}

async function choisirSujet(existants) {
  const sujet = TOPICS.find(t => !dejaTraite(t, existants))
  if (sujet) return sujet

  console.log('Liste de sujets épuisée : Claude propose un nouveau sujet.')
  const proposition = await demanderClaude([
    'Tu choisis le sujet du prochain article du blog tirexe.com, tenu par Cedric Femminino, consultant et developpeur VBA Excel senior (missions en regie, region PACA et remote).',
    'Lecteurs vises : chefs de projet, controleurs de gestion, responsables methodes ou qualite de grands groupes qui ont un besoin Excel, VBA, Power Query, Access ou SQL.',
    '',
    'Articles deja publies, a ne pas refaire :',
    ...existants.map(a => `- ${a.titre}`),
    '',
    'Reponds uniquement par le titre du nouvel article, en francais, sur une seule ligne, sans guillemets.',
  ].join('\n'), { maxTokens: 4000, effort: 'low' })
  const titre = proposition.split('\n').map(l => l.replace(/^[#\-*\s"«]+|["»\s]+$/g, '').trim()).find(Boolean)
  if (!titre || !slugify(titre) || dejaTraite(titre, existants)) {
    throw new Error(`Sujet proposé inutilisable : ${titre || '(vide)'}`)
  }
  return titre
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('Clé ANTHROPIC_API_KEY absente (elle doit être dans les secrets GitHub du dépôt)')
  }
  const existants = articlesExistants()
  const topic = await choisirSujet(existants)
  const date = getTodayISO()
  const slug = slugify(topic)
  const outputPath = path.join(BLOG_DIR, `${date}-${slug}.md`)
  const restants = TOPICS.filter(t => t !== topic && !dejaTraite(t, existants)).length

  console.log(`Generation : "${topic}" (ensuite, ${restants} sujet(s) restant(s) dans la liste)`)

  const prompt = [
    'Tu es un expert VBA Excel senior.',
    'Tu ecris un article en francais pour le blog tirexe.com, tenu par Cedric Femminino, consultant et developpeur VBA Excel senior (missions longues en regie, region PACA et remote).',
    '',
    'Sujet : ' + topic,
    '',
    'Lecteurs vises :',
    '- DSI, chefs de projet, controleurs de gestion, responsables methodes ou qualite de grands groupes (industrie, energie, BTP, finance)',
    '- Ils decident, ou font appel a un consultant : montre les enjeux (fiabilite, temps, risques, maintenance) avant la technique',
    '',
    'Regles sur le code :',
    '- Tout code VBA doit etre parfaitement fonctionnel, teste mentalement ligne par ligne',
    '- Utilise Option Explicit en tete de module, typage fort de toutes les variables',
    '- Gestion erreurs avec On Error GoTo et label de sortie propre, liberation des objets Set obj = Nothing',
    '- Privilegier les tableaux en memoire plutot que les boucles cellule par cellule pour la performance',
    '- Utiliser les dictionnaires Scripting.Dictionary pour les recherches et dedoublonnages',
    '- Ecrire des fonctions Function As Type plutot que tout mettre dans des Sub',
    '- Noms de variables explicites, commentaires concis et utiles',
    '- Ne genere du code que si tu es certain qu il est correct',
    '- Pour les articles sur les formules Excel ou les tips, pas de code VBA — explications claires avec exemples de formules en texte',
    '- Maximum 2 blocs de code par article, chacun 20-40 lignes max',
    '',
    'Regles sur le contenu :',
    '- Ton expert et direct, sans formules creuses ni tournures marketing',
    '- Explique le pourquoi avant le comment',
    '- Entre 700 et 900 mots au total',
    '- Sous-titres H2 uniquement',
    '- N invente rien sur Cedric : ne raconte jamais ce qu il aurait fait, vu, mesure ou constate en mission ou sur un projet (pas de « j ai vu », « dans mes missions », « sur un projet que j ai mene », « j ai mesure »), aucun client, aucune anecdote vecue',
    '- Aucun chiffre invente : pas de pourcentage, de gain de temps, de duree ou de volume presente comme mesure. Decris les situations de facon generale (par exemple : un reporting mensuel refait a la main chaque mois)',
    '- Aucun tarif, aucune fourchette de prix (les missions de Cedric sont sur devis)',
    '- Conclusion courte et naturelle ; sa derniere phrase dit sobrement, sans lien, dans quel cas il vaut mieux se faire accompagner',
    '- Le titre H1 fait 60 caracteres au plus, espaces compris, avec le mot-cle principal au debut',
    '- Sur la toute derniere ligne de ta reponse, ecris exactement : META: suivi d une description de 150 caracteres max, accrocheuse et optimisee SEO, sans chiffre invente, qui donne envie de cliquer depuis Google',
    '- UNIQUEMENT du Markdown valide sans balises de code autour du resultat',
    '- Commence directement par le titre H1 puis l introduction',
  ].join('\n')

  const content = await demanderClaude(prompt)

  const titleMatch = content.match(/^#\s+(.+)$/m)
  const title = sansGuillemets(titleMatch ? titleMatch[1].trim() : topic)

  const metaMatch = content.match(/^META:\s*(.+)$/m)
  const cleanContent = content.replace(/^META:.*$/m, '').trim()
  // Description pour Google : celle de Claude, sinon le début de l'article ; 155 caractères au plus
  const resume = metaMatch ? metaMatch[1].trim() : texteBrut(premierParagraphe(cleanContent))
  const metaDesc = sansGuillemets(limiter(resume || `${title}, par Cédric Femminino, consultant VBA Excel senior.`, 155))

  // Garde-fou : on ne publie pas un article vide ou tronqué
  const nbMots = cleanContent.split(/\s+/).filter(Boolean).length
  if (nbMots < 400) throw new Error(`Article trop court (${nbMots} mots) : rien n'est publié`)

  // Points à surveiller, signalés dans le résumé GitHub sans bloquer la publication
  const avertissements = []
  if (title.length > 60) avertissements.push(`titre de ${title.length} caractères : Google en coupera la fin (60 au plus conseillés)`)
  if (!metaMatch) avertissements.push("pas de description fournie par Claude : le début de l'article a été utilisé")

  const markdown = [
    '---',
    `title: "${title}"`,
    `date: "${date}"`,
    `slug: "${slug}"`,
    `description: "${metaDesc}"`,
    '---',
    '',
    cleanContent,
  ].join('\n')

  fs.writeFileSync(outputPath, markdown, 'utf8')
  console.log(`Article genere : ${outputPath} (${nbMots} mots)`)
  avertissements.forEach(a => console.log(`Attention : ${a}`))
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, [
      `Article publié : **${title}** (${nbMots} mots, ${restants} sujet(s) restant(s) dans la liste)`,
      ...avertissements.map(a => `- Attention : ${a}`),
      '',
    ].join('\n'))
  }
}

main().catch(err => {
  console.error('Erreur :', err.message)
  process.exit(1)
})
