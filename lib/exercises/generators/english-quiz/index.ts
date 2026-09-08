import type { EnglishQuizModule, EnglishQuizSlot, QuizQuestion } from "../../../types.ts";
import { mergePools, pickOne, pickSeries, type QuizSeed } from "../french/quiz.ts";
import { ARTICLES_BANK } from "./articles.ts";
import { CONJUGAISON_PARTICIPE, CONJUGAISON_PRESENT, CONJUGAISON_PRETERIT } from "./conjugaison.ts";
import { CONTRAIRES_BANK } from "./contraires.ts";
import { LECTURE_ANIMAUX, LECTURE_ECOLE, LECTURE_MAISON, LECTURE_QUOTIDIEN } from "./lecture.ts";
import { PHRASES_PREPOSITIONS, PHRASES_TEMPS, PHRASES_TO_BE } from "./phrases.ts";
import { PLURIELS_IRREGULIER, PLURIELS_REGULIER } from "./pluriels.ts";

const LECTURES = {
  animaux: LECTURE_ANIMAUX,
  ecole: LECTURE_ECOLE,
  maison: LECTURE_MAISON,
  quotidien: LECTURE_QUOTIDIEN,
} as const;

export function englishQuizPool(module: EnglishQuizModule, slot: EnglishQuizSlot): QuizSeed[] {
  switch (module) {
    case "conjugaison": {
      if (slot === "present") return [...CONJUGAISON_PRESENT];
      if (slot === "preterit") return [...CONJUGAISON_PRETERIT];
      if (slot === "participe") return [...CONJUGAISON_PARTICIPE];
      if (slot === "mixte") {
        return mergePools([CONJUGAISON_PRESENT, CONJUGAISON_PRETERIT, CONJUGAISON_PARTICIPE]);
      }
      throw new Error(`Slot conjugaison inconnu : ${slot}`);
    }
    case "phrases": {
      if (slot === "to-be") return [...PHRASES_TO_BE];
      if (slot === "prepositions") return [...PHRASES_PREPOSITIONS];
      if (slot === "temps") return [...PHRASES_TEMPS];
      if (slot === "mixte") {
        return mergePools([PHRASES_TO_BE, PHRASES_PREPOSITIONS, PHRASES_TEMPS]);
      }
      throw new Error(`Slot phrases inconnu : ${slot}`);
    }
    case "pluriels": {
      if (slot === "regulier") return [...PLURIELS_REGULIER];
      if (slot === "irregulier") return [...PLURIELS_IRREGULIER];
      if (slot === "mixte") return mergePools([PLURIELS_REGULIER, PLURIELS_IRREGULIER]);
      throw new Error(`Slot pluriels inconnu : ${slot}`);
    }
    case "articles": {
      if (slot !== "mixte") throw new Error(`Slot articles inconnu : ${slot}`);
      return [...ARTICLES_BANK];
    }
    case "contraires": {
      if (slot !== "mixte") throw new Error(`Slot contraires inconnu : ${slot}`);
      return [...CONTRAIRES_BANK];
    }
    case "lecture": {
      if (slot === "tout") return mergePools(Object.values(LECTURES));
      if (slot in LECTURES) return [...LECTURES[slot as keyof typeof LECTURES]];
      throw new Error(`Slot lecture inconnu : ${slot}`);
    }
    default: {
      const _exhaustive: never = module;
      throw new Error(`Module inconnu : ${_exhaustive}`);
    }
  }
}

export function generateEnglishQuiz(
  module: EnglishQuizModule,
  slot: EnglishQuizSlot,
): QuizQuestion[] {
  return pickSeries(englishQuizPool(module, slot));
}

export function generateOneEnglishQuiz(
  module: EnglishQuizModule,
  slot: EnglishQuizSlot,
): QuizQuestion {
  return pickOne(englishQuizPool(module, slot));
}
