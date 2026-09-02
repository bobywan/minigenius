import type { EnglishModule, EnglishTheme, MixedModule, QuizQuestion } from "@/lib/types";

const SERIES_LENGTH = 10;
const CHOICES_COUNT = 4;

export type VocabPair = readonly [en: string, fr: string];

const ANIMAUX: VocabPair[] = [
  ["dog", "chien"],
  ["cat", "chat"],
  ["horse", "cheval"],
  ["bird", "oiseau"],
  ["fish", "poisson"],
  ["cow", "vache"],
  ["pig", "cochon"],
  ["sheep", "mouton"],
  ["rabbit", "lapin"],
  ["mouse", "souris"],
  ["duck", "canard"],
  ["chicken", "poulet"],
  ["bear", "ours"],
  ["wolf", "loup"],
  ["monkey", "singe"],
  ["elephant", "éléphant"],
  ["ant", "fourmi"],
  ["bee", "abeille"],
  ["lion", "lion"],
  ["tiger", "tigre"],
  ["giraffe", "girafe"],
  ["zebra", "zèbre"],
  ["fox", "renard"],
  ["frog", "grenouille"],
  ["snake", "serpent"],
  ["turtle", "tortue"],
  ["whale", "baleine"],
  ["dolphin", "dauphin"],
  ["penguin", "pingouin"],
  ["butterfly", "papillon"],
  ["spider", "araignée"],
  ["goat", "chèvre"],
  ["owl", "hibou"],
  ["crocodile", "crocodile"],
];

const CORPS: VocabPair[] = [
  ["head", "tête"],
  ["hand", "main"],
  ["foot", "pied"],
  ["eye", "œil"],
  ["nose", "nez"],
  ["mouth", "bouche"],
  ["ear", "oreille"],
  ["hair", "cheveux"],
  ["arm", "bras"],
  ["leg", "jambe"],
  ["tooth", "dent"],
  ["finger", "doigt"],
  ["knee", "genou"],
  ["back", "dos"],
  ["neck", "cou"],
  ["stomach", "ventre"],
  ["shoulder", "épaule"],
  ["face", "visage"],
  ["cheek", "joue"],
  ["chin", "menton"],
  ["lip", "lèvre"],
  ["tongue", "langue"],
  ["thumb", "pouce"],
  ["toe", "orteil"],
  ["elbow", "coude"],
  ["wrist", "poignet"],
  ["ankle", "cheville"],
  ["hip", "hanche"],
  ["chest", "poitrine"],
  ["heart", "cœur"],
  ["skin", "peau"],
  ["bone", "os"],
];

const COULEURS: VocabPair[] = [
  ["red", "rouge"],
  ["blue", "bleu"],
  ["green", "vert"],
  ["yellow", "jaune"],
  ["black", "noir"],
  ["white", "blanc"],
  ["orange", "orange"],
  ["pink", "rose"],
  ["brown", "marron"],
  ["purple", "violet"],
  ["grey", "gris"],
  ["gold", "or"],
  ["silver", "argent"],
  ["beige", "beige"],
  ["navy", "bleu marine"],
  ["turquoise", "turquoise"],
  ["cream", "crème"],
  ["indigo", "indigo"],
  ["olive", "olive"],
  ["coral", "corail"],
  ["maroon", "bordeaux"],
  ["khaki", "kaki"],
];

const FAMILLE: VocabPair[] = [
  ["father", "père"],
  ["mother", "mère"],
  ["brother", "frère"],
  ["sister", "sœur"],
  ["baby", "bébé"],
  ["family", "famille"],
  ["friend", "ami"],
  ["boy", "garçon"],
  ["girl", "fille"],
  ["man", "homme"],
  ["woman", "femme"],
  ["child", "enfant"],
  ["uncle", "oncle"],
  ["aunt", "tante"],
  ["grandfather", "grand-père"],
  ["grandmother", "grand-mère"],
  ["cousin", "cousin"],
  ["parents", "parents"],
  ["dad", "papa"],
  ["mum", "maman"],
  ["son", "fils"],
  ["husband", "mari"],
  ["wife", "épouse"],
  ["nephew", "neveu"],
  ["niece", "nièce"],
  ["twins", "jumeaux"],
  ["neighbour", "voisin"],
  ["grandson", "petit-fils"],
];

