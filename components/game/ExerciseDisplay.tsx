import type { Exercise } from "@/lib/types";

export function formatExercisePrompt(exercise: Exercise): string {
  const { left, op, right, result } = exercise;
  return `${left ?? "?"} ${op} ${right ?? "?"} = ${result ?? "?"}`;
}

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
        <span className="inline-flex items-center justify-center min-w-[90px] px-3 py-2 rounded-2xl bg-emerald-100 border-4 border-emerald-500 text-emerald-700 font-display text-5xl">
          {value}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center min-w-[90px] px-3 py-2 rounded-2xl bg-sky-100 border-4 border-sky-500 text-sky-600 font-display text-5xl">
        ?
      </span>
    );
  }
  return <span className="text-sky-800 font-display text-5xl">{value}</span>;
}

export function ExerciseDisplay({ exercise, revealAnswer = false }: ExerciseDisplayProps) {
  const { left, op, right, result, answer } = exercise;

  return (
    <div
      className="flex items-center justify-center gap-4 flex-wrap"
      role="math"
      aria-label={`Calcul : ${formatExercisePrompt(exercise)}`}
    >
      <Slot value={left ?? answer} isHole={left === null} revealAnswer={revealAnswer} />
      <span className="text-amber-500 font-display text-5xl">{op}</span>
      <Slot value={right ?? answer} isHole={right === null} revealAnswer={revealAnswer} />
      <span className="text-slate-500 font-display text-5xl">=</span>
      <Slot value={result ?? answer} isHole={result === null} revealAnswer={revealAnswer} />
    </div>
  );
}
