import type { QuizSeed } from "../french/quiz.ts";
import { shuffle } from "../french/quiz.ts";

const PERSONS = ["I", "you", "he", "she", "we", "they"] as const;

const TENSE_LABELS = {
  present: "présent",
  preterit: "prétérit",
  participe: "participe",
} as const;

export type EnglishConjugaisonTense = keyof typeof TENSE_LABELS;

type Verb = {
  base: string;
  present: readonly [string, string, string, string, string, string];
  preterit: readonly [string, string, string, string, string, string];
  participe: readonly [string, string, string, string, string, string];
  extras: readonly string[];
};

const same = (form: string): Verb["present"] => [form, form, form, form, form, form];

const VERBS: Verb[] = [
  {
    base: "be",
    present: ["am", "are", "is", "is", "are", "are"],
    preterit: ["was", "were", "was", "was", "were", "were"],
    participe: same("been"),
    extras: ["being", "be", "is"],
  },
  {
    base: "have",
    present: ["have", "have", "has", "has", "have", "have"],
    preterit: same("had"),
    participe: same("had"),
    extras: ["haves", "having", "hadded"],
  },
  {
    base: "go",
    present: ["go", "go", "goes", "goes", "go", "go"],
    preterit: same("went"),
    participe: same("gone"),
    extras: ["goed", "going", "wented"],
  },
  {
    base: "do",
    present: ["do", "do", "does", "does", "do", "do"],
    preterit: same("did"),
    participe: same("done"),
    extras: ["doed", "doing", "dided"],
  },
  {
    base: "see",
    present: ["see", "see", "sees", "sees", "see", "see"],
    preterit: same("saw"),
    participe: same("seen"),
    extras: ["seed", "seeing", "sawed"],
  },
  {
    base: "eat",
    present: ["eat", "eat", "eats", "eats", "eat", "eat"],
    preterit: same("ate"),
    participe: same("eaten"),
    extras: ["eated", "eating", "ated"],
  },
  {
    base: "come",
    present: ["come", "come", "comes", "comes", "come", "come"],
    preterit: same("came"),
    participe: same("come"),
    extras: ["comed", "coming", "camed"],
  },
  {
    base: "make",
    present: ["make", "make", "makes", "makes", "make", "make"],
    preterit: same("made"),
    participe: same("made"),
    extras: ["maked", "making", "maded"],
  },
  {
    base: "take",
    present: ["take", "take", "takes", "takes", "take", "take"],
    preterit: same("took"),
    participe: same("taken"),
    extras: ["taked", "taking", "tooked"],
  },
  {
    base: "give",
    present: ["give", "give", "gives", "gives", "give", "give"],
    preterit: same("gave"),
    participe: same("given"),
    extras: ["gived", "giving", "gaved"],
  },
  {
    base: "write",
    present: ["write", "write", "writes", "writes", "write", "write"],
    preterit: same("wrote"),
    participe: same("written"),
    extras: ["writed", "writing", "wroted"],
  },
  {
    base: "know",
    present: ["know", "know", "knows", "knows", "know", "know"],
    preterit: same("knew"),
    participe: same("known"),
    extras: ["knowed", "knowing", "knewed"],
  },
  {
    base: "think",
    present: ["think", "think", "thinks", "thinks", "think", "think"],
    preterit: same("thought"),
    participe: same("thought"),
    extras: ["thinked", "thinking", "thoughted"],
  },
  {
    base: "find",
    present: ["find", "find", "finds", "finds", "find", "find"],
    preterit: same("found"),
    participe: same("found"),
    extras: ["finded", "finding", "founded"],
  },
  {
    base: "say",
    present: ["say", "say", "says", "says", "say", "say"],
    preterit: same("said"),
    participe: same("said"),
    extras: ["sayed", "saying", "saided"],
  },
  {
    base: "get",
    present: ["get", "get", "gets", "gets", "get", "get"],
    preterit: same("got"),
    participe: same("got"),
    extras: ["getted", "getting", "gotted"],
  },
  {
    base: "put",
    present: ["put", "put", "puts", "puts", "put", "put"],
    preterit: same("put"),
    participe: same("put"),
    extras: ["putted", "putting", "puts"],
  },
  {
    base: "run",
    present: ["run", "run", "runs", "runs", "run", "run"],
    preterit: same("ran"),
    participe: same("run"),
    extras: ["runned", "running", "raned"],
  },
  {
    base: "buy",
    present: ["buy", "buy", "buys", "buys", "buy", "buy"],
    preterit: same("bought"),
    participe: same("bought"),
    extras: ["buyed", "buying", "boughted"],
  },
  {
    base: "sleep",
    present: ["sleep", "sleep", "sleeps", "sleeps", "sleep", "sleep"],
    preterit: same("slept"),
    participe: same("slept"),
    extras: ["sleeped", "sleeping", "slepted"],
  },
];

function distractorsFor(verb: Verb, answer: string): string[] {
  const pool = [...verb.present, ...verb.preterit, ...verb.participe, verb.base, ...verb.extras];
  return shuffle([...new Set(pool.filter((form) => form !== answer))]).slice(0, 3);
}

function seedsForTense(tense: EnglishConjugaisonTense): QuizSeed[] {
  const seeds: QuizSeed[] = [];
  const label = TENSE_LABELS[tense];

  for (const verb of VERBS) {
    const forms = verb[tense];
    for (let person = 0; person < PERSONS.length; person++) {
      const answer = forms[person];
      if (!answer) continue;
      const distractors = distractorsFor(verb, answer);
      if (distractors.length < 3) {
        throw new Error(`Pas assez de distracteurs pour ${PERSONS[person]} (${verb.base})`);
      }
      seeds.push({
        prompt: `${PERSONS[person]} ___ (${verb.base}, ${label})`,
        answer,
        distractors,
      });
    }
  }

  return seeds;
}

export const CONJUGAISON_PRESENT = seedsForTense("present");
export const CONJUGAISON_PRETERIT = seedsForTense("preterit");
export const CONJUGAISON_PARTICIPE = seedsForTense("participe");
