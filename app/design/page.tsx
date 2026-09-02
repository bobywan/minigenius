import type { Metadata } from "next";
import Link from "next/link";
import { ExerciseDisplay } from "@/components/game/ExerciseDisplay";
import { WordPrompt } from "@/components/game/WordPrompt";
import { AnswerInput } from "@/components/ui/AnswerInput";
import { BackLink } from "@/components/ui/BackLink";
import { BadgeModule } from "@/components/ui/BadgeModule";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { Logo } from "@/components/ui/Logo";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { StarRating } from "@/components/ui/StarRating";
import type { Exercise } from "@/lib/types";
import { ChoiceGridDemo } from "./ChoiceGridDemo";
import { NumPadDemo } from "./NumPadDemo";
import { SeriesResultDemo } from "./SeriesResultDemo";

export const metadata: Metadata = {
  title: { absolute: "Design System — MiniGenius" },
  description: "Référence des composants et tokens du design system MiniGenius.",
};

const TOC = [
  { href: "#series-result", label: "Écran résultat" },
  { href: "#composants", label: "Composants" },
  { href: "#jeu", label: "Jeu" },
  { href: "#tokens", label: "Tokens" },
] as const;

const SAMPLE_EXERCISE: Exercise = {
  left: 4,
  op: "+",
  right: null,
  result: 9,
  answer: 5,
};

const PROGRESS_STATES = [
  "correct",
  "correct",
  "wrong",
  "idle",
  "idle",
  "idle",
  "idle",
  "idle",
  "idle",
  "idle",
] as const;

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

function CatalogItem({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-white font-mono mb-3">{name}</p>
      {children}
    </div>
  );
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className={`w-20 h-20 rounded-2xl border-2 border-slate-200 ${className}`} />
      <p className="text-xs text-white text-center font-mono">{name}</p>
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
          <PageSubtitle>Composants, tokens et playground des écrans de jeu</PageSubtitle>
          <nav aria-label="Sommaire" className="flex flex-wrap justify-center gap-3 mt-2">
            {TOC.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-body text-white bg-sky-700 rounded-full px-3 py-1 hover:bg-sky-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <Section id="principes" title="Principes">
          <div className="flex flex-col gap-3 text-white">
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

        <Section id="typographie" title="Typographie">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-white font-mono mb-2">font-display (Titan One)</p>
              <p className="text-5xl font-display text-white">MiniGenius</p>
            </div>
            <div>
              <p className="text-sm text-white font-mono mb-2">font-body (Nunito)</p>
              <p className="text-xl font-body text-white">
                L'app éducative pour les petits génies !
              </p>
            </div>
          </div>
        </Section>

        <Section id="series-result" title="Écrans de jeu">
          <CatalogItem name="SeriesResultScreen — playground">
            <p className="text-sm font-body text-white mb-4">
              Presets 3 / 6 / 8 / 10 pour les 4 paliers d&apos;étoiles. Le récap (Réussis / À
              revoir) suit le score. Relancer recrée le composant (confettis + son).
            </p>
            <SeriesResultDemo />
          </CatalogItem>
        </Section>

        <Section id="composants" title="Composants">
          <div className="flex flex-col gap-8">
            <CatalogItem name="Logo">
              <div className="flex gap-4 items-end">
                <Logo size="small" />
                <Logo size="medium" />
                <Logo size="large" />
              </div>
            </CatalogItem>

            <CatalogItem name="PageTitle / PageSubtitle">
              <div className="flex flex-col items-start gap-2">
                <PageTitle size="5xl">Titre de page</PageTitle>
                <PageSubtitle>Sous-titre de navigation</PageSubtitle>
              </div>
            </CatalogItem>

            <CatalogItem name="Button">
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
            </CatalogItem>

            <CatalogItem name="Card">
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
            </CatalogItem>

            <CatalogItem name="StarRating">
              <div className="flex flex-wrap gap-6 items-center">
                <StarRating stars={0} size="sm" />
                <StarRating stars={1} size="md" />
                <StarRating stars={2} size="md" />
                <StarRating stars={3} size="lg" />
              </div>
            </CatalogItem>

            <CatalogItem name="DifficultyBadge">
              <div className="flex flex-wrap gap-4">
                <DifficultyBadge difficulty="facile" />
                <DifficultyBadge difficulty="moyen" />
                <DifficultyBadge difficulty="expert" />
              </div>
            </CatalogItem>

            <CatalogItem name="BadgeModule">
              <div className="grid gap-4 lg:grid-cols-2">
                <BadgeModule module="addition" href="#jeu" />
                <BadgeModule module="multiplication" href="#jeu" />
              </div>
            </CatalogItem>

            <CatalogItem name="BackLink">
              <BackLink href="/" label="← Retour à l'accueil" />
            </CatalogItem>
          </div>
        </Section>

        <Section id="jeu" title="Composants jeu">
          <div className="flex flex-col gap-8">
            <CatalogItem name="ChoiceGrid">
              <div className="bg-white rounded-[var(--radius-card)] p-4 border-2 border-slate-200">
                <ChoiceGridDemo />
              </div>
            </CatalogItem>

            <CatalogItem name="NumPad">
              <div className="bg-white rounded-[var(--radius-card)] p-4 border-2 border-slate-200">
                <NumPadDemo />
              </div>
            </CatalogItem>

            <CatalogItem name="ProgressDots">
              <div className="bg-sky-700 rounded-[var(--radius-card)] p-4">
                <ProgressDots states={[...PROGRESS_STATES]} current={3} />
              </div>
            </CatalogItem>

            <CatalogItem name="SpeakButton">
              <SpeakButton text="cat" />
            </CatalogItem>

            <CatalogItem name="AnswerInput">
              <div className="flex flex-wrap gap-4 items-center">
                <AnswerInput value="" state="idle" />
                <AnswerInput value="12" state="correct" />
                <AnswerInput value="9" state="wrong" />
              </div>
            </CatalogItem>

            <CatalogItem name="WordPrompt">
              <div className="bg-white rounded-[var(--radius-card)] p-4 border-2 border-slate-200 text-sky-800">
                <WordPrompt prompt="Cat" speakText="cat" />
              </div>
            </CatalogItem>

            <CatalogItem name="ExerciseDisplay">
              <div className="flex flex-col gap-6 bg-white rounded-[var(--radius-card)] p-4 border-2 border-slate-200">
                <div>
                  <p className="text-xs font-mono text-slate-600 mb-2">trou</p>
                  <ExerciseDisplay exercise={SAMPLE_EXERCISE} />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-600 mb-2">reveal</p>
                  <ExerciseDisplay exercise={SAMPLE_EXERCISE} revealAnswer />
                </div>
              </div>
            </CatalogItem>
          </div>
        </Section>

        <Section id="tokens" title="Tokens CSS">
          <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
            <pre className="text-xs font-mono text-slate-700 overflow-x-auto">
              {`/* Usage réel — Tailwind + tokens @theme */
emerald-500 / emerald-400   /* actions primaires */
amber-500 / amber-400       /* secondaire, score, étoiles */
sky-800 / sky-700           /* fond, titres, ghost */
slate-700 / slate-500       /* texte body */

--font-display: Titan One
--font-body: Nunito
--radius-card: 1.5rem
--radius-btn: 1rem`}
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
