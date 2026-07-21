"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Difficulty,
  MathModule,
  ProgressState,
  SeriesResult,
  Stars,
  Subject,
} from "@/lib/types";
import { DIFFICULTIES, MATH_MODULES } from "@/lib/types";

interface ProgressStore {
  progress: ProgressState;
  saveResult: (
    subject: Subject,
    module: MathModule,
    difficulty: Difficulty,
    result: SeriesResult,
  ) => void;
  getStars: (subject: Subject, module: MathModule, difficulty: Difficulty) => Stars;
  isModuleLocked: (subject: Subject, module: MathModule) => boolean;
  isDifficultyLocked: (subject: Subject, module: MathModule, difficulty: Difficulty) => boolean;
  getTotalStars: (subject: Subject, module: MathModule) => number;
  reset: () => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: {},

      saveResult(subject, module, difficulty, result) {
        set((state) => {
          const prev = state.progress;
          return {
            progress: {
              ...prev,
              [subject]: {
                ...prev[subject],
                [module]: {
                  ...prev[subject]?.[module],
                  [difficulty]: result,
                },
              },
            },
          };
        });
      },

      getStars(subject, module, difficulty) {
        return get().progress[subject]?.[module]?.[difficulty]?.stars ?? 0;
      },

      isModuleLocked(subject, module) {
        const idx = MATH_MODULES.indexOf(module);
        if (idx === 0) return false; // premier module toujours débloqué
        const prev = MATH_MODULES[idx - 1];
        if (!prev) return true;
        // débloqué si le module précédent a au moins 1★ à n'importe quelle difficulté
        return !DIFFICULTIES.some((d) => (get().progress[subject]?.[prev]?.[d]?.stars ?? 0) >= 1);
      },

      isDifficultyLocked(subject, module, difficulty) {
        const idx = DIFFICULTIES.indexOf(difficulty);
        if (idx === 0) return false; // facile toujours débloqué
        const prev = DIFFICULTIES[idx - 1];
        if (!prev) return true;
        return (get().progress[subject]?.[module]?.[prev]?.stars ?? 0) < 1;
      },

      getTotalStars(subject, module) {
        return DIFFICULTIES.reduce(
          (sum, d) => sum + (get().progress[subject]?.[module]?.[d]?.stars ?? 0),
          0,
        );
      },

      reset() {
        set({ progress: {} });
      },
    }),
    {
      name: "minigenius-progress",
      version: 1,
    },
  ),
);
