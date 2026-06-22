---
title: "NB.SI et SOMME.SI : formules de comptage et somme conditionnelle"
date: "2026-06-22"
slug: "nbsi-et-sommesi-formules-de-comptage-et-somme-conditionnelle"
description: "Maîtrisez NB.SI et SOMME.SI dans Excel : syntaxe, exemples concrets, pièges à éviter et variantes multi-critères pour analyser vos données."
---

# NB.SI et SOMME.SI : formules de comptage et somme conditionnelle

Vous manipulez quotidiennement des tableaux de données dans Excel et vous passez encore du temps à filtrer manuellement pour compter ou sommer des valeurs ? Les fonctions NB.SI et SOMME.SI sont probablement les deux formules les plus rentables à maîtriser pour gagner en productivité. Elles permettent d'analyser instantanément vos données selon des critères précis, sans VBA, sans tableau croisé dynamique, et avec une flexibilité redoutable.

Cet article vous présente ces fonctions sous l'angle de l'efficacité opérationnelle : syntaxe, cas d'usage concrets, pièges à éviter et variantes multi-critères.

## Pourquoi utiliser NB.SI et SOMME.SI

Dans un contexte industriel ou de gestion de projet, vous avez souvent besoin de réponses rapides : combien de commandes en retard ? Quel montant total des factures impayées ? Combien de non-conformités par fournisseur ?

Plutôt que de filtrer manuellement vos données ou de créer des tableaux croisés dynamiques pour chaque question, NB.SI et SOMME.SI offrent une réponse directe et dynamique. Ces formules se recalculent automatiquement à chaque modification des données source, garantissant une fiabilité constante de vos indicateurs.

L'autre avantage : elles sont transparentes. Contrairement à un TCD dont la source peut être masquée, la formule reste visible et vérifiable dans la barre de formule. Pour un responsable technique qui doit valider des chiffres ou auditer un fichier, c'est un atout majeur.

## NB.SI : compter avec condition

La syntaxe est simple : `=NB.SI(plage; critère)`

**Plage** : la zone de cellules à analyser (une seule colonne ou ligne généralement).

**Critère** : la condition à respecter, qui peut être un nombre, un texte entre guillemets, une référence de cellule, ou une expression avec opérateurs de comparaison.

### Exemples concrets

Compter le nombre de commandes du fournisseur "ACME Corp" dans la colonne B :
```
=NB.SI(B:B;"ACME Corp")
```

Compter les montants supérieurs à 1000 dans la colonne D :
```
=NB.SI(D:D;">1000")
```

Compter les cellules correspondant au critère situé en G2 :
```
=NB.SI(B:B;G2)
```

Compter les cellules non vides (astuce) :
```
=NB.SI(A:A;"<>")
```

### Pièges fréquents

**Le texte doit être entre guillemets**, mais pas les références de cellules. Confondre les deux génère des erreurs silencieuses.

**Les opérateurs de comparaison** (>, <, >=, <=, <>) doivent être entre guillemets : `">1000"` et non `>1000`.

**Attention à la casse** : NB.SI n'est pas sensible à la casse par défaut. "ACME" et "acme" seront comptés ensemble.

## SOMME.SI : additionner avec condition

La syntaxe : `=SOMME.SI(plage_critère; critère; [plage_somme])`

**Plage_critère** : la zone contenant les valeurs à tester.

**Critère** : la condition à respecter.

**Plage_somme** (optionnel) : la zone contenant les valeurs à additionner. Si omis, Excel somme directement la plage_critère.

### Exemples pratiques

Sommer les montants (colonne E) pour le fournisseur "ACME Corp" (colonne B) :
```
=SOMME.SI(B:B;"ACME Corp";E:E)
```

Sommer uniquement les montants supérieurs à 500 dans la colonne D :
```
=SOMME.SI(D:D;">500")
```

Sommer les montants (colonne E) pour le statut "En retard" (colonne C) :
```
=SOMME.SI(C:C;"En retard";E:E)
```

Combinaison avec référence : sommer les montants du mois sélectionné en G1 :
```
=SOMME.SI(A:A;G1;E:E)
```

### Point de vigilance

La **plage_critère** et la **plage_somme** doivent avoir la même taille et disposition. Excel associe chaque ligne de la première avec la ligne correspondante de la seconde. Si les plages sont décalées, vos résultats seront faux sans message d'erreur.

## Les variantes multi-critères

Quand un seul critère ne suffit pas, Excel propose NB.SI.ENS et SOMME.SI.ENS.

**NB.SI.ENS** : `=NB.SI.ENS(plage_critère1; critère1; plage_critère2; critère2; ...)`

Exemple : compter les commandes du fournisseur "ACME Corp" ET avec un statut "Validé" :
```
=NB.SI.ENS(B:B;"ACME Corp";C:C;"Validé")
```

**SOMME.SI.ENS** : `=SOMME.SI.ENS(plage_somme; plage_critère1; critère1; plage_critère2; critère2; ...)`

Exemple : sommer les montants (colonne E) pour "ACME Corp" ET "Validé" :
```
=SOMME.SI.ENS(E:E;B:B;"ACME Corp";C:C;"Validé")
```

Notez l'inversion : dans SOMME.SI.ENS, la plage à sommer vient **en premier**, contrairement à SOMME.SI. C'est source d'erreurs fréquentes.

## Performance et bonnes pratiques

Sur des fichiers avec plusieurs dizaines de milliers de lignes, évitez de référencer des colonnes entières (A:A) si possible. Préférez des plages définies (A2:A10000) pour accélérer le calcul.

Pour des analyses complexes avec de nombreux critères croisés, basculez vers des tableaux croisés dynamiques ou, si vous devez automatiser et personnaliser, passez au VBA avec des dictionnaires pour des performances optimales.

Enfin, documentez vos formules. Un commentaire dans la cellule adjacente expliquant ce que compte ou somme la formule facilitera la maintenance par d'autres membres de l'équipe.

## Conclusion

NB.SI et SOMME.SI sont des outils indispensables pour analyser rapidement vos données sans quitter Excel. Maîtrisez leur syntaxe, anticipez leurs pièges, et vous gagnerez un temps considérable sur vos reportings quotidiens. Pour des besoins multi-critères, les variantes .ENS complètent efficacement votre arsenal.