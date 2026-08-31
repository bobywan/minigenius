import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { Logo } from "@/components/ui/Logo";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { StarRating } from "@/components/ui/StarRating";

export const metadata: Metadata = {
  title: { absolute: "Design System — MiniGenius" },
  description: "Référence des composants et tokens du design system MiniGenius.",
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex flex-col gap-6">
      <h2 className="text-3xl font-display text-sky-800 border-b-2 border-emerald-500 pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className={`w-20 h-20 rounded-2xl border-2 border-slate-200 ${className}`} />
      <p className="text-xs text-slate-600 text-center font-mono">{name}</p>
    </div>
  );
}

export default function DesignPage() {
  return (
    <div className="min-h-screen max-w-[1000px] mx-auto w-full">
      <main className="px-6 py-14 flex flex-col gap-16">
        <header className="text-center flex flex-col items-center gap-4">
          <BackLink href="/" label="← Accueil" />
          <Logo size="large" />
          <PageTitle>Design System</PageTitle>
          <PageSubtitle>Composants et tokens du nouveau design MiniGenius</PageSubtitle>
        </header>

        {/* PRINCIPES */}
        <Section id="principes" title="Principes">
          <div className="flex flex-col gap-3 text-slate-700 text-base font-body">
            <p>
              Le design system repose sur un thème <strong>blanc/emerald/amber</strong> épuré et
              moderne.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Fond blanc avec effet de sol vert ondulant (emerald-500/600) via pseudo-éléments CSS
              </li>
              <li>Composants blancs avec effets hover emerald</li>
              <li>Accent amber pour boutons secondaires et étoiles</li>
              <li>Typographie : Titan One (display) + Nunito (body)</li>
              <li>Effets 3D cartoon avec ombres et translations</li>
            </ul>
          </div>
        </Section>

        {/* COULEURS */}
        <Section id="couleurs" title="Palette de couleurs">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
            <Swatch name="Emerald 500" className="bg-emerald-500" />
            <Swatch name="Emerald 400" className="bg-emerald-400" />
            <Swatch name="Amber 500" className="bg-amber-500" />
            <Swatch name="Amber 400" className="bg-amber-400" />
            <Swatch name="Sky 800" className="bg-sky-800" />
            <Swatch name="Sky 700" className="bg-sky-700" />
            <Swatch name="Slate 700" className="bg-slate-700" />
            <Swatch name="Slate 500" className="bg-slate-500" />
            <Swatch name="White" className="bg-white border-slate-300" />
          </div>
        </Section>

        {/* TYPOGRAPHIE */}
        <Section id="typographie" title="Typographie">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-slate-600 font-mono mb-2">font-display (Titan One)</p>
              <p className="text-5xl font-display text-sky-800">MiniGenius</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 font-mono mb-2">font-body (Nunito)</p>
              <p className="text-xl font-body text-slate-700">
                L'app éducative pour les petits génies !
              </p>
            </div>
          </div>
        </Section>

        {/* COMPOSANTS */}
        <Section id="composants" title="Composants">
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <div>
              <p className="text-sm text-slate-600 font-mono mb-3">Logo</p>
              <div className="flex gap-4 items-end">
                <Logo size="small" />
                <Logo size="medium" />
                <Logo size="large" />
              </div>
            </div>

            {/* Buttons */}
            <div>
              <p className="text-sm text-slate-600 font-mono mb-3">Button</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">
                  Primary Small
                </Button>
                <Button variant="primary" size="md">
                  Primary Medium
                </Button>
                <Button variant="primary" size="lg">
                  Primary Large
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                <Button variant="secondary" size="md">
                  Secondary
                </Button>
                <Button variant="ghost" size="md">
                  Ghost
                </Button>
                <Button variant="primary" size="md" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* Cards */}
            <div>
              <p className="text-sm text-slate-600 font-mono mb-3">Card</p>
              <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                  <div className="flex-1">
                    <p className="text-2xl font-display">Carte standard</p>
                    <p className="text-base text-slate-700">Avec hover effect emerald</p>
                  </div>
                </Card>
                <Card disabled hover={false}>
                  <div className="flex-1">
                    <p className="text-2xl font-display">Carte désactivée</p>
                    <p className="text-base text-slate-700">Sans hover, opacité réduite</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* StarRating */}
            <div>
              <p className="text-sm text-slate-600 font-mono mb-3">StarRating</p>
              <div className="flex flex-wrap gap-6 items-center">
                <StarRating stars={0} size="sm" />
                <StarRating stars={1} size="md" />
                <StarRating stars={2} size="md" />
                <StarRating stars={3} size="lg" />
              </div>
            </div>

            {/* DifficultyBadge */}
            <div>
              <p className="text-sm text-slate-600 font-mono mb-3">DifficultyBadge</p>
              <div className="flex flex-wrap gap-4">
                <DifficultyBadge difficulty="facile" />
                <DifficultyBadge difficulty="moyen" />
                <DifficultyBadge difficulty="expert" />
              </div>
            </div>

            {/* BackLink */}
            <div>
              <p className="text-sm text-slate-600 font-mono mb-3">BackLink</p>
              <BackLink href="/" label="← Retour à l'accueil" />
            </div>
          </div>
        </Section>

        {/* TOKENS CSS */}
        <Section id="tokens" title="Tokens CSS">
          <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
            <pre className="text-xs font-mono text-slate-700 overflow-x-auto">
              {`/* Design Tokens */
--color-emerald-500: #10b981;
--color-amber-500: #f59e0b;
--radius-card: 1.5rem;
--radius-btn: 1rem;
--shadow-card: 0 6px 0 #0f0826, 0 10px 30px rgba(0, 0, 0, 0.4);`}
            </pre>
          </div>
        </Section>

        <footer className="text-center text-sm text-slate-500 pt-8 border-t border-slate-200">
          <p>
            Design system MiniGenius — Version 2.0 (Blanc/Emerald/Amber)
            <br />
            <Link href="/" className="text-emerald-600 hover:underline">
              Retour à l'accueil
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