const NOURRITURE: VocabPair[] = [
  ["bread", "pain"],
  ["water", "eau"],
  ["milk", "lait"],
  ["apple", "pomme"],
  ["cake", "gâteau"],
  ["cheese", "fromage"],
  ["egg", "œuf"],
  ["meat", "viande"],
  ["rice", "riz"],
  ["soup", "soupe"],
  ["sugar", "sucre"],
  ["salt", "sel"],
  ["banana", "banane"],
  ["strawberry", "fraise"],
  ["juice", "jus"],
  ["carrot", "carotte"],
  ["potato", "pomme de terre"],
  ["chocolate", "chocolat"],
  ["tomato", "tomate"],
  ["onion", "oignon"],
  ["lemon", "citron"],
  ["pear", "poire"],
  ["grape", "raisin"],
  ["pizza", "pizza"],
  ["pasta", "pâtes"],
  ["sandwich", "sandwich"],
  ["yoghurt", "yaourt"],
  ["butter", "beurre"],
  ["honey", "miel"],
  ["cherry", "cerise"],
  ["watermelon", "pastèque"],
  ["cucumber", "concombre"],
  ["mushroom", "champignon"],
  ["jam", "confiture"],
  ["ice cream", "crème glacée"],
];

const CUISINE: VocabPair[] = [
  ["breakfast", "petit-déjeuner"],
  ["lunch", "déjeuner"],
  ["dinner", "dîner"],
  ["snack", "goûter"],
  ["meal", "repas"],
  ["oven", "four"],
  ["fridge", "frigo"],
  ["freezer", "congélateur"],
  ["stove", "cuisinière"],
  ["microwave", "micro-ondes"],
  ["pan", "poêle"],
  ["pot", "casserole"],
  ["bowl", "bol"],
  ["cup", "tasse"],
  ["flour", "farine"],
  ["oil", "huile"],
  ["recipe", "recette"],
  ["chef", "cuisinier"],
  ["to cook", "cuisiner"],
  ["to cut", "couper"],
  ["to mix", "mélanger"],
  ["to pour", "verser"],
  ["to fry", "faire frire"],
  ["to bake", "cuire"],
  ["apron", "tablier"],
  ["kettle", "bouilloire"],
  ["toaster", "grille-pain"],
  ["dishwasher", "lave-vaisselle"],
];

const MAISON: VocabPair[] = [
  ["house", "maison"],
  ["door", "porte"],
  ["window", "fenêtre"],
  ["table", "table"],
  ["chair", "chaise"],
  ["bed", "lit"],
  ["bedroom", "chambre"],
  ["kitchen", "cuisine"],
  ["garden", "jardin"],
  ["key", "clé"],
  ["bathroom", "salle de bain"],
  ["mirror", "miroir"],
  ["towel", "serviette"],
  ["spoon", "cuillère"],
  ["fork", "fourchette"],
  ["knife", "couteau"],
  ["plate", "assiette"],
  ["glass", "verre"],
  ["bottle", "bouteille"],
  ["blanket", "couverture"],
  ["pillow", "oreiller"],
  ["living room", "salon"],
  ["roof", "toit"],
  ["wall", "mur"],
  ["stairs", "escalier"],
  ["lamp", "lampe"],
  ["sofa", "canapé"],
  ["cupboard", "placard"],
  ["carpet", "tapis"],
  ["garage", "garage"],
  ["floor", "sol"],
  ["clock", "horloge"],
  ["shelf", "étagère"],
];

