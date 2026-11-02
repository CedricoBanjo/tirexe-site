---
title: "Les graphiques Excel avancés : sparklines, bulles et radar"
date: "2026-11-02"
slug: "les-graphiques-excel-avances-sparklines-bulles-et-radar"
description: "Créez des sparklines, graphiques bulles et radar en VBA Excel avec du code robuste et performant pour vos tableaux de bord industriels."
---

# Les graphiques Excel avancés : sparklines, bulles et radar

Les tableaux de bord métiers exigent des visualisations pertinentes et rapides à produire. Sparklines, graphiques bulles et radar répondent à des besoins précis : tendances synthétiques, analyse tridimensionnelle et comparaisons multidimensionnelles. Maîtriser leur création et personnalisation en VBA permet d'automatiser des reportings complexes et d'offrir une flexibilité que l'interface Excel classique ne permet pas toujours.

Cet article détaille leur manipulation programmatique, avec du code robuste et performant pour vos projets industriels.

## Sparklines : des micro-graphiques puissants

Les sparklines sont apparus dans Excel 2010. Ces mini-graphiques insérés dans une cellule unique visualisent une tendance sans occuper l'espace d'un graphique traditionnel. Trois types existent : Line, Column et Win/Loss.

En VBA, la création passe par la collection `SparklineGroups`. L'objet `Range` dispose d'une propriété `SparklineGroups` qui gère l'ensemble des sparklines d'une plage.

**Pourquoi automatiser les sparklines ?** Dans un reporting multi-onglets avec des dizaines de lignes produits, créer manuellement des sparklines devient chronophage. Un code VBA parcourt les données, identifie les plages sources et génère automatiquement les sparklines avec un formatage cohérent.

```vba
Option Explicit

Sub CreerSparklinesOptimise()
    Dim ws As Worksheet
    Dim rngSource As Range
    Dim rngDestination As Range
    Dim sg As SparklineGroup
    Dim i As Long
    Dim derniereLigne As Long
    
    On Error GoTo Erreur
    
    Set ws = ThisWorkbook.Worksheets("Ventes")
    derniereLigne = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    
    ' Suppression des sparklines existantes
    ws.Range("G2:G" & derniereLigne).SparklineGroups.Clear
    
    ' Création du groupe de sparklines
    Set rngSource = ws.Range("B2:F" & derniereLigne)
    Set rngDestination = ws.Range("G2:G" & derniereLigne)
    
    Set sg = ws.Range("G2:G" & derniereLigne).SparklineGroups.Add( _
        Type:=xlSparkLine, _
        SourceData:=rngSource.Address(True, True, xlR1C1))
    
    ' Personnalisation
    With sg
        .Points.Highpoint.Visible = True
        .Points.Lowpoint.Visible = True
        .Points.Highpoint.Color.Color = RGB(0, 176, 80)
        .Points.Lowpoint.Color.Color = RGB(255, 0, 0)
        .LineWeight = 1.5
    End With
    
Sortie:
    Set sg = Nothing
    Set rngDestination = Nothing
    Set rngSource = Nothing
    Set ws = Nothing
    Exit Sub
    
Erreur:
    MsgBox "Erreur " & Err.Number & " : " & Err.Description
    Resume Sortie
End Sub
```

**Point technique** : l'adresse source doit être en notation R1C1 lors de la création programmatique. La méthode `Clear` supprime les sparklines existantes pour éviter les doublons. La personnalisation via `Points` permet de mettre en évidence les valeurs extrêmes.

## Graphiques bulles : trois dimensions en un coup d'œil

Les graphiques bulles (bubble charts) représentent trois variables : X, Y et la taille de la bulle. Ils excellent pour analyser des corrélations avec une dimension quantitative supplémentaire, comme le chiffre d'affaires par produit (X=coût, Y=marge, taille=CA).

La création VBA utilise `Charts.Add` puis configure le type `xlBubble`. Le piège classique : Excel attend des séries structurées avec `XValues`, `Values` et `BubbleSizes` tous cohérents en taille.

**Optimisation critique** : charger les données dans des tableaux mémoire avant de les affecter aux séries évite les multiples accès cellule par cellule qui pénalisent lourdement les performances.

```vba
Option Explicit

Function CreerGraphiqueBulles(ws As Worksheet, rngData As Range) As Chart
    Dim cht As Chart
    Dim ser As Series
    Dim dataArr As Variant
    Dim xVals() As Variant
    Dim yVals() As Variant
    Dim bubbleSizes() As Variant
    Dim i As Long
    Dim nbLignes As Long
    
    On Error GoTo Erreur
    
    ' Chargement mémoire
    dataArr = rngData.Value
    nbLignes = UBound(dataArr, 1) - 1
    
    ReDim xVals(1 To nbLignes)
    ReDim yVals(1 To nbLignes)
    ReDim bubbleSizes(1 To nbLignes)
    
    For i = 2 To UBound(dataArr, 1)
        xVals(i - 1) = dataArr(i, 1)
        yVals(i - 1) = dataArr(i, 2)
        bubbleSizes(i - 1) = dataArr(i, 3)
    Next i
    
    ' Création graphique
    Set cht = ws.Parent.Charts.Add
    cht.ChartType = xlBubble
    
    Set ser = cht.SeriesCollection.NewSeries
    ser.XValues = xVals
    ser.Values = yVals
    ser.BubbleSizes = bubbleSizes
    ser.Name = "Analyse produits"
    
    With cht
        .HasTitle = True
        .ChartTitle.Text = "Matrice Coût-Marge-CA"
    End With
    
    Set CreerGraphiqueBulles = cht
    Exit Function
    
Erreur:
    Set CreerGraphiqueBulles = Nothing
End Function
```

## Graphiques radar : comparaisons multidimensionnelles

Les graphiques radar (ou spider charts) comparent plusieurs variables pour une ou plusieurs entités. Parfaits pour les évaluations de compétences, benchmarks produits ou analyses multicritères.

Excel propose trois variantes : `xlRadar`, `xlRadarMarkers` et `xlRadarFilled`. La création VBA suit la logique classique des graphiques, mais la lisibilité dépend fortement du nombre d'axes (6 à 8 maximum recommandé).

**Astuce métier** : les graphiques radar nécessitent une normalisation préalable des données si les échelles diffèrent fortement entre critères. Un prix en milliers d'euros et un score satisfaction sur 10 doivent être ramenés sur des échelles comparables, souvent 0-100%.

La manipulation programmatique permet d'automatiser cette normalisation et la création du graphique dans une chaîne de traitement complète.

## Conclusion

Sparklines, bulles et radar enrichissent considérablement vos tableaux de bord. Leur automatisation VBA garantit cohérence, performance et maintenabilité sur des reportings complexes. Le code présenté ici intègre les bonnes pratiques : gestion d'erreurs, libération mémoire, et utilisation de tableaux plutôt que de boucles cellule par cellule.