import type { QuizSeed } from "./quiz.ts";

function oddOne(
  words: readonly [string, string, string, string],
  answer: string,
  family: string,
): QuizSeed {
  return {
    prompt: words.join(", "),
    answer,
    distractors: words.filter((word) => word !== answer),
    explain: `${answer.charAt(0).toUpperCase()}${answer.slice(1)} n'est pas ${family}.`,
  };
}

export const INTRUS_BANK: QuizSeed[] = [
  oddOne(["chat", "chien", "oiseau", "table"], "table", "un animal"),
  oddOne(["vache", "poule", "lion", "chaise"], "chaise", "un animal"),
  oddOne(["lapin", "poisson", "tortue", "crayon"], "crayon", "un animal"),
  oddOne(["cheval", "mouton", "cochon", "livre"], "livre", "un animal"),
  oddOne(["canard", "oie", "pigeon", "ballon"], "ballon", "un animal"),
  oddOne(["crayon", "cahier", "stylo", "pomme"], "pomme", "pour l'école"),
  oddOne(["règle", "gomme", "trousse", "chien"], "chien", "pour l'école"),
  oddOne(["tableau", "craie", "classe", "gâteau"], "gâteau", "pour l'école"),
  oddOne(["cartable", "livre", "cahier", "banane"], "banane", "pour l'école"),
  oddOne(["table", "chaise", "lit", "lion"], "lion", "un meuble"),
  oddOne(["porte", "fenêtre", "lampe", "poisson"], "poisson", "dans la maison"),
  oddOne(["lit", "oreiller", "couverture", "camion"], "camion", "dans la chambre"),
  oddOne(["pomme", "poire", "banane", "crayon"], "crayon", "un fruit"),
  oddOne(["pain", "fromage", "gâteau", "cahier"], "cahier", "à manger"),
  oddOne(["carotte", "tomate", "salade", "ballon"], "ballon", "à manger"),
  oddOne(["soupe", "purée", "yaourt", "stylo"], "stylo", "à manger"),
  oddOne(["robe", "jupe", "manteau", "pomme"], "pomme", "un vêtement"),
  oddOne(["pull", "pantalon", "chaussette", "chaise"], "chaise", "un vêtement"),
];
