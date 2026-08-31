import { SpeakButton } from "@/components/ui/SpeakButton";

type WordPromptProps = {
  prompt: string;
  speakText?: string;
};

export function WordPrompt({ prompt, speakText }: WordPromptProps) {
  return (
    <div className="w-full">
      <div className="flex gap-3 flex-wrap items-center justify-center">
        <p className="text-4xl font-bold">{prompt}</p>
        {speakText && <SpeakButton text={speakText} />}
      </div>
    </div>
  );
}
