import { SpeakButton } from "@/components/ui/SpeakButton";

interface WordPromptProps {
  prompt: string;
  sourceLabel: string;
  /** Mot anglais prononçable affiché à côté du prompt */
  speakText?: string;
  /** Bonne réponse anglaise révélée sous le prompt pendant le feedback */
  revealText?: string;
}

export function WordPrompt({ prompt, speakText, revealText }: WordPromptProps) {
  return (
    <div className="w-full">
      <div className="flex gap-3 flex-wrap items-center justify-center">
        <p className="text-4xl font-bold">{prompt}</p>
        {speakText && <SpeakButton text={speakText} />}
      </div>

      {revealText && (
        <div className="w-full flex gap-3  border-slate-300">
          <p className="text-2xl font-display">{revealText}</p>
          <SpeakButton text={revealText} />
        </div>
      )}
    </div>
  );
}
