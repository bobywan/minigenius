import { BookOpen, Calculator, Gamepad2, Globe, Landmark } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";

export const metadata: Metadata = {
  title: { absolute: "MiniGenius — Choisis ta matière" },
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
    active: true,
    href: "/francais",
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
    description: "Pendu, vol et course",
    active: true,
    href: "/mini-jeux",
  },
];

const AVAILABLE = SUBJECTS.filter((s): s is (typeof SUBJECTS)[number] & { href: string } =>
  Boolean(s.active && s.href),
);
const COMING_SOON = SUBJECTS.filter((s) => !s.active);

export default function Home() {
  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-16 gap-16">
      <header className="text-center flex flex-col gap-4">
        <Logo size="large" />

        <PageSubtitle>Choisis ta matière pour commencer !</PageSubtitle>
      </header>

      <section className="grid gap-4 w-full lg:grid-cols-2">
        {AVAILABLE.map((s) => {
          const Icon = s.icon;

          return (
            <Link key={s.id} href={s.href} className="group">
              <Card>
                <Icon size={40} className="shrink-0" />

                <div className="flex flex-col content-center gap-1">
                  <p className="text-2xl font-display">{s.label}</p>
                  <p className="text-lg text-slate-700 font-body">{s.description}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </section>

      {COMING_SOON.length > 0 && (
        <section className="flex flex-col gap-4 w-full">
          <PageTitle>Bientôt disponible</PageTitle>
          <div className="grid gap-4 w-full lg:grid-cols-2">
            {COMING_SOON.map((s) => {
              const Icon = s.icon;

              return (
                <div key={s.id} className="relative">
                  <Card disabled hover={false}>
                    <Icon size={40} className="shrink-0" />

                    <div className="flex flex-col content-center gap-1">
                      <p className="text-2xl font-display">{s.label}</p>
                      <p className="text-base font-body">{s.description}</p>
                    </div>

                    <span className="absolute top-3 right-3 text-xs font-display uppercase tracking-wide text-white bg-neutral-600 rounded-full px-3 py-1 shadow-[0_2px_0_#0f0826]">
                      Bientôt
                    </span>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
