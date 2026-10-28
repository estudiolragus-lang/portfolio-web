import { useEffect } from 'react';

// Le pide a los buscadores que no indexen la página (por ejemplo, la 404, que el servidor responde con código 200).
export function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
}
