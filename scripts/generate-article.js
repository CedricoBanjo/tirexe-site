#!/usr/bin/env node

const https = require('https')
const fs = require('fs')
const path = require('path')

const TOPICS = [
  "Comment automatiser un reporting mensuel Excel en VBA",
  "VBA Excel : lire et ecrire dans une base Access depuis une macro",
  "Power Query vs VBA : quand utiliser l'un ou l'autre",
  "Creer un UserForm Excel professionnel : bonnes pratiques",
  "Algorithmes de controle de coherence en VBA",
  "Automatiser l'envoi d'emails Outlook depuis Excel en VBA",
  "Generer un rapport Word automatiquement depuis Excel avec VBA",
  "VBA Excel : traiter de gros volumes de donnees sans ralentir",
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
  "Les dictionnaires VBA Scripting.Dictionary pour la performance",
]

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

function getWeekNumber() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  const week1 = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

function getTodayISO() {
  return new Date().toISOString().split('T')[0]
}

function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }],
    })

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body),
      },
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          if (parsed.error) reject(new Error(parsed.error.message))
          else resolve(parsed.content[0].text)
        } catch (e) { reject(e) }
      })
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

async function main() {
  const week = getWeekNumber()
  const topic = TOPICS[week % TOPICS.length]
  const date = getTodayISO()
  const slug = slugify(topic)
  const outputPath = path.join(__dirname, '..', 'content', 'blog', `${date}-${slug}.md`)

  if (fs.existsSync(outputPath)) {
    console.log(`Article deja existant : ${outputPath}`)
    process.exit(0)
  }

  console.log(`Generation : "${topic}"`)

  const prompt = [
    'Tu es un expert VBA Excel senior avec 10 ans experience sur des projets industriels complexes.',
    'Tu ecris un article technique en francais pour le blog tirexe.com, tenu par Cedric Femminino, consultant VBA Excel.',
    '',
    'Sujet : ' + topic,
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
    '- Maximum 2 blocs de code par article, chacun 20-40 lignes max',
    '',
    'Regles sur le contenu :',
    '- Ton expert et direct, sans formules creuses ni tournures marketing',
    '- Tu t adresses a des responsables techniques et chefs de projet',
    '- Explique le pourquoi avant le comment',
    '- Entre 700 et 900 mots au total',
    '- Sous-titres H2 uniquement',
    '- Conclusion courte et naturelle',
    '- UNIQUEMENT du Markdown valide sans balises de code autour du resultat',
    '- Commence directement par le titre H1 puis l introduction',
  ].join('\n')

  const content = await callClaude(prompt)

  const titleMatch = content.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : topic

  const markdown = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: "${date}"`,
    `slug: "${slug}"`,
    `description: "Article sur ${title.toLowerCase()} par Cedric Femminino, consultant VBA Excel senior."`,
    '---',
    '',
    content,
  ].join('\n')

  fs.writeFileSync(outputPath, markdown, 'utf8')
  console.log(`Article genere : ${outputPath}`)
}

main().catch(err => {
  console.error('Erreur :', err.message)
  process.exit(1)
})
