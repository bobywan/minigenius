import type { QuizSeed } from "../french/quiz.ts";

// ponytail: distracteurs = même période / même type. Plafond : pas de piège hors XIXe–XXe.

export const FRANCE_RECENTE_BANK: QuizSeed[] = [
  {
    prompt: "Jules Ferry est connu pour…",
    answer: "l'école gratuite et obligatoire",
    distractors: [
      "l'armée obligatoire",
      "le droit de vote des femmes",
      "la journée de 8 heures",
    ],
  },
  {
    prompt: "L'école de Jules Ferry est aussi…",
    answer: "laïque",
    distractors: ["catholique", "réservée aux garçons", "payante"],
  },
  {
    prompt: "La laïcité à l'école, c'est…",
    answer: "l'école n'enseigne pas une religion",
    distractors: [
      "l'école enseigne toutes les religions",
      "l'école n'a plus de maître",
      "l'école refuse les devoirs",
    ],
  },
  {
    prompt: "Au XIXe siècle, beaucoup de gens travaillent…",
    answer: "à l'usine ou à la mine",
    distractors: ["aux champs", "à l'atelier", "au grand magasin"],
  },
  {
    prompt: "Une usine, c'est un lieu où l'on…",
    answer: "fabrique des objets",
    distractors: ["extrait le charbon", "vend des marchandises", "cultive la terre"],
  },
  {
    prompt: "Au XIXe siècle, les villes…",
    answer: "grandissent",
    distractors: ["se vident", "restent comme au village", "perdent leurs usines"],
  },
  {
    prompt: "La Première Guerre mondiale a lieu de…",
    answer: "1914 à 1918",
    distractors: ["1939 à 1945", "1870 à 1871", "1918 à 1939"],
  },
  {
    prompt: "Le 11 novembre, on se souvient…",
    answer: "de la fin de la guerre de 1914-1918",
    distractors: [
      "de la fin de la guerre de 1939-1945",
      "du débarquement de 1944",
      "de l'armistice de 1940",
    ],
  },
  {
    prompt: "La Seconde Guerre mondiale a lieu de…",
    answer: "1939 à 1945",
    distractors: ["1914 à 1918", "1870 à 1871", "1940 à 1944"],
  },
  {
    prompt: "Le 8 mai, on se souvient de…",
    answer: "la fin de la guerre en Europe en 1945",
    distractors: [
      "la fin de la guerre de 1914-1918",
      "le débarquement en Normandie",
      "l'armistice de 1940",
    ],
  },
  {
    prompt: "En 1945 commence surtout…",
    answer: "la reconstruction et la paix",
    distractors: [
      "une nouvelle guerre",
      "le retour du roi",
      "la IIIe République",
    ],
  },
  {
    prompt: "Les femmes votent en France depuis…",
    answer: "1944",
    distractors: ["1848", "1918", "1958"],
  },
  {
    prompt: "L'Union européenne, c'est…",
    answer: "des pays d'Europe qui s'unissent",
    distractors: ["l'ONU", "un empire européen", "un seul pays d'Europe"],
  },
  {
    prompt: "Après 1945, des pays d'Europe s'unissent pour…",
    answer: "vivre en paix",
    distractors: [
      "reconstruire les usines seulement",
      "créer des colonies",
      "élire un roi",
    ],
  },
  {
    prompt: "Marianne, le drapeau et La Marseillaise sont…",
    answer: "des symboles de la République",
    distractors: [
      "des symboles de l'Empire",
      "des symboles de la monarchie",
      "des chansons d'école",
    ],
  },
  {
    prompt: "La IIIe République, c'est un régime…",
    answer: "sans roi",
    distractors: ["avec un empereur", "avec un roi", "dirigé par Jules Ferry seulement"],
  },
  {
    prompt: "Au temps de Jules Ferry, l'école devient…",
    answer: "obligatoire",
    distractors: ["facultative", "payante", "réservée aux garçons"],
  },
  {
    prompt: "Le 11 novembre est un jour…",
    answer: "de souvenir",
    distractors: ["de fête nationale", "du Nouvel An", "de fête du travail"],
  },
];
