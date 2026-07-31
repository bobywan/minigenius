"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Difficulty,
  ModuleId,
  ProgressState,
  SeriesResult,
  Stars,
  Subject,
} from "@/lib/types";
import { DIFFICULTIES } from "@/lib/types";

interface ProgressStore {
  progress: ProgressState;
  saveResult: (
    subject: Subject,
    module: ModuleId,
    difficulty: Difficulty,
    result: SeriesResult,
  ) => void;
  getStars: (subject: Subject, module: ModuleId, difficulty: Difficulty) => Stars;
  isModuleLocked: (subject: Subject, module: ModuleId) => boolean;
  isDifficultyLocked: (subject: Subject, module: ModuleId, difficulty: Difficulty) => boolean;
  getTotalStars: (subject: Subject, module: ModuleId) => number;
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

      isModuleLocked(_subject, _module) {
        return false;
      },

      isDifficultyLocked(_subject, _module, _difficulty) {
        return false;
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
