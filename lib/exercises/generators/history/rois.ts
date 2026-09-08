import type { QuizSeed } from "../french/quiz.ts";

// ponytail: distracteurs = même période / même type. Plafond : pas de piège hors rois.

export const ROIS_BANK: QuizSeed[] = [
  {
    prompt: "Quel roi a fait construire Versailles ?",
    answer: "Louis XIV",
    distractors: ["François Ier", "Henri IV", "Louis XIII"],
  },
  {
    prompt: "Louis XIV est surnommé…",
    answer: "le Roi-Soleil",
    distractors: ["le Vert-Galant", "le roi mécène", "le roi pacificateur"],
  },
  {
    prompt: "Où Louis XIV installe-t-il la cour ?",
    answer: "à Versailles",
    distractors: ["à Fontainebleau", "au Louvre", "à Saint-Germain"],
  },
  {
    prompt: "Versailles montre surtout…",
    answer: "le pouvoir du roi",
    distractors: [
      "la richesse de la cour seulement",
      "la paix du royaume",
      "les arts seulement",
    ],
  },
  {
    prompt: "François Ier est un roi de la…",
    answer: "Renaissance",
    distractors: ["monarchie absolue", "l'Ancien Régime tardif", "les guerres de religion"],
  },
  {
    prompt: "François Ier a fait venir en France…",
    answer: "Léonard de Vinci",
    distractors: ["Rabelais", "un poète de la Pléiade", "Michel-Ange"],
  },
  {
    prompt: "Un roi mécène, c'est un roi qui…",
    answer: "protège les artistes",
    distractors: [
      "fait surtout la guerre",
      "impose des impôts",
      "agrandit son château",
    ],
  },
  {
    prompt: "Henri IV a signé…",
    answer: "l'édit de Nantes",
    distractors: [
      "l'édit de Villers-Cotterêts",
      "la révocation de l'édit de Nantes",
      "un édit sur Versailles",
    ],
  },
  {
    prompt: "L'édit de Nantes sert à…",
    answer: "ramener la paix dans le royaume",
    distractors: [
      "imposer le catholicisme seul",
      "agrandir le royaume",
      "construire des châteaux",
    ],
  },
  {
    prompt: "Henri IV est vu comme un roi…",
    answer: "pacificateur",
    distractors: ["mécène", "absolu", "conquérant"],
  },
  {
    prompt: "La société d'Ancien Régime est divisée en…",
    answer: "trois ordres",
    distractors: ["deux chambres", "quatre états", "un seul ordre"],
  },
  {
    prompt: "Les trois ordres sont le clergé, la noblesse et…",
    answer: "le tiers état",
    distractors: ["le roi", "les bourgeois seulement", "les serfs"],
  },
  {
    prompt: "Le clergé, ce sont…",
    answer: "les gens d'Église",
    distractors: ["les nobles", "le tiers état", "les gens de la cour"],
  },
  {
    prompt: "La noblesse, ce sont surtout…",
    answer: "les seigneurs",
    distractors: ["le clergé", "les bourgeois", "les paysans"],
  },
  {
    prompt: "Le tiers état, c'est surtout…",
    answer: "le peuple",
    distractors: ["le clergé", "la noblesse", "la cour"],
  },
  {
    prompt: "Louis XIV affirme un pouvoir…",
    answer: "absolu",
    distractors: [
      "partagé avec les États",
      "limité par les nobles",
      "contrôlé par l'Église",
    ],
  },
  {
    prompt: "La Renaissance, c'est…",
    answer: "un renouveau des arts",
    distractors: [
      "un temps de guerres de religion",
      "le pouvoir absolu du roi",
      "la société des trois ordres",
    ],
  },
  {
    prompt: "François Ier, Henri IV et Louis XIV sont des rois…",
    answer: "de France",
    distractors: ["d'Angleterre", "d'Espagne", "de Navarre seulement"],
  },
];
