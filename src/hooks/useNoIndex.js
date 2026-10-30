import { useEffect } from 'react';

// También reutiliza el noindex del HTML 404 estático y lo retira al salir de esa ruta.
export function useNoIndex() {
  useEffect(() => {
    const meta = document.head.querySelector('meta[name="robots"]') ?? document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
}
