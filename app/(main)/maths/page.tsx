"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { BadgeModule } from "@/components/ui/BadgeModule";
import { Card } from "@/components/ui/Card";
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
    <main className="flex flex-col px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle>Maths</PageTitle>

        <PageSubtitle>Choisis ton opération</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
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

        <Link href="/maths/mixte" className="group lg:col-span-2">
          <Card className="justify-center">
            <p className="text-2xl font-display">Tout mélanger</p>
          </Card>
        </Link>
      </div>
    </main>
  );
}
