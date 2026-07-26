import type { Metadata } from "next";
import Link from "next/link";
import { NumPadDemo } from "@/app/design/NumPadDemo";
import { ExerciseDisplay } from "@/components/game/ExerciseDisplay";
import { AnswerInput } from "@/components/ui/AnswerInput";
import { BackLink } from "@/components/ui/BackLink";
import { BadgeModule } from "@/components/ui/BadgeModule";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Logo } from "@/components/ui/Logo";
import { NeonButton } from "@/components/ui/NeonButton";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { StarRating } from "@/components/ui/StarRating";

export const metadata: Metadata = {
  title: "Design System — MiniGenius",
  description: "Référence des tokens et des composants d'interface MiniGenius.",
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
      <h2 className="text-2xl font-display text-white border-b border-white/10 pb-3">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ name, className, hex }: { name: string; className: string; hex?: string }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className={`w-16 h-16 rounded-2xl border-2 border-white/10 shadow-[var(--shadow-card)] ${className}`}
      />
      <p className="text-xs text-neutral-50 text-center font-mono">{name}</p>
      {hex && <p className="text-xs text-neutral-50 font-mono">{hex}</p>}
    </div>
  );
}

const NAV_LINKS = [
  { href: "#principes", label: "Principes" },
  { href: "#couleurs", label: "Couleurs" },
  { href: "#typographie", label: "Typographie" },
  { href: "#composants", label: "Composants" },
  { href: "#jeu", label: "Jeu" },
  { href: "#navigation", label: "Navigation" },
];

