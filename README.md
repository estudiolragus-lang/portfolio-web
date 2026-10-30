# Portfolio de Agustín García · QA Tester

Portfolio personal de Agustín García, QA Tester Junior en Córdoba, Argentina. Testing manual, automatización con Playwright y base en desarrollo web.

## Desarrollo

Requiere Node.js 22.12 o posterior y npm.

```sh
npm ci
npm run dev
npm run lint -- --max-warnings=0
npm test
npm run build
npm run preview
```

En PowerShell, si la política de scripts bloquea npm.ps1, usar npm.cmd en lugar de npm. No hace falta cambiar la política del sistema.

## Experiencia

- Inicio con proyectos destacados, CV y caricaturas adaptadas al dispositivo.
- Sobre mí con trayectoria, formación y certificados ampliables.
- Habilidades con categorías accesibles por teclado y evidencia enlazada.
- Proyectos con problema, aporte, evidencia, capturas y proceso desplegable.
- Contacto con validación, timeout, estados de envío y canales alternativos.
- Demostración ficticia «Probalo con mirada QA», independiente de proyectos y métricas reales.
- Modos claro y oscuro; la preferencia sigue al sistema hasta elegir un modo y se sincroniza entre pestañas.
- Sonido optativo y persistente; no se descargan audios hasta habilitarlo.
- Navegación con foco, restauración de scroll, movimiento reducido y contenido visible sin animaciones.

No hay librerías nuevas para animación o estilos: React, CSS y APIs del navegador.

## Dónde editar

| Archivo | Contenido |
| --- | --- |
| src/data/site.js | Nombre, rol, dominio y metadatos por ruta |
| src/data/projects.js | Proyectos, problema, aporte, capturas, enlaces y evidencia |
| src/data/skills.js | Categorías de habilidades y aplicaciones |
| src/data/about.js | Biografía, formación, cursos y certificados |
| src/data/contact.js | Contacto, CV, disponibilidad y endpoint de Formspree |
| src/index.css | Colores y variables de ambos temas |
| src/styles/shared.css | Estructuras, botones, etiquetas y enlaces compartidos |

Los enlaces entre habilidades y proyectos están en src/pages/skills/skills.jsx. Las imágenes y los sonidos existentes están en src/assets. El CV está en public.

La formación QA Manager está indicada como inicio previsto en noviembre de 2026; actualizar su estado cuando el inicio esté confirmado.

## Arquitectura

Las rutas se cargan por separado. Los componentes compartidos viven en src/components; cada página conserva su CSS específico. Reveal agrega entradas al hacer scroll sin ocultar el contenido. CharacterGuide ofrece pistas activadas por el usuario. ProjectShots reutiliza el diálogo nativo para proyectos y certificados.

## Publicación

El build genera index.html, about.html, skills.html, projects.html, contact.html y 404.html. Cada entrada tiene título, descripción, canonical y Open Graph propios antes de ejecutar JavaScript. El contenido React se renderiza en el cliente: esto no es prerenderizado completo.

Vercel usa cleanUrls y el archivo 404.html para rutas desconocidas, sin reescribir cualquier URL al inicio. Netlify tiene reglas explícitas en public/_redirects para las cuatro rutas internas y usa 404.html para las restantes. En otro hosting, servir estas entradas equivalentes y mantener el código HTTP 404 de rutas inexistentes.

Si cambiás de dominio, actualizar src/data/site.js, las URLs de index.html, public/robots.txt y public/sitemap.xml.

## Verificación

GitHub Actions ejecuta lint sin advertencias, pruebas y build para pushes a main y pull requests. Las pruebas cubren validación de contacto, escape y metadatos por ruta, y renderizado de las seis páginas con sus relaciones accesibles.

Las pruebas de render no sustituyen una revisión visual ni una prueba de interacciones en navegador. La entrega efectiva de Formspree debe verificarse con un envío real acordado; las pruebas locales no envían mensajes.

Revisión manual recomendada: anchos 320, 390, 768, 1024 y 1440 px; ambos temas; zoom 200%; teclado; movimiento reducido; menú móvil; galería y Escape; categorías de habilidades; demo QA; errores, timeout y éxito del formulario.
