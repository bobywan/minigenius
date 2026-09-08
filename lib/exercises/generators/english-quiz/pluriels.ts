import type { QuizSeed } from "../french/quiz.ts";

export const PLURIELS_REGULIER: QuizSeed[] = [
  { prompt: "one cat → ___", answer: "cats", distractors: ["cates", "cat", "catses"] },
  { prompt: "one dog → ___", answer: "dogs", distractors: ["doges", "dog", "dogss"] },
  { prompt: "one book → ___", answer: "books", distractors: ["bookes", "book", "bookss"] },
  { prompt: "one apple → ___", answer: "apples", distractors: ["appless", "apple", "appleses"] },
  { prompt: "one car → ___", answer: "cars", distractors: ["cares", "car", "carss"] },
  { prompt: "one box → ___", answer: "boxes", distractors: ["boxs", "box", "boxses"] },
  { prompt: "one bus → ___", answer: "buses", distractors: ["buss", "bus", "busies"] },
  { prompt: "one baby → ___", answer: "babies", distractors: ["babys", "babyes", "baby"] },
  { prompt: "one tomato → ___", answer: "tomatoes", distractors: ["tomatos", "tomatoe", "tomato"] },
  { prompt: "one potato → ___", answer: "potatoes", distractors: ["potatos", "potatoe", "potato"] },
  { prompt: "one dress → ___", answer: "dresses", distractors: ["dresss", "dress", "dressies"] },
  { prompt: "one watch → ___", answer: "watches", distractors: ["watchs", "watch", "watchies"] },
  { prompt: "one key → ___", answer: "keys", distractors: ["keies", "keyes", "key"] },
  {
    prompt: "one flower → ___",
    answer: "flowers",
    distractors: ["floweres", "flower", "flowries"],
  },
  { prompt: "one chair → ___", answer: "chairs", distractors: ["chaires", "chair", "chairss"] },
  {
    prompt: "one pencil → ___",
    answer: "pencils",
    distractors: ["penciles", "pencil", "pencilss"],
  },
];

export const PLURIELS_IRREGULIER: QuizSeed[] = [
  {
    prompt: "one child → ___",
    answer: "children",
    distractors: ["childs", "childes", "childrens"],
  },
  { prompt: "one man → ___", answer: "men", distractors: ["mans", "mens", "manes"] },
  { prompt: "one woman → ___", answer: "women", distractors: ["womans", "womens", "womanes"] },
  { prompt: "one foot → ___", answer: "feet", distractors: ["foots", "feets", "footes"] },
  { prompt: "one tooth → ___", answer: "teeth", distractors: ["tooths", "teeths", "toothes"] },
  { prompt: "one mouse → ___", answer: "mice", distractors: ["mouses", "mices", "mouse"] },
  { prompt: "one sheep → ___", answer: "sheep", distractors: ["sheeps", "sheepes", "sheepsies"] },
  { prompt: "one fish → ___", answer: "fish", distractors: ["fishs", "fishes", "fishies"] },
  { prompt: "one person → ___", answer: "people", distractors: ["persons", "peoples", "persones"] },
  { prompt: "one goose → ___", answer: "geese", distractors: ["gooses", "geeses", "goose"] },
  { prompt: "one knife → ___", answer: "knives", distractors: ["knifes", "knifves", "knife"] },
  { prompt: "one leaf → ___", answer: "leaves", distractors: ["leafs", "leavs", "leafes"] },
  { prompt: "one wolf → ___", answer: "wolves", distractors: ["wolfs", "wolfes", "wolvs"] },
  { prompt: "one deer → ___", answer: "deer", distractors: ["deers", "deeres", "deerses"] },
  { prompt: "one ox → ___", answer: "oxen", distractors: ["oxes", "oxs", "oxens"] },
];
