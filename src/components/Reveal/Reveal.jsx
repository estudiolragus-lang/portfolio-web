import { useEffect, useRef } from 'react';

// El contenido nunca se oculta: la animación es una mejora progresiva.
export default function Reveal({ children, className = '', as: Element = 'div', ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('reveal-in');
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <Element ref={ref} className={className} {...props}>{children}</Element>;
}
