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
}

export function ChoiceGrid({
  choices,
  answerIndex,
  selectedIdx,
  revealed,
  onSelect,
  enableSpeech = false,
}: ChoiceGridProps) {
  return (
    <fieldset className="flex flex-col gap-3 w-full border-0 p-0 m-0">
      <legend className="sr-only">Choisis la bonne traduction</legend>
      {choices.map((choice, idx) => {
        const correct = revealed && idx === answerIndex;
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
              style={{ textShadow: "var(--text-shadow-solid)" }}
              className={[
                "flex-1 min-h-[60px] px-4 py-3 rounded-[var(--radius-btn)]",
                "font-body font-bold text-xl text-white select-none",
                "border-2 transition-colors duration-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                "disabled:cursor-not-allowed",
                correct
                  ? "bg-green-500 border-green-400 shadow-[var(--shadow-green)]"
                  : wrong
                    ? "bg-red-500 border-red-400 shadow-[var(--shadow-red)]"
                    : dimmed
                      ? "bg-neutral-900/80 border-white/30 shadow-[var(--shadow-btn)] opacity-40"
                      : "bg-neutral-900/80 hover:bg-neutral-900/95 border-white/30 shadow-[var(--shadow-btn)] cursor-pointer",
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
