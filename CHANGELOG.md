# Changelog

Toutes les modifications notables de ce projet sont documentées ici.

Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [1.0.0] — 2026-07-21

### Ajouté

- Application MiniGenius — jeu éducatif de maths pour enfants
- Module **Maths** avec 4 opérations : addition, soustraction, multiplication, division
- 3 niveaux de difficulté par opération : facile (1–20), moyen (1–100), expert (équation à trous)
- Séries de 10 exercices par niveau avec correction immédiate
- Système de progression avec étoiles (0–3) sauvegardé en localStorage via Zustand
- Déverrouillage progressif : modules et difficultés s'ouvrent au score ≥ 6/10
- NumPad tactile — saisie optimisée tablette/mobile
- Effets sonores (succès, erreur, déverrouillage) et confettis en fin de série
- Design system : `GlassCard` (gradients glossy), `NeonButton` (effet 3D cartoon), `StarRating`, `BadgeModule`, `DifficultyBadge`, `ProgressDots`
- Icônes Lucide React — zéro emoji dans l'UI
- PWA — manifest et icônes pour installation mobile

### Modifié

- PWA : remplacement de `@ducanh2912/next-pwa` par un service worker statique natif (`public/sw.js`) — incompatible avec Turbopack
- PWA : correction du `purpose` des icônes dans le manifest (séparation `any` / `maskable` en entrées distinctes)
- Page design system (`/design`) — référence des tokens et composants
- Support Framer Motion pour les animations de résultat
