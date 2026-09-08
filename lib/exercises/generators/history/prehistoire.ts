import type { QuizSeed } from "../french/quiz.ts";

// ponytail: distracteurs = même période / même type. Plafond : pas de piège hors Préhistoire.

export const PREHISTOIRE_BANK: QuizSeed[] = [
  {
    prompt: "Comment appelle-t-on l'époque avant l'écriture ?",
    answer: "la Préhistoire",
    distractors: ["le Paléolithique seulement", "le Néolithique seulement", "l'âge des métaux"],
  },
  {
    prompt: "Comment vivaient les premiers humains ?",
    answer: "en chassant et en cueillant",
    distractors: [
      "en cultivant des champs",
      "en élevant des animaux",
      "en restant dans un village",
    ],
  },
  {
    prompt: "Au Paléolithique, les outils sont surtout en…",
    answer: "pierre taillée",
    distractors: ["pierre polie", "os seulement", "métal"],
  },
  {
    prompt: "Que voit-on sur les parois de Lascaux ?",
    answer: "des animaux",
    distractors: ["des villages", "des champs", "des troupeaux gardés"],
  },
  {
    prompt: "Lascaux et Chauvet sont…",
    answer: "des grottes ornées",
    distractors: ["des grottes-abris", "des villages", "des camps de chasse"],
  },
  {
    prompt: "À quoi servait le silex ?",
    answer: "à tailler des outils",
    distractors: ["à allumer le feu", "à racler les peaux", "à construire une hutte"],
  },
  {
    prompt: "Le feu permettait surtout de…",
    answer: "se chauffer et cuire les aliments",
    distractors: ["éclairer seulement la grotte", "éloigner les animaux", "durcir les outils"],
  },
  {
    prompt: "Au Néolithique, les humains deviennent…",
    answer: "agriculteurs et éleveurs",
    distractors: ["chasseurs-cueilleurs", "nomades", "tailleurs de silex seulement"],
  },
  {
    prompt: "Un nomade, c'est quelqu'un qui…",
    answer: "se déplace pour vivre",
    distractors: ["reste toujours au même endroit", "cultive un champ", "construit un village"],
  },
  {
    prompt: "Un sédentaire, c'est quelqu'un qui…",
    answer: "reste vivre au même endroit",
    distractors: ["voyage sans s'arrêter", "suit les animaux sauvages", "change de camp"],
  },
  {
    prompt: "Qu'est-ce qui change au Néolithique ?",
    answer: "on cultive la terre",
    distractors: ["on chasse seulement", "on reste nomade", "on taille seulement la pierre"],
  },
  {
    prompt: "Avant l'agriculture, on se nourrissait en…",
    answer: "chassant et cueillant",
    distractors: ["élevant surtout des vaches", "cultivant le blé", "restant au village"],
  },
  {
    prompt: "Les premiers villages apparaissent…",
    answer: "au Néolithique",
    distractors: ["au Paléolithique", "au temps des grottes ornées", "au début de la chasse"],
  },
  {
    prompt: "Les premiers métaux sont utilisés…",
    answer: "à la fin de la Préhistoire",
    distractors: ["au Paléolithique", "au début du Néolithique", "au temps des grottes ornées"],
  },
  {
    prompt: "Pourquoi dit-on que Lascaux est importante ?",
    answer: "on y a trouvé de très vieilles peintures",
    distractors: ["on y a vécu longtemps", "on y a trouvé des outils", "on y a enterré des morts"],
  },
  {
    prompt: "À la Préhistoire, il n'y a pas encore…",
    answer: "d'écriture",
    distractors: ["de feu", "d'outils", "d'humains"],
  },
  {
    prompt: "Les chasseurs-cueilleurs se déplacent pour…",
    answer: "trouver de la nourriture",
    distractors: ["suivre les saisons", "trouver un abri", "suivre les animaux"],
  },
  {
    prompt: "L'agriculture permet de…",
    answer: "produire sa nourriture sur place",
    distractors: ["chasser plus loin", "cueillir davantage", "changer de camp"],
  },
];