const NATURE: VocabPair[] = [
  ["sun", "soleil"],
  ["moon", "lune"],
  ["star", "étoile"],
  ["sky", "ciel"],
  ["rain", "pluie"],
  ["snow", "neige"],
  ["wind", "vent"],
  ["tree", "arbre"],
  ["flower", "fleur"],
  ["sea", "mer"],
  ["cloud", "nuage"],
  ["storm", "orage"],
  ["ice", "glace"],
  ["forest", "forêt"],
  ["mountain", "montagne"],
  ["river", "rivière"],
  ["lake", "lac"],
  ["beach", "plage"],
  ["grass", "herbe"],
  ["leaf", "feuille"],
  ["stone", "pierre"],
  ["sand", "sable"],
  ["island", "île"],
  ["rainbow", "arc-en-ciel"],
  ["wave", "vague"],
  ["field", "champ"],
  ["ocean", "océan"],
  ["fog", "brouillard"],
  ["desert", "désert"],
  ["hill", "colline"],
  ["plant", "plante"],
  ["path", "chemin"],
];

const ECOLE: VocabPair[] = [
  ["school", "école"],
  ["teacher", "maître"],
  ["classroom", "classe"],
  ["pencil", "crayon"],
  ["pen", "stylo"],
  ["eraser", "gomme"],
  ["ruler", "règle"],
  ["schoolbag", "cartable"],
  ["book", "livre"],
  ["notebook", "cahier"],
  ["paper", "papier"],
  ["glue", "colle"],
  ["scissors", "ciseaux"],
  ["break", "récréation"],
  ["homework", "devoirs"],
  ["lesson", "leçon"],
  ["pupil", "élève"],
  ["desk", "bureau"],
  ["blackboard", "tableau"],
  ["computer", "ordinateur"],
  ["map", "carte"],
  ["bell", "sonnerie"],
  ["chalk", "craie"],
  ["letter", "lettre"],
  ["number", "nombre"],
  ["playground", "cour"],
  ["sharpener", "taille-crayon"],
  ["dictionary", "dictionnaire"],
];

const VETEMENTS: VocabPair[] = [
  ["shirt", "chemise"],
  ["t-shirt", "t-shirt"],
  ["trousers", "pantalon"],
  ["jeans", "jean"],
  ["dress", "robe"],
  ["skirt", "jupe"],
  ["shorts", "short"],
  ["coat", "manteau"],
  ["jacket", "veste"],
  ["hat", "chapeau"],
  ["cap", "casquette"],
  ["shoes", "chaussures"],
  ["socks", "chaussettes"],
  ["boots", "bottes"],
  ["gloves", "gants"],
  ["scarf", "écharpe"],
  ["jumper", "pull"],
  ["pyjamas", "pyjama"],
  ["glasses", "lunettes"],
  ["belt", "ceinture"],
  ["button", "bouton"],
  ["pocket", "poche"],
  ["umbrella", "parapluie"],
  ["trainers", "baskets"],
  ["tie", "cravate"],
  ["hoodie", "sweat"],
  ["slippers", "chaussons"],
  ["swimsuit", "maillot de bain"],
];

const TRANSPORTS: VocabPair[] = [
  ["car", "voiture"],
  ["bus", "bus"],
  ["train", "train"],
  ["plane", "avion"],
  ["bike", "vélo"],
  ["boat", "bateau"],
  ["taxi", "taxi"],
  ["metro", "métro"],
  ["tram", "tramway"],
  ["scooter", "trottinette"],
  ["truck", "camion"],
  ["motorbike", "moto"],
  ["helicopter", "hélicoptère"],
  ["road", "route"],
  ["street", "rue"],
  ["station", "gare"],
  ["airport", "aéroport"],
  ["bridge", "pont"],
  ["ticket", "billet"],
  ["driver", "chauffeur"],
  ["helmet", "casque"],
  ["wheel", "roue"],
  ["to drive", "conduire"],
  ["to travel", "voyager"],
  ["ship", "navire"],
  ["van", "fourgon"],
  ["ferry", "ferry"],
  ["traffic light", "feu tricolore"],
];

