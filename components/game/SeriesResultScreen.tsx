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
        className={["text-sm font-display mb-2", ok ? "text-emerald-600" : "text-red-600"].join(
          " ",
        )}
      >
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={`${item.prompt}-${item.given}-${item.expected}`}
            className={[
              "rounded-[var(--radius-btn)] px-3 py-2 font-body text-sm",
              ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800",
            ].join(" ")}
          >
            <p className="font-bold flex items-center gap-2">
              {ok ? <Check size={16} aria-hidden /> : <X size={16} aria-hidden />}
              <span>{item.prompt}</span>
            </p>
            {ok ? (
              <p className="mt-0.5 pl-6">{item.expected}</p>
            ) : (
              <p className="mt-0.5 pl-6">
                tu as mis {item.given || "—"} — c&apos;était {item.expected}
              </p>
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
      <div className="w-full grid gap-6 bg-white text-sky-800 rounded-[var(--radius-card)] p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
          className="flex justify-center"
        >
          {stars === 3 ? (
            <Trophy size={72} />
          ) : stars === 2 ? (
            <Sparkles size={72} />
          ) : stars === 1 ? (
            <ThumbsUp size={72} />
          ) : (
            <Frown size={72} />
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
          <p className="text-6xl font-display text-amber-500">
            {correct}
            <span className="text-3xl text-slate-500">/10</span>
          </p>
          <p className="text-sm text-slate-700 mt-1 font-body">bonnes réponses</p>
        </div>

        <StarRating className="justify-center" stars={stars} size="lg" animate />

        {!won && (
          <p className="text-sm text-slate-700 text-center font-body">
            Il faut au moins 6/10 pour débloquer la suite. Tu vas y arriver !
          </p>
        )}

        {items && items.length > 0 && (
          <div className="w-full flex flex-col gap-4 max-h-64 overflow-y-auto pr-1">
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
