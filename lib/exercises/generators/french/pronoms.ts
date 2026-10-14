import type { QuizSeed } from "./quiz.ts";

const CHOICES = ["Il", "Elle", "Ils", "Elles"] as const;

function cap(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function pronoun(prompt: string, answer: (typeof CHOICES)[number]): QuizSeed {
  return {
    prompt,
    answer,
    distractors: CHOICES.filter((choice) => choice !== answer),
    explain: `${cap(prompt)} : on dit ${answer}.`,
  };
}

export const PRONOMS_BANK: QuizSeed[] = [
  pronoun("Marie", "Elle"),
  pronoun("Léa", "Elle"),
  pronoun("Nina", "Elle"),
  pronoun("maman", "Elle"),
  pronoun("la fille", "Elle"),
  pronoun("la poule", "Elle"),
  pronoun("Tom", "Il"),
  pronoun("Léo", "Il"),
  pronoun("papa", "Il"),
  pronoun("le chat", "Il"),
  pronoun("le chien", "Il"),
  pronoun("le garçon", "Il"),
  pronoun("les enfants", "Ils"),
  pronoun("Tom et Léo", "Ils"),
  pronoun("les garçons", "Ils"),
  pronoun("les chats", "Ils"),
  pronoun("les filles", "Elles"),
  pronoun("Léa et Nina", "Elles"),
  pronoun("les poules", "Elles"),
  pronoun("maman et Léa", "Elles"),
];
