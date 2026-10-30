import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
const KEY = 'theme';
const savedTheme = () => {
  try { const saved = localStorage.getItem(KEY); return saved === 'light' || saved === 'dark' ? saved : null; } catch { return null; }
};

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(savedTheme);
  const [system, setSystem] = useState(() => window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const theme = preference ?? system;
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const sync = event => setSystem(event.matches ? 'light' : 'dark');
    const storage = event => { if (event.key === KEY || event.key === null) setPreference(savedTheme()); };
    media.addEventListener('change', sync);
    window.addEventListener('storage', storage);
    return () => { media.removeEventListener('change', sync); window.removeEventListener('storage', storage); };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b111b' : '#f1f5f9');
  }, [theme]);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setPreference(next);
    try { localStorage.setItem(KEY, next); } catch { /* Se conserva en memoria. */ }
  };
  return <ThemeContext.Provider value={{ theme, isDarkMode: theme === 'dark', toggleTheme }}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
