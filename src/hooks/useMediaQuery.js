import { useSyncExternalStore } from 'react';

// Dice si una media query se cumple ahora y se actualiza al cambiar el tamaño de la ventana.
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      // Respaldo: algunos entornos (emulación de pantallas) no avisan con `change` al cambiar el tamaño
      window.addEventListener('resize', onChange);
      return () => {
        mql.removeEventListener('change', onChange);
        window.removeEventListener('resize', onChange);
      };
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
