"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SpeakButton } from "@/components/ui/SpeakButton";

interface ChoiceGridProps {
  choices: string[];
  answerIndex: number;
  selectedIdx: number | null;
  revealed: boolean;
  onSelect: (index: number) => void;
  enableSpeech?: boolean;
  highlightCorrect?: boolean;
}

export function ChoiceGrid({
  choices,
  answerIndex,
  selectedIdx,
  revealed,
  onSelect,
  enableSpeech = false,
  highlightCorrect = true,
}: ChoiceGridProps) {
  return (
    <fieldset className="flex flex-col gap-3 w-full border-0 p-0 m-0">
      <legend className="sr-only">Choisis la bonne réponse</legend>
      {choices.map((choice, idx) => {
        const correct = revealed && highlightCorrect && idx === answerIndex;
        const wrong = revealed && idx === selectedIdx && idx !== answerIndex;
        const dimmed = revealed && !correct && !wrong;
        const inactive = revealed;

        return (
          <div key={choice} className="flex items-center gap-2 w-full">
            <motion.button
              type="button"
              onClick={() => onSelect(idx)}
              disabled={inactive}
              whileTap={inactive ? undefined : { scale: 0.98 }}
              className={[
                "flex-1 min-h-[60px] p-4 rounded-[var(--radius-btn)] border-2 shadow-card",
                "font-semibold text-xl select-none",
                "transition-colors duration-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                "disabled:cursor-not-allowed",
                correct
                  ? "bg-success-soft border-success text-success-ink"
                  : wrong
                    ? "bg-danger-soft border-danger text-danger-ink"
                    : dimmed
                      ? "bg-surface border-line-strong text-ink opacity-50"
                      : "bg-surface border-line-strong text-ink hover:border-accent hover:bg-accent-soft cursor-pointer",
              ].join(" ")}
            >
              {correct && <Check aria-hidden="true" className="mr-2 inline" size={24} />}
              {wrong && <X aria-hidden="true" className="mr-2 inline" size={24} />}
              {choice}
              {correct && <span className="sr-only"> (bonne réponse)</span>}
              {wrong && <span className="sr-only"> (mauvaise réponse)</span>}
            </motion.button>
            {enableSpeech && <SpeakButton text={choice} />}
          </div>
        );
      })}
    </fieldset>
  );
}
