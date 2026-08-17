---
title: "Power Query : supprimer les doublons et nettoyer les données"
date: "2026-08-17"
slug: "power-query-supprimer-les-doublons-et-nettoyer-les-donnees"
description: "Power Query : dédoublonnage automatique et nettoyage de données pour projets Excel industriels. Guide technique avec exemples VBA."
---

# Power Query : supprimer les doublons et nettoyer les données

Power Query s'est imposé comme l'outil de référence pour la préparation de données dans Excel. Si vous gérez des flux de données récurrents avec des milliers de lignes issues de sources hétérogènes, vous avez besoin d'un processus reproductible et performant. Le nettoyage manuel est une perte de temps. Power Query automatise le dédoublonnage et la standardisation, avec une logique visuelle que vos équipes pourront maintenir.

Contrairement au VBA qui nécessite du code pour chaque cas, Power Query enregistre les transformations dans un langage M qui se rejoue à chaque actualisation. Pour les responsables techniques, c'est un gain de maintenance : une fois le flux paramétré, il fonctionne de manière autonome.

## Pourquoi Power Query plutôt que VBA pour le nettoyage

Power Query charge les données en mémoire et applique les transformations de manière optimisée. Un fichier de 100 000 lignes se traite en quelques secondes. En VBA, même avec des tableaux en mémoire, vous devrez écrire et maintenir du code pour chaque colonne à nettoyer.

L'autre avantage : la traçabilité. Chaque étape de transformation apparaît dans le volet "Étapes appliquées". Un nouveau collaborateur comprend immédiatement ce qui a été fait. En VBA, il faut lire et interpréter le code.

Enfin, Power Query gère nativement les types de données et détecte automatiquement les formats. Vous évitez les erreurs de conversion entre texte et nombre qui polluent les macros VBA mal conçues.

## Supprimer les doublons : les trois méthodes

**Suppression simple sur toutes les colonnes** : sélectionnez votre table dans Power Query, puis Accueil > Supprimer les lignes > Supprimer les doublons. Power Query garde la première occurrence et élimine les suivantes. Cette méthode convient quand toutes vos colonnes définissent l'unicité.

**Suppression sur colonnes spécifiques** : souvent, seules certaines colonnes déterminent l'unicité (par exemple, un numéro de commande ou un email). Sélectionnez ces colonnes avec Ctrl+clic, clic droit > Supprimer les doublons. Power Query conserve la première ligne rencontrée et supprime les autres, même si d'autres colonnes diffèrent.

**Marquage des doublons pour analyse** : avant de supprimer, vous voulez parfois identifier les doublons. Utilisez Ajouter une colonne > Colonne d'index, puis Grouper par vos colonnes clés avec l'opération "Nombre de lignes". Les lignes avec un compte supérieur à 1 sont des doublons. Vous pouvez ensuite filtrer ou exporter ces lignes pour validation métier.

## Nettoyer les données textuelles

Les données importées contiennent souvent des espaces parasites, des casses incohérentes, ou des caractères invisibles. Power Query propose des transformations standard efficaces.

**Espaces et casse** : Transformer > Format > Supprimer les espaces de début/fin élimine les espaces inutiles. Suivez avec Mettre en majuscules/minuscules selon vos besoins. Pour les noms propres, utilisez Mettre en forme > Première lettre en majuscule.

**Remplacements multiples** : pour standardiser des valeurs (par exemple "Oui", "O", "Yes" → "OUI"), utilisez Transformer > Remplacer les valeurs. Enchaînez plusieurs étapes de remplacement. Power Query les enregistre toutes et les rejouera automatiquement.

**Nettoyage avancé avec des colonnes conditionnelles** : pour une logique plus complexe, ajoutez une colonne conditionnelle (Ajouter une colonne > Colonne conditionnelle). Vous définissez des règles "Si... Alors... Sinon" directement dans l'interface. C'est plus maintenable que des formules SI imbriquées.

## Combiner Power Query et VBA pour l'industrialisation

