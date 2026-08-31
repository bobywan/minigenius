import type { LucideIcon } from "lucide-react";
import { PersonStanding, Rocket, WholeWord } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";

export const metadata: Metadata = {
  title: "Mini-jeux",
  description: "Des mini-jeux pour apprendre en s'amusant !",
};

const GAMES: {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    id: "pendu",
    label: "Le Pendu",
    description: "Devine le mot lettre par lettre",
    href: "/mini-jeux/pendu",
    icon: WholeWord,
  },
  {
    id: "vol",
    label: "Vol",
    description: "Maintiens pour voler",
    href: "/mini-jeux/runner",
    icon: Rocket,
  },
  {
    id: "course",
    label: "Course",
    description: "Change de couloir et saute",
    href: "/mini-jeux/course",
    icon: PersonStanding,
  },
];

export default function MiniJeuxPage() {
  return (
    <main className="flex flex-col px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle size="5xl">Mini-jeux</PageTitle>
        <PageSubtitle>Choisis ton jeu</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {GAMES.map((game) => {
          const Icon = game.icon;
          return (
            <Link key={game.id} href={game.href} className="group">
              <Card>
                <Icon size={40} className="shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-2xl font-display">{game.label}</p>
                  <p className="text-lg text-slate-700 font-body">{game.description}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
