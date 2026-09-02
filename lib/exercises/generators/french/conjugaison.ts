import type { QuizSeed } from "./quiz.ts";
import { shuffle } from "./quiz.ts";

const PERSONS = ["je", "tu", "il", "nous", "vous", "ils"] as const;

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

function seedsForTense(tense: ConjugaisonTense): QuizSeed[] {
  const seeds: QuizSeed[] = [];
  const label = TENSE_LABELS[tense];

  for (const verb of VERBS) {
    const forms = verb[tense];
    for (let person = 0; person < PERSONS.length; person++) {
      const answer = forms[person];
      if (!answer) continue;

      const sameVerb = forms.filter((form) => form !== answer);
      const otherVerbs = VERBS.filter((other) => other.infinitive !== verb.infinitive)
        .map((other) => other[tense][person])
        .filter((form): form is string => Boolean(form) && form !== answer);

      const distractors: string[] = [];
      const seen = new Set([answer]);
      for (const candidate of shuffle([...sameVerb, ...otherVerbs])) {
        if (distractors.length === 3) break;
        if (seen.has(candidate)) continue;
        seen.add(candidate);
        distractors.push(candidate);
      }

      if (distractors.length < 3) {
        throw new Error(`Pas assez de distracteurs pour ${PERSONS[person]} (${verb.infinitive})`);
      }

      seeds.push({
        prompt: `${PERSONS[person]} (${verb.infinitive}) au ${label}`,
        answer,
        distractors,
      });
    }
  }

  return seeds;
}

export const CONJUGAISON_PRESENT = seedsForTense("present");
export const CONJUGAISON_IMPARFAIT = seedsForTense("imparfait");
export const CONJUGAISON_FUTUR = seedsForTense("futur");
