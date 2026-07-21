import type { Exercise } from "@/lib/types";

interface ExerciseDisplayProps {
  exercise: Exercise;
  revealAnswer?: boolean;
}

function Slot({
  value,
  isHole,
  revealAnswer,
}: {
  value: number | null;
  isHole: boolean;
  revealAnswer?: boolean;
}) {
  if (isHole) {
    if (revealAnswer) {
      return (
        <span className="inline-flex items-center justify-center min-w-[90px] px-3 py-2 rounded-2xl bg-[#0a4020] border-4 border-success-500 text-success-400 font-display text-5xl shadow-[var(--shadow-success)]">
          {value}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center min-w-[90px] px-3 py-2 rounded-2xl bg-bg-card border-4 border-brand-500 text-brand-400 font-display text-5xl animate-pulse shadow-[var(--shadow-brand)]">
        ?
      </span>
    );
  }
  return <span className="text-white font-display text-5xl">{value}</span>;
}

export function ExerciseDisplay({ exercise, revealAnswer = false }: ExerciseDisplayProps) {
  const { left, op, right, result, answer } = exercise;

  return (
    <div
      className="flex items-center justify-center gap-4 flex-wrap"
      role="math"
      aria-label={`Calcul : ${left ?? "?"} ${op} ${right ?? "?"} = ${result ?? "?"}`}
    >
      <Slot value={left ?? answer} isHole={left === null} revealAnswer={revealAnswer} />
      <span className="text-yellow-400 font-display text-5xl">{op}</span>
      <Slot value={right ?? answer} isHole={right === null} revealAnswer={revealAnswer} />
      <span className="text-neutral-400 font-display text-5xl">=</span>
      <Slot value={result ?? answer} isHole={result === null} revealAnswer={revealAnswer} />
    </div>
  );
}
