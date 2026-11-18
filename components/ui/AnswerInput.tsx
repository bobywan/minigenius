"use client";

import { useAnimate } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect } from "react";

type InputState = "idle" | "correct" | "wrong";

interface AnswerInputProps {
  value: string;
  state: InputState;
  placeholder?: string;
}

const stateMap: Record<InputState, string> = {
  idle: "border-line-strong text-ink bg-surface",
  correct: "border-success text-success-ink bg-success-soft",
  wrong: "border-danger text-danger-ink bg-danger-soft",
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
      className={[
        "min-w-[140px] min-h-[80px] px-6",
        "flex items-center justify-center",
        "gap-3 rounded-[var(--radius-card)] border-2 shadow-card",
        "text-5xl font-display tracking-wider",
        "transition-colors duration-200",
        stateMap[state],
      ].join(" ")}
    >
      <span className="sr-only">Réponse saisie : </span>
      {value || (
        <span className="opacity-40" aria-hidden="true">
          {placeholder}
        </span>
      )}
      {state === "correct" && <Check size={32} aria-hidden="true" />}
      {state === "wrong" && <X size={32} aria-hidden="true" />}
    </div>
  );
}
