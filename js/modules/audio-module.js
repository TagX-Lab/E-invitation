/**
 * Audio Module
 * Handles background music and chime sound synthesis.
 */
let audioCtx = null;
let bgmAudio = null;
let isPlaying = false;

export function initAudioModule(config) {
  bgmAudio = document.getElementById('weddingBgm');
  if (bgmAudio) {
    bgmAudio.src = config.src;
    bgmAudio.volume = config.volume;
    bgmAudio.loop = config.loop;
  }
}

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playChimeSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch (e) {
    console.warn('Audio context restricted:', e);
  }
}

export function playBgm(volume = 0.25) {
  if (!bgmAudio) return;
  bgmAudio.volume = volume;
  bgmAudio.play().then(() => {
    isPlaying = true;
    const btn = document.getElementById('musicBtn');
    if (btn) btn.classList.add('playing');
  }).catch(err => {
    console.log('Autoplay restriction handled:', err);
  });
}

export function toggleMusic(volume = 0.25) {
  if (!bgmAudio) return;
  const btn = document.getElementById('musicBtn');
  if (bgmAudio.paused) {
    bgmAudio.volume = volume;
    bgmAudio.play();
    isPlaying = true;
    if (btn) btn.classList.add('playing');
  } else {
    bgmAudio.pause();
    isPlaying = false;
    if (btn) btn.classList.remove('playing');
  }
}
