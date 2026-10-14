import type { FrenchModule, FrenchSlot, QuizQuestion } from "../../../types.ts";
import { ACCORD_FEMININ, ACCORD_PLURIEL, ACCORD_SX } from "./accords.ts";
import { ARTICLES_LE_LA, ARTICLES_UN_UNE } from "./articles.ts";
import {
  CONJUGAISON_ER,
  CONJUGAISON_ETRE_AVOIR,
  CONJUGAISON_FUTUR,
  CONJUGAISON_IMPARFAIT,
  CONJUGAISON_PRESENT,
} from "./conjugaison.ts";
import {
  HOMOPHONE_A,
  HOMOPHONE_CES,
  HOMOPHONE_ET,
  HOMOPHONE_ON,
  HOMOPHONE_OU,
  HOMOPHONE_SON,
} from "./homophones.ts";
import { INTRUS_BANK } from "./intrus.ts";
import {
  LECTURE_ANIMAUX,
  LECTURE_ECOLE,
  LECTURE_MAISON,
  LECTURE_QUOTIDIEN,
  LECTURE_VRAI_FAUX,
} from "./lecture.ts";
import { NATURE_BANK } from "./nature.ts";
import { PRONOMS_BANK } from "./pronoms.ts";
import { mergePools, pickOne, pickSeries, type QuizSeed } from "./quiz.ts";
import { SONS_AN, SONS_CH, SONS_GN, SONS_OI, SONS_OU } from "./sons.ts";
import { VERBE_BANK } from "./verbe.ts";
import { VOCAB_CONTRAIRES, VOCAB_SYNONYMES } from "./vocabulaire.ts";

const HOMOPHONES = {
  "a-a": HOMOPHONE_A,
  "et-est": HOMOPHONE_ET,
  "on-ont": HOMOPHONE_ON,
  "son-sont": HOMOPHONE_SON,
  "ou-ou": HOMOPHONE_OU,
  "ces-ses": HOMOPHONE_CES,
} as const;

const LECTURES = {
  animaux: LECTURE_ANIMAUX,
  ecole: LECTURE_ECOLE,
  maison: LECTURE_MAISON,
  quotidien: LECTURE_QUOTIDIEN,
} as const;

const SONS = {
  oi: SONS_OI,
  ou: SONS_OU,
  an: SONS_AN,
  ch: SONS_CH,
  gn: SONS_GN,
} as const;

export function frenchPool(module: FrenchModule, slot: FrenchSlot): QuizSeed[] {
  switch (module) {
    case "homophones": {
      if (slot === "tout") return mergePools(Object.values(HOMOPHONES));
      if (slot in HOMOPHONES) return [...HOMOPHONES[slot as keyof typeof HOMOPHONES]];
      throw new Error(`Slot homophones inconnu : ${slot}`);
    }
    case "nature": {
      if (slot !== "mixte") throw new Error(`Slot nature inconnu : ${slot}`);
      return [...NATURE_BANK];
    }
    case "accords": {
      if (slot === "s-x") return [...ACCORD_SX];
      if (slot === "pluriel") return [...ACCORD_PLURIEL];
      if (slot === "feminin") return [...ACCORD_FEMININ];
      if (slot === "mixte") return mergePools([ACCORD_PLURIEL, ACCORD_FEMININ]);
      throw new Error(`Slot accords inconnu : ${slot}`);
    }
    case "vocabulaire": {
      if (slot === "synonymes") return [...VOCAB_SYNONYMES];
      if (slot === "contraires") return [...VOCAB_CONTRAIRES];
      if (slot === "mixte") return mergePools([VOCAB_SYNONYMES, VOCAB_CONTRAIRES]);
      throw new Error(`Slot vocabulaire inconnu : ${slot}`);
    }
    case "conjugaison": {
      if (slot === "verbes-er") return [...CONJUGAISON_ER];
      if (slot === "etre-avoir") return [...CONJUGAISON_ETRE_AVOIR];
      if (slot === "present") return [...CONJUGAISON_PRESENT];
      if (slot === "imparfait") return [...CONJUGAISON_IMPARFAIT];
      if (slot === "futur") return [...CONJUGAISON_FUTUR];
      if (slot === "mixte") {
        return mergePools([CONJUGAISON_PRESENT, CONJUGAISON_IMPARFAIT, CONJUGAISON_FUTUR]);
      }
      throw new Error(`Slot conjugaison inconnu : ${slot}`);
    }
    case "lecture": {
      if (slot === "vrai-faux") return [...LECTURE_VRAI_FAUX];
      if (slot === "tout") return mergePools(Object.values(LECTURES));
      if (slot in LECTURES) return [...LECTURES[slot as keyof typeof LECTURES]];
      throw new Error(`Slot lecture inconnu : ${slot}`);
    }
    case "intrus": {
      if (slot !== "mixte") throw new Error(`Slot intrus inconnu : ${slot}`);
      return [...INTRUS_BANK];
    }
    case "articles": {
      if (slot === "un-une") return [...ARTICLES_UN_UNE];
      if (slot === "le-la") return [...ARTICLES_LE_LA];
      if (slot === "mixte") return mergePools([ARTICLES_UN_UNE, ARTICLES_LE_LA]);
      throw new Error(`Slot articles inconnu : ${slot}`);
    }
    case "sons": {
      if (slot === "mixte") return mergePools(Object.values(SONS));
      if (slot in SONS) return [...SONS[slot as keyof typeof SONS]];
      throw new Error(`Slot sons inconnu : ${slot}`);
    }
    case "verbe": {
      if (slot !== "mixte") throw new Error(`Slot verbe inconnu : ${slot}`);
      return [...VERBE_BANK];
    }
    case "pronoms": {
      if (slot !== "mixte") throw new Error(`Slot pronoms inconnu : ${slot}`);
      return [...PRONOMS_BANK];
    }
    default: {
      const _exhaustive: never = module;
      throw new Error(`Module inconnu : ${_exhaustive}`);
    }
  }
}

export function generateFrenchQuiz(module: FrenchModule, slot: FrenchSlot): QuizQuestion[] {
  return pickSeries(frenchPool(module, slot));
}

export function generateOneFrenchQuiz(module: FrenchModule, slot: FrenchSlot): QuizQuestion {
  return pickOne(frenchPool(module, slot));
}
