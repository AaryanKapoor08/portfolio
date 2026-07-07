/**
 * Tiny procedural "Minecraft-feel" sound effects, synthesized with WebAudio so
 * the site ships zero audio assets (and no copyrighted game sounds). Every
 * function is safe to call anywhere: it no-ops when WebAudio is unavailable
 * (jsdom, old browsers) and the context resumes itself on the first gesture.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AC =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    ctx = new AC();
    master = ctx.createGain();
    // Gentle ceiling so overlapping clicks never clip.
    master.gain.value = 0.55;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function getNoise(ac: AudioContext): AudioBuffer {
  if (noiseBuf) return noiseBuf;
  const len = Math.floor(ac.sampleRate * 0.5);
  noiseBuf = ac.createBuffer(1, len, ac.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return noiseBuf;
}

interface BurstOpts {
  filterType: BiquadFilterType;
  freq: number;
  /** Where the filter sweeps to by the end of the burst. */
  freqEnd?: number;
  q?: number;
  duration: number;
  volume: number;
}

/** A filtered noise burst — the backbone of every "dig" style sound. */
function noiseBurst(ac: AudioContext, opts: BurstOpts, when = 0) {
  const t = ac.currentTime + when;
  const src = ac.createBufferSource();
  src.buffer = getNoise(ac);
  const filter = ac.createBiquadFilter();
  filter.type = opts.filterType;
  filter.frequency.setValueAtTime(opts.freq, t);
  filter.frequency.exponentialRampToValueAtTime(Math.max(opts.freqEnd ?? opts.freq, 30), t + opts.duration);
  filter.Q.value = opts.q ?? 0.9;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(opts.volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + opts.duration);
  src.connect(filter).connect(gain).connect(master!);
  src.start(t, Math.random() * 0.2);
  src.stop(t + opts.duration + 0.05);
}

interface ToneOpts {
  type?: OscillatorType;
  freq: number;
  freqEnd?: number;
  duration: number;
  volume: number;
}

/** A single enveloped oscillator note. */
function tone(ac: AudioContext, opts: ToneOpts, when = 0) {
  const t = ac.currentTime + when;
  const osc = ac.createOscillator();
  osc.type = opts.type ?? 'sine';
  osc.frequency.setValueAtTime(opts.freq, t);
  if (opts.freqEnd) osc.frequency.exponentialRampToValueAtTime(opts.freqEnd, t + opts.duration);
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(opts.volume, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, t + opts.duration);
  osc.connect(gain).connect(master!);
  osc.start(t);
  osc.stop(t + opts.duration + 0.05);
}

export type DigMaterial = 'grass' | 'stone' | 'wood' | 'glass' | 'gravel';

/** Block "dig/place" thunk, tuned per material like the game. */
export function playDig(material: DigMaterial) {
  const ac = getCtx();
  if (!ac) return;
  switch (material) {
    case 'grass':
      noiseBurst(ac, { filterType: 'lowpass', freq: 900, freqEnd: 300, duration: 0.11, volume: 0.5 });
      break;
    case 'stone':
      noiseBurst(ac, { filterType: 'lowpass', freq: 2400, freqEnd: 500, duration: 0.09, volume: 0.55 });
      tone(ac, { type: 'triangle', freq: 140, freqEnd: 90, duration: 0.08, volume: 0.25 });
      break;
    case 'wood':
      noiseBurst(ac, { filterType: 'bandpass', freq: 480, q: 1.6, duration: 0.1, volume: 0.6 });
      tone(ac, { type: 'triangle', freq: 220, freqEnd: 150, duration: 0.09, volume: 0.2 });
      break;
    case 'glass':
      noiseBurst(ac, { filterType: 'highpass', freq: 2600, duration: 0.14, volume: 0.35 });
      tone(ac, { type: 'sine', freq: 1900, freqEnd: 1400, duration: 0.1, volume: 0.15 });
      break;
    case 'gravel':
      noiseBurst(ac, { filterType: 'lowpass', freq: 1400, freqEnd: 400, duration: 0.13, volume: 0.5 });
      noiseBurst(ac, { filterType: 'lowpass', freq: 1100, freqEnd: 350, duration: 0.1, volume: 0.35 }, 0.05);
      break;
  }
}

/** TNT — a deep, rounded boom (no ear-splitting bang). */
export function playBoom() {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, { type: 'sine', freq: 110, freqEnd: 34, duration: 0.5, volume: 0.7 });
  noiseBurst(ac, { filterType: 'lowpass', freq: 700, freqEnd: 80, duration: 0.45, volume: 0.45 });
}

/** The classic quick upward "pop" used for UI clicks. */
export function playPop() {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, { type: 'sine', freq: 330, freqEnd: 940, duration: 0.09, volume: 0.35 });
}

/** Soft two-note chime (C5 → G5) — used by the Claude spark. */
export function playChime() {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, { type: 'sine', freq: 523.25, duration: 0.25, volume: 0.22 });
  tone(ac, { type: 'sine', freq: 783.99, duration: 0.3, volume: 0.18 }, 0.09);
}

/** Scissor-y double click — the OpenClaw pincer snipping shut. */
export function playSnip() {
  const ac = getCtx();
  if (!ac) return;
  noiseBurst(ac, { filterType: 'bandpass', freq: 3200, q: 2.5, duration: 0.035, volume: 0.4 });
  noiseBurst(ac, { filterType: 'bandpass', freq: 2600, q: 2.5, duration: 0.045, volume: 0.45 }, 0.08);
  tone(ac, { type: 'triangle', freq: 340, freqEnd: 220, duration: 0.06, volume: 0.12 }, 0.08);
}

/** A short bee buzz: two detuned saws through a lowpass. */
export function playBuzz() {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.14, t + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 700;
  filter.connect(gain).connect(master!);
  for (const f of [172, 181]) {
    const osc = ac.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(f, t);
    osc.frequency.linearRampToValueAtTime(f * 0.85, t + 0.35);
    osc.connect(filter);
    osc.start(t);
    osc.stop(t + 0.4);
  }
}

/** XP-orb style pling: a bright random-pitched pluck with a fifth on top. */
export function playXp() {
  const ac = getCtx();
  if (!ac) return;
  const base = 900 + Math.random() * 700;
  tone(ac, { type: 'sine', freq: base, duration: 0.22, volume: 0.25 });
  tone(ac, { type: 'sine', freq: base * 1.5, duration: 0.28, volume: 0.18 }, 0.06);
}
