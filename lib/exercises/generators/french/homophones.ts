import type { QuizSeed } from "./quiz.ts";

function pair(prompt: string, answer: string, other: string): QuizSeed {
  return { prompt, answer, distractors: [other] };
}

export const HOMOPHONE_A: QuizSeed[] = [
  pair("Il ___ un chien.", "a", "à"),
  pair("Elle va ___ l'école.", "à", "a"),
  pair("Tom ___ six ans.", "a", "à"),
  pair("Le cadeau est ___ Marie.", "à", "a"),
  pair("Papa ___ un vélo rouge.", "a", "à"),
  pair("Nous allons ___ la piscine.", "à", "a"),
  pair("Lise ___ mal aux dents.", "a", "à"),
  pair("Le chat grimpe ___ l'arbre.", "à", "a"),
  pair("Il ___ faim ce matin.", "a", "à"),
  pair("Rends ce livre ___ Léa.", "à", "a"),
  pair("Le bébé ___ les yeux bleus.", "a", "à"),
  pair("On joue ___ la balle.", "à", "a"),
  pair("Nino ___ perdu son gant.", "a", "à"),
  pair("Je pense ___ mes copains.", "à", "a"),
  pair("Elle ___ une robe jaune.", "a", "à"),
  pair("Le train part ___ midi.", "à", "a"),
];

export const HOMOPHONE_ET: QuizSeed[] = [
  pair("Léa ___ Léo jouent dehors.", "et", "est"),
  pair("Le ciel ___ bleu aujourd'hui.", "est", "et"),
  pair("Pain ___ confiture pour le goûter.", "et", "est"),
  pair("Ma sœur ___ à la maison.", "est", "et"),
  pair("Le chat ___ le chien dorment.", "et", "est"),
  pair("Cette histoire ___ drôle.", "est", "et"),
  pair("Prends tes chaussures ___ ton manteau.", "et", "est"),
  pair("Le gâteau ___ au chocolat.", "est", "et"),
  pair("Maman ___ papa arrivent.", "et", "est"),
  pair("L'école ___ fermée le dimanche.", "est", "et"),
  pair("Un crayon ___ une gomme.", "et", "est"),
  pair("Le film ___ trop long.", "est", "et"),
  pair("Toi ___ moi, on part.", "et", "est"),
  pair("La soupe ___ chaude.", "est", "et"),
  pair("Des pommes ___ des poires.", "et", "est"),
  pair("Mon cartable ___ lourd.", "est", "et"),
];

export const HOMOPHONE_ON: QuizSeed[] = [
  pair("___ va à la récré.", "On", "Ont"),
  pair("Ils ___ un ballon neuf.", "ont", "on"),
  pair("___ mange des crêpes.", "On", "Ont"),
  pair("Les enfants ___ soif.", "ont", "on"),
  pair("___ ouvre les cadeaux.", "On", "Ont"),
  pair("Elles ___ perdu le match.", "ont", "on"),
  pair("___ écoute la maîtresse.", "On", "Ont"),
  pair("Mes cousins ___ un chat.", "ont", "on"),
  pair("___ dessine une maison.", "On", "Ont"),
  pair("Les oiseaux ___ faim.", "ont", "on"),
  pair("___ rentre à six heures.", "On", "Ont"),
  pair("Papa et maman ___ un jardin.", "ont", "on"),
  pair("___ lit une histoire.", "On", "Ont"),
  pair("Les joueurs ___ gagné.", "ont", "on"),
  pair("___ prend le bus.", "On", "Ont"),
  pair("Ils ___ mal aux pieds.", "ont", "on"),
];