const SPORTS: VocabPair[] = [
  ["football", "football"],
  ["tennis", "tennis"],
  ["basketball", "basket-ball"],
  ["rugby", "rugby"],
  ["volleyball", "volley"],
  ["ball", "ballon"],
  ["goal", "but"],
  ["team", "équipe"],
  ["player", "joueur"],
  ["match", "match"],
  ["race", "course"],
  ["winner", "gagnant"],
  ["medal", "médaille"],
  ["trophy", "trophée"],
  ["coach", "entraîneur"],
  ["stadium", "stade"],
  ["skateboard", "skateboard"],
  ["ski", "ski"],
  ["to throw", "lancer"],
  ["to catch", "attraper"],
  ["to score", "marquer"],
  ["to kick", "botter"],
  ["racket", "raquette"],
  ["net", "filet"],
  ["whistle", "sifflet"],
  ["swimming", "natation"],
  ["running", "course à pied"],
  ["gymnastics", "gymnastique"],
];

const EMOTIONS: VocabPair[] = [
  ["happy", "content"],
  ["sad", "triste"],
  ["angry", "en colère"],
  ["scared", "effrayé"],
  ["tired", "fatigué"],
  ["surprised", "surpris"],
  ["proud", "fier"],
  ["shy", "timide"],
  ["bored", "ennuyé"],
  ["excited", "enthousiaste"],
  ["calm", "calme"],
  ["kind", "gentil"],
  ["funny", "drôle"],
  ["brave", "courageux"],
  ["worried", "inquiet"],
  ["lonely", "seul"],
  ["joy", "joie"],
  ["fear", "peur"],
  ["hungry", "avoir faim"],
  ["thirsty", "avoir soif"],
  ["sick", "malade"],
  ["hot", "chaud"],
  ["cold", "froid"],
  ["love", "amour"],
  ["jealous", "jaloux"],
  ["sorry", "désolé"],
];

const ACTIONS: VocabPair[] = [
  ["to eat", "manger"],
  ["to drink", "boire"],
  ["to sleep", "dormir"],
  ["to run", "courir"],
  ["to walk", "marcher"],
  ["to play", "jouer"],
  ["to sing", "chanter"],
  ["to read", "lire"],
  ["to write", "écrire"],
  ["to see", "voir"],
  ["to speak", "parler"],
  ["to buy", "acheter"],
  ["to give", "donner"],
  ["to take", "prendre"],
  ["to find", "trouver"],
  ["to open", "ouvrir"],
  ["to close", "fermer"],
  ["to jump", "sauter"],
  ["to swim", "nager"],
  ["to fly", "voler"],
  ["to laugh", "rire"],
  ["to smile", "sourire"],
  ["to listen", "écouter"],
  ["to help", "aider"],
  ["to wait", "attendre"],
  ["to look", "regarder"],
  ["to draw", "dessiner"],
  ["to come", "venir"],
  ["to go", "aller"],
  ["to dance", "danser"],
  ["to cry", "pleurer"],
  ["to sit", "s'asseoir"],
  ["to stand", "se lever"],
  ["to wash", "laver"],
];

const BY_THEME: Omit<Record<EnglishTheme, VocabPair[]>, "tout"> = {
  animaux: ANIMAUX,
  corps: CORPS,
  couleurs: COULEURS,
  famille: FAMILLE,
  nourriture: NOURRITURE,
  cuisine: CUISINE,
  maison: MAISON,
  nature: NATURE,
  ecole: ECOLE,
  vetements: VETEMENTS,
  transports: TRANSPORTS,
  sports: SPORTS,
  emotions: EMOTIONS,
  actions: ACTIONS,
};

function mergeUnique(groups: VocabPair[][]): VocabPair[] {
  const out: VocabPair[] = [];
  const en = new Set<string>();
  const fr = new Set<string>();
  for (const group of groups) {
    for (const pair of group) {
      if (en.has(pair[0]) || fr.has(pair[1])) {
        throw new Error(`Doublon vocabulaire : ${pair[0]} / ${pair[1]}`);
      }
      en.add(pair[0]);
      fr.add(pair[1]);
      out.push(pair);
    }
  }
  return out;
}

export const VOCABULARY: Record<EnglishTheme, VocabPair[]> = {
  ...BY_THEME,
  tout: mergeUnique(Object.values(BY_THEME)),
};

function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = out[i] as T;
    out[i] = out[j] as T;
    out[j] = tmp;
  }
  return out;
}

