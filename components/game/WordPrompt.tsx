import { SpeakButton } from "@/components/ui/SpeakButton";

type WordPromptProps = {
  prompt: string;
  speakText?: string;
  variant?: "word" | "sentence";
};

export function WordPrompt({ prompt, speakText, variant = "word" }: WordPromptProps) {
  const sizeClass = variant === "sentence" ? "text-2xl leading-snug text-center" : "text-4xl";

  return (
    <div className="w-full">
      <div className="flex gap-3 flex-wrap items-center justify-center">
        <p className={`${sizeClass} font-bold`}>{prompt}</p>
        {speakText && <SpeakButton text={speakText} />}
      </div>
    </div>
  );
}
