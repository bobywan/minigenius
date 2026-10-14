import type { QuizSeed } from "./quiz.ts";

type Son = "oi" | "ou" | "an" | "ch" | "gn";

const OTHERS: Record<Son, readonly string[]> = {
  oi: ["ou", "an", "ch"],
  ou: ["oi", "an", "gn"],
  an: ["oi", "ou", "ch"],
  ch: ["oi", "ou", "an"],
  gn: ["ou", "an", "ch"],
};

function gap(prompt: string, answer: Son): QuizSeed {
  return {
    prompt,
    answer,
    distractors: OTHERS[answer],
    explain: `On écrit ${answer} : ${prompt.replace("___", answer)}.`,
  };
}

export const SONS_OI: QuizSeed[] = [
  gap("le r___", "oi"),
  gap("la l___", "oi"),
  gap("le t___t", "oi"),
  gap("le b___s", "oi"),
  gap("ce s___r", "oi"),
  gap("le n___r", "oi"),
  gap("le nombre tr___s", "oi"),
  gap("le m___s", "oi"),
  gap("il fait fr___d", "oi"),
  gap("la p___re", "oi"),
  gap("la v___ture", "oi"),
  gap("un ___seau", "oi"),
  gap("la b___te", "oi"),
  gap("une ét___le", "oi"),
  gap("le mir___r", "oi"),
];

export const SONS_OU: QuizSeed[] = [
  gap("un l___p", "ou"),
  gap("une r___e", "ou"),
  gap("le j___r", "ou"),
  gap("avec n___s", "ou"),
  gap("avec v___s", "ou"),
  gap("un goût d___x", "ou"),
  gap("la b___che", "ou"),
  gap("une p___le", "ou"),
  gap("le f___r", "ou"),
  gap("un petit tr___", "ou"),
  gap("un petit ch___", "ou"),
  gap("un grand hib___", "ou"),
  gap("un joli bij___", "ou"),
  gap("un j___et", "ou"),
  gap("la couleur r___ge", "ou"),
];

export const SONS_AN: QuizSeed[] = [
  gap("ma m___", "an"),
  gap("un enf___t", "an"),
  gap("il est d___s", "an"),
  gap("un g___t chaud", "an"),
  gap("le v___t souffle", "an"),
  gap("une d___t", "an"),
  gap("il est gr___d", "an"),
  gap("tout bl___c", "an"),
  gap("on va m___ger", "an"),
  gap("on va ch___ter", "an"),
  gap("ma t___te", "an"),
  gap("une b___de", "an"),
  gap("la l___pe", "an"),
  gap("une ch___bre", "an"),
  gap("au c___p", "an"),
];

export const SONS_CH: QuizSeed[] = [
  gap("un petit ___at", "ch"),
  gap("un petit ___ien", "ch"),
  gap("un grand ___eval", "ch"),
  gap("un gros ___ou", "ch"),
  gap("la bou___e", "ch"),
  gap("la va___e", "ch"),
  gap("une po___e", "ch"),
  gap("une ___aise", "ch"),
  gap("le ___emin", "ch"),
  gap("du ___ocolat", "ch"),
  gap("un ___apeau", "ch"),
  gap("la ___ambre", "ch"),
  gap("aller ___ercher", "ch"),
  gap("une ___anson", "ch"),
  gap("un ___âteau", "ch"),
];

export const SONS_GN: QuizSeed[] = [
  gap("la monta___e", "gn"),
  gap("une li___e", "gn"),
  gap("un si___e", "gn"),
  gap("un champi___on", "gn"),
  gap("un petit a___eau", "gn"),
  gap("le poi___et", "gn"),
  gap("un oi___on", "gn"),
  gap("je vais ga___er", "gn"),
  gap("la campa___e", "gn"),
  gap("une cigo___e", "gn"),
  gap("un mi___on", "gn"),
  gap("une arai___ée", "gn"),
  gap("le si___al", "gn"),
  gap("la vi___e", "gn"),
  gap("je vais soi___er", "gn"),
];
