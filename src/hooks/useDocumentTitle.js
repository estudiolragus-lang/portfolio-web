import { useEffect } from 'react';

const SITE_NAME = 'Agustín García · QA Tester';

// Cambia el título de la pestaña según la página. Sin título, deja solo el nombre del sitio.
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  }, [title]);
}
