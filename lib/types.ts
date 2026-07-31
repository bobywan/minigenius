export type Subject = "maths" | "francais" | "anglais" | "histoire";

export type MathModule = "addition" | "soustraction" | "multiplication" | "division";

export type EnglishModule = "en-fr" | "fr-en" | "mixte";

export type ModuleId = MathModule | EnglishModule;

export type Difficulty = "facile" | "moyen" | "expert";

export type Stars = 0 | 1 | 2 | 3;

export interface Exercise {
  left: number | null; // null = trou
  op: "+" | "-" | "×" | "÷";
  right: number | null; // null = trou
  result: number | null; // null = trou
  answer: number; // toujours la bonne réponse
}

export interface QuizQuestion {
  prompt: string; // mot affiché
  choices: string[]; // 4 traductions
  answerIndex: number; // index de la bonne réponse dans choices
}

export interface SeriesResult {
  correct: number; // sur 10
  stars: Stars;
  completedAt: string;
}

export interface ModuleProgress {
  facile?: SeriesResult;
  moyen?: SeriesResult;
  expert?: SeriesResult;
}

export type SubjectProgress = Partial<Record<ModuleId, ModuleProgress>>;

export type ProgressState = Partial<Record<Subject, SubjectProgress>>;

export const MATH_MODULES: MathModule[] = [
  "addition",
  "soustraction",
  "multiplication",
  "division",
];

export const ENGLISH_MODULES: EnglishModule[] = ["en-fr", "fr-en"];

export const ENGLISH_MODULE_LABELS: Record<EnglishModule, string> = {
  "en-fr": "Anglais → Français",
  "fr-en": "Français → Anglais",
  mixte: "Tout mélanger",
};

export const DIFFICULTIES: Difficulty[] = ["facile", "moyen", "expert"];

export const MODULE_LABELS: Record<MathModule, string> = {
  addition: "Addition",
  soustraction: "Soustraction",
  multiplication: "Multiplication",
  division: "Division",
};

export const MODULE_ICONS: Record<MathModule, string> = {
  addition: "+",
  soustraction: "−",
  multiplication: "×",
  division: "÷",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  facile: "Facile",
  moyen: "Moyen",
  expert: "Expert",
};

export function computeStars(correct: number): Stars {
  if (correct < 6) return 0;
  if (correct < 8) return 1;
  if (correct < 10) return 2;
  return 3;
}
