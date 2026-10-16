## V2.4 — Arbre de décisions guidé

Le parcours RSA propose désormais un arbre de décisions local, une question à la fois, avec retour, recommencement, réponse « Je ne sais pas », quatre langues et résultat sous forme de prochaine action, documents à préparer et point à vérifier. Les branches couvrent changements de travail, courriers et difficultés de logement. Le moteur ne statue pas sur l’éligibilité. Les conseils restent indicatifs. Tests : `node scripts/test_decision_tree.cjs`.

# Mes droits, simplement — maquette FALC, multilingue, GitHub Pages

**Site statique :** HTML/CSS/JavaScript/JSON, aucun programme tiers à installer pour les visiteurs. Réponses du questionnaire calculées dans le navigateur, sans envoi au serveur. Les liens officiels sont facultatifs.

## Déploiement sur GitHub Pages

1. Décompresser l'archive. Mettre **le contenu** (pas le ZIP) à la racine du dépôt public `YahnLP/mes-droits-simplement`, y compris `.github/workflows/` et `data/`.
2. Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
3. Settings → Actions → General → Workflow permissions → **Read and write permissions** pour permettre à l'automate de mettre à jour `data/source-watch.json`. Si la branche `main` est protégée contre les commits du bot, il faudra adapter les permissions ou publier la veille sur une branche dédiée.
4. Actions → « Actualiser les contrôles des sources officielles » → Run workflow pour tester. Exécution planifiée quotidiennement (horaire indicatif : GitHub peut différer les exécutions).

## Ce qui est mis à jour automatiquement

Le fichier `data/source-watch.json` : date de contrôle, empreinte SHA-256, changement détecté, succès/échec et adresse de la page. **Aucun barème, seuil, calcul de droit ni traduction n'est extrait ou modifié automatiquement.** Un changement de page officielle peut venir d'un menu, d'un pied de page ou d'une mise en forme. Une page accessible ne signifie pas que son contenu juridique a été correctement interprété.

Les règles de `data/aides.json` sont **des pistes**, pas des décisions officielles. Aucun montant n'est calculé. L'utilisateur est invité à vérifier auprès d'un conseiller. Cette réserve ne suffit pas à garantir la fiabilité d'une simulation chiffrée.

## Langues et FALC

Français facile, anglais, espagnol, arabe (RTL) : tous les intitulés, choix de menus, exemples, résultats et consignes documentaires disposent d'une traduction intégrée. Les guides utilisent des phrases courtes et des actions concrètes. **La conformité FALC au sens strict exige encore une relecture par des personnes concernées et une validation linguistique**, notamment pour les documents de séjour et de santé.

## Documents

19 catégories : CAF/MSA, impôts, préfecture, France Travail, Assurance maladie, logement, justice, retraite, feuille de soins, hospitalisation, arrêt maladie, carrière, pension, mutuelle, factures de soins, ordonnance, MDPH, accident du travail et autres. Les conseils sont généraux : aucune lecture automatique de photo/PDF et aucun délai de recours garanti.

## Vérification locale facultative (pour les développeurs)

`python scripts/validate.py` et `node --check app.js`. Ces commandes ne sont **pas nécessaires** pour utiliser l'application.

## RGPD

Aucun formulaire n'envoie les réponses au serveur. GitHub Pages reçoit cependant des données techniques de connexion. Une analyse RGPD et accessibilité reste nécessaire avant une diffusion à grande échelle.

## Évolution V0.4 — consolidation

- Questionnaire passé à 5 écrans : handicap, jeune enfant, perte d’autonomie et fin de contrat ; les réponses incertaines restent possibles.
- Champs numériques obligatoires contrôlés avant la suite ; pas de revenus ni d’âge préremplis.
- Guide des courriers : conserver une copie, repérer l’échéance, vérifier l’expéditeur.
- Effacement explicite des réponses en mémoire.
- Informations de provenance ajoutées au référentiel : aucun montant n’est présenté comme vérifié.

**Limites à ne pas masquer :** il s’agit encore d’un outil de repérage, pas d’un simulateur d’éligibilité. Les règles de séjour, les revenus par période, les conditions précises et les barèmes ne sont pas automatisés. La veille quotidienne contrôle les pages, pas leur sens juridique. La publication de montants nouveaux sans validation humaine n’est pas activée : elle exigerait des flux officiels structurés et des tests réglementaires. La mise en ligne doit être accompagnée de tests utilisateurs FALC, de relectures des traductions, d’un audit d’accessibilité et d’un examen RGPD.


