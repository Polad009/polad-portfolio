"use client";

import { useRef, useCallback } from "react";

/**
 * Simplified Sound Engine using only a local HTML5 Audio file.
 * No Tone.js, no Web Audio API, no external dependencies.
 */
export function useSoundEngine() {
  const isInitRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(false);

  const init = useCallback(() => {
    if (isInitRef.current) return;
    isInitRef.current = true;

    try {
      const audio = new Audio("/lofi.mp3");
      audio.loop = true;
      audio.volume = 0.2;
      
      audio.play().catch((err) => {
        console.warn("Audio play failed:", err);
      });
      
      audioRef.current = audio;
    } catch (e) {
      console.error("Audio initialization failed:", e);
    }
  }, []);

  const playClick = useCallback(() => {
    // Disabled
  }, []);

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    if (audioRef.current) {
      audioRef.current.muted = mutedRef.current;
    }
    return mutedRef.current;
  }, []);

  return { init, playClick, toggleMute };
}
