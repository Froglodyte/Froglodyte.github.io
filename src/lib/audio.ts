import { appState } from './state.svelte';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playClick() {
  if (!appState.audioEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    console.warn('Audio Context failed to play click', e);
  }
}

export function playHover() {
  if (!appState.audioEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.015);

    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

    osc.start();
    osc.stop(ctx.currentTime + 0.015);
  } catch (e) {}
}

export function playChime() {
  if (!appState.audioEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const playTone = (freq: number, start: number, duration: number, type: 'sine' | 'triangle' = 'sine') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.04, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      
      osc.start(start);
      osc.stop(start + duration);
    };

    playTone(587.33, now, 0.15); // D5
    playTone(880.00, now + 0.07, 0.25); // A5
  } catch (e) {}
}

export function playSuccess() {
  if (!appState.audioEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const playTone = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.03, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      
      osc.start(start);
      osc.stop(start + duration);
    };

    // Uplifting retro synth progression
    playTone(523.25, now, 0.08); // C5
    playTone(659.25, now + 0.08, 0.08); // E5
    playTone(783.99, now + 0.16, 0.08); // G5
    playTone(1046.50, now + 0.24, 0.25); // C6
  } catch (e) {}
}

export function playError() {
  if (!appState.audioEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(65, ctx.currentTime + 0.22);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch (e) {}
}
