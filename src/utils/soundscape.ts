/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Procedural Web Audio API soundscape synthesizer for African Savannah and Coastal environments
// 100% generated in real-time code — zero external audio files or 404s.

class SafariSoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private savannahNodes: { stop: () => void } | null = null;
  private currentMode: 'savannah' | 'ocean' | 'night' = 'savannah';

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(this.currentMode);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setMode(mode: 'savannah' | 'ocean' | 'night') {
    this.currentMode = mode;
    if (this.isPlaying) {
      this.stop();
      this.start(mode);
    }
  }

  public start(mode: 'savannah' | 'ocean' | 'night' = 'savannah') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.stop();

    this.isPlaying = true;
    this.currentMode = mode;

    if (mode === 'ocean') {
      this.savannahNodes = this.createOceanWaves();
    } else {
      this.savannahNodes = this.createSavannahAmbiance(mode === 'night');
    }
  }

  public stop() {
    if (this.savannahNodes) {
      this.savannahNodes.stop();
      this.savannahNodes = null;
    }
    this.isPlaying = false;
  }

  private createSavannahAmbiance(isNight: boolean): { stop: () => void } {
    if (!this.ctx || !this.masterGain) return { stop: () => {} };

    // 1. Savannah Wind (filtered white noise)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(isNight ? 180 : 320, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(1.8, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    whiteNoise.connect(bandpass);
    bandpass.connect(windGain);
    windGain.connect(this.masterGain);
    whiteNoise.start();

    // 2. Procedural Crickets / Cicadas generator
    let cricketTimer: number | null = null;
    const triggerCricketChirp = () => {
      if (!this.ctx || !this.isPlaying || !this.masterGain) return;
      try {
        const osc = this.ctx.createOscillator();
        const chirpGain = this.ctx.createGain();
        const baseFreq = isNight ? 4800 + Math.random() * 600 : 5600 + Math.random() * 800;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

        chirpGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        chirpGain.gain.exponentialRampToValueAtTime(0.035, this.ctx.currentTime + 0.04);
        chirpGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

        osc.connect(chirpGain);
        chirpGain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.14);
      } catch {
        // ignore audio teardown hiccups
      }

      const nextInterval = isNight ? 80 + Math.random() * 140 : 150 + Math.random() * 350;
      cricketTimer = window.setTimeout(triggerCricketChirp, nextInterval);
    };

    triggerCricketChirp();

    return {
      stop: () => {
        try {
          whiteNoise.stop();
          whiteNoise.disconnect();
        } catch { /* ignore */ }
        if (cricketTimer) clearTimeout(cricketTimer);
      }
    };
  }

  private createOceanWaves(): { stop: () => void } {
    if (!this.ctx || !this.masterGain) return { stop: () => {} };

    // Ocean swell (pink-filtered noise modulated with slow LFO)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.3;
    }

    const oceanNoise = this.ctx.createBufferSource();
    oceanNoise.buffer = noiseBuffer;
    oceanNoise.loop = true;

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(400, this.ctx.currentTime);

    // LFO for surf wave rolling in and out every ~6 seconds
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime); // ~5.5s wave cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    const waveGain = this.ctx.createGain();
    waveGain.gain.setValueAtTime(0.09, this.ctx.currentTime);

    lfo.connect(lowpass.frequency);
    oceanNoise.connect(lowpass);
    lowpass.connect(waveGain);
    waveGain.connect(this.masterGain);

    oceanNoise.start();
    lfo.start();

    return {
      stop: () => {
        try {
          oceanNoise.stop();
          lfo.stop();
          oceanNoise.disconnect();
          lfo.disconnect();
        } catch { /* ignore */ }
      }
    };
  }
}

export const safariAudio = new SafariSoundscapeEngine();
