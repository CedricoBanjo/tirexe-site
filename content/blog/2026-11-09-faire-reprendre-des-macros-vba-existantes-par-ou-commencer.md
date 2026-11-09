---
title: "Reprise de macros VBA : par où commencer"
date: "2026-11-09"
slug: "faire-reprendre-des-macros-vba-existantes-par-ou-commencer"
description: "Reprendre des macros VBA existantes : sécuriser, cartographier, stabiliser. La méthode pour éviter les erreurs et les risques avant toute évolution."
---

# Reprise de macros VBA : par où commencer

Une macro qui tourne depuis des années finit par devenir une dépendance critique. Son auteur a changé de poste ou quitté l'entreprise, personne n'ose la modifier, et chaque évolution du reporting ou du système d'information fait peser un risque sur des chiffres que la direction consomme sans les remettre en cause. Reprendre ce type de code ne commence pas par le code. Cela commence par comprendre ce que l'outil garantit, à qui, et ce qui se passe s'il s'arrête.

## Pourquoi on ne réécrit pas tout de suite

La tentation est de repartir de zéro. C'est souvent une erreur : le code existant contient des règles métier jamais documentées (arrondis, exclusions, cas particuliers) qui n'existent nulle part ailleurs. Une réécriture sans inventaire fait disparaître ces règles, et les écarts n'apparaissent que des semaines plus tard, quand un chiffre ne colle plus.

Le bon ordre : sécuriser, comprendre, mesurer, puis seulement modifier.

## Étape 1 : sécuriser l'existant

Avant toute lecture du code, on fige l'état actuel :

- copie du classeur dans un dépôt versionné ou, a minima, un dossier archivé et daté ;
- conservation d'un jeu de données réel avec les résultats actuellement produits, qui servira de référence ;
- identification des utilisateurs, de la fréquence d'usage et des fichiers ou bases consultés.

Ce jeu de référence est l'élément le plus utile de la reprise : il permet de prouver qu'une modification ne change pas les résultats.

## Étape 2 : cartographier le code

Il faut savoir ce que le classeur contient réellement : modules, formulaires, références externes, appels à d'autres fichiers, connexions de données, chemins réseau en dur, dépendances à un poste particulier. Les références manquantes et les liaisons tardives sont les premières causes de blocage lors d'un changement de version d'Office ou de poste.

On peut automatiser un premier état des lieux. La fonction suivante liste les composants VBA d'un classeur avec leur type et leur nombre de lignes. Elle nécessite d'activer « Accès approuvé au modèle d'objet du projet VBA » dans le Centre de gestion de la confidentialité.

```vba
Option Explicit

' Retourne un tableau 2D : nom, type, nombre de lignes
Public Function InventaireComposants(ByVal wbCible As Workbook) As Variant
    Dim vbComp As Object
    Dim resultat() As Variant
    Dim i As Long
    Dim nbComp As Long

    On Error GoTo Gestion

    nbComp = wbCible.VBProject.VBComponents.Count
    ReDim resultat(1 To nbComp, 1 To 3)

    For Each vbComp In wbCible.VBProject.VBComponents
        i = i + 1
        resultat(i, 1) = vbComp.Name
        Select Case vbComp.Type
            Case 1: resultat(i, 2) = "Module standard"
            Case 2: resultat(i, 2) = "Module de classe"
            Case 3: resultat(i, 2) = "UserForm"
            Case Else: resultat(i, 2) = "Document"
        End Select
        resultat(i, 3) = vbComp.CodeModule.CountOfLines
    Next vbComp

    InventaireComposants = resultat

Sortie:
    Set vbComp = Nothing
    Exit Function

Gestion:
    InventaireComposants = CVErr(xlErrValue)
    Resume Sortie
End Function
```

Le résultat s'écrit d'un bloc dans une feuille avec `Range("A2").Resize(UBound(t, 1), 3).Value = t`, sans boucle sur les cellules.

## Étape 3 : repérer les points de fragilité

Une fois la structure connue, on cherche les risques concrets :

- absence de `Option Explicit`, donc variables non déclarées et fautes de frappe silencieuses ;
- gestion d'erreurs absente ou réduite à `On Error Resume Next` posé sur de longues portions ;
- boucles cellule par cellule sur de grandes plages, lentes et sensibles aux changements de mise en forme ;
- plages codées en dur (`A1:A5000`) qui ignorent les nouvelles lignes ;
- mots de passe, chemins et paramètres écrits dans le code plutôt que dans une feuille de configuration.

Ces points se classent par impact : ce qui peut produire un résultat faux sans le signaler passe avant ce qui ralentit simplement l'exécution.

## Étape 4 : stabiliser avant d'améliorer

Les premières interventions doivent rester sans effet fonctionnel : ajout de `Option Explicit`, typage des variables, gestion d'erreurs avec sortie propre, sortie des paramètres dans une feuille dédiée, commentaires sur les règles métier découvertes. Après chaque lot, on relance le jeu de référence et on compare.

Vient ensuite l'optimisation : lecture des plages dans des tableaux en mémoire, recherches et dédoublonnages via `Scripting.Dictionary`, découpage des longues procédures en fonctions testables.

## Décider : reprendre, refactorer ou migrer

Tout n'a pas vocation à rester en VBA. Si l'outil devient central, multi-utilisateurs ou connecté à de gros volumes, la question d'une base de données ou d'un autre outil se pose. Mais cette décision se prend sur la base de l'inventaire, pas avant.

## En résumé

Une reprise réussie repose sur une référence de résultats, un inventaire du code et des corrections progressives vérifiables. Il vaut mieux se faire accompagner lorsque l'outil est critique, mal documenté et que personne en interne ne peut valider ses résultats.