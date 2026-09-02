"use client";

import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Check, Frown, Sparkles, ThumbsUp, Trophy, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { playUnlock } from "@/lib/audio/sounds";
import type { Stars } from "@/lib/types";
import { computeStars } from "@/lib/types";

export type RecapItem = {
  prompt: string;
  given: string;
  expected: string;
  ok: boolean;
};

type SeriesResultScreenProps = {
  correct: number;
  onReplay: () => void;
  nextHref?: string;
  items?: RecapItem[];
};

function RecapSection({
  title,
  items,
  variant,
}: {
  title: string;
  items: RecapItem[];
  variant: "ok" | "fail";
}) {
  const ok = variant === "ok";
  return (
    <section className="w-full text-left">
      <h3
        className={["text-xs font-display mb-1", ok ? "text-emerald-600" : "text-red-600"].join(
          " ",
        )}
      >
        {title}
      </h3>
      <ul className="divide-y divide-sky-100">
        {items.map((item) => (
          <li
            key={`${item.prompt}-${item.given}-${item.expected}`}
            className="flex items-center gap-2 py-1.5 px-2 font-body text-sm"
          >
            {ok ? (
              <Check size={16} className="shrink-0 text-emerald-500" aria-hidden />
            ) : (
              <X size={16} className="shrink-0 text-red-500" aria-hidden />
            )}
            <span className="flex-1 min-w-0 truncate">{item.prompt}</span>
            {ok ? (
              <span className="shrink-0 font-display text-emerald-600">{item.expected}</span>
            ) : (
              <span className="shrink-0 flex items-center gap-1">
                <span className="text-red-500 line-through">{item.given || "—"}</span>
                <span className="text-slate-400" aria-hidden>
                  →
                </span>
                <span className="font-display text-emerald-600">{item.expected}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SeriesResultScreen({
  correct,
  onReplay,
  nextHref,
  items,
}: SeriesResultScreenProps) {
  const stars = computeStars(correct) as Stars;
  const won = stars >= 1;
  const okItems = items?.filter((item) => item.ok) ?? [];
  const failItems = items?.filter((item) => !item.ok) ?? [];

  useEffect(() => {
    if (!won) return;

    playUnlock();

    const colors =
      stars === 3
        ? ["#3dff91", "#ff4eb8", "#ffe600", "#ffaa4d"]
        : ["#ff4eb8", "#ffaa4d", "#e8e0ff"];

    const burst = () =>
      confetti({
        particleCount: stars === 3 ? 140 : 70,
        spread: 90,
        origin: { y: 0.5 },
        colors,
        zIndex: 9999,
      });

    burst();
    if (stars === 3) {
      const t1 = setTimeout(() => burst(), 350);
      const t2 = setTimeout(() => burst(), 700);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    return undefined;
  }, [won, stars]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="grid items-center gap-6 w-full max-w-md mx-auto"
    >
      <div className="w-full grid gap-3 bg-white text-sky-800 rounded-[var(--radius-card)] p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
          className="flex justify-center"
        >
          {stars === 3 ? (
            <Trophy size={48} />
          ) : stars === 2 ? (
            <Sparkles size={48} />
          ) : stars === 1 ? (
            <ThumbsUp size={48} />
          ) : (
            <Frown size={48} />
          )}
        </motion.div>

        <h2 className="text-3xl font-display text-center">
          {stars === 3
            ? "Parfait !"
            : stars === 2
              ? "Très bien !"
              : stars === 1
                ? "Bien joué !"
                : "Presque !"}
        </h2>

        <div className="text-center">
          <p className="text-5xl font-display text-amber-500">
            {correct}
            <span className="text-2xl text-slate-500">/10</span>
          </p>
          <p className="text-sm text-slate-700 mt-1 font-body">bonnes réponses</p>
        </div>

        <StarRating className="justify-center" stars={stars} size="lg" animate />

        {items && items.length > 0 && (
          <div className="w-full flex flex-col gap-3 max-h-52 overflow-y-auto border-2 border-sky-200 rounded-[var(--radius-btn)] p-2">
            {okItems.length > 0 && <RecapSection title="Réussis" items={okItems} variant="ok" />}
            {failItems.length > 0 && (
              <RecapSection title="À revoir" items={failItems} variant="fail" />
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3 w-full">
        <Button variant="secondary" onClick={onReplay} className="flex-1">
          ↺ Rejouer
        </Button>
        {nextHref && won && (
          <Link href={nextHref} className="flex-1">
            <Button variant="secondary" className="w-full">
              Continuer →
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
