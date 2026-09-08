export type Subject = "maths" | "francais" | "anglais" | "histoire";

export type MathModule = "addition" | "soustraction" | "multiplication" | "division";

export type EnglishModule = "en-fr" | "fr-en";

export type MixedModule = "mixte";

export type EnglishTheme =
  | "animaux"
  | "corps"
  | "couleurs"
  | "famille"
  | "nourriture"
  | "cuisine"
  | "maison"
  | "nature"
  | "ecole"
  | "vetements"
  | "transports"
  | "sports"
  | "emotions"
  | "actions"
  | "tout";

export type FrenchModule =
  | "homophones"
  | "nature"
  | "accords"
  | "vocabulaire"
  | "conjugaison"
  | "lecture";

export type HomophoneSlot = "a-a" | "et-est" | "on-ont" | "son-sont" | "ou-ou" | "ces-ses" | "tout";

export type AccordSlot = "pluriel" | "feminin" | "mixte";

export type VocabSlot = "synonymes" | "contraires" | "mixte";

export type ConjugaisonSlot = "present" | "imparfait" | "futur" | "mixte";

export type LectureSlot = "animaux" | "ecole" | "maison" | "quotidien" | "tout";

export type FrenchSlot = HomophoneSlot | AccordSlot | VocabSlot | ConjugaisonSlot | LectureSlot;

export type EnglishQuizModule =
  | "conjugaison"
  | "phrases"
  | "pluriels"
  | "articles"
  | "contraires"
  | "lecture";

export type EnglishConjugaisonSlot = "present" | "preterit" | "participe" | "mixte";

export type EnglishPhrasesSlot = "to-be" | "prepositions" | "temps" | "mixte";

export type EnglishPlurielsSlot = "regulier" | "irregulier" | "mixte";

export type EnglishQuizSlot =
  | EnglishConjugaisonSlot
  | EnglishPhrasesSlot
  | EnglishPlurielsSlot
  | LectureSlot;

export type HistoryModule =
  | "prehistoire"
  | "gaule-rome"
  | "moyen-age"
  | "rois"
  | "revolution"
  | "france-recente";

export type HistorySlot = "mixte";

export type ModuleId =
  | MathModule
  | MixedModule
  | EnglishTheme
  | FrenchModule
  | EnglishQuizModule
  | HistoryModule;

export type Difficulty = "facile" | "moyen" | "expert";

export type SeriesSlot = Difficulty | EnglishModule | MixedModule | FrenchSlot | EnglishQuizSlot;

export type Stars = 0 | 1 | 2 | 3;

export interface Exercise {
  left: number | null; // null = trou
  op: "+" | "-" | "×" | "÷";
  right: number | null; // null = trou
  result: number | null; // null = trou
  answer: number; // toujours la bonne réponse
}

export interface QuizQuestion {
  prompt: string; // mot ou phrase affiché
  choices: string[]; // 4 réponses
  answerIndex: number; // index de la bonne réponse dans choices
  enToFr?: boolean; // true = prompt anglais / choix français (anglais uniquement)
  passage?: string; // texte de lecture (français / lecture)
  highlightWord?: string; // sous-chaîne à coloriser dans le prompt (nature des mots)
}

export interface SeriesResult {
  correct: number; // sur 10
  stars: Stars;
  completedAt: string;
}

export type ModuleProgress = Partial<Record<SeriesSlot, SeriesResult>>;

export type SubjectProgress = Partial<Record<ModuleId, ModuleProgress>>;

export type ProgressState = Partial<Record<Subject, SubjectProgress>>;

export const MATH_MODULES: MathModule[] = [
  "addition",
  "soustraction",
  "multiplication",
  "division",
];

export const ENGLISH_MODULES: EnglishModule[] = ["en-fr", "fr-en"];

export const ENGLISH_DIRECTIONS: (EnglishModule | MixedModule)[] = ["en-fr", "fr-en", "mixte"];

export const ENGLISH_MODULE_LABELS: Record<EnglishModule | MixedModule, string> = {
  "en-fr": "Anglais → Français",
  "fr-en": "Français → Anglais",
  mixte: "Tout mélanger",
};

export const ENGLISH_THEMES: EnglishTheme[] = [
  "animaux",
  "corps",
  "couleurs",
  "famille",
  "nourriture",
  "cuisine",
  "maison",
  "nature",
  "ecole",
  "vetements",
  "transports",
  "sports",
  "emotions",
  "actions",
  "tout",
];

export const ENGLISH_THEME_LABELS: Record<EnglishTheme, string> = {
  animaux: "Animaux",
  corps: "Corps",
  couleurs: "Couleurs",
  famille: "Famille",
  nourriture: "Nourriture",
  cuisine: "Cuisine",
  maison: "Maison",
  nature: "Nature",
  ecole: "École",
  vetements: "Vêtements",
  transports: "Transports",
  sports: "Sports",
  emotions: "Émotions",
  actions: "Actions",
  tout: "Tout mélanger",
};

export const FRENCH_MODULES: FrenchModule[] = [
  "homophones",
  "nature",
  "accords",
  "vocabulaire",
  "conjugaison",
  "lecture",
];

