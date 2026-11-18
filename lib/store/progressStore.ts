"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SubjectId } from "@/lib/subjects";
import type {
  ModuleId,
  ProgressState,
  SeriesResult,
  SeriesSlot,
  Stars,
  Subject,
} from "@/lib/types";

export type LastPlayed = { href: string; label: string; subject: SubjectId };

export function subjectStars(progress: ProgressState, subject: Subject) {
  let total = 0;
  for (const mod of Object.values(progress[subject] ?? {})) {
    for (const r of Object.values(mod ?? {})) total += r?.stars ?? 0;
  }
  return total;
}

type ProgressStore = {
  progress: ProgressState;
  lastPlayed?: LastPlayed;
  setLastPlayed: (lastPlayed: LastPlayed) => void;
  saveResult: (subject: Subject, module: ModuleId, slot: SeriesSlot, result: SeriesResult) => void;
  getStars: (subject: Subject, module: ModuleId, slot: SeriesSlot) => Stars;
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: {},

      setLastPlayed(lastPlayed) {
        set({ lastPlayed });
      },

      saveResult(subject, module, slot, result) {
        set((state) => {
          const prev = state.progress;
          return {
            progress: {
              ...prev,
              [subject]: {
                ...prev[subject],
                [module]: {
                  ...prev[subject]?.[module],
                  [slot]: result,
                },
              },
            },
          };
        });
      },

      getStars(subject, module, slot) {
        return get().progress[subject]?.[module]?.[slot]?.stars ?? 0;
      },
    }),
    {
      name: "minigenius-progress",
      version: 2,
      migrate(persisted, version) {
        const state = persisted as { progress?: ProgressState };
        const progress = { ...state.progress };
        if (version < 2) {
          delete progress.anglais;
        }
        return { progress };
      },
    },
  ),
);
