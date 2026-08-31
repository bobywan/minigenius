"use client";

import { motion } from "framer-motion";
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
      <legend className="sr-only">Choisis la bonne traduction</legend>
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
              whileTap={inactive ? undefined : { y: 4, boxShadow: "0 1px 0 #0f0826" }}
              className={[
                "flex-1 min-h-[60px] p-4 rounded-[var(--radius-btn)]",
                "font-bold text-xl text-white select-none",
                "transition-colors duration-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                "disabled:cursor-not-allowed",
                correct
                  ? "bg-emerald-500 border-emerald-400"
                  : wrong
                    ? "bg-red-500 border-red-400"
                    : dimmed
                      ? "bg-neutral-900/80 opacity-40"
                      : "bg-sky-800 hover:bg-sky-800/80 cursor-pointer",
              ].join(" ")}
            >
              {choice}
            </motion.button>
            {enableSpeech && <SpeakButton text={choice} />}
          </div>
        );
      })}
    </fieldset>
  );
}
