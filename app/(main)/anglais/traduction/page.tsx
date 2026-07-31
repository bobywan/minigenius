"use client";

import { ArrowLeftRight, Languages, Repeat } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { StarRating } from "@/components/ui/StarRating";
import { useProgressStore } from "@/lib/store/progressStore";
import type { EnglishModule, Stars } from "@/lib/types";

const MODES: {
  id: EnglishModule;
  label: string;
  icon: typeof Languages;
  description: string;
}[] = [
  {
    id: "en-fr",
    label: "Anglais → Français",
    icon: Languages,
    description: "Un mot anglais, quatre traductions au choix",
  },
  {
    id: "fr-en",
    label: "Français → Anglais",
    icon: ArrowLeftRight,
    description: "Un mot français, quatre traductions au choix",
  },
  {
    id: "mixte",
    label: "Tout mélanger",
    icon: Repeat,
    description: "Alternance aléatoire des deux sens de traduction",
  },
];

export default function TraductionPage() {
  const { getTotalStars } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-4 py-12">
      <header className="text-center flex flex-col items-center gap-4">
        <BackLink href="/anglais" />
        <PageTitle size="5xl">Traduction</PageTitle>
        <PageSubtitle>Choisis ton mode</PageSubtitle>
      </header>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {MODES.map((mode) => {
          const Icon = mode.icon;
          const total = Math.min(3, mounted ? getTotalStars("anglais", mode.id) : 0) as Stars;
          const href =
            mode.id === "mixte" ? "/anglais/traduction/mixte" : `/anglais/traduction/${mode.id}`;
          return (
            <Link key={mode.id} href={href} className="group">
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
        })}
      </div>
    </main>
  );
}
