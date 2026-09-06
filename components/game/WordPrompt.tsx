import { SpeakButton } from "@/components/ui/SpeakButton";

type WordPromptProps = {
  prompt: string;
  speakText?: string;
  variant?: "word" | "sentence";
  highlightWord?: string;
};

export function WordPrompt({
  prompt,
  speakText,
  variant = "word",
  highlightWord,
}: WordPromptProps) {
  const sizeClass = variant === "sentence" ? "text-2xl leading-snug text-center" : "text-4xl";

  const content =
    highlightWord && prompt.includes(highlightWord) ? (
      <>
        <span className="text-emerald-500 font-bold underline underline-offset-4 decoration-current decoration-4">
          {highlightWord}
        </span>
        {prompt.slice(prompt.indexOf(highlightWord) + highlightWord.length)}
      </>
    ) : (
      prompt
    );

  return (
    <div className="w-full">
      <div className="flex gap-3 flex-wrap items-center justify-center">
        <p className={`${sizeClass} font-bold`}>{content}</p>
        {speakText && <SpeakButton text={speakText} />}
      </div>
    </div>
  );
}
