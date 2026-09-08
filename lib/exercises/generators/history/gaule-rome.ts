import type { QuizSeed } from "../french/quiz.ts";

// ponytail: distracteurs = même période / même type. Plafond : pas de piège hors Gaule-Rome.

export const GAULE_ROME_BANK: QuizSeed[] = [
  {
    prompt: "Qui habitait la Gaule avant la conquête romaine ?",
    answer: "les Gaulois",
    distractors: ["les Romains", "les Grecs", "les Francs"],
  },
  {
    prompt: "Quel chef gaulois est vaincu à Alésia ?",
    answer: "Vercingétorix",
    distractors: ["Jules César", "Auguste", "un druide"],
  },
  {
    prompt: "En quelle année a lieu le siège d'Alésia ?",
    answer: "52 av. J.-C.",
    distractors: ["58 av. J.-C.", "51 av. J.-C.", "27 av. J.-C."],
  },
  {
    prompt: "Qui a conquis la Gaule ?",
    answer: "Jules César",
    distractors: ["Auguste", "Vercingétorix", "un consul romain"],
  },
  {
    prompt: "Après Alésia, la Gaule devient…",
    answer: "romaine",
    distractors: ["indépendante", "grecque", "alliée de Rome"],
  },
  {
    prompt: "Rome est…",
    answer: "la capitale de l'empire romain",
    distractors: ["une cité gauloise", "la ville d'Alésia", "Lutèce"],
  },
  {
    prompt: "Les Romains parlent surtout…",
    answer: "le latin",
    distractors: ["le gaulois", "le grec", "le celte"],
  },
  {
    prompt: "Un aqueduc sert à…",
    answer: "transporter l'eau",
    distractors: ["évacuer les eaux usées", "relier les routes", "alimenter les thermes seulement"],
  },
  {
    prompt: "Les thermes romains sont…",
    answer: "des bains publics",
    distractors: ["des temples", "des forums", "des amphithéâtres"],
  },
  {
    prompt: "Le forum, à Rome, est…",
    answer: "une place publique",
    distractors: ["un temple", "un théâtre", "un palais d'empereur"],
  },
  {
    prompt: "Un légionnaire est…",
    answer: "un soldat romain",
    distractors: ["un soldat gaulois", "un gladiateur", "un marchand"],
  },
  {
    prompt: "À Rome, un esclave…",
    answer: "n'est pas un homme libre",
    distractors: ["est un citoyen", "est un affranchi", "est un sénateur"],
  },
  {
    prompt: "Auguste est…",
    answer: "un empereur romain",
    distractors: ["un général romain", "un chef gaulois", "un consul"],
  },
  {
    prompt: "Les Romains construisent beaucoup de…",
    answer: "routes",
    distractors: ["aqueducs seulement", "temples seulement", "thermes seulement"],
  },
  {
    prompt: "L'empire romain s'étend autour de…",
    answer: "la mer Méditerranée",
    distractors: ["la mer du Nord", "la Manche", "l'océan Atlantique"],
  },
  {
    prompt: "Vercingétorix est…",
    answer: "un chef gaulois",
    distractors: ["un empereur romain", "un général romain", "un druide"],
  },
  {
    prompt: "La Gaule romaine, c'est…",
    answer: "la Gaule après la conquête",
    distractors: [
      "la Gaule avant la conquête",
      "la Gaule indépendante",
      "la Gaule des Celtes seulement",
    ],
  },
  {
    prompt: "Dans la société romaine, on trouve des hommes libres et…",
    answer: "des esclaves",
    distractors: ["des citoyens seulement", "des affranchis seulement", "des étrangers seulement"],
  },
];
