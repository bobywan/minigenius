"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { BadgeModule } from "@/components/ui/BadgeModule";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { useProgressStore } from "@/lib/store/progressStore";
import type { MathModule, Stars } from "@/lib/types";
import { MATH_MODULES } from "@/lib/types";

export default function MathsPage() {
  const { isModuleLocked, getTotalStars } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-4 py-12">
      <header className="text-center flex flex-col items-center gap-4">
        <BackLink href="/" />
        <PageTitle size="5xl">Maths</PageTitle>
        <PageSubtitle>Choisis ton opération</PageSubtitle>
      </header>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {MATH_MODULES.map((mod) => {
          // quand non monté : reproduire l'état serveur (progress vide → seul "addition" débloqué)
          const locked = mounted ? isModuleLocked("maths", mod) : MATH_MODULES.indexOf(mod) > 0;
          const total = (mounted ? getTotalStars("maths", mod) : 0) as Stars;
          return (
            <BadgeModule
              key={mod}
              module={mod as MathModule}
              href={`/maths/${mod}`}
              totalStars={total}
              locked={locked}
            />
          );
        })}

        <Link href="/maths/mixte" className="group col-span-2">
          <GlassCard className="p-3 flex items-center justify-center gap-3 cursor-pointer group-hover:scale-[1.02] group-hover:-translate-y-1 transition-transform duration-200">
            <span className="text-4xl font-display leading-none">±</span>
            <p className="text-base font-display text-white">Tout mélanger</p>
          </GlassCard>
        </Link>
      </div>
    </main>
  );
}
