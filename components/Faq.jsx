import { EMAIL } from '../lib/site'
import { SERVICES } from '../lib/services'
import { typo } from '../lib/typo'

// Questions fréquentes de l'accueil. Les réponses reprennent ce que le site dit déjà
// (fonctionnement, zone, outils, secteurs) : rien d'inventé. Pas de balisage « FAQ » pour
// Google, qui ne l'affiche plus pour ce type de site ; le texte reste lu par les moteurs.
const [controle, applications, automatisation, donnees] = SERVICES

const QUESTIONS = [
  {
    q: 'Quels types de projets prenez-vous en charge ?',
    r: <>Quatre familles de besoins, chacune détaillée sur sa page&nbsp;: le <a href={`/services/${controle.slug}`}>contrôle et la vérification de données</a>, les <a href={`/services/${applications.slug}`}>applications Excel sur mesure</a>, l&apos;<a href={`/services/${automatisation.slug}`}>automatisation du reporting</a> et les <a href={`/services/${donnees.slug}`}>bases Access et SQL</a> reliées à Excel.</>,
  },
  {
    q: 'Comment se passe une mission en régie ?',
    r: <>Je rejoins votre équipe pour la durée de la mission, facturée à la journée. Je suis votre seul interlocuteur, du cadrage jusqu&apos;à la livraison finale, sans intermédiaire.</>,
  },
  {
    q: 'Quel est votre tarif ?',
    r: <>Sur devis. Après un premier échange sur votre besoin, je vous envoie une proposition de mission&nbsp;: le tarif, la durée envisagée et l&apos;organisation du travail.</>,
  },
  {
    q: 'Travaillez-vous sur site ou à distance ?',
    r: <>Les deux. Basé à Martigues, j&apos;interviens sur site à Marseille, Aix-en-Provence, Fos-sur-Mer, Vitrolles, Istres et dans toute la région PACA, ou en full remote partout en France, selon vos contraintes.</>,
  },
  {
    q: 'Quelle durée de mission ?',
    r: <>Je fais généralement des missions longues&nbsp;: je m&apos;intègre dans vos équipes sur la durée, avec une vraie connaissance de votre contexte métier. La durée envisagée se discute dès le premier échange.</>,
  },
  {
    q: 'Avec quels outils travaillez-vous ?',
    r: <>VBA Excel, Excel avancé, Power Query, Word et PowerPoint, Outlook VBA, Access et SQL. Je choisis la technologie adaptée à chaque besoin, et je sais les combiner. Le détail est dans la partie <a href="#outils">Outils &amp; technologies</a>.</>,
  },
  {
    q: 'Dans quels secteurs intervenez-vous ?',
    r: <>Nucléaire et énergie, BTP et génie civil, finance et contrôle de gestion, industrie lourde, tertiaire et services, génie électrique et infrastructure.</>,
  },
  {
    q: 'Comment démarrer ?',
    r: <>Décrivez votre besoin dans le <a href="#contact">formulaire de contact</a> ou par e-mail à <a href={`mailto:${EMAIL}`}>{EMAIL}</a>&nbsp;: le contexte, la nature de la mission et la durée envisagée. On en parle ensuite par appel ou par e-mail, sans formalité.</>,
  },
]

export default function Faq() {
  return (
    <div className="section section-alt" id="faq">
      <div className="wrap">
        <div className="ey">Questions fréquentes</div>
        <h2 className="sec-h">Vos questions, <em>mes réponses</em></h2>
        <div className="faq-list">
          {QUESTIONS.map(({ q, r }) => (
            <details className="faq-item" key={q}>
              <summary>{typo(q)}</summary>
              <p>{r}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
