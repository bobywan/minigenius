import { BookOpen, Calculator, Gamepad2, Globe, Landmark } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Logo } from "@/components/ui/Logo";
import { PageSubtitle } from "@/components/ui/PageSubtitle";

export const metadata: Metadata = {
  title: "MiniGenius — Choisis ta matière",
  description: "L'app éducative pour les petits génies !",
};

const SUBJECTS = [
  {
    id: "maths",
    label: "Maths",
    icon: Calculator,
    description: "Addition, soustraction, multiplication, division",
    active: true,
    href: "/maths",
  },
  {
    id: "francais",
    label: "Français",
    icon: BookOpen,
    description: "Lecture, orthographe, grammaire",
    active: false,
    href: null,
  },
  {
    id: "anglais",
    label: "Anglais",
    icon: Globe,
    description: "Vocabulaire, phrases, conjugaison",
    active: true,
    href: "/anglais",
  },
  {
    id: "histoire",
    label: "Histoire",
    icon: Landmark,
    description: "Dates, personnages, événements",
    active: false,
    href: null,
  },
  {
    id: "mini-jeux",
    label: "Mini-jeux",
    icon: Gamepad2,
    description: "Pendu, devinettes et autres jeux",
    active: true,
    href: "/mini-jeux",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-4 py-12">
      <header className="text-center flex flex-col gap-4">
        <Logo className="drop-shadow-lg" />
        <PageSubtitle>Choisis ta matière pour commencer !</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full max-w-sm">
        {SUBJECTS.map((s) => {
          const Icon = s.icon;
          return s.active && s.href ? (
            <Link key={s.id} href={s.href} className="group">
              <GlassCard className="p-4 flex flex-row items-center gap-4 cursor-pointer group-hover:scale-[1.02] group-hover:-translate-y-0.5">
                <Icon size={32} className="shrink-0 text-white" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xl font-display text-white drop-shadow-lg">{s.label}</p>
                  <p className="text-xs font-display text-white drop-shadow-lg">{s.description}</p>
                </div>
              </GlassCard>
            </Link>
          ) : (
            <div key={s.id} className="relative cursor-not-allowed">
              <GlassCard className="p-4 flex flex-row items-center gap-4 opacity-40">
                <Icon size={32} className="shrink-0 text-white" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xl font-display text-white">{s.label}</p>
                  <p className="text-sm text-white/80 font-body">{s.description}</p>
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
