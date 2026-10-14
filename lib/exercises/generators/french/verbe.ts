import type { QuizSeed } from "./quiz.ts";

function sentence(prompt: string, answer: string): QuizSeed {
  const words = prompt.replace(/\.$/, "").split(" ");
  if (words.length !== 4 || !words.includes(answer)) {
    throw new Error(`Phrase verbe invalide : ${prompt}`);
  }
  return {
    prompt,
    answer,
    distractors: words.filter((word) => word !== answer),
    explain: `${answer.charAt(0).toUpperCase()}${answer.slice(1)}, c'est l'action.`,
  };
}

export const VERBE_BANK: QuizSeed[] = [
  sentence("Marie mange une pomme.", "mange"),
  sentence("Tom lit un livre.", "lit"),
  sentence("Léa joue au ballon.", "joue"),
  sentence("Papa conduit la voiture.", "conduit"),
  sentence("Maman prépare une soupe.", "prépare"),
  sentence("Le chat dort bien.", "dort"),
  sentence("Nina chante une chanson.", "chante"),
  sentence("Léo dessine un soleil.", "dessine"),
  sentence("Le chien court vite.", "court"),
  sentence("Les enfants jouent dehors.", "jouent"),
  sentence("Mia range sa chambre.", "range"),
  sentence("Paul ferme la porte.", "ferme"),
  sentence("Emma ouvre la fenêtre.", "ouvre"),
  sentence("Le lapin saute haut.", "saute"),
  sentence("Zoé coupe une poire.", "coupe"),
  sentence("Hugo porte son sac.", "porte"),
];
