"use client";

import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Frown, Sparkles, ThumbsUp, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { playUnlock } from "@/lib/audio/sounds";
import type { Stars } from "@/lib/types";
import { computeStars } from "@/lib/types";

interface SeriesResultScreenProps {
  correct: number;
  onReplay: () => void;
  nextHref?: string;
}

export function SeriesResultScreen({ correct, onReplay, nextHref }: SeriesResultScreenProps) {
  const stars = computeStars(correct) as Stars;
  const won = stars >= 1;

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
      </div>

      <div className="flex gap-3 w-full">
        <Button variant="secondary" onClick={onReplay} className="flex-1">
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
