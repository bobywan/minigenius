"use client";

import { Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { isSpeechAvailable, speak } from "@/lib/audio/speech";

interface SpeakButtonProps {
  text: string;
  label?: string;
}

export function SpeakButton({ text, label = "Écouter la prononciation" }: SpeakButtonProps) {
  // La détection est client-only : on attend le montage pour éviter un mismatch d'hydratation
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    setAvailable(isSpeechAvailable());
  }, []);

  if (!available) return null;

  return (
    <button
      type="button"
      onClick={() => speak(text)}
      aria-label={label}
      title={label}
      className="shrink-0 grid place-items-center size-11 rounded-full bg-purple text-neutral-100 border-2 border-white/20 shadow-[var(--shadow-btn)] hover:bg-purple-light active:translate-y-[3px] active:shadow-[0_1px_0_#0f0826] transition-all duration-100 cursor-pointer"
    >
      <Volume2 size={22} />
    </button>
  );
}
