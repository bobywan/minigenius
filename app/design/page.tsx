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
import { DesignShell, DevicePills } from "./DesignShell";
import { NumPadDemo } from "./NumPadDemo";
import { SeriesResultDemo } from "./SeriesResultDemo";

export const metadata: Metadata = {
  title: { absolute: "Design System — MiniGenius" },
  description: "Référence des composants et tokens du design system MiniGenius.",
};

const TOC = [
  { href: "#couleurs", label: "Couleurs" },
  { href: "#typographie", label: "Typographie" },
  { href: "#formes", label: "Formes" },
  { href: "#composants", label: "Composants" },
  { href: "#jeu", label: "Jeu" },
  { href: "#series-result", label: "Écran résultat" },
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

const COLOR_GROUPS: { title: string; swatches: { name: string; hex: string; cls: string }[] }[] = [
  {
    title: "Surfaces et lignes",
    swatches: [
      { name: "bg", hex: "#F5F6FB", cls: "bg-bg" },
      { name: "surface", hex: "#FFFFFF", cls: "bg-surface" },
      { name: "surface-2", hex: "#ECEEF8", cls: "bg-surface-2" },
      { name: "line", hex: "#DDE1EE", cls: "bg-line" },
      { name: "line-strong", hex: "#C3C9DD", cls: "bg-line-strong" },
    ],
  },
  {
    title: "Texte",
    swatches: [
      { name: "ink", hex: "#161A36", cls: "bg-ink" },
      { name: "ink-2", hex: "#474D6E", cls: "bg-ink-2" },
      { name: "ink-3", hex: "#646B8F", cls: "bg-ink-3" },
    ],
  },
  {
    title: "Marque",
    swatches: [
      { name: "brand", hex: "#4F46E5", cls: "bg-brand" },
      { name: "brand-strong", hex: "#4338CA", cls: "bg-brand-strong" },
      { name: "brand-soft", hex: "#EEF0FF", cls: "bg-brand-soft" },
    ],
  },
  {
    title: "Réussite",
    swatches: [
      { name: "success", hex: "#047857", cls: "bg-success" },
      { name: "success-soft", hex: "#D1FAE5", cls: "bg-success-soft" },
      { name: "success-ink", hex: "#065F46", cls: "bg-success-ink" },
    ],
  },
  {
    title: "Erreur",
    swatches: [
      { name: "danger", hex: "#DC2626", cls: "bg-danger" },
      { name: "danger-strong", hex: "#B91C1C", cls: "bg-danger-strong" },
      { name: "danger-soft", hex: "#FEE2E2", cls: "bg-danger-soft" },
      { name: "danger-ink", hex: "#991B1B", cls: "bg-danger-ink" },
    ],
  },
  {
    title: "Étoiles",
    swatches: [
      { name: "star", hex: "#F59E0B", cls: "bg-star" },
      { name: "star-soft", hex: "#FEF3C7", cls: "bg-star-soft" },
    ],
  },
];

const SUBJECTS = [
  { theme: "theme-maths", label: "Maths" },
  { theme: "theme-francais", label: "Français" },
  { theme: "theme-anglais", label: "Anglais" },
  { theme: "theme-histoire", label: "Histoire" },
  { theme: "theme-mini-jeux", label: "Mini-jeux" },
] as const;

const SUBJECT_SWATCHES = [
  { name: "accent", cls: "bg-accent" },
  { name: "accent-strong", cls: "bg-accent-strong" },
  { name: "accent-soft", cls: "bg-accent-soft" },
  { name: "accent-ink", cls: "bg-accent-ink" },
] as const;

const PILL =
  "min-h-12 inline-flex items-center text-sm font-body font-semibold rounded-full px-4 border border-line bg-surface text-ink hover:bg-brand-soft";

const PANEL = "bg-surface rounded-[var(--radius-card)] p-4 border border-line shadow-card text-ink";

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
    <section id={id} className="flex flex-col gap-6 scroll-mt-6">
      <h2 className="text-3xl font-display text-ink border-b-2 border-brand pb-2">{title}</h2>
      {children}
    </section>
  );
}

function CatalogItem({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-ink-2 font-mono mb-3">{name}</p>
      {children}
    </div>
  );
}

