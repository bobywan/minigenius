import { BookOpen, Calculator, Globe, Landmark } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

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
    variant: "success" as const,
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
    active: false,
    href: null,
  },
  {
    id: "histoire",
    label: "Histoire",
    icon: Landmark,
    description: "Dates, personnages, événements",
    active: false,
    href: null,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-4 py-12">
      <header className="text-center flex flex-col gap-3">
        <h1 className="text-6xl font-display text-white drop-shadow-lg">
          Mini<span className="text-yellow-500">Genius</span>
        </h1>
        <p
          className="text-white text-xl font-display"
          style={{ textShadow: "var(--text-shadow-solid)" }}
        >
          Choisis ta matière pour commencer !
        </p>
      </header>

      <div className="grid gap-4 w-full max-w-sm">
        {SUBJECTS.map((s) => {
          const Icon = s.icon;
          return s.active && s.href ? (
            <Link key={s.id} href={s.href} className="group">
              <GlassCard
                variant={s.variant}
                className="p-4 flex flex-row items-center gap-4 cursor-pointer group-hover:scale-[1.02] group-hover:-translate-y-0.5"
              >
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
