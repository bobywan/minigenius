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
  idle: "border-white/30 text-neutral-50",
  correct: "border-success-500 text-success-400 shadow-[var(--shadow-success)] bg-[#0a4020]",
  wrong: "border-error-500 text-error-400 shadow-[var(--shadow-error)] bg-[#4a1020]",
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
        "bg-bg-card",
        "shadow-[var(--shadow-card)]",
        stateMap[state],
      ].join(" ")}
    >
      {value || <span className="opacity-30">{placeholder}</span>}
    </div>
  );
}