function Swatch({ name, hex, className }: { name: string; hex?: string; className: string }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className={`w-20 h-20 rounded-[var(--radius-tile)] border border-line ${className}`} />
      <p className="text-xs text-ink text-center font-mono">{name}</p>
      {hex && <p className="text-xs text-ink-3 text-center font-mono">{hex}</p>}
    </div>
  );
}

export default function DesignPage() {
  return (
    <DesignShell>
      <main className="px-6 py-14 flex flex-col gap-16">
        <header className="text-center flex flex-col items-center gap-4">
          <BackLink href="/" label="← Accueil" />
          <Logo size="large" />
          <PageTitle>Design System</PageTitle>
          <PageSubtitle>Composants, tokens et playground des écrans de jeu</PageSubtitle>
          <nav aria-label="Sommaire" className="flex flex-wrap justify-center gap-3 mt-2">
            {TOC.map((item) => (
              <Link key={item.href} href={item.href} className={PILL}>
                {item.label}
              </Link>
            ))}
          </nav>
          <DevicePills />
        </header>

        <Section id="principes" title="Principes">
          <div className="flex flex-col gap-3 text-ink-2 font-body">
            <p>
              Un système clair, calme et lisible, pensé pour la tablette : fond doux, cartes
              blanches, une couleur de marque et un accent par matière.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Contraste élevé : texte encre sur surfaces claires</li>
              <li>Cibles tactiles de 48 px minimum</li>
              <li>Bonne ou mauvaise réponse : jamais la couleur seule, toujours une icône</li>
              <li>Typographie : Fredoka (titres) + Nunito (texte)</li>
            </ul>
          </div>
        </Section>

        <Section id="couleurs" title="Palette de couleurs">
          <div className="flex flex-col gap-8">
            {COLOR_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <p className="text-sm text-ink font-display">{group.title}</p>
                <div className="flex flex-wrap gap-4">
                  {group.swatches.map((s) => (
                    <Swatch key={s.name} name={s.name} hex={s.hex} className={s.cls} />
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <p className="text-sm text-ink font-display">Accents par matière (runtime)</p>
              <div className="grid gap-4 lg:grid-cols-2">
                {SUBJECTS.map((subject) => (
                  <div key={subject.theme} className={`${subject.theme} ${PANEL}`}>
                    <p className="font-display text-lg text-accent-ink mb-3">{subject.label}</p>
                    <div className="flex flex-wrap gap-4">
                      {SUBJECT_SWATCHES.map((s) => (
                        <Swatch key={s.name} name={s.name} className={s.cls} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="typographie" title="Typographie">
          <div className="flex flex-col gap-6 text-ink">
            <div>
              <p className="text-sm text-ink-2 font-mono mb-2">font-display (Fredoka)</p>
              <p className="text-6xl font-display">MiniGenius</p>
              <p className="text-4xl font-display">Titre de page</p>
              <p className="text-2xl font-display">Titre de carte</p>
            </div>
            <div>
              <p className="text-sm text-ink-2 font-mono mb-2">font-body (Nunito)</p>
              <p className="text-xl font-body font-semibold">
                L'app éducative pour les petits génies !
              </p>
              <p className="text-base font-body text-ink-2">Texte courant en encre secondaire.</p>
              <p className="text-sm font-body text-ink-3">Légende et information tertiaire.</p>
            </div>
          </div>
        </Section>

        <Section id="formes" title="Rayons et ombres">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-6">
              {[
                { name: "radius-card 1.25rem", cls: "rounded-[var(--radius-card)]" },
                { name: "radius-btn 0.875rem", cls: "rounded-[var(--radius-btn)]" },
                { name: "radius-tile 1rem", cls: "rounded-[var(--radius-tile)]" },
              ].map((r) => (
                <div key={r.name} className="flex flex-col gap-2 items-center">
                  <div className={`w-24 h-24 bg-brand-soft border-2 border-brand ${r.cls}`} />
                  <p className="text-xs text-ink font-mono">{r.name}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-6 p-6 bg-bg rounded-[var(--radius-card)]">
              {["shadow-card", "shadow-card-hover", "shadow-pop"].map((name) => (
                <div key={name} className="flex flex-col gap-2 items-center">
                  <div
                    className={`w-24 h-24 bg-surface rounded-[var(--radius-card)] border border-line ${name}`}
                  />
                  <p className="text-xs text-ink font-mono">{name}</p>
                </div>
              ))}
            </div>
          </div>
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

            <CatalogItem name="Button — variantes et tailles">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">
                  Primary sm
                </Button>
                <Button variant="primary" size="md">
                  Primary md
                </Button>
                <Button variant="primary" size="lg">
                  Primary lg
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <Button variant="secondary" size="sm">
                  Secondary sm
                </Button>
                <Button variant="secondary" size="md">
                  Secondary md
                </Button>
                <Button variant="secondary" size="lg">
                  Secondary lg
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <Button variant="ghost" size="sm">
                  Ghost sm
                </Button>
                <Button variant="ghost" size="md">
                  Ghost md
                </Button>
                <Button variant="ghost" size="lg">
                  Ghost lg
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
                    <p className="text-base text-ink-2">Avec effet de survol</p>
                  </div>
                </Card>
                <Card disabled hover={false}>
                  <div className="flex-1">
                    <p className="text-2xl font-display">Carte désactivée</p>
                    <p className="text-base text-ink-2">Sans survol, opacité réduite</p>
                  </div>
                </Card>
              </div>
            </CatalogItem>

            <CatalogItem name="Cartes matière (accent runtime)">
              <div className="grid gap-4 lg:grid-cols-2">
                {SUBJECTS.map((subject) => (
                  <div key={subject.theme} className={subject.theme}>
                    <Card>
                      <div className="flex-1">
                        <p className="text-2xl font-display text-accent-ink">{subject.label}</p>
                        <p className="text-base text-ink-2">{subject.theme}</p>
                      </div>
                    </Card>
                  </div>
                ))}
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
            <CatalogItem name="ChoiceGrid (choisis une réponse : bonne = Chien)">
              <div className={PANEL}>
                <ChoiceGridDemo />
              </div>
            </CatalogItem>

            <CatalogItem name="NumPad">
              <div className={PANEL}>
                <NumPadDemo />
              </div>
            </CatalogItem>

            <CatalogItem name="ProgressDots">
              <div className={PANEL}>
                <ProgressDots states={[...PROGRESS_STATES]} current={3} />
              </div>
            </CatalogItem>

            <CatalogItem name="SpeakButton">
              <SpeakButton text="cat" />
            </CatalogItem>

            <CatalogItem name="AnswerInput — idle / correct / wrong">
              <div className="flex flex-wrap gap-4 items-center">
                <AnswerInput value="" state="idle" />
                <AnswerInput value="12" state="correct" />
                <AnswerInput value="9" state="wrong" />
              </div>
            </CatalogItem>

            <CatalogItem name="WordPrompt">
              <div className={PANEL}>
                <WordPrompt prompt="Cat" speakText="cat" />
              </div>
            </CatalogItem>

            <CatalogItem name="ExerciseDisplay">
              <div className={`flex flex-col gap-6 ${PANEL}`}>
                <div>
                  <p className="text-xs font-mono text-ink-3 mb-2">trou</p>
                  <ExerciseDisplay exercise={SAMPLE_EXERCISE} />
                </div>
                <div>
                  <p className="text-xs font-mono text-ink-3 mb-2">reveal</p>
                  <ExerciseDisplay exercise={SAMPLE_EXERCISE} revealAnswer />
                </div>
              </div>
            </CatalogItem>
          </div>
        </Section>

        <Section id="series-result" title="Écrans de jeu">
          <CatalogItem name="SeriesResultScreen — playground">
            <p className="text-sm font-body text-ink-2 mb-4">
              Presets 3 / 6 / 8 / 10 pour les 4 paliers d&apos;étoiles. Le récap (Réussis / À
              revoir) suit le score. Relancer recrée le composant (confettis + son).
            </p>
            <SeriesResultDemo />
          </CatalogItem>
        </Section>

        <footer className="text-center text-sm text-ink-2 pt-8 border-t border-line">
          <p>
            Design system MiniGenius
            <br />
            <Link href="/" className="text-brand font-bold hover:underline">
              Retour à l'accueil
            </Link>
          </p>
        </footer>
      </main>
    </DesignShell>
  );
}
