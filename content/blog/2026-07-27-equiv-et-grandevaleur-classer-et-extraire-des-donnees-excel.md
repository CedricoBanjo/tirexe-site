---
title: "EQUIV et GRANDE.VALEUR : classer et extraire des données Excel"
date: "2026-07-27"
slug: "equiv-et-grandevaleur-classer-et-extraire-des-donnees-excel"
description: "Maîtrisez GRANDE.VALEUR et EQUIV pour créer des classements Excel automatiques. Guide technique avec exemples concrets pour extraire les top N."
---

# EQUIV et GRANDE.VALEUR : classer et extraire des données Excel

Quand on gère des tableaux de bord industriels ou des rapports de production, on a régulièrement besoin d'extraire les N meilleures valeurs d'un ensemble de données : top 5 des ventes, 10 meilleurs scores qualité, 3 retards les plus importants. Excel propose pour cela deux fonctions puissantes mais souvent mal comprises : GRANDE.VALEUR et EQUIV. Combinées intelligemment, elles permettent d'automatiser ces extractions sans VBA, directement dans les formules.

Le problème classique : vous avez une liste de valeurs avec leurs libellés, et vous voulez afficher non seulement les valeurs triées, mais aussi récupérer les libellés correspondants. GRANDE.VALEUR seule ne suffit pas, il faut la coupler avec EQUIV pour retrouver la position, puis INDEX pour extraire le libellé. C'est cette mécanique que nous allons décortiquer.

## Fonctionnement de GRANDE.VALEUR

GRANDE.VALEUR renvoie la k-ième plus grande valeur d'une plage. Sa syntaxe est simple :

```
=GRANDE.VALEUR(plage; k)
```

Le paramètre k détermine le rang : 1 pour la plus grande valeur, 2 pour la deuxième plus grande, etc. Attention au piège : contrairement à ce qu'on pourrait penser, GRANDE.VALEUR ne trie pas réellement les données, elle retourne simplement la valeur au rang demandé.

Exemple concret : si vous avez des chiffres d'affaires mensuels en B2:B13, `=GRANDE.VALEUR(B2:B13;1)` vous donnera le CA le plus élevé de l'année. Pour obtenir le top 3, vous écririez trois formules avec k=1, k=2 et k=3.

Le vrai défi commence quand vous voulez savoir **quel mois** correspond à ce CA maximum. C'est là qu'intervient EQUIV.

## Coupler avec EQUIV pour retrouver la position

EQUIV recherche une valeur dans une plage et renvoie sa position (pas la valeur elle-même). Syntaxe :

```
=EQUIV(valeur_cherchée; plage; type_correspondance)
```

Le type_correspondance mérite attention : 
- 0 = correspondance exacte (le plus fiable)
- 1 = inférieur ou égal (nécessite données triées)
- -1 = supérieur ou égal (nécessite données triées)

Pour retrouver le mois correspondant au CA maximum :

```
=EQUIV(GRANDE.VALEUR(B2:B13;1); B2:B13; 0)
```

Cette formule retourne la position (1 à 12) du CA maximum dans la plage. Vous pouvez ensuite utiliser cette position avec INDEX pour récupérer le nom du mois stocké dans une autre colonne.

## Construction d'un classement complet

Voici la mécanique complète pour créer un top 5 avec libellés. Imaginons :
- Colonne A (A2:A13) : noms des mois
- Colonne B (B2:B13) : chiffres d'affaires

Dans votre zone de rapport, créez trois colonnes :

**Colonne Rang** (fixe) : 1, 2, 3, 4, 5

**Colonne Valeur** en E2 par exemple :
```
=GRANDE.VALEUR($B$2:$B$13; D2)
```
Où D2 contient le rang (1, 2, 3...). Copiez vers le bas.

**Colonne Libellé** en F2 :
```
=INDEX($A$2:$A$13; EQUIV(E2; $B$2:$B$13; 0))
```

Cette formule utilise la valeur trouvée par GRANDE.VALEUR (cellule E2), recherche sa position avec EQUIV, puis extrait le libellé correspondant avec INDEX.

## Gestion des doublons et erreurs

Le point faible de cette approche : les valeurs identiques. Si deux mois ont exactement le même CA, EQUIV retournera toujours la position de la première occurrence. Vous aurez donc deux fois le même mois dans votre classement.

Solutions possibles :

**Solution formule** : ajouter un critère secondaire de départage, ou accepter cette limite si vos données ne contiennent pas de doublons.

**Solution VBA** : pour des besoins plus sophistiqués avec gestion intelligente des ex-aequo, un code VBA devient pertinent. Mais pour 80% des cas d'usage industriels, la combinaison GRANDE.VALEUR + EQUIV + INDEX suffit largement.

Pensez aussi à encadrer vos formules avec SIERREUR pour gérer les cas où le rang demandé dépasse le nombre de valeurs :

```
=SIERREUR(GRANDE.VALEUR($B$2:$B$13; D2); "")
```

## Performance sur gros volumes

Sur des plages de quelques centaines de lignes, ces formules restent réactives. Au-delà de 10 000 lignes, vous risquez des ralentissements si vous multipliez les formules imbriquées.

Dans ce cas, deux approches :
- Utiliser des tableaux structurés Excel (tableaux croisés dynamiques avec Top 10 intégré)
- Passer en VBA avec traitement en mémoire via des tableaux de variants et un algorithme de tri optimisé

L'avantage du VBA devient déterminant quand vous devez rafraîchir des classements multiples sur plusieurs onglets avec des critères variables. Mais pour un tableau de bord statique ou semi-dynamique, les formules natives restent le meilleur compromis maintenabilité/performance.

## Conclusion

GRANDE.VALEUR et EQUIV forment un duo efficace pour extraire et classer des données sans macro. La courbe d'apprentissage est rapide, la maintenance simple, et la transparence totale pour vos utilisateurs. Réservez le VBA aux cas où vous gérez des doublons complexes ou des volumes vraiment massifs.