## Version 0.5 — sécurité des orientations

Les résultats distinguent les pistes prioritaires des aides à vérifier malgré des informations manquantes. Les trois revenus mensuels sont récapitulés sans être transformés en calcul réglementaire. Les guides de documents signalent les échéances et la confidentialité. Le statut de contrôle des liens officiels n'est **pas** une validation de barème.

### Limites avant une diffusion à grande échelle
- Tests avec des personnes concernées et relecture des quatre langues, y compris par des personnes lisant difficilement.
- Vérification réglementaire aide par aide et adaptation aux règles de séjour et de cumul.
- Veille des sources : seules les empreintes de pages sont actualisées automatiquement ; aucun montant ni critère n'est extrapolé.
- Audit RGPD, accessibilité RGAA, vérification de l'hébergement et des modalités de recours.

## V0.6 — améliorations
- Aide supplémentaire en langage simple, traduite en 4 langues.
- Question sur la présence d'une date limite dans un document, avec conseils adaptés.
- Impression des conseils sans les contrôles de navigation.
- État de connexion explicite. Aucune réponse n'est envoyée à un serveur.
- Résultats plus prudents : ne pas exclure définitivement les familles avec une règle sommaire.

**Limites** : cette version ne calcule toujours aucun droit acquis ou montant ; la vérification des sources n'actualise pas les barèmes. Le site n'a pas encore été audité RGAA ni validé FALC avec des personnes concernées.

## V0.7 — Données réglementaires structurées

`data/official-rates.json` est le registre des montants vérifiés, affiché dans les résultats lorsque des données sont disponibles. `scripts/update_rates.py` est exécuté quotidiennement par `.github/workflows/rates.yml`. Il exige **deux flux JSON officiels indépendants** donnant exactement le même montant et la même date d'effet, et refuse les montants ambigus, invalides ou discordants. En cas d'échec, une donnée déjà présente est signalée comme non revérifiée. Aucun calcul d'éligibilité n'est inféré d'un montant publié.

**Important : aucun flux de barèmes n'est configuré par défaut.** Les sites institutionnels ne fournissent pas tous de flux JSON stable, documenté et suffisamment précis pour une ingestion sûre. La veille des pages HTML reste active, mais **ne met pas à jour les montants**. Pour activer une aide, ajouter deux sources structurées indépendantes et les chemins de champs à `data/rate-feeds.json`, avec le périmètre exact (`scope`). L'absence de source structurée ne doit jamais être compensée par une extraction approximative.

La mise à jour des montants est automatique et sans validation humaine **uniquement** lorsque les contrôles passent. Les utilisateurs doivent toujours vérifier leurs droits auprès d'un conseiller.


## V0.8 — corrections de sécurité et de compréhension
- Les revenus du partenaire sont demandés séparément ; les revenus inconnus ne deviennent pas zéro.
- Une saisie numérique invalide est refusée plutôt que corrigée silencieusement.
- Les montants dont la vérification a échoué ne sont plus affichés comme montants fiables.
- Les montants publiés restent des **montants de référence**, jamais des estimations personnalisées.
- Les aides au logement ne sont pas écartées sur le seul statut d'occupation déclaré.
- Les guides et résultats sont purement indicatifs ; les règles de calcul complètes restent à réaliser.
- La validation FALC, RGAA et la relecture des traductions restent nécessaires avant une diffusion institutionnelle.

### Installation / publication
Aucun outil n'est nécessaire pour les visiteurs. Copier le contenu du dossier à la racine de la branche GitHub Pages. Pour tester en local sans serveur, ouvrir `index.html` directement ne permet pas toujours de charger les JSON avec `fetch` : tester sur GitHub Pages ou avec un serveur HTTP local.

## Version 0.9 — repérage explicable

Le module `rules.js` isole les règles de **priorisation**, pas des décisions d’éligibilité. Chaque résultat affiche les points à vérifier en quatre langues. Dix scénarios de non-régression sont exécutés par `node scripts/test_rules.js` et dans GitHub Actions. Les barèmes officiels ne sont toujours pas alimentés : aucun calcul monétaire personnalisé n’est proposé. Le service ne doit pas être présenté comme un simulateur de droits certifié.


## V1.0 — fraîcheur et vérification des barèmes