Power Query excelle dans la transformation, mais certains projets nécessitent du VBA pour orchestrer plusieurs requêtes ou automatiser l'actualisation avec des paramètres dynamiques.

```vba
Option Explicit

Function ActualiserRequetesEtNettoyerErreurs() As Boolean
    On Error GoTo ErrorHandler
    
    Dim wb As Workbook
    Dim qry As WorkbookQuery
    Dim cn As WorkbookConnection
    Dim lErreurCount As Long
    
    Set wb = ThisWorkbook
    lErreurCount = 0
    
    ' Actualiser toutes les requêtes Power Query
    For Each cn In wb.Connections
        If cn.Type = xlConnectionTypeOLEDB Then
            cn.Refresh
        End If
    Next cn
    
    ' Vérifier les erreurs dans les tables de résultat
    Dim ws As Worksheet
    Dim lo As ListObject
    
    For Each ws In wb.Worksheets
        For Each lo In ws.ListObjects
            If WorksheetFunction.CountIf(lo.DataBodyRange, "Error") > 0 Then
                lErreurCount = lErreurCount + 1
            End If
        Next lo
    Next ws
    
    If lErreurCount = 0 Then
        ActualiserRequetesEtNettoyerErreurs = True
    Else
        MsgBox "Attention : " & lErreurCount & " table(s) contiennent des erreurs.", vbExclamation
        ActualiserRequetesEtNettoyerErreurs = False
    End If
    
ExitHandler:
    Set wb = Nothing
    Set qry = Nothing
    Set cn = Nothing
    Set ws = Nothing
    Set lo = Nothing
    Exit Function
    
ErrorHandler:
    MsgBox "Erreur lors de l'actualisation : " & Err.Description, vbCritical
    ActualiserRequetesEtNettoyerErreurs = False
    Resume ExitHandler
End Function
```

Cette fonction actualise toutes les connexions Power Query et vérifie qu'aucune erreur n'est remontée dans les tables de résultat. Utilisez-la dans vos workflows automatisés pour garantir la qualité des données avant traitement.

## Paramétrer les sources de données dynamiquement

Pour des projets industriels, vos sources changent régulièrement (nouveau fichier mensuel, changement de chemin réseau). Power Query permet de paramétrer ces sources.

Créez un paramètre (Gérer les paramètres > Nouveau paramètre) contenant le chemin du fichier source. Modifiez ensuite la source de votre requête pour référencer ce paramètre. En VBA, mettez à jour ce paramètre avant actualisation :

```vba
Option Explicit

Sub MettreAJourSourcePowerQuery(ByVal sNouveauChemin As String)
    On Error GoTo ErrorHandler
    
    Dim wb As Workbook
    Dim qry As WorkbookQuery
    Dim sNomParametre As String
    
    Set wb = ThisWorkbook
    sNomParametre = "CheminSource"
    
    ' Chercher et mettre à jour le paramètre
    On Error Resume Next
    Set qry = wb.Queries(sNomParametre)
    On Error GoTo ErrorHandler
    
    If Not qry Is Nothing Then
        wb.Queries(sNomParametre).Formula = "= """ & sNouveauChemin & """"
    Else
        MsgBox "Paramètre " & sNomParametre & " introuvable.", vbExclamation
        Exit Sub
    End If
    
    ' Actualiser les données
    wb.RefreshAll
    
ExitHandler:
    Set wb = Nothing
    Set qry = Nothing
    Exit Sub
    
ErrorHandler:
    MsgBox "Erreur lors de la mise à jour : " & Err.Description, vbCritical
    Resume ExitHandler
End Sub
```

Cette approche hybride conserve la puissance de transformation de Power Query tout en donnant au VBA le contrôle sur l'orchestration globale.

## Conclusion

Power Query transforme le nettoyage de données en processus reproductible et maintenable. Pour vos flux récurrents, construisez vos requêtes une fois, documentez les étapes, et laissez l'outil travailler. Réservez le VBA pour l'orchestration et les contrôles qualité post-traitement. Cette combinaison offre robustesse et performance sur les projets industriels à long terme.