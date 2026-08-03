---
title: "Power Query : nettoyer et transformer des données en 10 minutes"
date: "2026-08-03"
slug: "power-query-nettoyer-et-transformer-des-donnees-en-10-minutes"
description: "Power Query nettoie vos données Excel en minutes. Guide pratique pour responsables techniques : transformations essentielles et intégration VBA."
---

# Power Query : nettoyer et transformer des données en 10 minutes

Power Query, c'est l'outil qu'on aurait dû avoir depuis 20 ans dans Excel. Fini les macros de 300 lignes pour nettoyer des exports CSV mal fichés, fini les formules imbriquées sur 15 niveaux pour dédoublonner ou pivoter. Power Query fait ça en quelques clics, de manière reproductible, et surtout sans toucher aux données sources.

Pour les responsables de projets industriels qui manipulent quotidiennement des extraits ERP, des rapports de production ou des données IoT, Power Query représente un gain de temps considérable. L'idée : enregistrer une séquence de transformations qu'on rejoue à la demande sur des données actualisées.

## Pourquoi Power Query plutôt que VBA

J'écris du VBA depuis des années, et pourtant je vous recommande Power Query pour 80% des traitements de nettoyage. Voici pourquoi :

**Performance** : Power Query charge les données en mémoire et applique les transformations de manière optimisée. Pas de Select, pas de boucles cellule par cellule. Pour un fichier de 50 000 lignes, on passe de plusieurs minutes en VBA à quelques secondes.

**Traçabilité** : chaque étape de transformation est visible, nommée, modifiable. Un collègue reprend votre fichier six mois plus tard ? Il comprend immédiatement ce qui se passe. Avec une macro, il faut décortiquer le code.

**Maintenance** : votre fournisseur ajoute une colonne dans son export ? Avec VBA, vous corrigez les indices de colonnes dans tout le code. Avec Power Query, vous rafraîchissez et ça s'adapte automatiquement si vous avez utilisé les noms de colonnes.

Le VBA reste indispensable pour l'automatisation complexe, les interactions utilisateur ou les traitements métier spécifiques. Mais pour nettoyer, filtrer, fusionner des données : Power Query gagne.

## Les transformations incontournables en 10 minutes

**Supprimer les lignes vides et doublons** : clic droit sur la colonne clé > Supprimer les doublons. Power Query identifie instantanément les lignes identiques sur cette colonne. Pour les lignes vides, filtrez simplement les valeurs non nulles.

**Fractionner une colonne** : votre export contient "Nom Prénom" dans une seule cellule ? Accueil > Fractionner la colonne > Par délimiteur. Vous choisissez l'espace, la virgule ou même une expression régulière.

**Pivoter/dépivoter** : les tableaux croisés Excel sont pratiques pour l'analyse mais inutilisables pour les calculs. Power Query dépivote un tableau en trois clics (Transformer > Dépivoter les colonnes). L'inverse fonctionne aussi.

**Fusionner plusieurs fichiers** : vous recevez 12 fichiers mensuels avec la même structure ? Dans Power Query, créez une requête sur le dossier entier. Tous les fichiers sont combinés automatiquement, et chaque mois vous ajoutez juste le nouveau fichier dans le dossier.

**Nettoyer les formats** : les exports CSV contiennent souvent des espaces parasites, des retours ligne, des zéros devant les codes. Power Query propose Transformer > Format pour uniformiser en un clic : supprimer les espaces, passer en majuscules, nettoyer les caractères non imprimables.

**Remplacer par référence** : vous avez une table de correspondance code/libellé ? Fusionnez les requêtes (Accueil > Combiner > Fusionner les requêtes). C'est l'équivalent d'un RECHERCHEV, mais en beaucoup plus robuste et rapide.

## Intégrer Power Query dans un workflow VBA

Parfois, vous avez besoin d'enchaîner automatiquement : récupération de données, transformation Power Query, puis traitement VBA spécifique. C'est possible.

```vba
Option Explicit

Function ActualiserRequetePowerQuery(ByVal sNomRequete As String) As Boolean
    ' Actualise une requête Power Query par son nom
    ' Renvoie True si succès, False sinon
    On Error GoTo GestionErreur
    
    Dim wb As Workbook
    Dim qry As Object ' WorkbookQuery
    Dim cnx As WorkbookConnection
    Dim bTrouve As Boolean
    
    Set wb = ThisWorkbook
    bTrouve = False
    
    ' Parcourir les connexions pour trouver la requête
    For Each cnx In wb.Connections
        If cnx.Name = sNomRequete Then
            cnx.Refresh
            bTrouve = True
            Exit For
        End If
    Next cnx
    
    If Not bTrouve Then
        MsgBox "Requête '" & sNomRequete & "' introuvable.", vbExclamation
        ActualiserRequetePowerQuery = False
        GoTo Sortie
    End If
    
    ActualiserRequetePowerQuery = True
    
Sortie:
    Set cnx = Nothing
    Set wb = Nothing
    Exit Function
    
GestionErreur:
    MsgBox "Erreur " & Err.Number & " : " & Err.Description, vbCritical
    ActualiserRequetePowerQuery = False
    Resume Sortie
End Function
```

Cette fonction actualise une requête Power Query depuis VBA. Utile pour enchaîner plusieurs traitements dans une macro d'automatisation globale, par exemple une extraction nocturne suivie de calculs spécifiques.

## Les pièges à éviter

**Chemin absolu** : Power Query enregistre souvent le chemin complet du fichier source. Si vous partagez le fichier, ça plante chez vos collègues. Pensez à paramétrer les chemins ou à utiliser des chemins relatifs.

**Type de données** : Power Query détecte automatiquement les types (texte, nombre, date). Vérifiez-les systématiquement, surtout pour les codes qui ressemblent à des nombres mais doivent rester en texte (codes postaux avec zéro initial).

**Actualisation** : les transformations Power Query ne se lancent pas automatiquement à l'ouverture du fichier par défaut. Paramétrez l'actualisation automatique dans les propriétés de la connexion si nécessaire.

## Conclusion

Power Query n'est pas un gadget, c'est un changement de méthode. Pour les projets industriels où la donnée est volumineuse, sale et changeante, c'est devenu incontournable. Investissez 10 minutes pour tester sur votre prochain export problématique, vous gagnerez des heures chaque mois.