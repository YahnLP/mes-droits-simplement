# Mes droits, simplement — GitHub Pages

Application statique sans installation utilisateur, sans compte et sans transmission des réponses du questionnaire. Quatre langues pour l'interface principale : français facile, anglais, espagnol et arabe (RTL). **Les explications détaillées des aides et les guides de courriers restent en français** et nécessitent une traduction professionnelle avant diffusion publique multilingue complète.

## Publier

1. Créer un dépôt GitHub public, placer les fichiers à sa racine (y compris `.github/`).
2. `Settings → Pages → Build and deployment → Deploy from a branch → main / (root)`.
3. Dans `Settings → Actions → General`, autoriser les Actions à créer des pull requests et configurer les permissions d'écriture nécessaires.
4. Protéger la branche `main` via `Settings → Branches / Rulesets` : exiger au moins **1 approbation humaine**, les tests `tests`, interdire le push direct et les contournements administrateur. Ajouter un mainteneur réel dans `.github/CODEOWNERS` et activer l'exigence de revue CODEOWNERS.
5. Vérifier dans `Actions` le workflow **Veille officielle** en lançant `Run workflow`. Une PR **brouillon** est créée si des changements documentaires sont constatés. **Aucune règle n'est automatiquement modifiée**.

### Mise à jour des règles

- `data/sources.json` : sources à surveiller (URL officielles).
- `data/source-watch.json` : empreintes de pages après première exécution.
- `data/veille-rapport.md` : rapport des changements détectés.
- `data/aides.json` : **référentiel actif** ; à modifier manuellement après validation des textes, des dates d'effet, des plafonds, des conditions de séjour, des traductions et des tests. Pour le moment, ce référentiel fait du repérage **sans calcul d'éligibilité ni de montants**.
- `data/documents.json` : conseils par type de courrier, non personnalisés.
- `data/i18n.json` : traductions d'interface.

**Attention :** la détection par empreinte de pages HTML produit parfois des faux positifs (mise en page) et des faux négatifs (pages hors liste, PDF, JavaScript). Un échec de consultation est signalé, jamais assimilé à l'absence de changement. L'automatisation GitHub Actions a été écrite et validée localement au niveau des fichiers, mais son exécution sur GitHub n'a pas été testée dans un dépôt réel.

## Vie privée et limites

Aucun serveur applicatif, compte, cookie, stockage local des réponses, service de traduction ni téléversement de documents. Les données saisies sont conservées dans la mémoire JavaScript et disparaissent au rechargement. Le navigateur contacte GitHub Pages pour les fichiers statiques et contacte les organismes officiels si l'utilisateur ouvre un lien ; ces services peuvent traiter les adresses IP et autres données de connexion. Une analyse RGPD et une politique de confidentialité adaptées à l'hébergement restent nécessaires avant lancement public.

L'outil ne vérifie **pas** la validité des titres de séjour, ne décide pas des droits et n'interprète pas les courriers. Pour les décisions urgentes (OQTF, expulsion, justice), contacter rapidement un professionnel qualifié. Les guides sont indicatifs, sans délais de recours universels.

## Tests

`python3 scripts/validate.py` (uniquement pour le développement ; aucun programme tiers requis par l'utilisateur final).

Pour prévisualiser localement en développement : `python3 -m http.server 8000` puis `http://127.0.0.1:8000`. Ouvrir directement `index.html` en `file://` peut bloquer le chargement des JSON ; GitHub Pages fonctionne sans ce problème.

## Documents santé et retraite

Le guide comprend désormais feuilles de soins, hospitalisation et sortie, arrêts de travail, relevés de carrière, notifications de pension, mutuelle, factures de soins, ordonnances, MDPH et accidents du travail. Il donne des orientations générales, sans analyse automatique de documents, diagnostic médical ni délai de recours garanti. Les conseils détaillés restent en français ; les traductions doivent être validées avant déploiement grand public.
