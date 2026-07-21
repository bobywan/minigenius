import type { Difficulty } from "@/lib/types";
import { DIFFICULTY_LABELS } from "@/lib/types";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  size?: "sm" | "md";
}

const colorMap: Record<Difficulty, string> = {
  facile: "bg-success-500 text-neutral-900 shadow-[0_3px_0_#1a6b3a]",
  moyen: "bg-accent-500 text-white shadow-[0_3px_0_#8b4a00]",
  expert: "bg-error-500 text-white shadow-[0_3px_0_#8b1a1a]",
};

export function DifficultyBadge({ difficulty, size = "sm" }: DifficultyBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full font-display font-bold uppercase tracking-wide",
        size === "sm" ? "px-3 py-1 text-xs" : "px-5 py-2 text-sm",
        colorMap[difficulty],
      ].join(" ")}
    >
      {DIFFICULTY_LABELS[difficulty]}
    </span>
  );
}
