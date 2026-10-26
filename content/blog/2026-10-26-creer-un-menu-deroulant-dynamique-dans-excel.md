---
title: "Créer un menu déroulant dynamique dans Excel"
date: "2026-10-26"
slug: "creer-un-menu-deroulant-dynamique-dans-excel"
description: "Menu déroulant dynamique Excel : guide complet VBA et formules pour automatiser vos listes de validation sans maintenance manuelle."
---

# Créer un menu déroulant dynamique dans Excel

Les menus déroulants statiques, c'est bien pour les listes figées. Mais sur des projets industriels, vos données évoluent : nouveaux produits, nouvelles références, nouveaux sites. Maintenir manuellement des plages nommées devient vite ingérable et source d'erreurs.

Un menu déroulant dynamique s'adapte automatiquement à vos données source. Ajoutez une ligne dans votre tableau, le menu se met à jour. Supprimez un élément obsolète, il disparaît des choix. Zéro maintenance manuelle.

Je vais vous montrer deux approches : l'une sans code pour les cas simples, l'autre avec VBA pour les besoins avancés comme les listes en cascade ou les filtres conditionnels.

## Pourquoi dynamiser vos menus déroulants

Dans les projets que j'ai menés, les menus statiques créent trois problèmes récurrents :

**La maintenance chronophage** : chaque modification de la liste impose de mettre à jour la validation de données sur toutes les feuilles concernées. Sur des fichiers multi-onglets avec des dizaines d'utilisateurs, c'est la garantie d'oublier une référence.

**Les erreurs de saisie** : quand le menu n'est plus à jour, les utilisateurs saisissent en texte libre. Vous perdez la standardisation et vos tableaux croisés dynamiques deviennent inexploitables.

**La rigidité fonctionnelle** : impossible de créer facilement des listes dépendantes (région → pays → ville) sans VBA, ce qui limite l'ergonomie de vos interfaces.

## Approche sans VBA : formules et tableaux structurés

Pour une liste simple qui s'ajuste automatiquement, utilisez les tableaux structurés Excel (Insertion → Tableau).

Créez votre tableau source sur une feuille dédiée, nommez-le explicitement via Création de tableau → Nom du tableau, par exemple `TBL_Produits`. La colonne contenant vos valeurs s'appelle automatiquement `TBL_Produits[Référence]` si votre en-tête est "Référence".

Dans la validation de données (Données → Validation des données), choisissez Liste et entrez comme source :

```
=TBL_Produits[Référence]
```

Avantage : toute ligne ajoutée au tableau est instantanément disponible dans le menu. Aucun code, aucune plage nommée à redéfinir. Pour les doublons, ajoutez une colonne calculée avec `UNIQUE()` si vous êtes en Excel 365.

Limite : cette méthode ne gère pas les dépendances entre listes ni les filtres conditionnels complexes.

## Approche VBA : menus en cascade et filtrage avancé

Pour des menus dépendants (sélectionner une catégorie, puis un produit de cette catégorie), le VBA devient incontournable.

Principe : à chaque changement de valeur dans une cellule, on filtre dynamiquement la source du menu suivant. On utilise un Dictionary pour performance et déduplication.

```vba
Option Explicit

Private Sub Worksheet_Change(ByVal Target As Range)
    Dim rngCategorie As Range, rngProduit As Range
    Dim wsData As Worksheet, lastRow As Long
    
    On Error GoTo ErrorHandler
    
    Set rngCategorie = Me.Range("B2")
    Set rngProduit = Me.Range("C2")
    
    ' Détecte le changement de catégorie
    If Not Intersect(Target, rngCategorie) Is Nothing Then
        If rngCategorie.Value <> "" Then
            Application.EnableEvents = False
            rngProduit.ClearContents
            Call AlimenterListeProduits(rngCategorie.Value, rngProduit)
            Application.EnableEvents = True
        End If
    End If
    
ExitHandler:
    Set rngCategorie = Nothing
    Set rngProduit = Nothing
    Set wsData = Nothing
    Exit Sub
    
ErrorHandler:
    Application.EnableEvents = True
    MsgBox "Erreur : " & Err.Description, vbCritical
    Resume ExitHandler
End Sub
```

La fonction de filtrage utilise un Dictionary pour éliminer les doublons et construire la liste :

```vba
Option Explicit

Private Function AlimenterListeProduits(ByVal categorie As String, _
                                        ByVal celluleCible As Range) As Boolean
    Dim wsData As Worksheet
    Dim dictProduits As Object
    Dim arrData() As Variant
    Dim i As Long, lastRow As Long
    Dim listeProduits As String
    
    On Error GoTo ErrorHandler
    
    Set wsData = ThisWorkbook.Worksheets("Data")
    Set dictProduits = CreateObject("Scripting.Dictionary")
    
    lastRow = wsData.Cells(wsData.Rows.Count, "A").End(xlUp).Row
    arrData = wsData.Range("A2:B" & lastRow).Value
    
    ' Filtrage et déduplication en mémoire
    For i = LBound(arrData, 1) To UBound(arrData, 1)
        If arrData(i, 1) = categorie And arrData(i, 2) <> "" Then
            If Not dictProduits.Exists(arrData(i, 2)) Then
                dictProduits.Add arrData(i, 2), Nothing
            End If
        End If
    Next i
    
    ' Construction de la validation
    If dictProduits.Count > 0 Then
        listeProduits = Join(dictProduits.Keys, ",")
        With celluleCible.Validation
            .Delete
            .Add Type:=xlValidateList, Formula1:=listeProduits
        End With
        AlimenterListeProduits = True
    End If
    
ExitHandler:
    Set dictProduits = Nothing
    Set wsData = Nothing
    Exit Function
    
ErrorHandler:
    AlimenterListeProduits = False
    Resume ExitHandler
End Function
```

Cette approche traite les données en mémoire via un tableau, utilise un Dictionary pour la performance, et reconstruit la validation uniquement avec les valeurs pertinentes.

## Conclusion

Pour des listes simples, les tableaux structurés suffisent largement et évitent le code. Dès que vous avez des dépendances ou du filtrage métier, le VBA avec Dictionary devient indispensable pour maintenir les performances sur de gros volumes. L'investissement initial est rentabilisé dès la première modification de données source.