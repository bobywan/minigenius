import type { Difficulty, EnglishModule, QuizQuestion } from "@/lib/types";

const SERIES_LENGTH = 10;
const CHOICES_COUNT = 4;

export type VocabPair = readonly [en: string, fr: string];

// Niveaux par fréquence d'usage : facile = mots du quotidien, expert = mots rares.
const FACILE: VocabPair[] = [
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
  ["book", "livre"],
  ["pen", "stylo"],
  ["pencil", "crayon"],
  ["paper", "papier"],
  ["school", "école"],
  ["teacher", "professeur"],
  ["bag", "sac"],
  ["classroom", "salle de classe"],
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
  ["fire", "feu"],
  ["car", "voiture"],
  ["bike", "vélo"],
  ["train", "train"],
  ["boat", "bateau"],
  ["plane", "avion"],
  ["road", "route"],
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
  ["big", "grand"],
  ["small", "petit"],
  ["hot", "chaud"],
  ["cold", "froid"],
  ["happy", "heureux"],
  ["sad", "triste"],
  ["good", "bon"],
  ["fast", "rapide"],
  ["slow", "lent"],
];

const MOYEN: VocabPair[] = [
  ["morning", "matin"],
  ["evening", "soir"],
  ["night", "nuit"],
  ["day", "jour"],
  ["week", "semaine"],
  ["month", "mois"],
  ["year", "année"],
  ["today", "aujourd'hui"],
  ["tomorrow", "demain"],
  ["yesterday", "hier"],
  ["clock", "horloge"],
  ["watch", "montre"],
  ["spring", "printemps"],
  ["summer", "été"],
  ["autumn", "automne"],
  ["winter", "hiver"],
  ["weather", "météo"],
  ["cloud", "nuage"],
  ["storm", "orage"],
  ["ice", "glace"],
  ["city", "ville"],
  ["village", "village"],
  ["street", "rue"],
  ["shop", "magasin"],
  ["market", "marché"],
  ["bank", "banque"],
  ["church", "église"],
  ["castle", "château"],
  ["bridge", "pont"],
  ["farm", "ferme"],
  ["forest", "forêt"],
  ["mountain", "montagne"],
  ["river", "rivière"],
  ["lake", "lac"],
  ["beach", "plage"],
  ["island", "île"],
  ["field", "champ"],
  ["hill", "colline"],
  ["doctor", "médecin"],
  ["nurse", "infirmier"],
  ["baker", "boulanger"],
  ["farmer", "fermier"],
  ["driver", "conducteur"],
  ["singer", "chanteur"],
  ["painter", "peintre"],
  ["writer", "écrivain"],
  ["soldier", "soldat"],
  ["king", "roi"],
  ["queen", "reine"],
  ["shirt", "chemise"],
  ["trousers", "pantalon"],
  ["shoes", "chaussures"],
  ["hat", "chapeau"],
  ["coat", "manteau"],
  ["dress", "robe"],
  ["sock", "chaussette"],
  ["glove", "gant"],
  ["scarf", "écharpe"],
  ["bathroom", "salle de bain"],
  ["mirror", "miroir"],
  ["towel", "serviette"],
  ["spoon", "cuillère"],
  ["fork", "fourchette"],
  ["knife", "couteau"],
  ["plate", "assiette"],
  ["glass", "verre"],
  ["bottle", "bouteille"],
  ["basket", "panier"],
  ["candle", "bougie"],
  ["blanket", "couverture"],
  ["pillow", "oreiller"],
  ["carpet", "tapis"],
  ["to buy", "acheter"],
  ["to sell", "vendre"],
  ["to give", "donner"],
  ["to take", "prendre"],
  ["to find", "trouver"],
  ["to lose", "perdre"],
  ["to open", "ouvrir"],
  ["to close", "fermer"],
  ["to build", "construire"],
  ["to break", "casser"],
  ["to learn", "apprendre"],
  ["to teach", "enseigner"],
  ["to help", "aider"],
  ["to wait", "attendre"],
  ["to answer", "répondre"],
  ["to ask", "demander"],
  ["to choose", "choisir"],
  ["to bring", "apporter"],
  ["to carry", "porter"],
  ["to jump", "sauter"],
  ["to swim", "nager"],
  ["to fly", "voler"],
  ["to climb", "grimper"],
  ["to laugh", "rire"],
  ["to cry", "pleurer"],
  ["to smile", "sourire"],
  ["to dream", "rêver"],
  ["strong", "fort"],
  ["weak", "faible"],
  ["heavy", "lourd"],
  ["light", "léger"],
  ["clean", "propre"],
  ["dirty", "sale"],
  ["empty", "vide"],
  ["full", "plein"],
  ["easy", "facile"],
  ["difficult", "difficile"],
  ["early", "tôt"],
  ["late", "tard"],
  ["near", "proche"],
  ["far", "loin"],
  ["quiet", "calme"],
  ["loud", "bruyant"],
  ["rich", "riche"],
  ["poor", "pauvre"],
  ["young", "jeune"],
  ["old", "vieux"],
  ["beautiful", "beau"],
];