- Deux sources de domaines différents sont nécessaires pour publier un montant structuré. Ce contrôle technique ne garantit pas à lui seul une indépendance éditoriale réelle.
- Une donnée non revérifiée depuis plus de 35 jours n'est plus présentée comme vérifiée. Une indisponibilité ou une discordance de source désactive aussi son affichage.
- `python scripts/test_rates.py` teste les montants invalides, les champs absents et les domaines refusés sans accès réseau.
- **Limite :** le fichier `data/rate-feeds.json` ne contient encore aucun flux officiel documenté. Aucun calcul réglementaire personnalisé n'est donc proposé. Le moteur de surveillance ne constitue pas une garantie de mise à jour des droits.
- L'application est expérimentale et les contenus FALC/traductions nécessitent encore des tests auprès des publics concernés.


## V1.1 — Première donnée réglementaire réelle
La BMAF au 1er avril 2026 est **478,16 €**, selon Service-Public (article A16506, mis à jour le 1er avril 2026). C'est un **paramètre de référence**, pas une prestation versée. Une tâche GitHub Actions vérifie quotidiennement que le même montant figure encore sur cette source. En cas de nouveau montant, d'ambiguïté ou d'indisponibilité, la tâche échoue sans publier une nouvelle valeur. Elle ne calcule pas les droits individuels. L'API OpenFisca est une voie d'intégration future pour des paramètres structurés, mais n'est pas branchée ici. Les réponses personnelles ne sont pas envoyées à cette source.


## V1.2 — OpenFisca et premier calcul personnalisé

- `scripts/sync_openfisca.py` télécharge chaque jour jusqu'à trois paramètres publics depuis l'API OpenFisca-France (`/latest/parameters/...`). La synchronisation est automatique dans `.github/workflows/openfisca.yml`, sans envoi de réponses des utilisateurs. Les valeurs sont publiées uniquement si elles sont numériques, datées et dans des bornes plausibles. Un échec de récupération conserve l'ancienne valeur, qui n'est plus montrée comme fraîche après 35 jours.
- `data/openfisca-parameters.json` est volontairement vide au départ : l'API distante n'a pas pu être interrogée dans l'environnement de fabrication. La première exécution réelle sur GitHub doit être vérifiée dans l'onglet Actions ; les chemins et la forme des réponses de l'API peuvent nécessiter des ajustements.
- Le **premier calcul personnalisé** est la somme et la moyenne des trois revenus mensuels déclarés. Il fonctionne hors ligne et est testable. Ce n'est **pas** un calcul de RSA, prime d'activité ou d'allocations familiales. Les périodes de référence de ces aides diffèrent.
- L'API publique OpenFisca est annoncée comme expérimentale, sans garantie de disponibilité ni stabilité. Les valeurs récupérées sont des paramètres du modèle, pas des droits établis. Les montants ne sont jamais présentés comme une prestation personnelle.

### Tester
`python scripts/validate_openfisca.py`, `python scripts/validate.py`, `node --check app.js`, `node scripts/test_personal.js`. Sur GitHub, lancer manuellement **Synchronisation des paramètres OpenFisca** pour initialiser le fichier.


## V1.3 — préparation du dossier famille

Le questionnaire accepte les âges des enfants, par exemple `2, 7, 15`, et indique les tranches d'âge pertinentes pour **préparer une vérification** de prestations familiales. Le moteur ne conclut pas à l'éligibilité à l'ARS et ne calcule aucun montant. Les conditions d'âge dépendent aussi de dates de référence, de la scolarité, des ressources et du lieu de résidence. Les revenus des trois mois affichent désormais les mois à zéro, les valeurs minimales et maximales dans le moteur, sans les présenter comme une prestation.

La synchronisation OpenFisca échoue explicitement si aucune des trois valeurs n'a pu être vérifiée : une panne ne doit pas être assimilée à une mise à jour réussie.

## V1.4 : estimation limitée des allocations familiales

Barème daté du 1er avril 2026, pour **2, 3 ou 4 enfants**, France métropolitaine, montant **de base seulement**, d'après Service-Public (https://www.service-public.gouv.fr/particuliers/vosdroits/F13213). Le calcul demande les **revenus nets catégoriels de 2024**, distincts des salaires récents. La CAF (https://www.caf.fr/professionnels/offres-et-services/accompagnement-des-allocataires/bareme-allocations-familiales) présente une table légèrement différente pour certains arrondis ; ce prototype suit explicitement les montants de Service-Public. Aucune majoration d'âge, complément dégressif, règle de séjour, situation particulière ou validation du nombre d'enfants à charge n'est calculée. Ce résultat n'est pas une décision et ne garantit pas un versement.

