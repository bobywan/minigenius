import { Gamepad2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { neonBtnCls } from "@/components/ui/NeonButton";

export const metadata: Metadata = {
  title: "MiniGenius — Mini-jeux",
  description: "Des mini-jeux pour apprendre en s'amusant !",
};

const GAMES = [
  {
    id: "pendu",
    label: "Le Pendu",
    description: "Devine le mot lettre par lettre",
    href: "/mini-jeux/pendu",
    active: true,
    variant: "brand" as const,
  },
  {
    id: "runner",
    label: "Endless Runner",
    description: "Saute par-dessus les obstacles !",
    href: "/mini-jeux/runner",
    active: true,
    variant: "accent" as const,
  },
];

export default function MiniJeuxPage() {
  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-4 py-12">
      <header className="text-center flex flex-col items-center gap-4">
        <Link href="/" className={neonBtnCls("ghost", "sm")}>
          ← Retour
        </Link>
        <h1 className="text-5xl font-display text-white">
          <span className="text-[#e040fb]">Mini-jeux</span>
        </h1>
        <p
          className="text-white font-display text-xl"
          style={{ textShadow: "var(--text-shadow-solid)" }}
        >
          Choisis ton jeu
        </p>
      </header>

      <div className="grid gap-4 w-full max-w-sm">
        {GAMES.map((game) =>
          game.active ? (
            <Link key={game.id} href={game.href} className="group">
              <GlassCard
                variant={game.variant}
                className="p-4 flex flex-row items-center gap-4 cursor-pointer group-hover:scale-[1.02] group-hover:-translate-y-0.5"
              >
                <Gamepad2 size={32} className="shrink-0 text-white" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xl font-display text-white drop-shadow-lg">{game.label}</p>
                  <p className="text-xs font-display text-white drop-shadow-lg">
                    {game.description}
                  </p>
                </div>
              </GlassCard>
            </Link>
          ) : (
            <div key={game.id} className="relative cursor-not-allowed">
              <GlassCard className="p-4 flex flex-row items-center gap-4 opacity-40">
                <Gamepad2 size={32} className="shrink-0 text-white" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xl font-display text-white">{game.label}</p>
                  <p className="text-sm text-white/80 font-body">{game.description}</p>
                </div>
              </GlassCard>
              <span className="absolute top-3 right-3 text-xs font-display uppercase tracking-wide text-white bg-neutral-600 rounded-full px-3 py-1 shadow-[0_2px_0_#0f0826]">
                Bientôt
              </span>
            </div>
          ),
        )}
      </div>
    </main>
  );
}
