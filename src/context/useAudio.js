import { useContext } from 'react';
import { AudioContext } from './audioContextValue.js';

export const useAudio = () => useContext(AudioContext);
