import type { QuizSeed } from "./quiz.ts";

export const VOCAB_SYNONYMES: QuizSeed[] = [
  {
    prompt: "Un synonyme de content",
    answer: "heureux",
    distractors: ["triste", "petit", "froid"],
  },
  { prompt: "Un synonyme de grand", answer: "énorme", distractors: ["minuscule", "lent", "vide"] },
  { prompt: "Un synonyme de joli", answer: "beau", distractors: ["laid", "sale", "lourd"] },
  { prompt: "Un synonyme de rapide", answer: "vite", distractors: ["lent", "calme", "bas"] },
  {
    prompt: "Un synonyme de commencer",
    answer: "débuter",
    distractors: ["finir", "dormir", "tomber"],
  },
  { prompt: "Un synonyme de peur", answer: "crainte", distractors: ["joie", "faim", "sommeil"] },
  {
    prompt: "Un synonyme de habiter",
    answer: "vivre",
    distractors: ["partir", "courir", "casser"],
  },
  { prompt: "Un synonyme de cadeau", answer: "don", distractors: ["devoir", "peur", "bruit"] },
  {
    prompt: "Un synonyme de fatigué",
    answer: "épuisé",
    distractors: ["réveillé", "fort", "nouveau"],
  },
  { prompt: "Un synonyme de intelligent", answer: "malin", distractors: ["bête", "lourd", "lent"] },
  {
    prompt: "Un synonyme de regarder",
    answer: "observer",
    distractors: ["fermer", "cacher", "lancer"],
  },
  {
    prompt: "Un synonyme de parler",
    answer: "discuter",
    distractors: ["taire", "dormir", "sauter"],
  },
  { prompt: "Un synonyme de maison", answer: "demeure", distractors: ["jardin", "école", "rue"] },
  { prompt: "Un synonyme de enfant", answer: "gamin", distractors: ["adulte", "arbre", "livre"] },
  {
    prompt: "Un synonyme de facile",
    answer: "simple",
    distractors: ["difficile", "long", "sombre"],
  },
  { prompt: "Un synonyme de aidé", answer: "secouru", distractors: ["oublié", "cassé", "perdu"] },
];

export const VOCAB_CONTRAIRES: QuizSeed[] = [
  { prompt: "Le contraire de grand", answer: "petit", distractors: ["large", "haut", "long"] },
  { prompt: "Le contraire de chaud", answer: "froid", distractors: ["tiède", "doux", "sec"] },
  { prompt: "Le contraire de jour", answer: "nuit", distractors: ["soir", "matin", "an"] },
  { prompt: "Le contraire de haut", answer: "bas", distractors: ["loin", "près", "fort"] },
  { prompt: "Le contraire de ouvert", answer: "fermé", distractors: ["vide", "plein", "large"] },
  { prompt: "Le contraire de propre", answer: "sale", distractors: ["neuf", "vieux", "rond"] },
  { prompt: "Le contraire de léger", answer: "lourd", distractors: ["doux", "fin", "calme"] },
  { prompt: "Le contraire de tôt", answer: "tard", distractors: ["vite", "lent", "près"] },
  { prompt: "Le contraire de vrai", answer: "faux", distractors: ["juste", "droit", "clair"] },
  { prompt: "Le contraire de plein", answer: "vide", distractors: ["ouvert", "creux", "mince"] },
  { prompt: "Le contraire de avant", answer: "après", distractors: ["sous", "sur", "dans"] },
  {
    prompt: "Le contraire de aimer",
    answer: "détester",
    distractors: ["manger", "donner", "garder"],
  },
  {
    prompt: "Le contraire de entrer",
    answer: "sortir",
    distractors: ["monter", "rester", "tomber"],
  },
  {
    prompt: "Le contraire de gagner",
    answer: "perdre",
    distractors: ["jouer", "courir", "lancer"],
  },
  { prompt: "Le contraire de clair", answer: "sombre", distractors: ["bleu", "doux", "large"] },
  { prompt: "Le contraire de fort", answer: "faible", distractors: ["gros", "haut", "dur"] },
];
