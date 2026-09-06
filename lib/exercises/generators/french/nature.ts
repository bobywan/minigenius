import type { QuizSeed } from "./quiz.ts";

const N = ["verbe", "adjectif", "déterminant"] as const;
const V = ["nom", "adjectif", "déterminant"] as const;
const A = ["nom", "verbe", "déterminant"] as const;
const D = ["nom", "verbe", "adjectif"] as const;

export const NATURE_BANK: QuizSeed[] = [
  // « Le chat noir dort. »
  {
    prompt: `"chat" dans « Le chat noir dort. » est un…`,
    highlightWord: `"chat"`,
    answer: "nom",
    distractors: N,
  },
  {
    prompt: `"dort" dans « Le chat noir dort. » est un…`,
    highlightWord: `"dort"`,
    answer: "verbe",
    distractors: V,
  },
  {
    prompt: `"noir" dans « Le chat noir dort. » est un…`,
    highlightWord: `"noir"`,
    answer: "adjectif",
    distractors: A,
  },
  {
    prompt: `"Le" dans « Le chat noir dort. » est un…`,
    highlightWord: `"Le"`,
    answer: "déterminant",
    distractors: D,
  },
  // « Une petite fille lit. »
  {
    prompt: `"fille" dans « Une petite fille lit. » est un…`,
    highlightWord: `"fille"`,
    answer: "nom",
    distractors: N,
  },
  {
    prompt: `"lit" dans « Une petite fille lit. » est un…`,
    highlightWord: `"lit"`,
    answer: "verbe",
    distractors: V,
  },
  {
    prompt: `"petite" dans « Une petite fille lit. » est un…`,
    highlightWord: `"petite"`,
    answer: "adjectif",
    distractors: A,
  },
  {
    prompt: `"Une" dans « Une petite fille lit. » est un…`,
    highlightWord: `"Une"`,
    answer: "déterminant",
    distractors: D,
  },
  // « Les oiseaux bleus chantent. »
  {
    prompt: `"oiseaux" dans « Les oiseaux bleus chantent. » est un…`,
    highlightWord: `"oiseaux"`,
    answer: "nom",
    distractors: N,
  },
  {
    prompt: `"chantent" dans « Les oiseaux bleus chantent. » est un…`,
    highlightWord: `"chantent"`,
    answer: "verbe",
    distractors: V,
  },
  {
    prompt: `"bleus" dans « Les oiseaux bleus chantent. » est un…`,
    highlightWord: `"bleus"`,
    answer: "adjectif",
    distractors: A,
  },
  {
    prompt: `"Les" dans « Les oiseaux bleus chantent. » est un…`,
    highlightWord: `"Les"`,
    answer: "déterminant",
    distractors: D,
  },
  // « Mon grand frère court. »
  {
    prompt: `"frère" dans « Mon grand frère court. » est un…`,
    highlightWord: `"frère"`,
    answer: "nom",
    distractors: N,
  },
  {
    prompt: `"court" dans « Mon grand frère court. » est un…`,
    highlightWord: `"court"`,
    answer: "verbe",
    distractors: V,
  },
  {
    prompt: `"grand" dans « Mon grand frère court. » est un…`,
    highlightWord: `"grand"`,
    answer: "adjectif",
    distractors: A,
  },
  {
    prompt: `"Mon" dans « Mon grand frère court. » est un…`,
    highlightWord: `"Mon"`,
    answer: "déterminant",
    distractors: D,
  },
  // « Cette soupe chaude fume. »
  {
    prompt: `"soupe" dans « Cette soupe chaude fume. » est un…`,
    highlightWord: `"soupe"`,
    answer: "nom",
    distractors: N,
  },
  {
    prompt: `"fume" dans « Cette soupe chaude fume. » est un…`,
    highlightWord: `"fume"`,
    answer: "verbe",
    distractors: V,
  },
  {
    prompt: `"chaude" dans « Cette soupe chaude fume. » est un…`,
    highlightWord: `"chaude"`,
    answer: "adjectif",
    distractors: A,
  },
  {
    prompt: `"Cette" dans « Cette soupe chaude fume. » est un…`,
    highlightWord: `"Cette"`,
    answer: "déterminant",
    distractors: D,
  },
];
