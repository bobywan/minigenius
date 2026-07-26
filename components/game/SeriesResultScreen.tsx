"use client";

import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Frown, Sparkles, ThumbsUp, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { StarRating } from "@/components/ui/StarRating";
import { playUnlock } from "@/lib/audio/sounds";
import type { Difficulty, MathModule, Stars } from "@/lib/types";
import { computeStars } from "@/lib/types";

interface SeriesResultScreenProps {
  correct: number;
  module: MathModule;
  difficulty: Difficulty;
  onReplay: () => void;
  nextHref?: string;
}

export function SeriesResultScreen({
  correct,
  module: _module,
  difficulty: _difficulty,
  onReplay,
  nextHref,
}: SeriesResultScreenProps) {
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
      className="flex flex-col items-center gap-6 w-full max-w-md mx-auto"
    >
      <GlassCard className="p-8 w-full flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
          className="text-white"
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

        <h2 className="text-3xl font-display text-white text-center">
          {stars === 3
            ? "Parfait !"
            : stars === 2
              ? "Très bien !"
              : stars === 1
                ? "Bien joué !"
                : "Presque !"}
        </h2>

        <div className="text-center">
          <p className="text-6xl font-display text-yellow-400">
            {correct}
            <span className="text-3xl text-neutral-400">/10</span>
          </p>
          <p className="text-sm text-white/80 mt-1 font-body">bonnes réponses</p>
        </div>

        <StarRating stars={stars} size="lg" animate />

        {!won && (
          <p className="text-sm text-white/80 text-center font-body">
            Il faut au moins 6/10 pour débloquer la suite. Tu vas y arriver !
          </p>
        )}
      </GlassCard>

      <div className="flex gap-3 w-full">
        <NeonButton variant="ghost" onClick={onReplay} className="flex-1">
          ↺ Rejouer
        </NeonButton>
        {nextHref && won && (
          <Link href={nextHref} className="flex-1">
            <NeonButton variant={stars === 3 ? "success" : "brand"} className="w-full">
              Continuer →
            </NeonButton>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
