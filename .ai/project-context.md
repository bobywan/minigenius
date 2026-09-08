# Contexte projet

> Mets à jour ce fichier à chaque fois que le contexte du projet évolue significativement.
> Il est lu automatiquement par les agents IA au début des sessions de travail.

---

## Objectif du projet

MiniGenius est une application web éducative gamifiée pour les enfants (6–12 ans).
Elle propose des exercices de maths et de vocabulaire anglais interactifs avec progression par étoiles, effets sonores et confettis — pensée pour être utilisée sur tablette.

---

## Stack technique

| Outil | Version | Rôle |
|---|---|---|
| Next.js | 16 (App Router) | Framework fullstack |
| React | 19 | UI |
| TypeScript | 5 (strict) | Typage |
| Tailwind CSS | v4 | Styles (via CSS, sans config file) |
| BiomeJS | v2 | Lint + format |
| Zustand | v5 | État de progression (localStorage) |
| Framer Motion | v12 | Animations |
| Lucide React | — | Icônes (zéro emoji dans l'UI) |
| canvas-confetti | — | Confettis fin de série |
| Node.js | 24 LTS | Runtime |

---

## Architecture

```
app/
  (main)/
    page.tsx                              # Accueil — choix de matière
    maths/
      page.tsx                            # Choix de l'opération
      [module]/                           # addition | soustraction | multiplication | division
        page.tsx                          # Choix de la difficulté
        [difficulty]/page.tsx             # Série de 10
        libre/page.tsx                    # Jeu libre
      mixte/
        page.tsx                          # Difficultés mixte
        [difficulty]/page.tsx             # Série mixte
        libre/page.tsx
    anglais/
      page.tsx                            # Traduction + 6 modules QCM
      traduction/
        page.tsx                          # Thèmes (animaux, cuisine, école, …, tout)
        [theme]/
          page.tsx                        # en-fr / fr-en / mixte / libre
          [mode]/page.tsx                 # Série de 10
          libre/page.tsx
      [module]/                           # conjugaison | phrases | pluriels | articles | contraires | lecture
        page.tsx                          # Slots + jeu libre
        [slot]/page.tsx                   # Série de 10
        [slot]/libre/page.tsx
    francais/
      page.tsx                            # 6 modules QCM
      [module]/
        page.tsx                          # Slots + jeu libre
        [slot]/page.tsx                   # Série de 10
        [slot]/libre/page.tsx
    mini-jeux/
  design/page.tsx                         # Design system
components/
  game/                                   # ChoiceGrid, WordPrompt, SeriesResultScreen, …
  ui/
lib/
  types.ts
  hooks/useSeriesGame.ts                  # Boucle série (timers, dots)
  hooks/useLibreGame.ts                   # Boucle jeu libre
  exercises/generators/math.ts
  exercises/generators/english.ts      # vocabulaire traduction
  exercises/generators/english-quiz/   # banks QCM (conjugaison, phrases, …)
  exercises/generators/french/         # banks QCM + index
  store/progressStore.ts
  audio/
public/
  audio/en/                               # MP3 prononciation (un par mot EN)
  sw.js                                   # PWA — PRECACHE des hubs
```

**Principes :**
- Server Components par défaut — `"use client"` uniquement si nécessaire (jeu, store)
- Imports internes via l'alias `@/`
- Pas de `var`, pas d'`any` explicite
- Les générateurs (`*.ts`) restent exécutables par Node (imports relatifs, pas d'alias `@/` pour les valeurs)

---

## Système de progression

- Chaque série donne 0–3 étoiles selon le score sur 10
- Score < 6 → 0 étoile (niveau non validé)
- Score 6–7 → 1 étoile, 8–9 → 2 étoiles, 10 → 3 étoiles
- Maths : module × difficulté (`saveResult("maths", "addition", "facile", …)` ; mixte maths = `"mixte"`)
- Anglais traduction : thème × sens (`saveResult("anglais", "animaux", "en-fr", …)` ; tous les thèmes = `"tout"`)
- Anglais QCM : module × slot (`saveResult("anglais", "conjugaison", "preterit", …)`)
- Français : module × slot (`saveResult("francais", "homophones", "a-a", …)`)
- Tous les modules, thèmes, modes et difficultés sont jouables d'emblée (pas de verrou)
- Progression dans localStorage (`minigenius-progress`, persist v2) — pas de reset dans l'UI

---

## Design system

Thème épuré blanc/emerald/amber — fond blanc avec sol vert ondulant, composants modernes.

| Token | Valeur |
|---|---|
| `--color-emerald-500` | `#10b981` |
| `--color-amber-500` | `#f59e0b` |
| `--font-display` | Titan One |
| `--font-body` | Nunito |
| `--radius-card` | `1.5rem` |
| `--radius-btn` | `1rem` |

**Composants UI :** `Card`, `Button`, `StarRating` (amber), `BackLink`, `Logo`, `PageTitle`, `PageSubtitle`, `DifficultyBadge`, `BadgeModule`.

**Composants jeu :** `ProgressDots`, `ChoiceGrid`, `WordPrompt`, `ReadingPrompt`, `SpeakButton`, `SeriesResultScreen`, `ExerciseDisplay`, `AnswerInput`, `NumPad`.

**Page référence :** `/design` — design system et playground des écrans de jeu (dont `SeriesResultScreen`)

---

## Contraintes métier

- Utilisateurs cibles : enfants 6–12 ans sur tablette → NumPad tactile, gros boutons, contrastes élevés
- Zéro emoji dans l'UI — uniquement des icônes Lucide
- Progression non réinitialisable depuis l'interface
- Pas d'authentification, pas de backend — 100% client-side

---

## Matières disponibles

| Matière | Statut |
|---|---|
| Maths | Actif — 4 opérations × 3 difficultés + mixte + jeu libre |
| Anglais | Actif — traduction par thème + 6 modules QCM (conjugaison, phrases, pluriels, articles, contraires, lecture) |
| Français | Actif — 6 modules QCM (homophones, nature, accords, vocabulaire, conjugaison, lecture) |
| Mini-jeux | Actif — pendu, runner |
| Histoire | Bientôt |

---

## Points d'entrée importants

- `npm run dev` — serveur de développement
- `npm run build` — build production
- `npm run check` — lint + format + imports (BiomeJS)
- `node lib/exercises/generators/english.check.mjs` — vocabulaire / séries QCM / MP3
- `node lib/exercises/generators/english-quiz.check.mjs` — banks QCM anglais / séries
- `node lib/exercises/generators/french.check.mjs` — banks français / séries QCM
- `/design` — design system et playground des écrans de jeu