export const FRENCH_MODULE_LABELS: Record<FrenchModule, string> = {
  homophones: "Homophones",
  nature: "Nature des mots",
  accords: "Accords",
  vocabulaire: "Vocabulaire",
  conjugaison: "Conjugaison",
  lecture: "Lecture",
};

export const FRENCH_SLOTS: Record<FrenchModule, readonly FrenchSlot[]> = {
  homophones: ["a-a", "et-est", "on-ont", "son-sont", "ou-ou", "ces-ses", "tout"],
  nature: ["mixte"],
  accords: ["pluriel", "feminin", "mixte"],
  vocabulaire: ["synonymes", "contraires", "mixte"],
  conjugaison: ["present", "imparfait", "futur", "mixte"],
  lecture: ["animaux", "ecole", "maison", "quotidien", "tout"],
};

export const FRENCH_SLOT_LABELS: Record<FrenchSlot, string> = {
  "a-a": "a / à",
  "et-est": "et / est",
  "on-ont": "on / ont",
  "son-sont": "son / sont",
  "ou-ou": "ou / où",
  "ces-ses": "ces / ses",
  pluriel: "Pluriel",
  feminin: "Féminin",
  mixte: "Tout mélanger",
  synonymes: "Synonymes",
  contraires: "Contraires",
  present: "Présent",
  imparfait: "Imparfait",
  futur: "Futur",
  animaux: "Animaux",
  ecole: "École",
  maison: "Maison",
  quotidien: "Quotidien",
  tout: "Tout mélanger",
};

export function isFrenchModule(value: string): value is FrenchModule {
  return FRENCH_MODULES.includes(value as FrenchModule);
}

export function isFrenchSlot(module: FrenchModule, slot: string): slot is FrenchSlot {
  return FRENCH_SLOTS[module].includes(slot as FrenchSlot);
}

export const ENGLISH_QUIZ_MODULES: EnglishQuizModule[] = [
  "conjugaison",
  "phrases",
  "pluriels",
  "articles",
  "contraires",
  "lecture",
];

export const ENGLISH_QUIZ_MODULE_LABELS: Record<EnglishQuizModule, string> = {
  conjugaison: "Conjugaison",
  phrases: "Phrases",
  pluriels: "Pluriels",
  articles: "Articles",
  contraires: "Contraires",
  lecture: "Lecture",
};

export const ENGLISH_QUIZ_SLOTS: Record<EnglishQuizModule, readonly EnglishQuizSlot[]> = {
  conjugaison: ["present", "preterit", "participe", "mixte"],
  phrases: ["to-be", "prepositions", "temps", "mixte"],
  pluriels: ["regulier", "irregulier", "mixte"],
  articles: ["mixte"],
  contraires: ["mixte"],
  lecture: ["animaux", "ecole", "maison", "quotidien", "tout"],
};

export const ENGLISH_QUIZ_SLOT_LABELS: Record<EnglishQuizSlot, string> = {
  present: "Présent",
  preterit: "Prétérit",
  participe: "Participe",
  mixte: "Tout mélanger",
  "to-be": "to be / to have",
  prepositions: "Prépositions",
  temps: "Présent ou prétérit",
  regulier: "Régulier",
  irregulier: "Irrégulier",
  animaux: "Animaux",
  ecole: "École",
  maison: "Maison",
  quotidien: "Quotidien",
  tout: "Tout mélanger",
};

export function isEnglishQuizModule(value: string): value is EnglishQuizModule {
  return ENGLISH_QUIZ_MODULES.includes(value as EnglishQuizModule);
}

export function isEnglishQuizSlot(
  module: EnglishQuizModule,
  slot: string,
): slot is EnglishQuizSlot {
  return ENGLISH_QUIZ_SLOTS[module].includes(slot as EnglishQuizSlot);
}

export const HISTORY_MODULES: HistoryModule[] = [
  "prehistoire",
  "gaule-rome",
  "moyen-age",
  "rois",
  "revolution",
  "france-recente",
];

export const HISTORY_MODULE_LABELS: Record<HistoryModule, string> = {
  prehistoire: "Préhistoire",
  "gaule-rome": "Rome et la Gaule",
  "moyen-age": "Moyen Âge",
  rois: "Les rois",
  revolution: "1789",
  "france-recente": "La France récente",
};

export const HISTORY_SLOTS: Record<HistoryModule, readonly HistorySlot[]> = {
  prehistoire: ["mixte"],
  "gaule-rome": ["mixte"],
  "moyen-age": ["mixte"],
  rois: ["mixte"],
  revolution: ["mixte"],
  "france-recente": ["mixte"],
};

export const HISTORY_SLOT_LABELS: Record<HistorySlot, string> = {
  mixte: "Série de 10",
};

export function isHistoryModule(value: string): value is HistoryModule {
  return HISTORY_MODULES.includes(value as HistoryModule);
}

export function isHistorySlot(module: HistoryModule, slot: string): slot is HistorySlot {
  return HISTORY_SLOTS[module].includes(slot as HistorySlot);
}

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

export const SERIES_LENGTH = 10;
export const FEEDBACK_OK_MS = 900;
export const FEEDBACK_WRONG_LIBRE_MS = 800;

export function computeStars(correct: number): Stars {
  if (correct < 6) return 0;
  if (correct < 8) return 1;
  if (correct < SERIES_LENGTH) return 2;
  return 3;
}
