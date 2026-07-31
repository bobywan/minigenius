"use client";

import { Languages, MessageSquare, Repeat } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { StarRating } from "@/components/ui/StarRating";
import { useProgressStore } from "@/lib/store/progressStore";
import type { Stars } from "@/lib/types";

const MODES = [
  {
    id: "traduction",
    label: "Traduction",
    icon: Languages,
    description: "Mots anglais et français",
    href: "/anglais/traduction",
    active: true,
  },
  {
    id: "phrases",
    label: "Phrases",
    icon: MessageSquare,
    description: "Compléter des phrases",
    href: null,
    active: false,
  },
  {
    id: "conjugaison",
    label: "Conjugaison",
    icon: Repeat,
    description: "Les verbes courants",
    href: null,
    active: false,
  },
];

export default function AnglaisPage() {
  const { getTotalStars } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-4 py-12">
      <header className="text-center flex flex-col items-center gap-4">
        <BackLink href="/" />
        <PageTitle size="5xl">Anglais</PageTitle>
        <PageSubtitle>Choisis ton mode</PageSubtitle>
      </header>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {MODES.map((mode) => {
          const Icon = mode.icon;
          if (mode.active && mode.href) {
            const totalEnFr = mounted ? getTotalStars("anglais", "en-fr") : 0;
            const totalFrEn = mounted ? getTotalStars("anglais", "fr-en") : 0;
            const totalMixte = mounted ? getTotalStars("anglais", "mixte") : 0;
            const total = Math.min(3, totalEnFr + totalFrEn + totalMixte) as Stars;
            return (
              <Link key={mode.id} href={mode.href} className="group">
                <GlassCard className="p-4 flex items-center gap-4 cursor-pointer group-hover:scale-[1.02] group-hover:-translate-y-0.5">
                  <Icon size={32} className="shrink-0 text-white" />
                  <div className="flex flex-col gap-0.5 flex-1">
                    <p className="text-lg font-display text-white drop-shadow-lg">{mode.label}</p>
                    <p className="text-sm text-white/80 font-body">{mode.description}</p>
                  </div>
                  <StarRating stars={total} size="sm" />
                </GlassCard>
              </Link>
            );
          }
          return (
            <div key={mode.id} className="relative cursor-not-allowed">
              <GlassCard className="p-4 flex items-center gap-4 opacity-40">
                <Icon size={32} className="shrink-0 text-white" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-lg font-display text-white">{mode.label}</p>
                  <p className="text-sm text-white/80 font-body">{mode.description}</p>
                </div>
              </GlassCard>
              <span className="absolute top-3 right-3 text-xs font-display uppercase tracking-wide text-white bg-neutral-600 rounded-full px-3 py-1 shadow-[0_2px_0_#0f0826]">
                Bientôt
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
