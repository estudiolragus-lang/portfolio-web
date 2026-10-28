import { useEffect } from 'react';

const SITE_NAME = 'Agustín García · QA Tester';
const SITE_URL = 'https://portfolio-web-nine-mu.vercel.app';

// Valores de index.html: son los de la portada y sirven de respaldo para las páginas sin descripción propia
let defaults = null;
const readDefaults = () => {
  defaults ??= {
    description: document.head.querySelector('meta[name="description"]')?.content,
    ogTitle: document.head.querySelector('meta[property="og:title"]')?.content,
    ogDescription: document.head.querySelector('meta[property="og:description"]')?.content,
  };
  return defaults;
};

const setAttr = (selector, attr, value) => {
  if (value) document.head.querySelector(selector)?.setAttribute(attr, value);
};

// Actualiza el título de la pestaña y los metadatos (descripción, enlace canónico y vista previa) según la página.
// Sin título, deja los de la portada.
export function useDocumentTitle(title, description) {
  useEffect(() => {
    const base = readDefaults();
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const path = window.location.pathname.replace(/\/$/, '');
    const url = `${SITE_URL}${path || '/'}`;

    document.title = fullTitle;
    setAttr('meta[name="description"]', 'content', description ?? base.description);
    setAttr('link[rel="canonical"]', 'href', url);
    setAttr('meta[property="og:url"]', 'content', url);
    setAttr('meta[property="og:title"]', 'content', title ? fullTitle : base.ogTitle);
    setAttr('meta[property="og:description"]', 'content', description ?? base.ogDescription);
  }, [title, description]);
}
