---
title: "Formules de dates Excel : DATEDIF, MOIS.DECALER et FIN.MOIS"
date: "2026-07-06"
slug: "formules-de-dates-excel-datedif-moisdecaler-finmois"
description: "Maîtrisez DATEDIF, MOIS.DECALER et FIN.MOIS pour des calculs de dates Excel professionnels. Exemples concrets et pièges à éviter."
---

# Formules de dates Excel : DATEDIF, MOIS.DECALER et FIN.MOIS

Les calculs de dates représentent l'un des défis récurrents dans les tableaux de bord Excel. Que ce soit pour déterminer l'ancienneté d'un collaborateur, calculer des échéances de paiement ou planifier des jalons projet, trois fonctions méconnues ou mal maîtrisées méritent votre attention : DATEDIF, MOIS.DECALER et FIN.MOIS.

Ces fonctions natives d'Excel résolvent élégamment des problèmes qui conduisent souvent à des formules tarabiscotées ou à du code VBA inutile. Maîtriser leur syntaxe et leurs subtilités vous fera gagner un temps précieux sur vos projets industriels.

## DATEDIF : la fonction cachée d'Excel

DATEDIF calcule la différence entre deux dates selon l'unité choisie. Particularité troublante : elle n'apparaît pas dans l'aide officielle Excel, vestige de la compatibilité Lotus 1-2-3. Pourtant, elle fonctionne parfaitement depuis Excel 2000.

**Syntaxe :** `=DATEDIF(date_début; date_fin; unité)`

Les unités disponibles :
- `"Y"` : années complètes
- `"M"` : mois complets
- `"D"` : jours
- `"MD"` : jours en ignorant mois et années
- `"YM"` : mois en ignorant les années
- `"YD"` : jours en ignorant les années

**Exemples concrets :**

Ancienneté d'un salarié entré le 15/03/2020, calculée au 10/01/2025 :
```
=DATEDIF("15/03/2020";"10/01/2025";"Y") & " ans et " & DATEDIF("15/03/2020";"10/01/2025";"YM") & " mois"
```
Résultat : "4 ans et 9 mois"

Calcul de jours ouvrés restants dans un mois pour une gestion de production :
```
=DATEDIF(AUJOURDHUI();FIN.MOIS(AUJOURDHUI();0);"D")
```

**Attention aux pièges :** L'unité "MD" produit parfois des résultats incohérents quand la date de fin précède la date de début dans le mois. Privilégiez une formule composite avec "YM" et des calculs manuels si nécessaire.

La date de début doit impérativement être antérieure à la date de fin, sinon vous obtenez l'erreur #NOMBRE!

## MOIS.DECALER : piloter les prévisions temporelles

MOIS.DECALER déplace une date d'un nombre de mois donné, en avant ou en arrière. Indispensable pour générer des échéanciers, des plans de paiement ou des calendriers de maintenance.

**Syntaxe :** `=MOIS.DECALER(date_départ; mois)`

Le paramètre `mois` peut être positif (futur) ou négatif (passé).

**Cas d'usage industriels :**

Échéancier de paiement à 30-60-90 jours (en mois) :
```
=MOIS.DECALER(A2;1)  // +30 jours
=MOIS.DECALER(A2;2)  // +60 jours
=MOIS.DECALER(A2;3)  // +90 jours
```

Planning de maintenance trimestrielle à partir d'une date de référence :
```
=MOIS.DECALER($B$1;(LIGNE()-2)*3)
```
Cette formule tirée vers le bas génère automatiquement les dates de maintenance tous les 3 mois.

**Comportement avec les fins de mois :** Si votre date de départ est le 31 janvier et que vous ajoutez 1 mois, Excel retourne le 28 (ou 29) février, car février n'a pas de 31. Ce comportement est généralement souhaité, mais peut surprendre.

Pour conserver le dernier jour du mois :
```
=FIN.MOIS(MOIS.DECALER(A2;1);0)
```

## FIN.MOIS : maîtriser les clôtures périodiques

FIN.MOIS retourne le dernier jour du mois, à partir d'une date de référence et d'un décalage en mois.

**Syntaxe :** `=FIN.MOIS(date_départ; mois)`

Cette fonction brille dans les contextes comptables et financiers où les calculs se font en périodes complètes.

**Applications pratiques :**

Dernier jour du mois en cours :
```
=FIN.MOIS(AUJOURDHUI();0)
```

Dernier jour du mois suivant (pour des échéances de factures) :
```
=FIN.MOIS(A2;1)
```

Dernier jour du trimestre en cours :
```
=FIN.MOIS(AUJOURDHUI();3-MOD(MOIS(AUJOURDHUI())-1;3)-1)
```

**Combinaison puissante avec MOIS.DECALER :**

Pour générer une période comptable "du 1er au dernier jour du mois" :
```
Début : =MOIS.DECALER(FIN.MOIS(A2;-1);1)
Fin   : =FIN.MOIS(A2;0)
```

Cette approche garantit des périodes sans trou ni chevauchement, même avec des mois de longueurs différentes.

## Combinaisons avancées pour tableaux de bord

L'association de ces trois fonctions permet de construire des indicateurs temporels robustes sans VBA :

**Calcul de la durée en mois d'un projet :**
```
=DATEDIF(date_début;FIN.MOIS(date_fin;0);"M")+1
```

**Vérification qu'une date est en fin de mois :**
```
=A2=FIN.MOIS(A2;0)
```

**Liste des 12 derniers mois pour un graphique :**
Placez cette formule en B2 et tirez vers le bas :
```
=FIN.MOIS(AUJOURDHUI();-13+LIGNE())
```

Ces formules évitent la maintenance de macros pour des besoins qui relèvent de la logique métier standard.

## Conclusion

DATEDIF, MOIS.DECALER et FIN.MOIS constituent le triptyque indispensable pour manipuler les dates dans Excel sans recourir systématiquement à VBA. Leur maîtrise améliore la maintenabilité de vos fichiers et réduit les risques d'erreurs dans les calculs temporels critiques. Gardez ces syntaxes à portée de main : elles résoudront 80% de vos problématiques de dates dans les projets industriels.