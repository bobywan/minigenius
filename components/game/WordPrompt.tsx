import { GlassCard } from "@/components/ui/GlassCard";
import { SpeakButton } from "@/components/ui/SpeakButton";

interface WordPromptProps {
  prompt: string;
  sourceLabel: string;
  /** Mot anglais prononçable affiché à côté du prompt */
  speakText?: string;
  /** Bonne réponse anglaise révélée sous le prompt pendant le feedback */
  revealText?: string;
}

export function WordPrompt({ prompt, sourceLabel, speakText, revealText }: WordPromptProps) {
  return (
    <GlassCard className="p-6 w-full flex flex-col items-center gap-3">
      <p className="text-xs font-display uppercase tracking-wide text-white/80">{sourceLabel}</p>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        <p
          className="text-4xl font-display text-white text-center"
          style={{ textShadow: "var(--text-shadow-solid)" }}
        >
          {prompt}
        </p>
        {speakText && <SpeakButton text={speakText} />}
      </div>

      {revealText && (
        <div className="w-full flex items-center justify-center gap-3 pt-3 border-t-2 border-white/30">
          <p className="text-2xl font-display text-white">{revealText}</p>
          <SpeakButton text={revealText} />
        </div>
      )}
    </GlassCard>
  );
}
