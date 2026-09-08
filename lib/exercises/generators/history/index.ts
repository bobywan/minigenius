import type { HistoryModule, HistorySlot, QuizQuestion } from "../../../types.ts";
import { pickOne, pickSeries, type QuizSeed } from "../french/quiz.ts";
import { FRANCE_RECENTE_BANK } from "./france-recente.ts";
import { GAULE_ROME_BANK } from "./gaule-rome.ts";
import { MOYEN_AGE_BANK } from "./moyen-age.ts";
import { PREHISTOIRE_BANK } from "./prehistoire.ts";
import { REVOLUTION_BANK } from "./revolution.ts";
import { ROIS_BANK } from "./rois.ts";

const BANKS: Record<HistoryModule, QuizSeed[]> = {
  prehistoire: PREHISTOIRE_BANK,
  "gaule-rome": GAULE_ROME_BANK,
  "moyen-age": MOYEN_AGE_BANK,
  rois: ROIS_BANK,
  revolution: REVOLUTION_BANK,
  "france-recente": FRANCE_RECENTE_BANK,
};

export function historyPool(module: HistoryModule, slot: HistorySlot): QuizSeed[] {
  if (slot !== "mixte") throw new Error(`Slot histoire inconnu : ${slot}`);
  return [...BANKS[module]];
}

export function generateHistoryQuiz(module: HistoryModule, slot: HistorySlot): QuizQuestion[] {
  return pickSeries(historyPool(module, slot));
}

export function generateOneHistoryQuiz(module: HistoryModule, slot: HistorySlot): QuizQuestion {
  return pickOne(historyPool(module, slot));
}
