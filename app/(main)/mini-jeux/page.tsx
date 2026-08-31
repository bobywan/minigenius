import { Gamepad2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";

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
  },
  {
    id: "runner",
    label: "Endless Runner",
    description: "Saute par-dessus les obstacles !",
    href: "/mini-jeux/runner",
    active: true,
  },
];

export default function MiniJeuxPage() {
  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle size="5xl">Mini-jeux</PageTitle>
        <PageSubtitle>Choisis ton jeu</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {GAMES.map((game) =>
          game.active ? (
            <Link key={game.id} href={game.href} className="group">
              <Card>
                <Gamepad2 size={40} className="shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-2xl font-display">{game.label}</p>
                  <p className="text-lg text-slate-700 font-body">{game.description}</p>
                </div>
              </Card>
            </Link>
          ) : (
            <div key={game.id} className="relative">
              <Card disabled hover={false}>
                <Gamepad2 size={40} className="shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-2xl font-display">{game.label}</p>
                  <p className="text-base font-body">{game.description}</p>
                </div>
              </Card>
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