export function generateQuizSeries(mode: EnglishModule, theme: EnglishTheme): QuizQuestion[] {
  const pool = VOCABULARY[theme];
  const enToFr = mode === "en-fr";
  const promptOf = (pair: VocabPair) => (enToFr ? pair[0] : pair[1]);
  const answerOf = (pair: VocabPair) => (enToFr ? pair[1] : pair[0]);

  const picked: VocabPair[] = [];
  const seenPrompts = new Set<string>();
  let attempts = 0;
  const maxAttempts = 10;

  while (picked.length < SERIES_LENGTH && attempts < maxAttempts) {
    for (const pair of shuffle(pool)) {
      if (picked.length === SERIES_LENGTH) break;
      const prompt = promptOf(pair);
      if (seenPrompts.has(prompt)) continue;
      seenPrompts.add(prompt);
      picked.push(pair);
    }
    attempts++;
  }

  if (picked.length < SERIES_LENGTH) {
    throw new Error(
      `Impossible de générer ${SERIES_LENGTH} questions uniques pour ${mode}/${theme}. Seulement ${picked.length} trouvées.`,
    );
  }

  return picked.map((pair) => {
    const answer = answerOf(pair);
    const seen = new Set([answer]);
    const choices = [answer];
    for (const candidate of shuffle(pool)) {
      if (choices.length === CHOICES_COUNT) break;
      const value = answerOf(candidate);
      if (seen.has(value)) continue;
      seen.add(value);
      choices.push(value);
    }
    const shuffled = shuffle(choices);
    return {
      prompt: promptOf(pair),
      choices: shuffled,
      answerIndex: shuffled.indexOf(answer),
      enToFr,
    };
  });
}

export function generateMixedQuizSeries(theme: EnglishTheme): QuizQuestion[] {
  const pool = VOCABULARY[theme];
  const picked: VocabPair[] = [];
  let attempts = 0;
  const maxAttempts = 10;

  while (picked.length < SERIES_LENGTH && attempts < maxAttempts) {
    for (const pair of shuffle(pool)) {
      if (picked.length === SERIES_LENGTH) break;
      picked.push(pair);
    }
    attempts++;
  }

  if (picked.length < SERIES_LENGTH) {
    throw new Error(
      `Impossible de générer ${SERIES_LENGTH} questions uniques pour mixte/${theme}. Seulement ${picked.length} trouvées.`,
    );
  }

  return picked.map((pair) => {
    const enToFr = Math.random() < 0.5;
    const prompt = enToFr ? pair[0] : pair[1];
    const answer = enToFr ? pair[1] : pair[0];

    const seen = new Set([answer]);
    const choices = [answer];
    for (const candidate of shuffle(pool)) {
      if (choices.length === CHOICES_COUNT) break;
      const value = enToFr ? candidate[1] : candidate[0];
      if (seen.has(value)) continue;
      seen.add(value);
      choices.push(value);
    }
    const shuffled = shuffle(choices);
    return { prompt, choices: shuffled, answerIndex: shuffled.indexOf(answer), enToFr };
  });
}

export function generateOneQuiz(
  mode: EnglishModule | MixedModule,
  theme: EnglishTheme,
): QuizQuestion {
  const pool = VOCABULARY[theme];
  const enToFr = mode === "mixte" ? Math.random() < 0.5 : mode === "en-fr";
  const pair = shuffle(pool)[0];

  if (!pair) {
    throw new Error(`Pool vide pour ${mode}/${theme}`);
  }

  const prompt = enToFr ? pair[0] : pair[1];
  const answer = enToFr ? pair[1] : pair[0];

  const seen = new Set([answer]);
  const choices = [answer];
  for (const candidate of shuffle(pool)) {
    if (choices.length === CHOICES_COUNT) break;
    const value = enToFr ? candidate[1] : candidate[0];
    if (seen.has(value)) continue;
    seen.add(value);
    choices.push(value);
  }

  const shuffled = shuffle(choices);
  return { prompt, choices: shuffled, answerIndex: shuffled.indexOf(answer), enToFr };
}
