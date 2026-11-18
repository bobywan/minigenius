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
        className={["text-xs font-display mb-1", ok ? "text-success-ink" : "text-danger-ink"].join(
          " ",
        )}
      >
        {title}
      </h3>
      <ul className="divide-y divide-line">
        {items.map((item) => (
          <li
            key={`${item.prompt}-${item.given}-${item.expected}`}
            className="flex items-center gap-2 py-1.5 px-2 font-body text-sm"
          >
            {ok ? (
              <Check size={16} className="shrink-0 text-success" aria-hidden />
            ) : (
              <X size={16} className="shrink-0 text-danger" aria-hidden />
            )}
            <span className="flex-1 min-w-0 truncate">{item.prompt}</span>
            {ok ? (
              <span className="shrink-0 font-display text-success-ink">{item.expected}</span>
            ) : (
              <span className="shrink-0 flex items-center gap-1">
                <span className="text-danger-ink line-through">{item.given || "—"}</span>
                <span className="text-ink-3" aria-hidden>
                  →
                </span>
                <span className="font-display text-success-ink">{item.expected}</span>
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
        ? ["#4F46E5", "#047857", "#F59E0B", "#DC2626"]
        : ["#4F46E5", "#F59E0B", "#EEF0FF"];

    const burst = () =>
      confetti({
        particleCount: stars === 3 ? 140 : 70,
        spread: 90,
        origin: { y: 0.5 },
        colors,
        zIndex: 9999,
        disableForReducedMotion: true,
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
      <div className="w-full grid gap-3 bg-surface text-ink border border-line shadow-pop rounded-[var(--radius-card)] p-6">
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
          <p className="text-5xl font-display text-ink">
            {correct}
            <span className="text-2xl text-ink-3">/10</span>
          </p>
          <p className="text-sm text-ink-2 mt-1 font-body">bonnes réponses</p>
        </div>

        <StarRating className="justify-center" stars={stars} size="lg" animate />

        {items && items.length > 0 && (
          <div className="w-full flex flex-col gap-3 max-h-52 overflow-y-auto border border-line bg-surface-2 rounded-[var(--radius-btn)] p-2">
            {okItems.length > 0 && <RecapSection title="Réussis" items={okItems} variant="ok" />}
            {failItems.length > 0 && (
              <RecapSection title="À revoir" items={failItems} variant="fail" />
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3 w-full">
        <Button
          variant={nextHref && won ? "ghost" : "primary"}
          onClick={onReplay}
          className="flex-1"
        >
          ↺ Rejouer
        </Button>
        {nextHref && won && (
          <Link href={nextHref} className="flex-1">
            <Button variant="primary" className="w-full">
              Continuer →
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
