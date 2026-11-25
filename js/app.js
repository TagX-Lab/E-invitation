/**
 * Application Bootstrap & Module Orchestrator
 * Connects decoupled micro-modules into a cohesive experience.
 */
import { weddingConfig } from './config.js';
import { initAudioModule, playChimeSound, playBgm, toggleMusic } from './modules/audio-module.js';
import { initCountdown } from './modules/countdown-module.js';
import { initPetalsEngine } from './modules/petals-engine.js';
import { initEnvelopeModule } from './modules/envelope-module.js';
import { initCeremoniesModule, createBlessingParticles } from './modules/ceremonies.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Audio Engine with config
  initAudioModule(weddingConfig.audio);

  // 2. Bind floating music toggle button
  const musicBtn = document.getElementById('musicBtn');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      toggleMusic(weddingConfig.audio.volume);
    });
  }

  // 3. Initialize Live Countdown Timer micro-app
  initCountdown(weddingConfig.event.targetTimestamp);

  // 4. Initialize 3D Petals Engine
  initPetalsEngine('petals-canvas', {
    maxCount: weddingConfig.petals.maxCount,
    marigoldSrc: weddingConfig.petals.marigoldSrc,
    rosePetalSrc: weddingConfig.petals.rosePetalSrc
  });

  // 5. Initialize Ceremonies & Interactive Action Links
  initCeremoniesModule(weddingConfig, playChimeSound);

  // 6. Initialize Envelope Lifecycle & Reveal sequence
  initEnvelopeModule(() => {
    // Envelope unseal sound & BGM playback
    playChimeSound();
    playBgm(weddingConfig.audio.volume);

    // Initial burst of flower blessings
    createBlessingParticles(window.innerWidth / 2, window.innerHeight / 2, 25);
  });
});