Les paramètres OpenFisca restent une piste de synchronisation séparée ; l'estimation familiale ne prétend pas être une simulation OpenFisca. Les données personnelles ne sont pas transmises à un serveur.

## V1.5 — vérification des allocations familiales

Le calcul du montant de base couvre maintenant 2 à 5 enfants, avec les seuils 2026 publiés par CAF et Service-Public. Le revenu demandé est le revenu net catégoriel 2024. Les majorations d'âge, le complément dégressif, la résidence alternée et les cas ultramarins restent hors calcul. Les sources officielles diffèrent parfois d'un centime : ce point est explicitement signalé. Il ne faut pas présenter ce résultat comme le montant effectivement versé.

Sources : https://www.caf.fr/professionnels/offres-et-services/accompagnement-des-allocataires/bareme-allocations-familiales et https://www.service-public.gouv.fr/particuliers/vosdroits/F13213.


## V1.6 — majorations d'âge (calcul partiel)

Saisie facultative des dates de naissance et du mois de simulation (avril 2026 à mars 2027). Les majorations sont ajoutées uniquement après le mois anniversaire, selon le seuil transitoire du 1er mars 2012; pour deux enfants l'aîné n'ouvre pas droit à majoration. Les enfants de 20 ans et plus, les cas d'allocation forfaitaire provisoire, les compléments dégressifs et les territoires hors métropole ne sont **pas** simulés. Le résultat est un sous-total indicatif, pas un montant garanti. Les montants de majoration sont issus de Service-Public et peuvent diverger d'un centime de ceux de la CAF.

Tests : `node scripts/test-family-ages.cjs`. Source : https://www.service-public.gouv.fr/particuliers/vosdroits/F13213 et décret https://www.legifrance.gouv.fr/eli/decret/2026/2/27/2026-138/jo/texte.

## V1.7 — Complément dégressif (calcul limité)

Le module `family-estimator.js` calcule le complément dégressif aux deux seuils de ressources pour 2 à 5 enfants, avec majorations d’âge si les dates de naissance sont fournies. Il applique la formule de l’article D521-1 du Code de la sécurité sociale, en distinguant le montant du palier inférieur et le total transitoire. Tests : `node scripts/test-family-taper.cjs`. Le montant reste indicatif : les cas de résidence alternée, outre-mer, forfait à 20 ans, ressources particulières et arrondis CAF ne sont pas simulés. Les données sont datées avril 2026 à mars 2027.

## V1.8 — garde-fous du calcul

Le calcul complet requiert désormais les dates de naissance et quatre confirmations explicites (métropole, garde non alternée, enfants à charge, absence de situation particulière). Aucun montant n’est affiché lorsque le cas n’est pas couvert. Voir `LIMITES_SIMULATEUR.md`. Le test `scripts/test-family-safety.cjs` vérifie ces refus, notamment le mois des 20 ans.


## V1.9 — préparation RSA (sans estimation de droit)

Un onglet permet de préparer une liste des informations à vérifier pour une demande RSA. Les revenus sont additionnés localement, **sans les présenter comme une assiette réglementaire**. Voir `LIMITES_RSA.md`. Test : `node scripts/test_rsa.cjs`.

## V2.0 : illustration RSA strictement encadrée

Un nouveau formulaire donne un exemple chiffré pour une personne seule de 25 ans ou plus, sans enfant et sans aucune ressource, selon son logement. Le calcul est local et refuse les cas non couverts. Voir `LIMITES_RSA.md` et `data/rsa-2026.json`. Les valeurs sont statiques, non synchronisées avec OpenFisca.

### V2.1 — RSA avec ressources (illustration strictement encadrée)

`rsa-resources.js` calcule les mois M-4, M-3 et M-2 et une illustration de montant pour une personne seule sans enfant avec revenus déclarés. Voir `LIMITES_RSA.md`. Les autres revenus et prestations obéissent parfois à des règles spécifiques non modélisées ; ce module n'est pas un calcul officiel de droit. Tester avec `node scripts/test_rsa_resources.cjs`.

## V2.2 — Parcours « conseiller »
Le module RSA propose désormais cinq questions successives, avec « Je ne sais pas », retour, effacement et orientation vers la CAF. Les réponses restent en mémoire volatile dans le navigateur, sans stockage ni transfert. Le parcours ne valide pas l'éligibilité et ne remplace pas les calculs réglementaires. La question sur les ressources vise la préparation des justificatifs ; les mois M-4 à M-2 s'appliquent aux déclarations trimestrielles préremplies, pas automatiquement à toute demande initiale.

