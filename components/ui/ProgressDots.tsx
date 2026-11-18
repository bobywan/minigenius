"use client";

import { motion } from "framer-motion";

import { SERIES_LENGTH } from "@/lib/types";

type DotState = "idle" | "correct" | "wrong";

interface ProgressDotsProps {
  total?: number;
  states: DotState[];
  current: number;
}

const dotColors: Record<DotState, string> = {
  idle: "bg-line-strong",
  correct: "bg-success",
  wrong: "bg-danger",
};

export function ProgressDots({ total = SERIES_LENGTH, states, current }: ProgressDotsProps) {
  return (
    <div
      className="flex gap-2 items-center justify-center flex-wrap"
      role="progressbar"
      aria-label="Progression de la série"
      aria-valuemin={0}
      aria-valuenow={current}
      aria-valuemax={total}
    >
      {Array.from({ length: total }, (_, i) => {
        const state = states[i] ?? "idle";
        const isActive = i === current;
        return (
          <motion.div
            key={`dot-${i}`}
            className={[
              "rounded-full transition-colors duration-300",
              dotColors[state],
              isActive ? "w-5 h-5 ring-2 ring-accent ring-offset-2 ring-offset-bg" : "w-4 h-4",
            ].join(" ")}
            animate={isActive ? { scale: [1, 1.3, 1.15] } : {}}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </div>
  );
}
