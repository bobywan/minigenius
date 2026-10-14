import type { QuizSeed } from "./quiz.ts";

const MASC = [
  "chat",
  "chien",
  "livre",
  "ballon",
  "vélo",
  "poisson",
  "lapin",
  "cartable",
  "crayon",
  "lit",
  "jardin",
  "soleil",
  "sac",
  "camion",
  "fromage",
  "stylo",
] as const;

const FEM = [
  "fille",
  "pomme",
  "fleur",
  "maison",
  "table",
  "chaise",
  "porte",
  "robe",
  "voiture",
  "tortue",
  "banane",
  "vache",
  "poule",
  "lampe",
  "trousse",
  "fraise",
] as const;

function cap(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function seeds(nouns: readonly string[], answer: string, other: string, label: string): QuizSeed[] {
  return nouns.map((noun) => ({
    prompt: `${label} : ${noun}`,
    answer,
    distractors: [other],
    explain: `${cap(noun)} : ${answer} ${noun}.`,
  }));
}

export const ARTICLES_UN_UNE: QuizSeed[] = [
  ...seeds(MASC, "un", "une", "un ou une"),
  ...seeds(FEM, "une", "un", "un ou une"),
];

export const ARTICLES_LE_LA: QuizSeed[] = [
  ...seeds(MASC, "le", "la", "le ou la"),
  ...seeds(FEM, "la", "le", "le ou la"),
];