const EXPERT: VocabPair[] = [
  ["achievement", "réussite"],
  ["to acknowledge", "reconnaître"],
  ["advice", "conseil"],
  ["ancestor", "ancêtre"],
  ["anxiety", "anxiété"],
  ["awkward", "maladroit"],
  ["behaviour", "comportement"],
  ["belief", "croyance"],
  ["blade", "lame"],
  ["to borrow", "emprunter"],
  ["brave", "courageux"],
  ["to breathe", "respirer"],
  ["burden", "fardeau"],
  ["cautious", "prudent"],
  ["challenge", "défi"],
  ["clue", "indice"],
  ["crowd", "foule"],
  ["cunning", "rusé"],
  ["curious", "curieux"],
  ["to dare", "oser"],
  ["to deny", "nier"],
  ["to devote", "consacrer"],
  ["dizzy", "étourdi"],
  ["doubt", "doute"],
  ["drought", "sécheresse"],
  ["dull", "terne"],
  ["dusk", "crépuscule"],
  ["eager", "impatient"],
  ["to earn", "gagner"],
  ["elsewhere", "ailleurs"],
  ["to endure", "endurer"],
  ["envy", "jalousie"],
  ["to fade", "s'estomper"],
  ["to faint", "s'évanouir"],
  ["fate", "destin"],
  ["fault", "faute"],
  ["fierce", "féroce"],
  ["flaw", "défaut"],
  ["fog", "brouillard"],
  ["to forbid", "interdire"],
  ["to gather", "rassembler"],
  ["gaze", "regard"],
  ["gloomy", "sombre"],
  ["grateful", "reconnaissant"],
  ["greed", "avidité"],
  ["grief", "chagrin"],
  ["to harm", "nuire"],
  ["harvest", "récolte"],
  ["hazard", "danger"],
  ["hedge", "haie"],
  ["humble", "modeste"],
  ["to hurry", "se dépêcher"],
  ["to improve", "améliorer"],
  ["issue", "problème"],
  ["jealous", "jaloux"],
  ["journey", "voyage"],
  ["to kneel", "s'agenouiller"],
  ["lack", "manque"],
  ["leak", "fuite"],
  ["lonely", "solitaire"],
  ["mankind", "humanité"],
  ["meadow", "prairie"],
  ["mercy", "pitié"],
  ["mischief", "espièglerie"],
  ["mood", "humeur"],
  ["nap", "sieste"],
  ["neat", "soigné"],
  ["oath", "serment"],
  ["to oppose", "s'opposer"],
  ["outcome", "résultat"],
  ["to owe", "devoir"],
  ["pledge", "promesse"],
  ["plenty", "abondance"],
  ["praise", "éloge"],
  ["pride", "fierté"],
  ["puzzle", "énigme"],
  ["quarrel", "dispute"],
  ["reckless", "imprudent"],
  ["to relieve", "soulager"],
  ["reluctant", "réticent"],
  ["remote", "éloigné"],
  ["reward", "récompense"],
  ["riddle", "devinette"],
  ["rough", "rugueux"],
  ["scarce", "rare"],
  ["seldom", "rarement"],
  ["shallow", "peu profond"],
  ["shy", "timide"],
  ["sigh", "soupir"],
  ["skill", "compétence"],
  ["to spare", "épargner"],
  ["to spill", "renverser"],
  ["steady", "stable"],
  ["stubborn", "têtu"],
  ["to swear", "jurer"],
  ["thorough", "minutieux"],
  ["threat", "menace"],
  ["to thrive", "prospérer"],
  ["to tidy", "ranger"],
  ["wealth", "richesse"],
];

