"use client";

import { useCallback, useRef } from 'react';
import { useChildStore } from '../stores/useChildStore';

export function useSoundEffect() {
  const { displaySettings } = useChildStore();
  const audioCtxRef = useRef(null);

  const playClick = useCallback(() => {
    if (!displaySettings?.soundEnabled) return;
    
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        audioCtxRef.current = new AudioContext();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      // Playful pop sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Ignore audio context errors silently
    }
  }, [displaySettings?.soundEnabled]);

  return playClick;
}
