export type Subject = "maths" | "francais" | "anglais" | "histoire";

export type MathModule = "addition" | "soustraction" | "multiplication" | "division";

export type Difficulty = "facile" | "moyen" | "expert";

export type Stars = 0 | 1 | 2 | 3;

export interface Exercise {
  left: number | null; // null = trou
  op: "+" | "-" | "×" | "÷";
  right: number | null; // null = trou
  result: number | null; // null = trou
  answer: number; // toujours la bonne réponse
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

export type SubjectProgress = Partial<Record<MathModule, ModuleProgress>>;

export type ProgressState = Partial<Record<Subject, SubjectProgress>>;

export const MATH_MODULES: MathModule[] = [
  "addition",
  "soustraction",
  "multiplication",
  "division",
];

export const DIFFICULTIES: Difficulty[] = ["facile", "moyen", "expert"];

export const SUBJECT_LABELS: Record<Subject, string> = {
  maths: "Maths",
  francais: "Français",
  anglais: "Anglais",
  histoire: "Histoire",
};

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
