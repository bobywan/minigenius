"use client";

import { useAnimate } from "framer-motion";
import { useEffect } from "react";

type InputState = "idle" | "correct" | "wrong";

interface AnswerInputProps {
  value: string;
  state: InputState;
  placeholder?: string;
}

const stateMap: Record<InputState, string> = {
  idle: "border-sky-300 text-sky-800 bg-sky-50",
  correct: "border-emerald-500 text-emerald-700 bg-emerald-100",
  wrong: "border-red-500 text-red-700 bg-red-100",
};

export function AnswerInput({ value, state, placeholder = "?" }: AnswerInputProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (state === "wrong") {
      animate(scope.current, { x: [0, -10, 10, -8, 8, -4, 4, 0] }, { duration: 0.45 });
    }
  }, [state, animate, scope]);

  return (
    <div
      ref={scope}
      role="status"
      aria-live="polite"
      aria-label={`Réponse saisie : ${value || placeholder}`}
      className={[
        "min-w-[140px] min-h-[80px] px-6",
        "flex items-center justify-center",
        "rounded-[var(--radius-card)] border-4",
        "text-5xl font-display tracking-wider",
        "transition-colors duration-200",
        stateMap[state],
      ].join(" ")}
    >
      {value || <span className="opacity-40">{placeholder}</span>}
    </div>
  );
}
