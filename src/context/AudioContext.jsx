import { useCallback, useEffect, useRef, useState } from 'react';
import { AudioContext as SoundContext } from './audioContextValue';
import clickSound from '../assets/sounds/click.mp3';
import pickSound from '../assets/sounds/pick.mp3';
import offSound from '../assets/sounds/sonidoOff.mp3';
import onSound from '../assets/sounds/sonidoOn.mp3';

const SOUNDS = [clickSound, pickSound, offSound, onSound];
const STORAGE_KEY = 'portfolio-sound';

export function AudioProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  });
  const context = useRef(null);
  const downloads = useRef(new Map());
  const decoded = useRef(new Map());
  const fallbacks = useRef(new Map());

  const load = useCallback(src => {
    if (!downloads.current.has(src)) {
      const promise = fetch(src).then(response => {
        if (!response.ok) throw new Error('Audio unavailable');
        return response.arrayBuffer();
      }).catch(() => { downloads.current.delete(src); return null; });
      downloads.current.set(src, promise);
    }
    return downloads.current.get(src);
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, String(soundEnabled)); } catch { /* Preferencia en memoria si no hay almacenamiento. */ }
    if (!soundEnabled) return;
    const run = () => SOUNDS.forEach(load);
    const id = window.requestIdleCallback ? window.requestIdleCallback(run, { timeout: 4000 }) : setTimeout(run, 1500);
    return () => window.cancelIdleCallback ? window.cancelIdleCallback(id) : clearTimeout(id);
  }, [soundEnabled, load]);

  useEffect(() => {
    const elements = fallbacks.current;
    const buffers = decoded.current;
    return () => {
      context.current?.close().catch(() => {});
      context.current = null;
      buffers.clear();
      elements.forEach(element => { element.pause(); element.removeAttribute('src'); element.load(); });
      elements.clear();
    };
  }, []);

  const playSound = (src, volume = .3, force = false) => {
    if (!soundEnabled && !force) return;
    const fallback = () => {
      let element = fallbacks.current.get(src);
      if (!element) { element = new Audio(src); fallbacks.current.set(src, element); }
      element.volume = volume;
      element.currentTime = 0;
      element.play().catch(() => {});
    };
    const Constructor = window.AudioContext || window.webkitAudioContext;
    if (!Constructor) { fallback(); return; }
    try {
      context.current ??= new Constructor({ latencyHint: 'interactive' });
      const audio = context.current;
      const resumed = audio.state === 'running' ? Promise.resolve() : audio.resume();
      if (!decoded.current.has(src)) {
        decoded.current.set(src, load(src).then(raw => {
          if (!raw) throw new Error('Audio unavailable');
          return audio.decodeAudioData(raw.slice(0));
        }).catch(() => { decoded.current.delete(src); return null; }));
      }
      Promise.all([resumed, decoded.current.get(src)]).then(([, buffer]) => {
        if (!buffer || audio.state !== 'running') return;
        const source = audio.createBufferSource();
        const gain = audio.createGain();
        source.buffer = buffer;
        gain.gain.value = volume;
        source.connect(gain);
        gain.connect(audio.destination);
        source.onended = () => { source.disconnect(); gain.disconnect(); };
        source.start();
      }).catch(fallback);
    } catch { fallback(); }
  };

  return <SoundContext.Provider value={{ soundEnabled, toggleSound: () => setSoundEnabled(value => !value), playSound }}>{children}</SoundContext.Provider>;
}