export const HOMOPHONE_SON: QuizSeed[] = [
  pair("Léo range ___ cartable.", "son", "sont"),
  pair("Les stylos ___ dans la trousse.", "sont", "son"),
  pair("Le chien cherche ___ os.", "son", "sont"),
  pair("Mes amis ___ gentils.", "sont", "son"),
  pair("Nino met ___ manteau.", "son", "sont"),
  pair("Les fleurs ___ belles.", "sont", "son"),
  pair("Il a perdu ___ bonnet.", "son", "sont"),
  pair("Les chats ___ sous la table.", "sont", "son"),
  pair("Paul aime ___ vélo.", "son", "sont"),
  pair("Les devoirs ___ finis.", "sont", "son"),
  pair("Le bébé tient ___ doudou.", "son", "sont"),
  pair("Les fenêtres ___ ouvertes.", "sont", "son"),
  pair("Tom range ___ chambre.", "son", "sont"),
  pair("Les poissons ___ dans l'eau.", "sont", "son"),
  pair("Elle met ___ écharpe.", "son", "sont"),
  pair("Les livres ___ sur l'étagère.", "sont", "son"),
];

export const HOMOPHONE_OU: QuizSeed[] = [
  pair("Tu veux du pain ___ du fromage ?", "ou", "où"),
  pair("___ vas-tu ce matin ?", "Où", "Ou"),
  pair("Un chat ___ un chien ?", "ou", "où"),
  pair("Je ne sais pas ___ il habite.", "où", "ou"),
  pair("Bleu ___ rouge, tu choisis.", "ou", "où"),
  pair("La ville ___ je suis né.", "où", "ou"),
  pair("On joue ici ___ dehors.", "ou", "où"),
  pair("___ as-tu mis tes clés ?", "Où", "Ou"),
  pair("Thé ___ chocolat chaud ?", "ou", "où"),
  pair("C'est l'endroit ___ on nage.", "où", "ou"),
  pair("Mardi ___ mercredi ?", "ou", "où"),
  pair("La maison ___ vit Léa.", "où", "ou"),
  pair("Un crayon ___ un stylo.", "ou", "où"),
  pair("Dis-moi ___ tu vas.", "où", "ou"),
  pair("Oui ___ non ?", "ou", "où"),
  pair("Le parc ___ on se retrouve.", "où", "ou"),
];

export const HOMOPHONE_CES: QuizSeed[] = [
  { prompt: "Regarde ___ oiseaux.", answer: "ces", distractors: ["ses", "c'est", "s'est"] },
  { prompt: "Léa range ___ crayons.", answer: "ses", distractors: ["ces", "c'est", "s'est"] },
  { prompt: "___ un beau dessin.", answer: "C'est", distractors: ["Ses", "Ces", "S'est"] },
  { prompt: "Il ___ perdu dans le bois.", answer: "s'est", distractors: ["c'est", "ces", "ses"] },
  { prompt: "Prends ___ chaussures-là.", answer: "ces", distractors: ["ses", "c'est", "s'est"] },
  { prompt: "Paul met ___ gants.", answer: "ses", distractors: ["ces", "c'est", "s'est"] },
  { prompt: "___ l'heure de partir.", answer: "C'est", distractors: ["Ses", "Ces", "S'est"] },
  { prompt: "Elle ___ levée tôt.", answer: "s'est", distractors: ["c'est", "ces", "ses"] },
  { prompt: "J'aime ___ fleurs jaunes.", answer: "ces", distractors: ["ses", "c'est", "s'est"] },
  { prompt: "Nino cherche ___ affaires.", answer: "ses", distractors: ["ces", "c'est", "s'est"] },
  { prompt: "___ mon meilleur ami.", answer: "C'est", distractors: ["Ses", "Ces", "S'est"] },
  { prompt: "Le chat ___ caché.", answer: "s'est", distractors: ["c'est", "ces", "ses"] },
  { prompt: "Donne-moi ___ livres.", answer: "ces", distractors: ["ses", "c'est", "s'est"] },
  { prompt: "Marie lave ___ mains.", answer: "ses", distractors: ["ces", "c'est", "s'est"] },
  { prompt: "___ trop facile.", answer: "C'est", distractors: ["Ses", "Ces", "S'est"] },
  { prompt: "Tom ___ trompé de chemin.", answer: "s'est", distractors: ["c'est", "ces", "ses"] },
];
