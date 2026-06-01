---
title: "Comment utiliser RECHERCHEX : la nouvelle formule de recherche Excel"
date: "2026-06-01"
slug: "comment-utiliser-recherchex-la-nouvelle-formule-de-recherche-excel"
description: "RECHERCHEX remplace RECHERCHEV : syntaxe, avantages et exemples concrets pour des fichiers Excel robustes et performants. Guide technique complet."
---

# Comment utiliser RECHERCHEX : la nouvelle formule de recherche Excel

RECHERCHEV, c'est fini. Depuis Excel 365 et Excel 2021, Microsoft a déployé RECHERCHEX (XLOOKUP en anglais), une fonction qui corrige enfin les limitations historiques de sa devancière. Pour les responsables techniques qui gèrent des fichiers de gestion complexes, cette évolution change la donne : terminées les colonnes auxiliaires, les INDEX/EQUIV imbriqués et les performances dégradées sur de gros volumes.

RECHERCHEX unifie ce qui nécessitait auparavant plusieurs fonctions, avec une syntaxe claire et des options natives pour gérer les cas limites. Si vos équipes utilisent encore RECHERCHEV sur des fichiers stratégiques, cette migration mérite votre attention.

## Pourquoi RECHERCHEX remplace définitivement RECHERCHEV

RECHERCHEV souffre de trois défauts rédhibitoires sur des projets industriels :

**Limitation directionnelle** : la colonne de retour doit impérativement se situer à droite de la colonne de recherche. Cela force à réorganiser les données ou créer des colonnes supplémentaires, avec les risques d'erreur et de maintenance que cela implique.

**Fragilité structurelle** : l'argument numéro de colonne (le fameux "3" dans RECHERCHEV) casse dès qu'on insère ou supprime une colonne dans la plage. Sur un fichier partagé entre plusieurs services, c'est la garantie d'erreurs en production.

**Performance médiocre** : sans l'option FAUX en dernier argument, RECHERCHEV effectue une recherche approximative qui nécessite un tri préalable. Avec FAUX, la recherche exacte parcourt séquentiellement toute la plage, ce qui devient problématique au-delà de quelques milliers de lignes.

RECHERCHEX élimine ces trois points d'un coup, tout en ajoutant des fonctionnalités que les utilisateurs avancés assemblaient péniblement avec INDEX/EQUIV ou des combinaisons de SI.ERREUR.

## Syntaxe et arguments de RECHERCHEX

La structure de base :

```
=RECHERCHEX(valeur_cherchée; plage_recherche; plage_retour; [si_non_trouvé]; [mode_correspondance]; [mode_recherche])
```

**valeur_cherchée** : l'élément à trouver, identique à RECHERCHEV.

**plage_recherche** : la colonne ou ligne où chercher. Pas besoin que ce soit la première colonne d'une plage.

**plage_retour** : la colonne ou ligne d'où extraire le résultat. Peut être à gauche, à droite, n'importe où.

**si_non_trouvé** (optionnel) : texte à afficher si aucune correspondance. Fini les SI.ERREUR() imbriqués.

**mode_correspondance** (optionnel) :
- 0 = correspondance exacte (défaut)
- -1 = correspondance exacte ou valeur immédiatement inférieure
- 1 = correspondance exacte ou valeur immédiatement supérieure
- 2 = correspondance générique avec * et ?

**mode_recherche** (optionnel) :
- 1 = recherche du premier au dernier (défaut)
- -1 = recherche du dernier au premier
- 2 = recherche binaire croissante (données triées)
- -2 = recherche binaire décroissante (données triées)

## Cas d'usage concrets pour la production

**Recherche bidirectionnelle sans artifice** :

```
=RECHERCHEX(A2; Produits[Code]; Produits[Libellé])
```

Ici, la colonne Code peut être n'importe où dans le tableau structuré Produits. Le résultat vient de la colonne Libellé, peu importe sa position.

**Gestion native des valeurs absentes** :

```
=RECHERCHEX(B2; Clients[ID]; Clients[Nom]; "Client inconnu")
```

Sans SI.ERREUR, sans #N/A qui polluent vos tableaux de bord. L'information est claire pour l'utilisateur final.

**Recherche inversée pour audits** :

```
=RECHERCHEX(C2; Historique[Transaction]; Historique[Date]; "Non trouvé"; 0; -1)
```

Le mode_recherche à -1 retourne la *dernière* occurrence, indispensable pour retrouver la transaction la plus récente dans un historique.

**Recherche avec jokers pour rapprochements approximatifs** :

```
=RECHERCHEX("*SARL*"; Entreprises[Raison_Sociale]; Entreprises[SIRET]; ; 2)
```

Le mode_correspondance 2 active les caractères génériques, utile pour les rapprochements de fichiers tiers où les dénominations varient.

## Migration depuis RECHERCHEV : points d'attention

La conversion n'est pas toujours automatique. RECHERCHEV avec recherche approximative (sans FAUX) est par défaut croissante, tandis que RECHERCHEX en mode 0 est strictement exacte. Vérifiez le comportement attendu avant de remplacer massivement.

Les fichiers partagés avec des utilisateurs sous Excel 2019 ou antérieur afficheront #NOM? car RECHERCHEX n'existe pas dans ces versions. Prévoyez une période de transition ou maintenez deux versions si votre parc n'est pas unifié sur Office 365.

Pour les fichiers critiques, testez d'abord sur un échantillon représentatif. Bien que RECHERCHEX soit plus performante, une formule mal paramétrée (notamment le mode_recherche binaire sur des données non triées) produira des résultats erronés sans message d'erreur.

## Conclusion

RECHERCHEX n'est pas un simple ajout cosmétique : c'est une refonte structurelle qui élimine des pratiques de contournement devenues standard avec RECHERCHEV. Pour des équipes qui manipulent quotidiennement des référentiels clients, produits ou transactions, le gain en clarté, robustesse et maintenabilité est immédiat.

Si votre parc est compatible Office 365, intégrez RECHERCHEX dans vos standards de développement Excel dès maintenant.