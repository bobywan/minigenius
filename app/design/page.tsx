import type { Metadata } from "next";
import Link from "next/link";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
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
      <p className="text-xs text-neutral-300 text-center font-mono">{name}</p>
      {hex && <p className="text-xs text-neutral-500 font-mono">{hex}</p>}
    </div>
  );
}

const NAV_LINKS = [
  { href: "#principes", label: "Principes" },
  { href: "#couleurs", label: "Couleurs" },
  { href: "#typographie", label: "Typographie" },
  { href: "#composants", label: "Composants" },
];

export default function DesignPage() {
  return (
    <div className="min-h-screen">
      {/* Nav sticky */}
      <nav className="sticky top-0 z-50 bg-neutral-900/90 backdrop-blur border-b border-white/10 px-6 py-3 flex items-center gap-6">
        <Link href="/" className="text-yellow-500 font-display text-lg mr-4">
          MiniGenius
        </Link>
        <p className="text-neutral-400 text-sm hidden sm:block font-body">Design system</p>
        <div className="flex gap-4 ml-auto">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-300 hover:text-brand-400 transition-colors font-body"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-14 flex flex-col gap-16">
        <header>
          <p className="text-neutral-400 text-sm mb-2 font-body">
            <Link href="/" className="hover:text-brand-400 transition-colors">
              ← Accueil
            </Link>
          </p>
          <h1 className="text-4xl font-display text-white">Design system</h1>
          <p className="text-neutral-300 mt-2 font-body">
            Référence des tokens et des composants d'interface.
          </p>
        </header>

        {/* PRINCIPES */}
        <Section id="principes" title="Principes">
          <GlassCard className="p-6 flex flex-col gap-3">
            <ul className="flex flex-col gap-2 text-neutral-300 text-sm list-disc list-inside font-body">
              <li>
                Tokens sémantiques uniquement :{" "}
                <code className="text-brand-400 text-xs bg-brand-500/20 px-1.5 py-0.5 rounded">
                  brand-*
                </code>
                ,{" "}
                <code className="text-accent-400 text-xs bg-accent-500/20 px-1.5 py-0.5 rounded">
                  accent-*
                </code>
                ,{" "}
                <code className="text-yellow-400 text-xs bg-yellow-500/20 px-1.5 py-0.5 rounded">
                  yellow-*
                </code>
                ,{" "}
                <code className="text-success-400 text-xs bg-success-500/20 px-1.5 py-0.5 rounded">
                  success-*
                </code>
                ,{" "}
                <code className="text-error-400 text-xs bg-error-500/20 px-1.5 py-0.5 rounded">
                  error-*
                </code>
                ,{" "}
                <code className="text-neutral-300 text-xs bg-white/5 px-1.5 py-0.5 rounded">
                  neutral-*
                </code>
                .
              </li>
              <li>
                Dark mode permanent — fond violet profond{" "}
                <code className="text-xs bg-white/5 px-1 rounded">#1a0e3a</code> →{" "}
                <code className="text-xs bg-white/5 px-1 rounded">#2d1b69</code>.
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
                <code className="text-xs bg-white/5 px-1 rounded">--shadow-btn</code>, etc. —
                décalage vers le bas simulant la profondeur.
              </li>
              <li>
                Cartes solides (<code className="text-xs bg-white/5 px-1 rounded">GlassCard</code>)
                — pas de glassmorphism.
              </li>
            </ul>
          </GlassCard>
        </Section>

        {/* COULEURS */}
        <Section id="couleurs" title="Couleurs">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm font-display text-neutral-300 mb-4 uppercase tracking-wide">
                Fond
              </p>
              <div className="flex gap-4 flex-wrap">
                <Swatch name="bg-deep" className="bg-bg-deep" hex="#1a0e3a" />
                <Swatch name="bg-surface" className="bg-bg-surface" hex="#2d1b69" />
                <Swatch name="bg-card" className="bg-bg-card" hex="#3a2480" />
                <Swatch name="bg-card-hover" className="bg-bg-card-hover" hex="#4a2fa0" />
              </div>
            </div>
            <div>
              <p className="text-sm font-display text-neutral-300 mb-4 uppercase tracking-wide">
                Brand — rose vif
              </p>
              <div className="flex gap-4 flex-wrap">
                <Swatch name="brand-400" className="bg-brand-400" hex="#ff6ec7" />
                <Swatch name="brand-500" className="bg-brand-500" hex="#ff4eb8" />
              </div>
            </div>
            <div>
              <p className="text-sm font-display text-neutral-300 mb-4 uppercase tracking-wide">
                Accent — orange
              </p>
              <div className="flex gap-4 flex-wrap">
                <Swatch name="accent-400" className="bg-accent-400" hex="#ffaa4d" />
                <Swatch name="accent-500" className="bg-accent-500" hex="#ff8c00" />
              </div>
            </div>
            <div>
              <p className="text-sm font-display text-neutral-300 mb-4 uppercase tracking-wide">
                Yellow — titres / highlights
              </p>
              <div className="flex gap-4 flex-wrap">
                <Swatch name="yellow-400" className="bg-yellow-400" hex="#ffe566" />
                <Swatch name="yellow-500" className="bg-yellow-500" hex="#ffe600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-display text-neutral-300 mb-4 uppercase tracking-wide">
                Succès — vert lime
              </p>
              <div className="flex gap-4 flex-wrap">
                <Swatch name="success-400" className="bg-success-400" hex="#7fff6e" />
                <Swatch name="success-500" className="bg-success-500" hex="#3dff91" />
              </div>
            </div>
            <div>
              <p className="text-sm font-display text-neutral-300 mb-4 uppercase tracking-wide">
                Erreur — rouge-orange
              </p>
              <div className="flex gap-4 flex-wrap">
                <Swatch name="error-400" className="bg-error-400" hex="#ff6b6b" />
                <Swatch name="error-500" className="bg-error-500" hex="#ff4757" />
              </div>
            </div>
            <div>
              <p className="text-sm font-display text-neutral-300 mb-4 uppercase tracking-wide">
                Neutres — chauds violacés
              </p>
              <div className="flex gap-4 flex-wrap">
                {(["900", "800", "700", "600", "500", "300", "100", "50"] as const).map((n) => (
                  <Swatch key={n} name={`neutral-${n}`} className={`bg-neutral-${n}`} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* TYPOGRAPHIE */}
        <Section id="typographie" title="Typographie">
          <GlassCard className="p-6 flex flex-col gap-8">
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-4 font-body">
                font-display — Titan One (titres, chiffres de jeu)
              </p>
              <div className="flex flex-col gap-3">
                <p className="text-2xl text-white font-display">text-2xl — Sections</p>
                <p className="text-3xl text-white font-display">text-3xl — Titres de page</p>
                <p className="text-4xl text-yellow-400 font-display">text-4xl — Hero</p>
                <p className="text-5xl text-brand-400 font-display">text-5xl — Calculs</p>
                <p className="text-6xl text-white font-display">
                  Mini<span className="text-yellow-500">Genius</span>
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-4 font-body">
                font-body — Nunito (texte courant)
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-neutral-400 font-body">text-xs — labels, badges</p>
                <p className="text-sm text-neutral-300 font-body">text-sm — métadonnées</p>
                <p className="text-base text-neutral-100 font-body">text-base — corps principal</p>
                <p className="text-lg text-neutral-100 font-body">text-lg — sous-titres</p>
              </div>
            </div>
          </GlassCard>
        </Section>

        {/* COMPOSANTS */}
        <Section id="composants" title="Composants">
          <div className="flex flex-col gap-10">
            {/* GlassCard */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-display text-neutral-300 uppercase tracking-wide">
                GlassCard — variantes
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(["default", "brand", "accent", "success", "error", "yellow"] as const).map(
                  (v) => (
                    <GlassCard key={v} variant={v} className="p-4 flex flex-col items-center gap-1">
                      <p className="text-xs text-neutral-400 font-body">variant=</p>
                      <p className="text-sm font-display text-white">{v}</p>
                    </GlassCard>
                  ),
                )}
              </div>
            </div>

            {/* NeonButton — 3D */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-display text-neutral-300 uppercase tracking-wide">
                NeonButton — Effet 3D au clic
              </p>
              <div className="flex gap-3 flex-wrap">
                <NeonButton variant="brand">Brand</NeonButton>
                <NeonButton variant="accent">Accent</NeonButton>
                <NeonButton variant="success">Succès</NeonButton>
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
              <p className="text-sm font-display text-neutral-300 uppercase tracking-wide">
                DifficultyBadge
              </p>
              <div className="flex gap-3 flex-wrap items-center">
                <DifficultyBadge difficulty="facile" />
                <DifficultyBadge difficulty="moyen" />
                <DifficultyBadge difficulty="expert" />
                <DifficultyBadge difficulty="facile" size="md" />
                <DifficultyBadge difficulty="moyen" size="md" />
                <DifficultyBadge difficulty="expert" size="md" />
              </div>
            </div>

            {/* StarRating */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-display text-neutral-300 uppercase tracking-wide">
                StarRating
              </p>
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
              <p className="text-sm font-display text-neutral-300 uppercase tracking-wide">
                ProgressDots
              </p>
              <GlassCard className="p-5">
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
              </GlassCard>
            </div>

            {/* Ombres 3D */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-display text-neutral-300 uppercase tracking-wide">
                Ombres 3D cartoon
              </p>
              <div className="flex gap-4 flex-wrap">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-10 rounded-xl bg-bg-card border-2 border-white/20 shadow-[var(--shadow-card)]" />
                  <p className="text-xs text-neutral-400 font-mono">--shadow-card</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-10 rounded-xl bg-brand-500 border-2 border-brand-400 shadow-[var(--shadow-brand)]" />
                  <p className="text-xs text-neutral-400 font-mono">--shadow-brand</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-10 rounded-xl bg-success-500 border-2 border-success-400 shadow-[var(--shadow-success)]" />
                  <p className="text-xs text-neutral-400 font-mono">--shadow-success</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-10 rounded-xl bg-error-500 border-2 border-error-400 shadow-[var(--shadow-error)]" />
                  <p className="text-xs text-neutral-400 font-mono">--shadow-error</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
