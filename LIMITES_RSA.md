# RSA : portée du premier exemple chiffré (V2.0)

Le formulaire de préparation documentaire reste disponible. Un second formulaire illustre **uniquement** le montant forfaitaire RSA pour une personne seule de 25 ans ou plus, sans enfant et **sans aucune ressource**, résidant en France métropolitaine, non étudiante et ayant vérifié ses conditions de séjour. Il distingue un loyer sans aide au logement et les cas soumis au forfait logement.

Pour avril 2026 à mars 2027 : montant forfaitaire 651,69 €, forfait logement personne seule 78,20 €. Exemple : 651,69 € sans forfait ; 573,49 € avec forfait. Ce n'est ni une décision d'éligibilité ni une simulation complète. La déclaration trimestrielle CAF préremplie repose notamment sur les mois M-2 à M-4 ; le patrimoine et les autres prestations peuvent modifier le calcul. Le formulaire ne vérifie pas les déclarations de l'utilisateur.

Sources :
- https://www.legifrance.gouv.fr/eli/decret/2026/3/30/2026-220/jo/article_1
- https://caf.fr/allocataires/caf-des-bouches-du-rhone/offre-de-service/vie-professionnelle/le-revenu-de-solidarite-active-rsa
- https://www.service-public.gouv.fr/particuliers/vosdroits/F19778

Le référentiel JSON est daté mais **n'est pas alimenté automatiquement par OpenFisca**. Ne pas utiliser ce calcul pour les couples, enfants, travailleurs avec revenus, personnes de moins de 25 ans, étudiants, situations de séjour particulières ou outre-mer.

## V2.1 : estimation avec ressources — périmètre strict

Nouveau module distinct : personne seule de 25 ans ou plus, sans enfant, en métropole, pour les mois d'avril 2026 à mars 2027. Trois mois M-4, M-3, M-2 sont affichés automatiquement. Le calcul soustrait la moyenne mensuelle des ressources déclarées et le forfait logement du montant forfaitaire (651,69 €). Il refuse les champs incomplets, négatifs et les situations hors périmètre.

**Attention :** la formule est une approximation pédagogique : les prestations versées par la CAF peuvent être intégrées au mois de perception et les règles de calcul mois par mois, de neutralisation, de patrimoine et de cumul ne sont pas entièrement modélisées. La déclaration « toutes ressources incluses » ne permet pas de vérifier ces règles. Le résultat ne vaut jamais notification de droits, et un résultat nul n'établit pas l'inéligibilité.

Références : https://www.service-public.gouv.fr/particuliers/vosdroits/F19778 ; https://www.service-public.gouv.fr/particuliers/vosdroits/F14199 ; https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074069/LEGISCTA000006178380/