export default function DesignPage() {
  return (
    <div className="min-h-screen max-w-[1000px] mx-auto w-full">
      {/* Nav sticky */}
      <nav className="sticky top-0 z-50 bg-neutral-900/90 backdrop-blur border-b border-white/10 px-6 py-3 flex items-center gap-6">
        <Link href="/" className="text-yellow-500 font-display text-lg mr-4">
          MiniGenius
        </Link>
        <p className="text-neutral-50 text-sm hidden sm:block font-body">Design system</p>
        <div className="flex gap-4 ml-auto">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-50 hover:text-pink-400 transition-colors font-body"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="px-6 py-14 flex flex-col gap-16">
        <header className="text-center flex flex-col items-center gap-4">
          <BackLink href="/" label="← Accueil" />
          <PageTitle>Design system</PageTitle>
          <PageSubtitle>Référence des tokens et des composants d'interface.</PageSubtitle>
        </header>

        {/* PRINCIPES */}
        <Section id="principes" title="Principes">
          <ul className="flex flex-col gap-2 text-neutral-50 text-sm list-disc list-inside font-body">
            <li>
              Tokens de couleur génériques :{" "}
              <code className="text-pink-400 text-xs bg-pink-500/20 px-1.5 py-0.5 rounded">
                pink-*
              </code>
              ,{" "}
              <code className="text-orange-400 text-xs bg-orange-500/20 px-1.5 py-0.5 rounded">
                orange-*
              </code>
              ,{" "}
              <code className="text-yellow-400 text-xs bg-yellow-500/20 px-1.5 py-0.5 rounded">
                yellow-*
              </code>
              ,{" "}
              <code className="text-green-400 text-xs bg-green-500/20 px-1.5 py-0.5 rounded">
                green-*
              </code>
              ,{" "}
              <code className="text-red-400 text-xs bg-red-500/20 px-1.5 py-0.5 rounded">
                red-*
              </code>
              ,{" "}
              <code className="text-neutral-50 text-xs bg-white/5 px-1.5 py-0.5 rounded">
                neutral-*
              </code>
              .
            </li>
            <li>
              Dark mode permanent — fond bleu vif{" "}
              <code className="text-xs bg-white/5 px-1 rounded">#115ded</code> →{" "}
              <code className="text-xs bg-white/5 px-1 rounded">#49ebfe</code>.
            </li>
            <li>
              Typographie : <code className="text-xs bg-white/5 px-1 rounded">font-display</code>{" "}
              (Titan One) pour les titres et chiffres de jeu.{" "}
              <code className="text-xs bg-white/5 px-1 rounded">font-body</code> (Nunito) pour le
              texte courant.
            </li>
            <li>
              Ombres 3D cartoon :{" "}
              <code className="text-xs bg-white/5 px-1 rounded">--shadow-card</code>,{" "}
              <code className="text-xs bg-white/5 px-1 rounded">--shadow-btn</code>, etc. — décalage
              vers le bas simulant la profondeur.
            </li>
            <li>
              H1 de page : toujours blanc, première lettre en{" "}
              <span className="text-yellow-500 font-display">jaune</span>.
            </li>
            <li>
              <code className="text-xs bg-white/5 px-1 rounded">GlassCard</code> : style unique —
              modifier <code className="text-xs bg-white/5 px-1 rounded">GlassCard.tsx</code> pour
              changer l'apparence de toutes les cartes.
            </li>
          </ul>
        </Section>

        {/* COULEURS */}
        <Section id="couleurs" title="Couleurs">
          <div className="flex flex-col gap-8">
            <div>
              <PageSubtitle>Fond</PageSubtitle>
              <div className="flex gap-4 flex-wrap">
                <Swatch name="blue" className="bg-blue" hex="#115ded" />
                <Swatch name="cyan" className="bg-cyan" hex="#49ebfe" />
                <Swatch name="purple" className="bg-purple" hex="#3a2480" />
                <Swatch name="purple-light" className="bg-purple-light" hex="#4a2fa0" />
              </div>
            </div>
            <div>
              <PageSubtitle>Rose vif</PageSubtitle>
              <div className="flex gap-4 flex-wrap">
                <Swatch name="pink-400" className="bg-pink-400" hex="#ff6ec7" />
                <Swatch name="pink-500" className="bg-pink-500" hex="#ff4eb8" />
              </div>
            </div>
            <div>
              <p className="text-sm font-display text-neutral-50 mb-4 uppercase tracking-wide">
                Orange
              </p>
              <div className="flex gap-4 flex-wrap">
                <Swatch name="orange-400" className="bg-orange-400" hex="#ffaa4d" />
                <Swatch name="orange-500" className="bg-orange-500" hex="#ff8c00" />
              </div>
            </div>
            <div>
              <PageSubtitle>Jaune — titres / highlights</PageSubtitle>
              <div className="flex gap-4 flex-wrap">
                <Swatch name="yellow-400" className="bg-yellow-400" hex="#ffe566" />
                <Swatch name="yellow-500" className="bg-yellow-500" hex="#ffe600" />
              </div>
            </div>
            <div>
              <PageSubtitle>Vert lime</PageSubtitle>
              <div className="flex gap-4 flex-wrap">
                <Swatch name="green-400" className="bg-green-400" hex="#7fff6e" />
                <Swatch name="green-500" className="bg-green-500" hex="#3dff91" />
              </div>
            </div>
            <div>
              <PageSubtitle>Rouge-orange</PageSubtitle>
              <div className="flex gap-4 flex-wrap">
                <Swatch name="red-400" className="bg-red-400" hex="#ff6b6b" />
                <Swatch name="red-500" className="bg-red-500" hex="#ff4757" />
              </div>
            </div>
            <div>
              <PageSubtitle>Neutres — chauds violacés</PageSubtitle>
              <div className="flex gap-4 flex-wrap">
                {(["900", "700", "600", "100", "50"] as const).map((n) => (
                  <Swatch key={n} name={`neutral-${n}`} className={`bg-neutral-${n}`} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* TYPOGRAPHIE */}
        <Section id="typographie" title="Typographie">
          <div>
            <PageSubtitle>font-display — Titan One (titres, chiffres de jeu)</PageSubtitle>
            <div className="flex flex-col gap-3">
              <p className="text-2xl text-white font-display">text-2xl — Sections</p>
              <p className="text-3xl text-white font-display">text-3xl — Titres de page</p>
              <p className="text-4xl text-yellow-400 font-display">text-4xl — Hero</p>
              <p className="text-5xl text-pink-400 font-display">text-5xl — Calculs</p>
              <p className="text-6xl text-white font-display">
                Mini<span className="text-yellow-500">Genius</span>
              </p>
            </div>
          </div>
          <div>
            <PageSubtitle>font-body — Nunito (texte courant)</PageSubtitle>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-neutral-50 font-body">text-xs — labels, badges</p>
              <p className="text-sm text-neutral-50 font-body">text-sm — métadonnées</p>
              <p className="text-base text-neutral-100 font-body">text-base — corps principal</p>
              <p className="text-lg text-neutral-100 font-body">text-lg — sous-titres</p>
            </div>
          </div>
        </Section>

        {/* COMPOSANTS */}
        <Section id="composants" title="Composants">
          <div className="flex flex-col gap-10">
            {/* BadgeModule */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>BadgeModule — fond rose uniforme</PageSubtitle>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <BadgeModule module="addition" href="/maths/addition" totalStars={3} />
                <BadgeModule module="soustraction" href="/maths/soustraction" totalStars={2} />
                <BadgeModule module="multiplication" href="/maths/multiplication" totalStars={1} />
                <BadgeModule module="division" href="/maths/division" totalStars={0} />
              </div>
            </div>

            {/* GlassCard */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>GlassCard — style unique</PageSubtitle>
              <p className="text-xs text-neutral-50 font-body">
                Modifier le dégradé dans{" "}
                <code className="text-pink-400 bg-pink-500/20 px-1.5 py-0.5 rounded">
                  components/ui/GlassCard.tsx
                </code>{" "}
                pour changer l'apparence de toutes les cartes en une fois.
              </p>
              <GlassCard className="p-6 flex flex-col items-center gap-2">
                <p className="text-lg font-display text-white">Exemple de carte</p>
                <p className="text-sm text-white/80 font-body">Contenu quelconque</p>
              </GlassCard>
            </div>

            {/* NeonButton — 3D */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>NeonButton — Effet 3D au clic</PageSubtitle>
              <div className="flex gap-3 flex-wrap">
                <NeonButton variant="brand">Rose</NeonButton>
                <NeonButton variant="accent">Orange</NeonButton>
                <NeonButton variant="success">Vert</NeonButton>
                <NeonButton variant="yellow">Jaune</NeonButton>
                <NeonButton variant="ghost">Ghost</NeonButton>
                <NeonButton variant="brand" disabled>
                  Désactivé
                </NeonButton>
              </div>
              <div className="flex gap-3 flex-wrap">
                <NeonButton variant="brand" size="sm">
                  Petit
                </NeonButton>
                <NeonButton variant="brand" size="md">
                  Moyen
                </NeonButton>
                <NeonButton variant="brand" size="lg">
                  Grand
                </NeonButton>
              </div>
            </div>

            {/* DifficultyBadge */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>DifficultyBadge</PageSubtitle>
              <div className="flex gap-3 flex-wrap items-center">
                <DifficultyBadge difficulty="facile" />
                <DifficultyBadge difficulty="moyen" />
                <DifficultyBadge difficulty="expert" />
              </div>
            </div>

            {/* StarRating */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>StarRating</PageSubtitle>
              <div className="flex gap-6 flex-wrap items-center">
                <StarRating stars={0} />
                <StarRating stars={1} />
                <StarRating stars={2} />
                <StarRating stars={3} />
                <StarRating stars={3} size="lg" />
              </div>
            </div>

            {/* ProgressDots */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>ProgressDots</PageSubtitle>
              <ProgressDots
                total={10}
                states={[
                  "correct",
                  "correct",
                  "correct",
                  "wrong",
                  "correct",
                  "idle",
                  "idle",
                  "idle",
                  "idle",
                  "idle",
                ]}
                current={5}
              />
            </div>

            {/* Ombres 3D */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>Ombres 3D cartoon</PageSubtitle>
              <div className="flex gap-4 flex-wrap">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-10 rounded-xl bg-purple border-2 border-white/20 shadow-[var(--shadow-card)]" />
                  <p className="text-xs text-neutral-50 font-mono">--shadow-card</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-10 rounded-xl bg-pink-500 border-2 border-pink-400 shadow-[var(--shadow-pink)]" />
                  <p className="text-xs text-neutral-50 font-mono">--shadow-pink</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-10 rounded-xl bg-green-500 border-2 border-green-400 shadow-[var(--shadow-green)]" />
                  <p className="text-xs text-neutral-50 font-mono">--shadow-green</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-10 rounded-xl bg-red-500 border-2 border-red-400 shadow-[var(--shadow-red)]" />
                  <p className="text-xs text-neutral-50 font-mono">--shadow-red</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-10 rounded-xl bg-orange-500 border-2 border-orange-400 shadow-[var(--shadow-orange)]" />
                  <p className="text-xs text-neutral-50 font-mono">--shadow-orange</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-10 rounded-xl bg-purple border-2 border-white/30 shadow-[var(--shadow-btn)]" />
                  <p className="text-xs text-neutral-50 font-mono">--shadow-btn</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* JEU */}
        <Section id="jeu" title="Composants de jeu">
          <div className="flex flex-col gap-10">
            {/* Logo */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>Logo</PageSubtitle>
              <Logo />
            </div>

            {/* ExerciseDisplay */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>ExerciseDisplay</PageSubtitle>
              <GlassCard className="p-6 flex items-center justify-center">
                <ExerciseDisplay
                  exercise={{ left: 7, op: "+", right: null, result: 12, answer: 5 }}
                />
              </GlassCard>
              <GlassCard className="p-6 flex items-center justify-center">
                <ExerciseDisplay
                  exercise={{ left: 7, op: "+", right: null, result: 12, answer: 5 }}
                  revealAnswer
                />
              </GlassCard>
            </div>

            {/* AnswerInput */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>AnswerInput — 3 états</PageSubtitle>
              <div className="flex gap-6 flex-wrap items-center justify-center">
                <AnswerInput value="" state="idle" />
                <AnswerInput value="42" state="idle" />
                <AnswerInput value="9" state="correct" />
                <AnswerInput value="3" state="wrong" />
              </div>
            </div>

            {/* NumPad */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>NumPad</PageSubtitle>
              <div className="max-w-xs mx-auto w-full">
                <NumPadDemo />
              </div>
            </div>
          </div>
        </Section>

        {/* NAVIGATION & TYPOGRAPHIE DE PAGE */}
        <Section id="navigation" title="Navigation & typographie de page">
          <div className="flex flex-col gap-8">
            {/* BackLink */}
            <div className="flex flex-col gap-3">
              <p className="text-sm text-neutral-50 font-mono">BackLink</p>
              <div className="flex flex-wrap gap-4 items-center">
                <BackLink href="#navigation" />
                <BackLink href="#navigation" label="← Accueil" />
                <BackLink href="#navigation" label="← Quitter" />
                <BackLink href="#navigation" label="← Mini-jeux" />
              </div>
              <p className="text-xs text-neutral-50 font-body">
                Prop <code className="text-pink-400 bg-pink-500/10 px-1 rounded">label</code> —
                défaut : <code className="text-neutral-50 bg-white/5 px-1 rounded">← Retour</code>
              </p>
            </div>

            {/* PageTitle */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>PageTitle</PageSubtitle>
              <div className="flex flex-col gap-2">
                <PageTitle size="6xl">MiniGenius</PageTitle>
                <PageTitle size="5xl">Maths</PageTitle>
                <PageTitle size="4xl">Design system</PageTitle>
              </div>
              <p className="text-xs text-neutral-50 font-body">
                Prop <code className="text-pink-400 bg-pink-500/10 px-1 rounded">size</code> :{" "}
                <code className="text-neutral-50 bg-white/5 px-1 rounded">4xl</code> (défaut) ·{" "}
                <code className="text-neutral-50 bg-white/5 px-1 rounded">5xl</code> ·{" "}
                <code className="text-neutral-50 bg-white/5 px-1 rounded">6xl</code>
              </p>
            </div>

            {/* PageSubtitle */}
            <div className="flex flex-col gap-3">
              <PageSubtitle>PageSubtitle</PageSubtitle>
              <PageSubtitle>Choisis ton opération</PageSubtitle>
              <p className="text-xs text-neutral-50 font-body">
                Texte en{" "}
                <code className="text-neutral-50 bg-white/5 px-1 rounded">font-display xl</code>{" "}
                avec <code className="text-neutral-50 bg-white/5 px-1 rounded">drop-shadow-lg</code>
                .
              </p>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
