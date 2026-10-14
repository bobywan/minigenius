import { SpeakButton } from "@/components/ui/SpeakButton";

type WordPromptProps = {
  prompt: string;
  speakText?: string;
  variant?: "word" | "sentence";
  highlightWord?: string;
};

function PromptText({ prompt, highlightWord }: { prompt: string; highlightWord?: string }) {
  if (highlightWord && prompt.includes(highlightWord)) {
    return (
      <>
        <span className="text-emerald-500 font-bold underline underline-offset-4 decoration-current decoration-4">
          {highlightWord}
        </span>
        {prompt.slice(prompt.indexOf(highlightWord) + highlightWord.length)}
      </>
    );
  }

  const blankAt = prompt.indexOf("___");
  if (blankAt === -1) return prompt;

  return (
    <>
      {prompt.slice(0, blankAt)}
      <span className="mx-1 inline-block min-w-10 border-b-4 border-sky-800 align-baseline">
        <span className="sr-only">trou</span>
      </span>
      {prompt.slice(blankAt + 3)}
    </>
  );
}

export function WordPrompt({
  prompt,
  speakText,
  variant = "word",
  highlightWord,
}: WordPromptProps) {
  const sizeClass = variant === "sentence" ? "text-2xl leading-snug text-center" : "text-4xl";

  return (
    <div className="w-full">
      <div className="flex gap-3 flex-wrap items-center justify-center">
        <p className={`${sizeClass} font-bold text-sky-800`}>
          <PromptText prompt={prompt} highlightWord={highlightWord} />
        </p>
        {speakText && <SpeakButton text={speakText} />}
      </div>
    </div>
  );
}
