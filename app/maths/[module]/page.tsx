"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { neonBtnCls } from "@/components/ui/NeonButton";
import { StarRating } from "@/components/ui/StarRating";
import { useProgressStore } from "@/lib/store/progressStore";
import type { Difficulty, MathModule, Stars } from "@/lib/types";
import {
  DIFFICULTIES,
  DIFFICULTY_LABELS,
  MATH_MODULES,
  MODULE_ICONS,
  MODULE_LABELS,
} from "@/lib/types";

const DIFFICULTY_DESC: Record<Difficulty, string> = {
  facile: "Nombres de 1 à 20 — calcul direct",
  moyen: "Nombres de 1 à 100 — calcul direct",
  expert: "Nombres de 1 à 100 — équation à trous",
};

export default function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module: mod } = use(params);

  if (!MATH_MODULES.includes(mod as MathModule)) notFound();
  const mathMod = mod as MathModule;

  const { isDifficultyLocked, getStars } = useProgressStore();

  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-4 py-12">
      <header className="text-center flex flex-col items-center gap-2">
        <Link href="/maths" className={neonBtnCls("ghost", "sm")}>
          ← Retour
        </Link>
        <div className="flex items-center justify-center gap-3">
          <span className="text-5xl font-display">{MODULE_ICONS[mathMod]}</span>
          <h1 className="text-4xl font-display text-white">{MODULE_LABELS[mathMod]}</h1>
        </div>
        <p
          className="text-white font-display text-xl"
          style={{ textShadow: "var(--text-shadow-solid)" }}
        >
          Choisis ta difficulté
        </p>
      </header>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {DIFFICULTIES.map((diff) => {
          const locked = isDifficultyLocked("maths", mathMod, diff);
          const stars = getStars("maths", mathMod, diff) as Stars;

          if (locked) {
            return (
              <div key={diff} className="relative opacity-50 cursor-not-allowed">
                <GlassCard className="p-4 flex items-center justify-between blur-[0.5px]">
                  <div className="flex flex-col gap-1">
                    <DifficultyBadge difficulty={diff} size="md" />
                    <p className="text-sm text-white/70 mt-1 font-body">{DIFFICULTY_DESC[diff]}</p>
                  </div>
                  <Lock size={24} className="text-white/60" />
                </GlassCard>
              </div>
            );
          }

          return (
            <Link key={diff} href={`/maths/${mathMod}/${diff}`} className="group">
              <GlassCard className="p-4 flex items-center justify-between cursor-pointer group-hover:scale-[1.02] group-hover:-translate-y-0.5">
                <div className="flex flex-col gap-1">
                  <DifficultyBadge difficulty={diff} size="md" />
                  <p className="text-sm text-white/80 mt-1 font-body">{DIFFICULTY_DESC[diff]}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StarRating stars={stars} size="sm" />
                  {stars > 0 && (
                    <p className="text-xs text-white/70 font-body">{DIFFICULTY_LABELS[diff]}</p>
                  )}
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
