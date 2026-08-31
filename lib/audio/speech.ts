export function englishAudioSlug(word: string): string {
  return word.trim().toLowerCase().replace(/\s+/g, "-");
}

export function isSpeechAvailable(): boolean {
  return typeof window !== "undefined" && typeof Audio !== "undefined";
}

let current: HTMLAudioElement | null = null;

function stopAll(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (current) {
    current.pause();
    current.removeAttribute("src");
    current.load();
    current = null;
  }
}

function fallbackSpeak(text: string): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const en = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("en"));
  if (en) utterance.voice = en;
  utterance.lang = en?.lang ?? "en-US";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

export function speak(text: string): void {
  if (!isSpeechAvailable()) return;
  stopAll();

  let usedFallback = false;
  const useFallback = () => {
    if (usedFallback) return;
    usedFallback = true;
    fallbackSpeak(text);
  };

  const audio = new Audio(`/audio/en/${englishAudioSlug(text)}.mp3`);
  current = audio;
  audio.addEventListener("error", () => {
    if (current === audio) current = null;
    useFallback();
  });
  void audio.play().catch(useFallback);
}
