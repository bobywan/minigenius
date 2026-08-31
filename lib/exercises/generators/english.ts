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
];

const BY_THEME: Omit<Record<EnglishTheme, VocabPair[]>, "tout"> = {
  animaux: ANIMAUX,
  corps: CORPS,
  couleurs: COULEURS,
  famille: FAMILLE,
  nourriture: NOURRITURE,
  maison: MAISON,
  nature: NATURE,
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
