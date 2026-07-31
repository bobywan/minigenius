export function isSpeechAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string): void {
  if (!isSpeechAvailable()) return;
  try {
    // Une lecture en cours bloquerait la suivante sur certains navigateurs
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.5;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Silencieux si la synthèse vocale échoue
  }
}
