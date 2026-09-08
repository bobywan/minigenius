# Journal des décisions d'architecture

> Documente ici toute décision structurelle non triviale.
> Format : date ISO, titre court, contexte, décision, alternatives écartées, conséquences.
> Consulté automatiquement par les agents IA pour éviter de remettre en question les choix passés.

---

## [2026-06-27] Choix de BiomeJS v2 comme unique outil de lint/format

**Contexte :** Le projet a besoin d'un outil de lint et de format. ESLint + Prettier est la stack traditionnelle mais implique deux outils, deux configs, et des conflits fréquents entre les deux.

**Décision :** BiomeJS v2 remplace à la fois ESLint et Prettier — un seul outil, une seule config (`biome.json`), une seule commande (`npm run check`).

**Alternatives écartées :**
- ESLint + Prettier : deux outils à maintenir, conflits de règles, plus lent
- oxlint : performant mais moins mature, pas de formatter intégré

**Conséquences :** Configuration plus simple, CI plus rapide. Quelques règles ESLint avancées non disponibles dans Biome (acceptable pour ce cas d'usage).

---

## [2026-06-27] Tailwind CSS v4 sans fichier de configuration

**Contexte :** Tailwind v4 introduit une approche radicalement différente — la configuration se fait via CSS (directives `@theme` dans `globals.css`) et non via `tailwind.config.js`.

**Décision :** Pas de `tailwind.config.js` ni `tailwind.config.ts`. Thème et customisations directement dans `app/globals.css`.

**Alternatives écartées :**
- Garder Tailwind v3 avec config file : moins moderne, pas aligné avec l'écosystème actuel

**Conséquences :** Moins de fichiers de config. Nécessite de connaître la syntaxe `@theme` de Tailwind v4.

---

## [2026-06-27] Intégration Context Mode + Headroom (double MCP)

**Contexte :** Deux serveurs MCP de gestion de contexte sont configurés : `headroom` (compression) et `context-mode` (sandbox, session persistante, FTS5).

**Décision :** Les deux coexistent — ils couvrent des besoins complémentaires. Headroom compresse les payloads entrants, Context Mode gère la persistance de session et les outils sandbox.

**Alternatives écartées :**
- Context Mode seul : perd la compression Headroom déjà en place
- Headroom seul : pas de session persistante, pas de sandbox tools

**Conséquences :** Deux prérequis machine à installer (`pip install headroom-ai[mcp]` et `npm install -g context-mode`). Documenter clairement dans le README.

---

## [2026-06-27] Ponytail comme règle Cursor (pas de plugin)

**Contexte :** Ponytail propose un plugin pour Claude Code, Codex, etc., mais pour Cursor il fonctionne uniquement via une règle `.mdc` copiée dans `.cursor/rules/`.

**Décision :** Copie directe de `.cursor/rules/ponytail.mdc` depuis le repo officiel. Aucune dépendance, aucun hook.

**Alternatives écartées :**
- Attendre un plugin Cursor natif : pas de date prévue
- Ne pas intégrer Ponytail : perdre le bénéfice du YAGNI ladder

**Conséquences :** Mise à jour manuelle de `ponytail.mdc` si le repo upstream change (vérifier périodiquement).

---

## [2026-06-27] Intégration Serena (navigation symbolique via LSP)

**Contexte :** Les outils Cursor natifs (Read, Grep, Shell) opèrent à niveau texte — trouver des références, renommer un symbole cross-file ou déplacer une fonction nécessite plusieurs étapes manuelles fragiles. Serena expose ces opérations comme outils MCP en s'appuyant sur le Language Server Protocol.

**Décision :** Ajout de Serena comme serveur MCP avec `--context=ide --project-from-cwd`. Le contexte `ide` est recommandé pour Cursor/Windsurf — il désactive les outils Serena qui doublonnent les capacités natives (Shell, Read, search) pour éviter la surcharge de contexte.

**Alternatives écartées :**
- Ne pas ajouter Serena : perd le rename cross-file symbolique, les find-references et le refactoring sûr
- Contexte `claude-code` : trop de doublons avec les outils Cursor natifs

**Conséquences :** Prérequis supplémentaire (`uv` + `serena-agent`). En contrepartie, l'agent peut renommer un symbole dans tout le projet en un appel MCP au lieu de plusieurs grep + replace successifs. Le projet TypeScript est supporté nativement via `typescript-language-server`.

## [2026-07-21] Service worker statique natif à la place de @ducanh2912/next-pwa

**Contexte :** `@ducanh2912/next-pwa` est un plugin Webpack qui génère `sw.js` au build. Next.js 16 avec `turbopack: {}` utilise Turbopack, qui ignore les plugins Webpack → `sw.js` jamais généré en production → PWA non installable sur mobile.

**Décision :** Service worker statique dans `public/sw.js` (API native browser, aucune dépendance). Enregistrement via un composant `"use client"` minimal (`components/ServiceWorkerRegistration.tsx`) injecté dans le root layout. Stratégie : network-first sur les navigations, cache-first sur les assets statiques.

**Alternatives écartées :**
- Désactiver Turbopack : perte des gains de performance en dev, contre l'intention du projet
- `serwist` (successeur de next-pwa compatible Turbopack) : nouvelle dépendance non justifiée, le SW natif couvre 100% du besoin ici

**Conséquences :** Pas de précaching automatique des routes Next.js (chunks JS). Seules `/`, `/maths` et `/anglais` sont précachées explicitement. Si de nouvelles routes critiques sont ajoutées, les ajouter au tableau `PRECACHE` dans `public/sw.js`.

---

## [2026-07-31] Matière Anglais — QCM générique et prononciation native

**Contexte :** L'ouverture de la matière Anglais introduit un format d'exercice absent du projet (choix multiples) et un besoin de prononciation. Le store et `SeriesResultScreen` étaient par ailleurs typés sur `MathModule`, ce qui bloquait toute matière non mathématique.

**Décision :**
- Introduction de `ModuleId = MathModule | EnglishModule` dans `lib/types.ts` ; `SubjectProgress` et les signatures de `progressStore` sont élargies à `ModuleId`. Aucune page maths impactée.
- Les deux sens de traduction (`traduction-en-fr`, `traduction-fr-en`) sont des modules distincts et non un paramètre d'un module unique — ils ont donc leurs propres étoiles, et la liste `/anglais` reste extensible (Phrases, Conjugaison).
- QCM générique en deux composants : `ChoiceGrid` (4 boutons, feedback vert/rouge repris du clavier du Pendu) et `WordPrompt`.
- Prononciation via `speechSynthesis` natif (`lib/audio/speech.ts`), sur le modèle silencieux de `lib/audio/sounds.ts`. `SpeakButton` ne se rend pas si l'API est absente.
- La difficulté encode la fréquence du mot (courant → rare), pas la proximité des distracteurs. Les distracteurs sont tirés dans le même niveau, dédoublonnés sur la chaîne affichée.
- Vocabulaire (342 mots) et générateur dans un seul fichier `lib/exercises/generators/english.ts`, comme `math.ts` : le fichier reste exécutable directement par Node, ce qui permet à `english.check.mjs` de le vérifier sans résolution d'alias ni dépendance de test.

**Alternatives écartées :**
- Élargir le type des props mortes `module`/`difficulty` de `SeriesResultScreen` : elles n'étaient jamais lues, elles ont été supprimées.
- Une bibliothèque de TTS : `speechSynthesis` couvre 100 % du besoin, aucune dépendance justifiée.
- Vocabulaire dans un fichier séparé importé via `@/` : casse l'exécution directe sous Node (alias non résolu), donc le check exécutable.

**Conséquences :** Toute nouvelle matière peut réutiliser `ChoiceGrid` + `SeriesResultScreen` + `ProgressDots`. Ajouter un module non mathématique ne demande plus qu'une extension de `ModuleId`. Le fichier `english.ts` est volumineux (données + logique) — si une troisième matière à vocabulaire apparaît, extraire un format de données partagé et un runner de check commun.

---

## [2026-08-30] Migration design système vers blanc/emerald/amber

**Contexte :** Le projet a démarré avec un thème cartoon coloré (gradients magenta/rose, boutons néons multicolores avec 5 variantes) inspiré Fall Guys. Après itération et tests utilisateurs, ce design s'est révélé trop agressif visuellement pour une application éducative destinée aux enfants, avec des problèmes de contraste et de lisibilité, notamment sur tablette. Le dégradé bleu vif en fond fixe créait aussi une fatigue visuelle lors de sessions prolongées.

**Décision :** Refonte complète vers un thème épuré blanc/emerald/amber :
- Fond blanc avec effet de sol vert ondulant (emerald-500/600) via pseudo-éléments CSS `body::before` et `body::after`
- Composants blancs avec effets hover emerald (shadow + scale + translation Y)
- Accent amber pour boutons secondaires, étoiles de progression et highlights
- Suppression de `GlassCard` (gradient magenta/rose avec bordure blanche) et `NeonButton` (5 variantes colorées pink/orange/green/yellow/ghost)
- Remplacement par `Card` (blanc, hover emerald, variantes padding/disabled) et `Button` (3 variantes primary/secondary/ghost)
- Migration de 20 fichiers : 8 pages de navigation, 7 pages de jeu, SeriesResultScreen, WordPrompt, PenduGame
- Nouvelle page `/design` simplifiée documentant le design system v2

**Alternatives écartées :**
- Cohabitation des deux designs (pages nav en blanc, pages jeu en cartoon) : incohérence visuelle trop perturbante, impression de deux applications différentes
- Garder le design cartoon original avec ajustements mineurs : les problèmes de contraste et de fatigue visuelle nécessitaient une refonte complète, pas des ajustements cosmétiques
- Design noir/sombre : moins adapté à une application éducative enfant, contraste insuffisant pour la lecture prolongée

**Conséquences :** 
- 20 fichiers modifiés (pages + composants)
- Design plus sobre et apaisant, meilleure lisibilité, contraste optimisé pour tablette
- Cohérence visuelle complète sur toute l'application
- Palette réduite de 5 couleurs à 3 couleurs principales (emerald, amber, blanc) simplifie la maintenance
- Le fichier `app/globals.css` contient maintenant les pseudo-éléments pour le sol vert (à maintenir si modification du fond)
- Tokens CSS custom properties mis à jour : suppression de `--color-bg-deep`, `--color-bg-surface`, mise à jour des shadows

---

## [2026-08-31] Verrous de progression, mixte typé, titres et PWA

**Contexte :** Les règles d'étoiles étaient documentées mais les locks étaient des stubs. `"mixte"` n'existait que comme `EnglishModule` alors que les maths l'utilisent aussi. `PageTitle` construisait `text-${size}` (purge Tailwind). Le SW ne précachait que 3 hubs.

**Décision :**
- Fonctions pures dans `lib/progress/locks.ts` (check Node) ; le store les enveloppe.
- `MixedModule = "mixte"` séparé ; `ModuleId = MathModule | EnglishModule | MixedModule`.
- `PageTitle` : map de classes statiques. Metadata via layouts + `title.template` racine.
- SW cache `minigenius-v2`, PRECACHE des hubs maths/anglais/mixte/mini-jeux.

**Alternatives écartées :**
- Redirect 404 sur URL d'un niveau verrouillé : flash SSR trop risqué ; le cadenas est sur le sélecteur uniquement.
- Bouton reset de progression : toujours hors UI (contrainte métier).

**Conséquences :** Un enfant peut encore coller une URL expert ; le parcours normal est verrouillé. Premier rendu = store vide (comme un nouveau joueur), puis hydration débloque selon localStorage.

---

## [2026-08-31] Retrait des verrous de cartes

**Contexte :** Le déverrouillage progressif (cadenas sur les sélecteurs) gênait l'accès libre aux opérations, modes et difficultés.

**Décision :** Supprimer `LockedCard`, `lib/progress/locks.ts` et les helpers du store. Tous les liens des hubs et sélecteurs de difficulté sont actifs. Les étoiles (`saveResult` / `getStars`) restent affichées, sans conditionner l'accès.

**Alternatives écartées :** Garder les verrous uniquement sur les difficultés — le besoin est un accès total dès le premier écran.

**Conséquences :** Un enfant peut enchaîner expert ou mixte sans avoir validé facile. La progression par étoiles reste un indicateur, pas une barrière.

---

## [2026-08-31] Anglais par thèmes

**Contexte :** Le QCM mélangeait plusieurs univers dans un palier de difficulté. Conseil pédagogique : fonctionner par thème (Animaux, Corps…).

**Décision :** Hub traduction = thèmes. Puis EN→FR / FR→EN / mixte / jeu libre. Slug `tout` pour tout le lexique (pas `mixte`, déjà le sens). Vocabulaire expert abstrait écarté. Persist v2 + `migrate` : `saveResult("anglais", thème, sens)` ; étoiles maths conservées, ancien anglais v1 (`en-fr.facile`) supprimé. SW `minigenius-v3`.

**Alternatives écartées :** Thème puis difficulté ; garder les trois niveaux d'écran (thème × sens × difficulté).

**Conséquences :** Plus de facile/moyen/expert en anglais. Les étoiles anglais v1 sont perdues à l'hydratation (migrate) ; les étoiles maths restent.

---

## [2026-08-31] Durcissement headers et .env.example

**Contexte :** Audit sécurité : pas de secrets, mais pas de CSP et `.env.example` héritait Auth/DB/Stripe.

**Décision :** CSP same-origin (`unsafe-inline` / `unsafe-eval` pour Next). `.env.example` : aucune variable requise.

**Conséquences :** Un script tiers (analytics) cassera tant que la CSP n'est pas élargie. `npm audit` : 0 vulnérabilité au 2026-08-31.

---

## [2026-08-31] Prononciation anglaise par fichiers MP3

**Contexte :** `speechSynthesis` à débit 0.5, voix système souvent médiocre ou non anglaise.

**Décision :** Un MP3 par mot EN (`public/audio/en/{slug}.mp3`). `speak()` joue le fichier ; repli Web Speech (voix `en*`, rate 0.9). Génération : `npm run audio:en` (Piper si dispo, sinon `say` + ffmpeg). Fichiers versionnés.

**Alternatives écartées :** Piper WASM dans le navigateur (bundle lourd) ; APIs cloud ; TTS Google Translate (ToS).

**Conséquences :** ~148 fichiers à régénérer si le lexique change. Qualité actuelle = voix macOS Samantha (améliorable en relançant avec Piper).

---

## [2026-09-02] Matière Français — six modules QCM

**Contexte :** Français était prévu sur l'accueil. L'anglais a montré qu'une matière non mathématique passe par `ModuleId` + QCM (`ChoiceGrid`, `useSeriesGame`). Six modules ont été retenus : homophones, nature des mots, accords, vocabulaire, conjugaison, lecture.

**Décision :**
- Hub `/francais` puis `[module]/[slot]` (série) et `[module]/[slot]/libre`. Une page de jeu dynamique pour tous les modules.
- `FrenchModule` dans `ModuleId`, `FrenchSlot` dans `SeriesSlot`. Persist inchangé (ajout de clés, pas de migrate).
- Banks dans `lib/exercises/generators/french/` (imports relatifs avec suffixe `.ts` pour Node). `allowImportingTsExtensions` est activé dans `tsconfig.json` (`noEmit` déjà vrai) pour que tsc accepte ces imports. Conjugaison générée depuis des tables de verbes. Lecture : `ReadingPrompt` + `QuizQuestion.passage`.
- PWA `minigenius-v4`, PRECACHE `/francais`.

**Alternatives écartées :** Extraire un `QuizSeriesGame` partagé anglais+français — l'anglais marche, une page française suffit. Dictée clavier et TTS français — hors QCM tablette / hors besoin de prononciation native.

**Conséquences :** Toute nouvelle banque QCM française s'ajoute dans `french/` sans nouvelle route. `QuizQuestion.enToFr` devient optionnel.

---

## [2026-09-06] Modules QCM anglais (hors traduction)

**Contexte :** L'anglais n'avait que la traduction par thème. Le français a montré qu'on peut empiler des familles QCM (conjugaison, lecture, etc.) sans nouveau moteur de jeu.

**Décision :**
- Hub `/anglais` : traduction inchangée + six modules (conjugaison, phrases, pluriels, articles, contraires, lecture).
- Routes `/anglais/[module]/[slot]` calquées sur le français. Le dossier statique `traduction/` gagne sur `[module]`.
- Banks dans `lib/exercises/generators/english-quiz/`. Réutilisation de `pickSeries` / `QuizSeed` depuis `french/quiz.ts` (pas d'extraction, pas de `QuizSeriesGame`).
- `EnglishQuizModule` dans `ModuleId` (les ids `conjugaison` / `lecture` déjà présents via le français). Persist inchangé (nouvelles clés, pas de migrate).
- Prononciation : `ChoiceGrid enableSpeech` seulement sur conjugaison et pluriels (repli Web Speech, pas de nouveaux MP3).

**Alternatives écartées :** Extraire un composant de jeu partagé FR/EN — le français et la traduction marchent déjà. Fusionner les banks dans `english.ts` — ce fichier reste le lexique de traduction, exécutable à part.

**Conséquences :** Ajouter un slot anglais = une banque + une entrée dans `ENGLISH_QUIZ_SLOTS`. La traduction n'est pas touchée.

---

## [2026-09-08] Matière Histoire — six modules QCM primaire

**Contexte :** Histoire était prévu sur l'accueil. Le français et l'anglais QCM ont montré qu'une matière non mathématique passe par `ModuleId` + `ChoiceGrid` / `useSeriesGame`. Le contenu doit rester dans le programme d'histoire du primaire (CE2–CM2, programmes 2026), pas le collège.

**Décision :**
- Hub `/histoire` puis `[module]/[slot]` (série) et `[module]/[slot]/libre`, calqué sur le français.
- Six modules par période : préhistoire, Rome et la Gaule, Moyen Âge, les rois, 1789, France récente. Un seul slot `mixte` chacun.
- `HistoryModule` dans `ModuleId`. Persist inchangé (ajout de clés, pas de migrate).
- Banks dans `lib/exercises/generators/history/` (imports relatifs avec suffixe `.ts`). Réutilisation de `pickSeries` / `QuizSeed` depuis `french/quiz.ts`.
- Hors v1 : Égypte / Grèce (6e), explorations / traite, Lecture dédiée, sous-slots Qui/Quoi/Quand. Guerres limitées aux dates-repères et au souvenir.
- PWA `minigenius-v5`, PRECACHE `/histoire`.

**Alternatives écartées :** Extraire un `QuizSeriesGame` partagé — le français et l'anglais QCM marchent déjà. Organiser le hub par compétences (dates / personnages / événements) — l'enfant choisit une période, comme à l'école.

**Conséquences :** Ajouter un module histoire = une banque + une entrée dans `HISTORY_MODULES`. Les autres matières ne sont pas touchées.

