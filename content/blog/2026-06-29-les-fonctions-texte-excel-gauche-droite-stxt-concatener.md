---
title: "Les fonctions texte Excel : GAUCHE, DROITE, STXT, CONCATENER"
date: "2026-06-29"
slug: "les-fonctions-texte-excel-gauche-droite-stxt-concatener"
description: "Maîtrisez GAUCHE, DROITE, STXT et CONCATENER pour découper et recomposer vos données texte Excel comme un pro. Guide pratique avec exemples réels."
---

# Les fonctions texte Excel : GAUCHE, DROITE, STXT, CONCATENER

Quand on manipule des données issues de systèmes tiers, d'exports ERP ou de fichiers bancaires, on se retrouve systématiquement à découper, extraire et recomposer du texte. Les fonctions GAUCHE, DROITE, STXT et CONCATENER sont vos outils de base pour transformer des chaînes de caractères mal formatées en données exploitables.

Ces fonctions natives Excel sont indispensables avant même de passer par du VBA. Elles permettent de normaliser rapidement des références produits, nettoyer des adresses, extraire des codes comptables ou reformater des identifiants clients. Maîtriser leur logique vous évitera des heures de traitement manuel et posera les bases d'automatisations plus poussées.

## Pourquoi ces fonctions restent incontournables

Dans un contexte industriel, vous recevez rarement des données propres. Un code article contient le type, la famille et la référence dans une seule cellule. Un IBAN arrive sans espaces. Une adresse mélange numéro, rue et code postal. 

Les fonctions texte permettent de découper ces chaînes selon des règles fixes : extraction par position (GAUCHE, DROITE, STXT) ou recomposition (CONCATENER et ses variantes). C'est la première étape d'un traitement de données robuste, avant toute analyse ou mise en base.

L'avantage : elles fonctionnent en formule native, sans macro, donc sans les contraintes de sécurité VBA. Parfait pour des fichiers partagés ou des modèles diffusés largement. Elles se combinent facilement avec TROUVE, NBCAR, SUBSTITUE pour des traitements plus élaborés.

## GAUCHE et DROITE : extraction par les extrémités

**GAUCHE(texte; nombre_caractères)** extrait les n premiers caractères depuis la gauche.

```
=GAUCHE(A1; 3)
```

Si A1 contient "FAB-2024-001", la formule renvoie "FAB". Utile pour isoler un préfixe de référence ou un code département.

**DROITE(texte; nombre_caractères)** fait l'inverse depuis la fin.

```
=DROITE(A1; 3)
```

Avec le même exemple, vous obtenez "001". Pratique pour extraire des numéros de série ou des extensions de fichiers.

**Point d'attention** : ces fonctions comptent en caractères, pas en mots. Si votre structure varie en longueur, elles deviennent inadaptées. Il faut alors combiner avec TROUVE pour détecter un séparateur puis calculer la position.

Exemple pour extraire le préfixe avant un tiret :

```
=GAUCHE(A1; TROUVE("-"; A1) - 1)
```

Cela extrait tout ce qui précède le premier tiret, quelle que soit sa position.

## STXT : extraction par position précise

**STXT(texte; position_départ; nombre_caractères)** est la plus flexible. Elle extrait une portion de texte à partir d'une position donnée.

```
=STXT(A1; 5; 4)
```

Si A1 contient "FAB-2024-001", la formule commence au 5ᵉ caractère (le "2") et extrait 4 caractères : "2024".

C'est indispensable quand votre donnée suit une structure fixe : positions 1 à 3 pour le type, 5 à 8 pour l'année, 10 à 12 pour le numéro. Les fichiers bancaires, les exports SAP ou les identifiants normalisés suivent souvent ce principe.

**Astuce** : combinez STXT avec NBCAR pour extraire depuis la fin sans connaître la longueur totale.

```
=STXT(A1; NBCAR(A1) - 6; 4)
```

Extrait 4 caractères en partant de 7 positions avant la fin. Pratique pour des formats variables avec une fin standardisée.

## CONCATENER et ses alternatives modernes

**CONCATENER(texte1; texte2; ...)** assemble plusieurs chaînes en une seule.

```
=CONCATENER(A1; "-"; B1; "-"; C1)
```

Si A1="FAB", B1="2024", C1="001", vous obtenez "FAB-2024-001".

Mais CONCATENER est obsolète depuis Excel 2016. Privilégiez **CONCAT** (sans "ER") qui accepte des plages, ou mieux encore **TEXTJOIN** qui gère les séparateurs et ignore les cellules vides.

```
=TEXTJOIN("-"; VRAI; A1:C1)
```

Même résultat, mais si B1 est vide, pas de double tiret. Le deuxième argument VRAI ignore les cellules vides, FAUX les conserve.

Pour simplement coller des textes sans séparateur, l'opérateur **&** est plus lisible :

```
=A1 & "-" & B1 & "-" C1
```

Plus court, plus clair. Utilisez TEXTJOIN quand vous traitez des plages ou devez gérer les vides proprement.

## Combiner les fonctions pour des traitements réels

Un cas fréquent : extraire le domaine d'une adresse email.

```
=DROITE(A1; NBCAR(A1) - TROUVE("@"; A1))
```

Cela supprime tout avant le @. Pour l'adresse complète, remplacez DROITE par GAUCHE et inversez la logique.

Autre exemple : standardiser un numéro de téléphone en supprimant les espaces puis en reformatant.

```
=TEXTJOIN(" "; FAUX; STXT(SUBSTITUE(A1;" ";""); {1,2,3,4}; 2); STXT(SUBSTITUE(A1;" ";""); {5,6}; 2); STXT(SUBSTITUE(A1;" ";""); {7,8}; 2); STXT(SUBSTITUE(A1;" ";""); {9,10}; 2))
```

Cette formule est complexe, mais elle illustre la puissance de combiner nettoyage (SUBSTITUE), extraction (STXT) et recomposition (TEXTJOIN).

## Conclusion

Ces quatre fonctions sont votre couteau suisse pour le traitement texte dans Excel. Elles couvrent 80% des besoins de découpe et reconstruction de chaînes avant toute automatisation VBA. Maîtrisez-les, combinez-les avec TROUVE, SUBSTITUE et NBCAR, et vous gagnerez un temps considérable sur vos imports et exports de données.