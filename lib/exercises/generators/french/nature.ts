import type { QuizSeed } from "./quiz.ts";

const N = ["verbe", "adjectif", "déterminant"] as const;
const V = ["nom", "adjectif", "déterminant"] as const;
const A = ["nom", "verbe", "déterminant"] as const;
const D = ["nom", "verbe", "adjectif"] as const;

export const NATURE_BANK: QuizSeed[] = [
  { prompt: "Dans « Le chat noir dort. », chat est un…", answer: "nom", distractors: N },
  { prompt: "Dans « Le chat noir dort. », dort est un…", answer: "verbe", distractors: V },
  { prompt: "Dans « Le chat noir dort. », noir est un…", answer: "adjectif", distractors: A },
  { prompt: "Dans « Le chat noir dort. », Le est un…", answer: "déterminant", distractors: D },
  { prompt: "Dans « Une petite fille lit. », fille est un…", answer: "nom", distractors: N },
  { prompt: "Dans « Une petite fille lit. », lit est un…", answer: "verbe", distractors: V },
  { prompt: "Dans « Une petite fille lit. », petite est un…", answer: "adjectif", distractors: A },
  { prompt: "Dans « Une petite fille lit. », Une est un…", answer: "déterminant", distractors: D },
  {
    prompt: "Dans « Les oiseaux bleus chantent. », oiseaux est un…",
    answer: "nom",
    distractors: N,
  },
  {
    prompt: "Dans « Les oiseaux bleus chantent. », chantent est un…",
    answer: "verbe",
    distractors: V,
  },
  {
    prompt: "Dans « Les oiseaux bleus chantent. », bleus est un…",
    answer: "adjectif",
    distractors: A,
  },
  {
    prompt: "Dans « Les oiseaux bleus chantent. », Les est un…",
    answer: "déterminant",
    distractors: D,
  },
  { prompt: "Dans « Mon grand frère court. », frère est un…", answer: "nom", distractors: N },
  { prompt: "Dans « Mon grand frère court. », court est un…", answer: "verbe", distractors: V },
  { prompt: "Dans « Mon grand frère court. », grand est un…", answer: "adjectif", distractors: A },
  { prompt: "Dans « Mon grand frère court. », Mon est un…", answer: "déterminant", distractors: D },
  { prompt: "Dans « Cette soupe chaude fume. », soupe est un…", answer: "nom", distractors: N },
  { prompt: "Dans « Cette soupe chaude fume. », fume est un…", answer: "verbe", distractors: V },
  {
    prompt: "Dans « Cette soupe chaude fume. », chaude est un…",
    answer: "adjectif",
    distractors: A,
  },
  {
    prompt: "Dans « Cette soupe chaude fume. », Cette est un…",
    answer: "déterminant",
    distractors: D,
  },
];
