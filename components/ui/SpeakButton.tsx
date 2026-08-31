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
      className="shrink-0 grid place-items-center size-11 rounded-full bg-red-600 text-white active:translate-y-[3px] transition-translate duration-100 cursor-pointer"
    >
      <Volume2 size={20} />
    </button>
  );
}
