import type { QuizSeed } from "../french/quiz.ts";

// ponytail: distracteurs = même période / même type. Plafond : pas de piège hors Moyen Âge.

export const MOYEN_AGE_BANK: QuizSeed[] = [
  {
    prompt: "À quoi sert un château fort ?",
    answer: "à se défendre",
    distractors: ["à prier", "à commercer", "à gouverner l'Église"],
  },
  {
    prompt: "Qui habite le château ?",
    answer: "le seigneur",
    distractors: ["le roi seulement", "le chevalier seulement", "l'évêque"],
  },
  {
    prompt: "Que font surtout les paysans au Moyen Âge ?",
    answer: "ils travaillent la terre",
    distractors: ["ils prient à l'abbaye", "ils combattent à cheval", "ils dirigent la seigneurie"],
  },
  {
    prompt: "En quelle année Hugues Capet est-il élu roi ?",
    answer: "987",
    distractors: ["800", "1066", "1453"],
  },
  {
    prompt: "Les Capétiens sont…",
    answer: "une famille de rois de France",
    distractors: ["les Mérovingiens", "les Carolingiens", "les Valois"],
  },
  {
    prompt: "Le sacre du roi a souvent lieu à…",
    answer: "Reims",
    distractors: ["Paris", "Saint-Denis", "Chartres"],
  },
  {
    prompt: "Au Moyen Âge, beaucoup de gens sont…",
    answer: "paysans",
    distractors: ["seigneurs", "clercs", "bourgeois"],
  },
  {
    prompt: "Une cathédrale est…",
    answer: "une grande église",
    distractors: ["une abbaye", "une chapelle", "un château"],
  },
  {
    prompt: "Un chevalier combat surtout…",
    answer: "à cheval",
    distractors: ["à pied", "à l'arc seulement", "depuis le donjon"],
  },
  {
    prompt: "La seigneurie, c'est…",
    answer: "la terre du seigneur",
    distractors: ["le fief du roi seulement", "la terre de l'Église", "un village libre"],
  },
  {
    prompt: "La paroisse, c'est…",
    answer: "l'église et son village",
    distractors: ["la seigneurie", "l'abbaye", "le diocèse"],
  },
  {
    prompt: "Qui protège les paysans au Moyen Âge ?",
    answer: "le seigneur",
    distractors: ["le roi seulement", "le chevalier seulement", "l'abbé"],
  },
  {
    prompt: "Les villes du Moyen Âge ont souvent…",
    answer: "des remparts",
    distractors: ["un donjon", "un pont-levis", "une herse"],
  },
  {
    prompt: "Comment s'appelle la période entre l'Antiquité et les Temps modernes ?",
    answer: "le Moyen Âge",
    distractors: ["la Préhistoire", "l'Antiquité", "les Temps modernes"],
  },
  {
    prompt: "Le roi est sacré pour montrer qu'il…",
    answer: "devient roi de France",
    distractors: ["gouverne l'Église", "devient seigneur", "part en croisade"],
  },
  {
    prompt: "Qui a aidé le roi Charles VII pendant la guerre de Cent Ans ?",
    answer: "Jeanne d'Arc",
    distractors: ["Du Guesclin", "Louis XI", "Aliénor d'Aquitaine"],
  },
  {
    prompt: "L'art gothique se voit surtout dans…",
    answer: "les cathédrales",
    distractors: ["les églises romanes", "les châteaux forts", "les abbayes"],
  },
  {
    prompt: "Au Moyen Âge, le paysan donne une part de sa récolte…",
    answer: "au seigneur",
    distractors: ["à l'Église seulement", "au roi seulement", "au village"],
  },
];
