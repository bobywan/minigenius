# MiniGenius

[![Démo](https://img.shields.io/badge/Demo-minigenius.vercel.app-black?logo=vercel)](https://minigenius.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Node](https://img.shields.io/badge/Node.js-24%20LTS-green?logo=node.js)](https://nodejs.org/)

Application éducative gamifiée pour les enfants — maths, anglais et mini-jeux, avec progression par étoiles.

## Fonctionnalités v1.0

- **Maths** : addition, soustraction, multiplication, division, mixte, jeu libre
- **Anglais** : traduction QCM par thème (animaux, cuisine, école, vêtements, transports, sports, émotions, …) — anglais→français, français→anglais, mixte, jeu libre
- **Mini-jeux** : pendu, endless runner
- 3 niveaux de difficulté (facile / moyen / expert)
- Progression par étoiles (tous les niveaux accessibles)
- NumPad tactile — utilisable sur tablette
- Effets sonores, prononciation anglaise (fichiers MP3), confettis
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
| `npm run audio:en` | (Re)génère `public/audio/en/*.mp3` (Piper ou `say` + ffmpeg) |

## Structure

```
app/(main)/
├── page.tsx                 # Accueil
├── maths/                   # Opérations, mixte, séries, jeu libre
├── anglais/traduction/      # Thèmes, QCM en-fr / fr-en / mixte
└── mini-jeux/
components/                  # game/ et ui/
lib/
├── hooks/                   # useSeriesGame, useLibreGame
├── exercises/generators/
└── store/progressStore.ts
```

## Licence

MIT
