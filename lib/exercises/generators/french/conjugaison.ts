import type { QuizSeed } from "./quiz.ts";
import { shuffle } from "./quiz.ts";

const TENSE_LABELS = {
  present: "présent",
  imparfait: "imparfait",
  futur: "futur",
} as const;

export type ConjugaisonTense = keyof typeof TENSE_LABELS;

type Verb = {
  infinitive: string;
  present: readonly [string, string, string, string, string, string];
  imparfait: readonly [string, string, string, string, string, string];
  futur: readonly [string, string, string, string, string, string];
};

const VERBS: Verb[] = [
  {
    infinitive: "être",
    present: ["suis", "es", "est", "sommes", "êtes", "sont"],
    imparfait: ["étais", "étais", "était", "étions", "étiez", "étaient"],
    futur: ["serai", "seras", "sera", "serons", "serez", "seront"],
  },
  {
    infinitive: "avoir",
    present: ["ai", "as", "a", "avons", "avez", "ont"],
    imparfait: ["avais", "avais", "avait", "avions", "aviez", "avaient"],
    futur: ["aurai", "auras", "aura", "aurons", "aurez", "auront"],
  },
  {
    infinitive: "aller",
    present: ["vais", "vas", "va", "allons", "allez", "vont"],
    imparfait: ["allais", "allais", "allait", "allions", "alliez", "allaient"],
    futur: ["irai", "iras", "ira", "irons", "irez", "iront"],
  },
  {
    infinitive: "faire",
    present: ["fais", "fais", "fait", "faisons", "faites", "font"],
    imparfait: ["faisais", "faisais", "faisait", "faisions", "faisiez", "faisaient"],
    futur: ["ferai", "feras", "fera", "ferons", "ferez", "feront"],
  },
  {
    infinitive: "dire",
    present: ["dis", "dis", "dit", "disons", "dites", "disent"],
    imparfait: ["disais", "disais", "disait", "disions", "disiez", "disaient"],
    futur: ["dirai", "diras", "dira", "dirons", "direz", "diront"],
  },
  {
    infinitive: "manger",
    present: ["mange", "manges", "mange", "mangeons", "mangez", "mangent"],
    imparfait: ["mangeais", "mangeais", "mangeait", "mangions", "mangiez", "mangeaient"],
    futur: ["mangerai", "mangeras", "mangera", "mangerons", "mangerez", "mangeront"],
  },
  {
    infinitive: "jouer",
    present: ["joue", "joues", "joue", "jouons", "jouez", "jouent"],
    imparfait: ["jouais", "jouais", "jouait", "jouions", "jouiez", "jouaient"],
    futur: ["jouerai", "joueras", "jouera", "jouerons", "jouerez", "joueront"],
  },
  {
    infinitive: "aimer",
    present: ["aime", "aimes", "aime", "aimons", "aimez", "aiment"],
    imparfait: ["aimais", "aimais", "aimait", "aimions", "aimiez", "aimaient"],
    futur: ["aimerai", "aimeras", "aimera", "aimerons", "aimerez", "aimeront"],
  },
  {
    infinitive: "parler",
    present: ["parle", "parles", "parle", "parlons", "parlez", "parlent"],
    imparfait: ["parlais", "parlais", "parlait", "parlions", "parliez", "parlaient"],
    futur: ["parlerai", "parleras", "parlera", "parlerons", "parlerez", "parleront"],
  },
  {
    infinitive: "chanter",
    present: ["chante", "chantes", "chante", "chantons", "chantez", "chantent"],
    imparfait: ["chantais", "chantais", "chantait", "chantions", "chantiez", "chantaient"],
    futur: ["chanterai", "chanteras", "chantera", "chanterons", "chanterez", "chanteront"],
  },
];

const FORM_INDEX = {
  je: 0,
  tu: 1,
  il: 2,
  elle: 2,
  nous: 3,
  vous: 4,
  ils: 5,
  elles: 5,
} as const;

type Person = keyof typeof FORM_INDEX;

const SIX_PERSONS: readonly Person[] = ["je", "tu", "il", "nous", "vous", "ils"];

const ER_INFINITIVES = new Set(["manger", "jouer", "aimer", "parler", "chanter"]);

function seedsFor(
  tense: ConjugaisonTense,
  verbs: readonly Verb[],
  persons: readonly Person[],
): QuizSeed[] {
  const seeds: QuizSeed[] = [];
  const label = TENSE_LABELS[tense];

  for (const verb of verbs) {
    const forms = verb[tense];
    for (const person of persons) {
      const answer = forms[FORM_INDEX[person]];
      if (!answer) continue;

      const distractors = shuffle([...new Set(forms.filter((form) => form !== answer))]).slice(
        0,
        3,
      );

      if (distractors.length < 3) {
        throw new Error(`Pas assez de distracteurs pour ${person} (${verb.infinitive})`);
      }

      seeds.push({
        prompt: `${person} ___ (${verb.infinitive}, ${label})`,
        answer,
        distractors,
      });
    }
  }

  return seeds;
}

export const CONJUGAISON_PRESENT = seedsFor("present", VERBS, SIX_PERSONS);
export const CONJUGAISON_IMPARFAIT = seedsFor("imparfait", VERBS, SIX_PERSONS);
export const CONJUGAISON_FUTUR = seedsFor("futur", VERBS, SIX_PERSONS);
export const CONJUGAISON_ER = seedsFor(
  "present",
  VERBS.filter((verb) => ER_INFINITIVES.has(verb.infinitive)),
  SIX_PERSONS,
);
export const CONJUGAISON_ETRE_AVOIR = seedsFor(
  "present",
  VERBS.filter((verb) => verb.infinitive === "être" || verb.infinitive === "avoir"),
  ["je", "tu", "il", "elle", "nous", "vous", "ils", "elles"],
);
