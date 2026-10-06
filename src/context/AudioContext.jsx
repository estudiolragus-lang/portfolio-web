import { useCallback, useEffect, useRef, useState } from 'react';
import { AudioContext as SoundContext } from './audioContextValue.js';
import clickSound from '../assets/sounds/click.mp3';
import pickSound from '../assets/sounds/pick.mp3';
import sonidoOffSound from '../assets/sounds/sonidoOff.mp3';
import sonidoOnSound from '../assets/sounds/sonidoOn.mp3';

// Sonidos de la interfaz: se descargan una sola vez al abrir el sitio.
const SOUNDS = [clickSound, pickSound, sonidoOffSound, sonidoOnSound];

// Eventos que "desbloquean" el audio (los navegadores de celular lo exigen)
const UNLOCK_EVENTS = ['pointerdown', 'touchstart', 'keydown'];

/*
 * Antes cada clic creaba un `new Audio(...)`, que en el celular vuelve a pedir y
 * decodificar el archivo cada vez (de ahí la demora). Ahora:
 *   1. Los archivos se descargan al cargar el sitio.
 *   2. En el primer toque se decodifican a memoria con Web Audio.
 *   3. Cada sonido se reproduce desde memoria, sin demora.
 * Si Web Audio no está listo todavía, se usa un <audio> ya precargado como respaldo.
 */
export const AudioProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const contextRef = useRef(null);
  const rawRef = useRef(new Map()); // src -> Promise<ArrayBuffer> (archivo descargado)
  const buffersRef = useRef(new Map()); // src -> AudioBuffer (listo para sonar)
  const elementsRef = useRef(new Map()); // src -> <audio> de respaldo
  const decodedRef = useRef(false);

  const getElement = useCallback((src) => {
    let element = elementsRef.current.get(src);
    if (!element) {
      element = new Audio(src);
      element.preload = 'auto';
      elementsRef.current.set(src, element);
    }
    return element;
  }, []);

  // Descarga y precarga todos los sonidos apenas abre el sitio
  useEffect(() => {
    SOUNDS.forEach((src) => {
      if (!rawRef.current.has(src)) {
        rawRef.current.set(
          src,
          fetch(src)
            .then((response) => response.arrayBuffer())
            .catch(() => null),
        );
      }
      getElement(src);
    });
  }, [getElement]);

  // Con el primer toque o tecla: se activa Web Audio y se decodifican los sonidos
  useEffect(() => {
    const unlock = () => {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return;

      if (!contextRef.current) {
        contextRef.current = new Ctor({ latencyHint: 'interactive' });
      }
      const context = contextRef.current;
      if (context.state !== 'running') context.resume().catch(() => {});

      if (decodedRef.current) return;
      decodedRef.current = true;

      rawRef.current.forEach((promise, src) => {
        promise.then((data) => {
          if (!data) return;
          // La versión con callbacks funciona también en Safari antiguos
          context.decodeAudioData(
            data.slice(0),
            (buffer) => buffersRef.current.set(src, buffer),
            () => {},
          );
        });
      });
    };

    UNLOCK_EVENTS.forEach((name) => window.addEventListener(name, unlock, { passive: true }));
    return () => UNLOCK_EVENTS.forEach((name) => window.removeEventListener(name, unlock));
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  // `force` reproduce aunque el sonido esté silenciado (lo usa el propio botón de sonido)
  const playSound = (audioSrc, volume = 0.4, force = false) => {
    if (!soundEnabled && !force) return;

    const context = contextRef.current;
    const buffer = buffersRef.current.get(audioSrc);

    if (context && context.state === 'running' && buffer) {
      const source = context.createBufferSource();
      const gain = context.createGain();
      source.buffer = buffer;
      gain.gain.value = volume;
      source.connect(gain);
      gain.connect(context.destination);
      source.start(0);
      return;
    }

    // Respaldo: <audio> ya precargado (solo se usa hasta que Web Audio esté listo)
    const element = getElement(audioSrc);
    element.volume = volume;
    element.currentTime = 0;
    element.play().catch((error) => {
      console.log('Audio bloqueado o error al reproducir', error);
    });
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};
