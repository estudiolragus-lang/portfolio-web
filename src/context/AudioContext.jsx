import { useState } from 'react';
import { AudioContext } from './audioContextValue.js';

export const AudioProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const playSound = (audioSrc, volume = 0.4) => {
    if (!soundEnabled) return;

    const audio = new Audio(audioSrc);
    audio.volume = volume;
    audio.play().catch((error) => {
      console.log("Audio bloqueado o error al reproducir", error);
    });
  };

  return (
    <AudioContext.Provider value={{ soundEnabled, toggleSound, playSound }}>
      {children}
    </AudioContext.Provider>
  );
};
