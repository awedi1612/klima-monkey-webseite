const SOUND_STORAGE_KEY = "km-monkey-catch-sound";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) return null;
  if (!ctx) ctx = new AudioCtor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

// Creates/unlocks the AudioContext from within a user-gesture handler (e.g. a click).
export function primeAudio() {
  getCtx();
}

export function isSoundEnabled() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(SOUND_STORAGE_KEY) !== "off";
}

export function setSoundEnabled(enabled: boolean) {
  window.localStorage.setItem(SOUND_STORAGE_KEY, enabled ? "on" : "off");
}

function tone(
  freq: number,
  duration: number,
  opts: { type?: OscillatorType; delay?: number; gain?: number } = {}
) {
  const audio = getCtx();
  if (!audio) return;
  const { type = "sine", delay = 0, gain = 0.08 } = opts;

  const osc = audio.createOscillator();
  const gainNode = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;

  const startAt = audio.currentTime + delay;
  gainNode.gain.setValueAtTime(0, startAt);
  gainNode.gain.linearRampToValueAtTime(gain, startAt + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  osc.connect(gainNode).connect(audio.destination);
  osc.start(startAt);
  osc.stop(startAt + duration + 0.02);
}

export function playCatchGood() {
  if (!isSoundEnabled()) return;
  tone(660, 0.12, { type: "triangle", gain: 0.07 });
}

export function playCatchBonus() {
  if (!isSoundEnabled()) return;
  tone(660, 0.1, { type: "triangle", gain: 0.08 });
  tone(990, 0.16, { type: "triangle", gain: 0.08, delay: 0.08 });
}

export function playCatchBad() {
  if (!isSoundEnabled()) return;
  tone(160, 0.18, { type: "sawtooth", gain: 0.05 });
}

export function playGameOver() {
  if (!isSoundEnabled()) return;
  tone(523, 0.12, { gain: 0.07 });
  tone(659, 0.12, { delay: 0.12, gain: 0.07 });
  tone(784, 0.22, { delay: 0.24, gain: 0.07 });
}
