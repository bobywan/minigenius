import type { Difficulty } from "@/lib/types";
import { DIFFICULTY_LABELS } from "@/lib/types";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return <span className={"font-display font-bold text-2xl"}>{DIFFICULTY_LABELS[difficulty]}</span>;
}
