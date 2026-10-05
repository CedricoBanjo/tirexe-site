---
title: "Mise en forme conditionnelle Excel : exemples avancés"
date: "2026-10-05"
slug: "mise-en-forme-conditionnelle-excel-exemples-avances"
description: "Pilotez la mise en forme conditionnelle Excel en VBA pour automatiser le déploiement de règles complexes et gérer efficacement les gros volumes de données."
---

# Mise en forme conditionnelle Excel : exemples avancés

La mise en forme conditionnelle (MFC) native d'Excel atteint vite ses limites sur des projets industriels : règles multiples qui se chevauchent, performances dégradées sur de gros volumes, maintenance cauchemardesque. Pourtant, piloter la MFC en VBA ouvre des possibilités considérables : règles dynamiques basées sur des calculs complexes, application conditionnelle selon le contexte métier, gestion centralisée.

Cet article présente deux approches avancées : la création de règles de mise en forme conditionnelle par VBA pour automatiser leur déploiement, et le formatage direct par code quand la MFC native devient un frein.

## Pourquoi piloter la mise en forme conditionnelle en VBA

Sur un tableau de suivi de production avec 50 000 lignes et 15 colonnes, j'ai vu Excel devenir inutilisable avec seulement 8 règles de MFC natives. Chaque modification déclenchait un recalcul global. La solution : supprimer toutes les règles et formater directement les cellules selon les critères métier en VBA, avec recalcul manuel déclenché au besoin.

Autre cas concret : un outil de planification où les règles de coloration dépendent du profil utilisateur connecté. Impossible avec la MFC native, trivial en VBA en interrogeant la base de droits puis en appliquant les règles correspondantes.

Le pilotage VBA permet aussi de versionner les règles de formatage dans le code source, de les documenter proprement, et de les déployer automatiquement sur de nouveaux classeurs via des modèles.

## Créer des règles de MFC dynamiques par code

Cette première approche utilise l'objet `FormatConditions` pour créer des règles programmatiquement. Avantage : les règles restent visibles dans l'interface Excel et modifiables manuellement si besoin.

```vba
Option Explicit

Public Sub AppliquerMFCProduction(ByVal ws As Worksheet, _
                                   ByVal plageDebut As String, _
                                   ByVal plageFin As String)
    On Error GoTo ErrorHandler
    
    Dim plage As Range
    Dim fc As FormatCondition
    Dim seuilAlerte As Double
    Dim seuilCritique As Double
    
    ' Récupération des seuils depuis paramètres
    seuilAlerte = 0.8
    seuilCritique = 0.95
    
    Set plage = ws.Range(plageDebut & ":" & plageFin)
    
    ' Suppression des règles existantes
    plage.FormatConditions.Delete
    
    ' Règle 1 : Alerte orange si >= 80%
    Set fc = plage.FormatConditions.Add(Type:=xlCellValue, _
                                        Operator:=xlGreaterEqual, _
                                        Formula1:="=" & seuilAlerte)
    With fc.Interior
        .Color = RGB(255, 200, 100)
        .TintAndShade = 0
    End With
    
    ' Règle 2 : Critique rouge si >= 95%
    Set fc = plage.FormatConditions.Add(Type:=xlCellValue, _
                                        Operator:=xlGreaterEqual, _
                                        Formula1:="=" & seuilCritique)
    With fc.Interior
        .Color = RGB(255, 100, 100)
        .TintAndShade = 0
    End With
    fc.Font.Bold = True
    
ExitProc:
    Set plage = Nothing
    Set fc = Nothing
    Exit Sub
    
ErrorHandler:
    MsgBox "Erreur application MFC : " & Err.Description, vbCritical
    Resume ExitProc
End Sub
```

Cette méthode convient pour déployer rapidement des règles standardisées sur plusieurs feuilles ou classeurs. Attention toutefois : la multiplication des règles impacte les performances.

## Formatage direct sans MFC pour les gros volumes

Sur des tableaux volumineux, le formatage direct est bien plus performant. On lit les données en mémoire, on applique la logique métier, on écrit le format. Pas de recalcul automatique, contrôle total.

```vba
Option Explicit

Public Sub FormaterTableauProduction(ByVal ws As Worksheet)
    On Error GoTo ErrorHandler
    
    Dim donnees As Variant
    Dim plage As Range
    Dim i As Long
    Dim seuilAlerte As Double
    Dim seuilCritique As Double
    Dim valeur As Double
    Dim cellule As Range
    
    seuilAlerte = 0.8
    seuilCritique = 0.95
    
    ' Chargement en mémoire (colonne E, lignes 2 à dernière)
    Set plage = ws.Range("E2:E" & ws.Cells(ws.Rows.Count, "E").End(xlUp).Row)
    donnees = plage.Value
    
    ' Désactivation temporaire calculs et affichage
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual
    
    ' Parcours et formatage
    For i = 1 To UBound(donnees, 1)
        If IsNumeric(donnees(i, 1)) Then
            valeur = CDbl(donnees(i, 1))
            Set cellule = plage.Cells(i, 1)
            
            If valeur >= seuilCritique Then
                cellule.Interior.Color = RGB(255, 100, 100)
                cellule.Font.Bold = True
            ElseIf valeur >= seuilAlerte Then
                cellule.Interior.Color = RGB(255, 200, 100)
                cellule.Font.Bold = False
            Else
                cellule.Interior.ColorIndex = xlNone
                cellule.Font.Bold = False
            End If
        End If
    Next i
    
ExitProc:
    Application.ScreenUpdating = True
    Application.Calculation = xlCalculationAutomatic
    Set plage = Nothing
    Set cellule = Nothing
    Exit Sub
    
ErrorHandler:
    MsgBox "Erreur formatage : " & Err.Description, vbCritical
    Resume ExitProc
End Sub
```

Cette approche est jusqu'à 50 fois plus rapide sur 20 000 lignes. Inconvénient : le format n'est pas dynamique, il faut relancer la macro après modification des données.

## Choisir la bonne approche

Utilisez la MFC pilotée par VBA pour des règles métier complexes à déployer sur des plages modérées (moins de 5 000 cellules). Privilégiez le formatage direct pour les tableaux volumineux avec rafraîchissement manuel, ou quand la logique métier implique des calculs impossibles en formule Excel.

Dans les deux cas, documentez clairement la logique de coloration dans le code. Les règles de formatage portent souvent de la connaissance métier critique qu'il serait dommage de perdre.