## Parcours par situation (V2.3)

Quatre entrées en langage courant : travail saisonnier, perte d'emploi, courrier incompris, difficulté de logement. Le module `situation-guide.js` fonctionne localement, sans collecte ni envoi de réponses. Il fournit des orientations et non des décisions de droits. Tests : `node scripts/test_situations.cjs`.


## V2.6 — Passage de relais conseiller → RSA
Le contexte du parcours (catégorie non sensible et non chiffrée) est transmis uniquement en mémoire vive à la rubrique RSA, où il peut être effacé. Aucun préremplissage des déclarations ou des calculs, aucune conservation après actualisation. Voir `CHANGELOG_V26.md`.

## V2.7 : fiche récapitulative
Après le parcours du conseiller, un bouton permet de créer, copier, imprimer ou effacer une fiche. Elle reste uniquement dans la page, sans stockage. Ce résumé ne confirme pas les droits.

## CAF ou MSA (V2.8)
Le conseiller demande quel logo apparaît sur un courrier récent ou l’espace de prestations. Il n’infère jamais la caisse de la seule profession. « Je ne sais pas » reste possible. Le choix est temporaire et doit être confirmé auprès de la caisse.


## V2.9 — Identifier un expéditeur sans envoyer de courrier
Le conseiller demande quel nom ou logo figure sur le courrier, et si celui-ci concerne le dossier actuel. Il distingue CAF, MSA, France Travail, CPAM et DGFiP, sans déduire automatiquement le régime de prestations. Aucun fichier, numéro de dossier ou donnée nominative n'est demandé. Un logo est un indice, jamais une confirmation de compétence.

## V3.0 — Courriers
Le parcours conseiller propose un tri des courriers par type et urgence, sans téléversement ni texte personnel. Il ne détermine pas les délais de recours. Voir CHANGELOG_V30.md.

## V3.1 — Prioriser les démarches urgentes

Un guide accessible depuis les parcours logement et courrier demande le type de difficulté et si une échéance est proche. Il propose une action concrète, les documents à préparer et les numéros 112/115 lorsque pertinents. Il ne calcule pas de délai de recours et ne demande aucune information personnelle. Les conseils sont disponibles en quatre langues.

## V3.2 — Mes démarches à suivre
Une liste de trois étapes cochables est proposée à la fin des parcours du conseiller. Les coches ne sont pas enregistrées et ne valent pas preuve de démarche administrative. Voir CHANGELOG_V32.md.

## V3.3
Guide « Je suis bloqué dans une démarche » disponible à la fin des parcours du conseiller, en quatre langues.

## V3.4
Le guide des démarches bloquées propose un message à copier et à adapter. Aucune donnée personnelle n’est demandée ni envoyée. Voir CHANGELOG_V34.md.

## V3.5
Un glossaire interactif explique huit mots administratifs en quatre langues, sur la page d’accueil. Voir `CHANGELOG_V35.md`.


## V3.6 — Aide sur les mots
Les mots administratifs présents dans le résultat du conseiller peuvent être expliqués sans quitter le parcours. Voir CHANGELOG_V36.md.

## V3.7
Le conseiller demande si la prochaine démarche est comprise et peut la reformuler ou proposer une aide humaine.

## V3.8
Le guide des démarches bloquées propose désormais des explications personnalisées selon le problème rencontré. Voir `CHANGELOG_V38.md`.

## V3.9
Un guide aide à choisir téléphone, Internet, courrier ou accueil physique dans les démarches bloquées. Voir CHANGELOG_V39.md.

## V4.0
Après le choix « Par téléphone », le guide propose un script à lire, puis demande si la personne a réussi à joindre quelqu'un. Aucune donnée n'est envoyée.

## V4.1 — Après mon appel
Après un appel réussi, un formulaire facultatif permet de noter la réponse et de choisir la prochaine démarche. Les notes ne sont ni enregistrées ni transmises.


## V4.2
Après un appel, le suivi des démarches indique la prochaine action à effectuer, avec des cases temporaires et sans sauvegarde. Voir CHANGELOG_V42.md.

## V4.3
Après un appel demandant un document, le conseiller aide à choisir comment l’envoyer et à conserver une preuve.

## V4.4
Après l’envoi d’un document : vérifier la confirmation, les délais et préparer une relance sans envoi automatique.

## V4.5
Guide « J’ai reçu une réponse » après envoi d’un document. Voir CHANGELOG_V45.md.
