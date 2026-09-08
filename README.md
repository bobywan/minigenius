# MiniGenius

[![Démo](https://img.shields.io/badge/Demo-minigenius.vercel.app-black?logo=vercel)](https://minigenius.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Node](https://img.shields.io/badge/Node.js-24%20LTS-green?logo=node.js)](https://nodejs.org/)

Application éducative gamifiée pour les enfants — maths, français, anglais, histoire et mini-jeux (pendu, vol, course), avec progression par étoiles.

## Fonctionnalités v1.0

- **Maths** : 4 opérations × 3 difficultés + mixte + jeu libre
- **Français** : 6 modules QCM (homophones, nature, accords, vocabulaire, conjugaison, lecture)
- **Anglais** : traduction par thème + 6 modules QCM
- **Histoire** : 6 modules QCM (préhistoire, Rome et la Gaule, Moyen Âge, les rois, 1789, France récente)
- **Mini-jeux** : pendu, vol, course
- Progression par étoiles (tous les niveaux accessibles)
- NumPad tactile — utilisable sur tablette
- PWA — installable sur mobile/tablette
- Prononciation anglaise (fichiers MP3)

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
├── francais/                # 6 modules QCM
├── anglais/                 # Traduction par thème + 6 modules QCM
├── histoire/                # 6 périodes QCM
└── mini-jeux/               # Pendu, vol, course
components/                  # game/ et ui/
lib/
├── hooks/                   # useSeriesGame, useLibreGame
├── exercises/generators/
└── store/progressStore.ts
```

## Licence

MIT
