"use client";

import { motion } from "framer-motion";

type DotState = "idle" | "correct" | "wrong";

interface ProgressDotsProps {
  total?: number;
  states: DotState[];
  current: number;
}

const dotColors: Record<DotState, string> = {
  idle: "bg-neutral-700 border-neutral-600",
  correct: "bg-green-500 border-green-400 shadow-[0_0_8px_var(--color-green-500)]",
  wrong: "bg-red-500 border-red-400 shadow-[0_0_8px_var(--color-red-500)]",
};

export function ProgressDots({ total = 10, states, current }: ProgressDotsProps) {
  return (
    <div
      className="flex gap-2 items-center justify-center flex-wrap"
      role="progressbar"
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
              "rounded-full border-2 transition-colors duration-300",
              dotColors[state],
              isActive ? "w-5 h-5" : "w-4 h-4",
            ].join(" ")}
            animate={isActive ? { scale: [1, 1.3, 1.15] } : {}}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </div>
  );
}
