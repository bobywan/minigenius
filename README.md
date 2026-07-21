# MiniGenius

[![Démo](https://img.shields.io/badge/Demo-minigenius.vercel.app-black?logo=vercel)](https://minigenius.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Node](https://img.shields.io/badge/Node.js-24%20LTS-green?logo=node.js)](https://nodejs.org/)

Application éducative gamifiée pour les enfants — exercices de maths interactifs avec progression, étoiles et effets sonores.

## Fonctionnalités v1.0

- **Maths** : addition, soustraction, multiplication, division
- 3 niveaux de difficulté par opération (facile / moyen / expert)
- Système de progression avec étoiles (0–3 par niveau)
- Déverrouillage progressif des modules et difficultés
- NumPad tactile — utilisable sur tablette
- Effets sonores et confettis à la fin de chaque série
- PWA — installable sur mobile/tablette

## Stack

| Outil | Usage |
|---|---|
| Next.js 16 (App Router) | Framework fullstack |
| TypeScript strict | Typage |
| Tailwind CSS v4 | Styles |
| Zustand | État de progression (localStorage) |
| Framer Motion | Animations |
| Lucide React | Icônes |
| BiomeJS v2 | Lint + format |

## Démarrage

```bash
npm install
npm run dev
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run typecheck` | Vérification TypeScript |
| `npm run lint` | Analyse Biome |
| `npm run check` | Lint + format + imports |

## Structure

```
app/
├── page.tsx                        # Accueil — choix de matière
├── maths/
│   ├── page.tsx                    # Choix de l'opération
│   ├── [module]/
│   │   ├── page.tsx                # Choix de la difficulté
│   │   └── [difficulty]/
│   │       └── page.tsx            # Jeu — série de 10 exercices
│   └── design/page.tsx             # Design system (référence)
components/
├── game/
│   ├── ExerciseDisplay.tsx         # Affichage de l'exercice
│   └── SeriesResultScreen.tsx      # Écran de résultat
└── ui/                             # Composants réutilisables
    ├── GlassCard.tsx
    ├── NeonButton.tsx
    ├── StarRating.tsx
    ├── BadgeModule.tsx
    └── ...
lib/
├── types.ts                        # Types et constantes globaux
├── exercises/generators/math.ts    # Génération d'exercices
├── store/progressStore.ts          # Zustand — progression
└── audio/sounds.ts                 # Sons
```

## Licence

MIT
