import { BookOpen, Calculator, Gamepad2, Globe, Landmark } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { PageSubtitle } from "@/components/ui/PageSubtitle";

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
    href: "/maths",
  },
  {
    id: "francais",
    label: "Français",
    icon: BookOpen,
    description: "Lecture, orthographe, grammaire",
    href: "/francais",
  },
  {
    id: "anglais",
    label: "Anglais",
    icon: Globe,
    description: "Vocabulaire, phrases, conjugaison",
    href: "/anglais",
  },
  {
    id: "histoire",
    label: "Histoire",
    icon: Landmark,
    description: "Préhistoire, rois, Révolution",
    href: "/histoire",
  },
  {
    id: "mini-jeux",
    label: "Mini-jeux",
    icon: Gamepad2,
    description: "Pendu, vol et course",
    href: "/mini-jeux",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-16 gap-16">
      <header className="text-center flex flex-col gap-4">
        <Logo size="large" />

        <PageSubtitle>Choisis ta matière pour commencer !</PageSubtitle>
      </header>

      <section className="grid gap-4 w-full lg:grid-cols-2">
        {SUBJECTS.map((s) => {
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
    </main>
  );
}
