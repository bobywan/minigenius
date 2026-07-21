"use client";

import Link from "next/link";
import { BadgeModule } from "@/components/ui/BadgeModule";
import { neonBtnCls } from "@/components/ui/NeonButton";
import { useProgressStore } from "@/lib/store/progressStore";
import type { MathModule, Stars } from "@/lib/types";
import { MATH_MODULES } from "@/lib/types";

export default function MathsPage() {
  const { isModuleLocked, getTotalStars } = useProgressStore();

  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-4 py-12">
      <header className="text-center flex flex-col items-center gap-4">
        <Link href="/" className={neonBtnCls("ghost", "sm")}>
          ← Retour
        </Link>
        <h1 className="text-5xl font-display text-white">
          <span className="text-yellow-500">Maths</span>
        </h1>
        <p
          className="text-white font-display text-xl"
          style={{ textShadow: "var(--text-shadow-solid)" }}
        >
          Choisis ton opération
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {MATH_MODULES.map((mod) => {
          const locked = isModuleLocked("maths", mod);
          const total = getTotalStars("maths", mod) as Stars;
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
      </div>
    </main>
  );
}
