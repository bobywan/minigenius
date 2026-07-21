let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function playNote(
  frequency: number,
  startTime: number,
  duration: number,
  gain: number,
  type: OscillatorType = "sine",
): void {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gainNode = ac.createGain();

  osc.connect(gainNode);
  gainNode.connect(ac.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

export function playSuccess(): void {
  try {
    const ac = getCtx();
    const now = ac.currentTime;
    // Accord majeur Do-Mi-Sol
    playNote(523.25, now, 0.25, 0.3); // Do5
    playNote(659.25, now + 0.06, 0.25, 0.25); // Mi5
    playNote(783.99, now + 0.12, 0.35, 0.25); // Sol5
    playNote(1046.5, now + 0.2, 0.4, 0.2); // Do6
  } catch {
    // Silencieux si Web Audio non disponible
  }
}

export function playError(): void {
  try {
    const ac = getCtx();
    const now = ac.currentTime;
    // Deux beeps descendants doux
    playNote(350, now, 0.18, 0.2, "triangle");
    playNote(280, now + 0.2, 0.25, 0.15, "triangle");
  } catch {
    // Silencieux si Web Audio non disponible
  }
}

export function playUnlock(): void {
  try {
    const ac = getCtx();
    const now = ac.currentTime;
    // Arpège ascendant 5 notes
    const notes = [392, 494, 587, 740, 988]; // Sol4, Si4, Ré5, Fa#5, Si5
    for (const [i, freq] of notes.entries()) {
      playNote(freq, now + i * 0.1, 0.4, 0.2);
    }
  } catch {
    // Silencieux si Web Audio non disponible
  }
}
