---
title: "Automatiser l'import de fichiers CSV avec Power Query"
date: "2026-08-24"
slug: "automatiser-limport-de-fichiers-csv-avec-power-query"
description: "Découvrez comment automatiser l'import de fichiers CSV en couplant Power Query et VBA pour des traitements industriels robustes et performants."
---

# Automatiser l'import de fichiers CSV avec Power Query

Power Query s'est imposé comme l'outil de référence pour l'import de données dans Excel. Mais son interface graphique montre vite ses limites quand il faut traiter des dizaines de fichiers ou intégrer l'import dans un workflow automatisé. La bonne nouvelle : Power Query s'appuie sur le langage M, parfaitement pilotable en VBA.

Je vais vous montrer comment industrialiser vos imports CSV en combinant la puissance de Power Query avec la flexibilité du VBA. Pas de manipulation manuelle, pas de répétition : du code robuste qui gère les cas limites.

## Pourquoi coupler VBA et Power Query

Power Query excelle sur la transformation de données : nettoyage, typage, pivotage. Son interface génère du code M réutilisable. Mais pour automatiser l'exécution sur plusieurs fichiers, définir dynamiquement les chemins source, ou intégrer l'import dans une chaîne de traitement, le VBA reste indispensable.

L'approche classique en VBA pur (Open, Line Input, Split) est fragile : elle gère mal les guillemets, les séparateurs dans les valeurs, les encodages exotiques. Power Query encaisse ces problèmes sans broncher. En le pilotant en VBA, vous obtenez le meilleur des deux mondes.

Le principe : créer une requête Power Query paramétrée, puis la rafraîchir en changeant dynamiquement la source via VBA. Ou mieux : générer la requête M complète en VBA et l'injecter dans le classeur.

## Créer une requête Power Query en VBA

La méthode la plus fiable consiste à créer une requête manuellement une fois, observer le code M généré, puis le reproduire en VBA avec les paramètres variables. Voici une fonction qui crée une requête Power Query pointant vers un fichier CSV :

```vba
Option Explicit

Function CreerRequeteCSV(ByVal nomRequete As String, _
                         ByVal cheminFichier As String, _
                         ByVal separateur As String) As Boolean
    On Error GoTo GestionErreur
    
    Dim wb As Workbook
    Dim requeteM As String
    Dim connexion As WorkbookConnection
    
    Set wb = ThisWorkbook
    
    ' Construction de la requête M
    requeteM = "let" & vbCrLf & _
               "    Source = Csv.Document(File.Contents(""" & cheminFichier & """)," & _
               "[Delimiter=""" & separateur & """, Encoding=65001, QuoteStyle=QuoteStyle.Csv])," & vbCrLf & _
               "    TypeModifie = Table.PromoteHeaders(Source, [PromoteAllScalars=true])," & vbCrLf & _
               "    TypeDetecte = Table.TransformColumnTypes(TypeModifie," & _
               "Table.TransformTypeWithOptions(TypeModifie, {{each _, each try Number.From(_) " & _
               "otherwise _, type any}}, ""fr-FR""))" & vbCrLf & _
               "in" & vbCrLf & _
               "    TypeDetecte"
    
    ' Suppression si existe déjà
    On Error Resume Next
    wb.Queries(nomRequete).Delete
    On Error GoTo GestionErreur
    
    ' Création de la requête
    wb.Queries.Add Name:=nomRequete, Formula:=requeteM
    
    CreerRequeteCSV = True
    
Sortie:
    Set wb = Nothing
    Set connexion = Nothing
    Exit Function
    
GestionErreur:
    Debug.Print "Erreur " & Err.Number & ": " & Err.Description
    CreerRequeteCSV = False
    Resume Sortie
End Function
```

Cette fonction génère une requête qui détecte automatiquement les types de colonnes, gère l'encodage UTF-8 (65001), et applique les standards français pour les nombres. Le paramètre `cheminFichier` est injecté directement dans le code M.

## Charger les données dans une feuille

Créer la requête ne suffit pas : il faut charger les données. Voici une procédure qui rafraîchit une requête existante et charge le résultat dans une plage :

```vba
Option Explicit

Sub ChargerRequeteDansFeuille(ByVal nomRequete As String, _
                               ByVal feuilleCible As Worksheet, _
                               ByVal celluleDebut As String)
    On Error GoTo GestionErreur
    
    Dim wb As Workbook
    Dim requete As WorkbookQuery
    Dim listObj As ListObject
    Dim destRange As Range
    
    Set wb = ThisWorkbook
    Set requete = wb.Queries(nomRequete)
    Set destRange = feuilleCible.Range(celluleDebut)
    
    ' Suppression du tableau existant si présent
    On Error Resume Next
    feuilleCible.ListObjects(nomRequete).Delete
    On Error GoTo GestionErreur
    
    ' Création de la connexion et chargement
    Set listObj = feuilleCible.ListObjects.Add( _
        SourceType:=xlSrcQuery, _
        Source:="OLEDB;Provider=Microsoft.Mashup.OleDb.1;Data Source=$Workbook$;" & _
               "Location=" & nomRequete, _
        Destination:=destRange)
    
    listObj.Name = nomRequete
    listObj.QueryTable.Refresh BackgroundQuery:=False
    
Sortie:
    Set listObj = Nothing
    Set destRange = Nothing
    Set requete = Nothing
    Set wb = Nothing
    Exit Sub
    
GestionErreur:
    MsgBox "Erreur lors du chargement : " & Err.Description, vbCritical
    Resume Sortie
End Sub
```

Le paramètre `BackgroundQuery:=False` force l'attente de la fin de l'import avant de continuer. Crucial pour enchaîner des traitements.

## Les pièges à éviter

Les guillemets dans le code M : le moindre oubli fait planter la requête. Doublez systématiquement les guillemets dans les chaînes VBA destinées au code M.

L'encodage : si vos CSV contiennent des caractères accentués, spécifiez `Encoding=65001` (UTF-8) ou `Encoding=1252` (Windows) selon votre source.

Les requêtes orphelines : une requête Power Query sans connexion ne sert à rien. Vérifiez toujours que la requête est bien liée à un tableau ou une connexion active.

## Conclusion

Piloter Power Query en VBA transforme l'import CSV en véritable brique industrielle : robuste, paramétrable, traçable. Vous gérez facilement des imports multiples, des mises à jour programmées, des workflows complexes. Le code M reste lisible et maintenable, le VBA orchestre l'ensemble. Pour vos prochains projets d'automatisation, abandonnez les bidouilles à base de Split() : cette approche tient la route en production.