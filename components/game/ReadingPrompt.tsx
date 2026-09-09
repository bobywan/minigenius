type ReadingPromptProps = {
  passage: string;
  question: string;
};

export function ReadingPrompt({ passage, question }: ReadingPromptProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-lg font-body text-slate-800 leading-relaxed text-left">{passage}</p>
      <p className="text-2xl font-bold text-center leading-snug text-sky-800">{question}</p>
    </div>
  );
}