export const VOCABULARY: Record<Difficulty, VocabPair[]> = {
  facile: FACILE,
  moyen: MOYEN,
  expert: EXPERT,
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

export function generateQuizSeries(mode: EnglishModule, difficulty: Difficulty): QuizQuestion[] {
  const pool = VOCABULARY[difficulty];
  const enToFr = mode === "en-fr";
  const promptOf = (pair: VocabPair) => (enToFr ? pair[0] : pair[1]);
  const answerOf = (pair: VocabPair) => (enToFr ? pair[1] : pair[0]);

  const picked: VocabPair[] = [];
  const seenPrompts = new Set<string>();
  let attempts = 0;
  const maxAttempts = 10;

  // Continue à shuffler jusqu'à avoir SERIES_LENGTH paires uniques
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

  // Vérification de sécurité : on doit avoir exactement SERIES_LENGTH questions
  if (picked.length < SERIES_LENGTH) {
    throw new Error(
      `Impossible de générer ${SERIES_LENGTH} questions uniques pour ${mode}/${difficulty}. Seulement ${picked.length} trouvées.`,
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
    return { prompt: promptOf(pair), choices: shuffled, answerIndex: shuffled.indexOf(answer) };
  });
}

export function generateMixedQuizSeries(difficulty: Difficulty): QuizQuestion[] {
  const pool = VOCABULARY[difficulty];
  const picked: VocabPair[] = [];
  let attempts = 0;
  const maxAttempts = 10;

  // Tirer SERIES_LENGTH paires uniques
  while (picked.length < SERIES_LENGTH && attempts < maxAttempts) {
    for (const pair of shuffle(pool)) {
      if (picked.length === SERIES_LENGTH) break;
      // Pour le mode mixte, on ne vérifie pas les doublons de prompts car le sens change
      picked.push(pair);
    }
    attempts++;
  }

  if (picked.length < SERIES_LENGTH) {
    throw new Error(
      `Impossible de générer ${SERIES_LENGTH} questions uniques pour mixte/${difficulty}. Seulement ${picked.length} trouvées.`,
    );
  }

  return picked.map((pair) => {
    // Tirer aléatoirement le sens pour chaque question
    const enToFr = Math.random() < 0.5;
    const prompt = enToFr ? pair[0] : pair[1];
    const answer = enToFr ? pair[1] : pair[0];

    // Générer les distracteurs dans la langue cible
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
    return { prompt, choices: shuffled, answerIndex: shuffled.indexOf(answer) };
  });
}

export function generateOneQuiz(mode: EnglishModule, difficulty: Difficulty): QuizQuestion {
  const pool = VOCABULARY[difficulty];
  const enToFr = mode === "en-fr";
  const pair = shuffle(pool)[0];

  if (!pair) {
    throw new Error(`Pool vide pour ${mode}/${difficulty}`);
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
  return { prompt, choices: shuffled, answerIndex: shuffled.indexOf(answer) };
}
