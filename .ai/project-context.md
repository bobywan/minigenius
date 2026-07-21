# Contexte projet

> Mets à jour ce fichier à chaque fois que le contexte du projet évolue significativement.
> Il est lu automatiquement par les agents IA au début des sessions de travail.

---

## Objectif du projet

MiniGenius est une application web éducative gamifiée pour les enfants (6–12 ans).
Elle propose des exercices de maths interactifs avec progression par étoiles, déverrouillage de niveaux, effets sonores et confettis — pensée pour être utilisée sur tablette.

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
  page.tsx                     # Accueil — choix de matière
  maths/
    page.tsx                   # Choix de l'opération (4 modules)
    [module]/
      page.tsx                 # Choix de la difficulté (3 niveaux)
      [difficulty]/page.tsx    # Jeu — série de 10 exercices
  design/page.tsx              # Design system (référence)
components/
  game/                        # Composants de jeu
  ui/                          # Composants réutilisables
lib/
  types.ts                     # Types, constantes, helpers
  exercises/generators/math.ts # Génération d'exercices aléatoires
  store/progressStore.ts       # Zustand — progression persistante
  audio/sounds.ts              # Sons (Web Audio API)
public/
  icons/                       # Icônes PWA
  manifest.json                # PWA manifest
```

**Principes :**
- Server Components par défaut — `"use client"` uniquement si nécessaire (jeu, store)
- Imports internes via l'alias `@/`
- Pas de `var`, pas d'`any` explicite

---

## Système de progression

- Chaque niveau (module × difficulté) donne 0–3 étoiles selon le score sur 10
- Score < 6 → 0 étoile (niveau non validé, pas de déverrouillage)
- Score 6–7 → 1 étoile, 8–9 → 2 étoiles, 10 → 3 étoiles
- La difficulté suivante se déverrouille à ≥ 1 étoile
- Le module suivant se déverrouille quand toutes les difficultés du précédent ont ≥ 1 étoile
- Progression sauvegardée en localStorage via Zustand persist

---

## Design system

Thème cartoon/Fall Guys — fond bleu vif → cyan, composants glossy.

| Token | Valeur |
|---|---|
| `--color-bg-deep` | `#115ded` |
| `--color-bg-surface` | `#49ebfe` |
| `--font-display` | Titan One |
| `--font-body` | Nunito |
| `--text-shadow-solid` | Contour noir cartoon |

Composants clés : `GlassCard` (gradients par variante), `NeonButton` (3D cartoon), `StarRating`, `BadgeModule`, `DifficultyBadge`, `ProgressDots`.

---

## Contraintes métier

- Utilisateurs cibles : enfants 6–12 ans sur tablette → NumPad tactile, gros boutons, contrastes élevés
- Zéro emoji dans l'UI — uniquement des icônes Lucide
- Progression non réinitialisable depuis l'interface (localStorage uniquement)
- Pas d'authentification, pas de backend — 100% client-side

---

## Matières disponibles

| Matière | Statut |
|---|---|
| Maths | Actif |
| Français | Bientôt |
| Anglais | Bientôt |
| Histoire | Bientôt |

---

## Points d'entrée importants

- `npm run dev` — lance le serveur de développement
- `npm run build` — build de production
- `npm run check` — lint + format + imports (BiomeJS)
- `/design` — page design system (tokens + composants)
