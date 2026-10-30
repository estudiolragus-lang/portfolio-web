import { useEffect, useRef } from 'react';
import { ScrollRestoration, useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();
  const previous = useRef(location.key);
  useEffect(() => {
    if (previous.current === location.key) return;
    previous.current = location.key;
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : document.getElementById('contenido');
    target?.focus({ preventScroll: true });
  }, [location]);
  return <ScrollRestoration />;
}
