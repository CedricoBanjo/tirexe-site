// Pourquoi Tirexe : les quatre raisons du premier site, un exemple de code VBA écrit
// comme Cédric l'écrit, et les outils maîtrisés. L'exemple est un cas type, pas une mission réelle.
import { colorerVBA } from '../lib/coloration'

const RAISONS = [
  ["Vous m'avez en direct", "De la première discussion à la livraison finale — c'est moi, sans relai ni intermédiaire.",
    <path key="p" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" />],
  ['Expérience en environnements exigeants', 'Projets industriels critiques, finance de grands groupes, BTP — des contextes où la précision est une priorité absolue.',
    <path key="p" d="M12 3l8 4v5c0 4.6-3.3 8.2-8 9-4.7-.8-8-4.4-8-9V7z M8.5 12l2.4 2.4 4.6-4.8" />],
  ['Spécialiste des missions longues', "Je m'intègre dans vos équipes sur la durée, avec une vraie connaissance de votre contexte métier.",
    <path key="p" d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />],
  ['Flexible géographiquement', 'Sur site en région PACA ou en full remote partout en France, selon vos contraintes.',
    <path key="p" d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />],
]

// Exemple type : repérer les doublons d'une colonne, sur toutes les lignes, en une seule lecture de la feuille
const EXEMPLE = `Option Explicit

' Contrôle : liste les références en double, avec leur ligne
Public Function Doublons(ByVal plage As Range) As Collection
    Dim valeurs As Variant, vues As Object
    Dim i As Long, cle As String

    Set Doublons = New Collection
    If plage.Rows.Count < 2 Then Exit Function

    Set vues = CreateObject("Scripting.Dictionary")
    valeurs = plage.Columns(1).Value2   ' une seule lecture

    For i = 1 To UBound(valeurs, 1)
        cle = ""
        If Not IsError(valeurs(i, 1)) Then cle = CStr(valeurs(i, 1))
        If Len(cle) = 0 Then
            ' cellule vide ou en erreur : rien à comparer
        ElseIf vues.Exists(cle) Then
            Doublons.Add "Ligne " & plage.Row + i - 1 & " : " & cle
        Else
            vues.Add cle, i
        End If
    Next i
End Function`

const OUTILS = [
  ['VBA Excel', "Macros avancées, automatisation complète, API Windows, gestion d'événements", 'Expert'],
  ['Excel avancé', 'Formules matricielles, tableaux croisés, fonctions avancées', 'Expert'],
  ['Power Query', 'ETL natif Excel, transformations complexes, connexions multi-sources', 'Expert'],
  ['Word & PowerPoint', 'Génération automatique de documents et de présentations depuis Excel', 'Expert'],
  ['Outlook VBA', "Automatisation d'envois, gestion d'agenda, traitement de messagerie", 'Expert'],
  ['Access / SQL', 'Bases .mdb, .accdb, .mde : requêtes SQL depuis VBA, liaisons multi-tables', 'Avancé'],
]

export default function Pourquoi() {
  return (
    <section className="section section-douce" id="pourquoi">
      <div className="wrap">
        <div className="pourquoi-grille">
          <div className="pourquoi-texte">
            <header className="sec-tete revele">
              <p className="ey">Pourquoi Tirexe</p>
              <h2 className="sec-h">Un expert dédié à votre projet</h2>
            </header>
            <ul className="raisons">
              {RAISONS.map(([titre, texte, icone], i) => (
                <li className="raison revele" style={{ '--d': i }} key={titre}>
                  <span className="raison-ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" focusable="false">{icone}</svg>
                  </span>
                  <div>
                    <h3 className="raison-titre">{titre}</h3>
                    <p className="raison-texte">{texte}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <figure className="fenetre-code revele">
            <div className="fenetre-code-barre">
              <span className="fenetre-code-points" aria-hidden="true"><i /><i /><i /></span>
              <span className="fenetre-code-nom">Controles.bas</span>
              <span className="fenetre-code-etat">VBA</span>
            </div>
            <pre className="fenetre-code-pre" tabIndex={0} aria-label="Exemple de code VBA : lister les doublons d'une colonne"><code>{colorerVBA(EXEMPLE)}</code></pre>
            <figcaption className="fenetre-code-legende">
              Exemple type&nbsp;: une seule lecture de la feuille, un dictionnaire, et les cellules en erreur écartées.
              Rapide sur de gros volumes.
            </figcaption>
          </figure>
        </div>

        <div className="outils revele" id="outils">
          <h3 className="outils-titre">Maîtrise complète de l&apos;écosystème Office</h3>
          <p className="outils-sous">Des outils construits avec la bonne technologie et l&apos;expérience pour les combiner intelligemment.</p>
          <ul className="outils-liste">
            {OUTILS.map(([nom, usage, niveau]) => (
              <li className="outil" key={nom}>
                <span className="outil-nom">{nom}</span>
                <span className="outil-usage">{usage}</span>
                <span className={`outil-niveau${niveau === 'Expert' ? ' est-expert' : ''}`}>{niveau}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
