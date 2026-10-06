# Portfolio de Agustín García · QA Tester

Portfolio personal de **Agustín García**, QA Tester Junior (Córdoba, Argentina): testing manual, base en desarrollo web y automatización de pruebas con Playwright en camino.

## Tecnologías

- React 19 + Vite
- React Router (rutas: Inicio, Sobre mí, Habilidades, Proyectos, Contacto)
- Modo noche / día con variables CSS (`data-theme`)
- Formulario de contacto con [Formspree](https://formspree.io)
- Diseño responsive, sin librerías de estilos

## Cómo correrlo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # versión para publicar (carpeta dist)
npm run lint     # revisión de código
```

## Dónde editar el contenido

Todo el contenido vive en `src/data`, sin tocar los componentes:

| Archivo | Qué controla |
| --- | --- |
| `projects.js` | Tarjetas de la página Proyectos (y el contador del Home) |
| `skills.js` | Grupos de habilidades |
| `about.js` | Historia, formación, cursos y habilidades blandas |
| `contact.js` | Email, teléfono, LinkedIn, GitHub, disponibilidad y el endpoint del formulario |

Los colores del modo noche y día están en `src/index.css`.

## Estructura

```
src/
  components/   NavBar, Footer, Logo, fondo de colinas, íconos de marcas
  context/      Tema (noche/día) y audio
  data/         Contenido editable
  hooks/        useDocumentTitle
  pages/        home, about, skills, projects, contact, notFound
public/         favicon, imagen para compartir (og-image.png), reglas de rutas
_archivo/       Archivos que ya no se usan, por si hacen falta
```

## Publicarlo

Es una aplicación de página única: el servidor tiene que devolver `index.html` para cualquier ruta. Ya están incluidas las reglas para **Netlify** (`public/_redirects`) y **Vercel** (`vercel.json`).

Después de publicar, actualizá en `index.html` la imagen de vista previa con la URL completa, por ejemplo `https://tu-sitio.vercel.app/og-image.png`.
