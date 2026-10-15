// Editá este archivo para actualizar los proyectos del portfolio.
// `links`: dejá `url: null` mientras no esté publicado; el botón queda como "Próximamente"
// (o con el texto de `note`, si lo definís).
// `withAI`: indica que el proyecto se hizo con mucha ayuda de inteligencia artificial.
export const projects = [
  {
    id: 'click-and-wash',
    category: 'Desarrollo',
    status: 'Terminado',
    title: 'Click&Wash',
    withAI: true,
    summary:
      'Plataforma para lavaderos de autos (SaaS multi-empresa): turnos, clientes, equipo, inventario, caja y finanzas, con un mapa público para que los conductores encuentren dónde lavar y reserven.',
    did: [
      'Definí qué tenía que hacer el sistema: turnos, caja, planes, roles y permisos, y avisos al cliente.',
      'Lo desarrollé con IA (Claude Code): la IA escribió la mayor parte del código; yo pedía, revisaba y corregía.',
      'Probé cada función como usuario y como QA, detecté errores y pedí los arreglos.',
      'Quedó publicado en línea, con despliegue automático desde GitHub.',
      'Cuenta con más de 200 pruebas automatizadas de API y recorridos de punta a punta con Playwright, generadas con IA y revisadas por mí.',
    ],
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Playwright'],
    // El código es privado; el sistema está en línea y se puede probar.
    links: [{ label: 'Ver proyecto', url: 'https://clickwash.onrender.com/' }],
  },
  {
    id: 'plataforma-educativa',
    category: 'Desarrollo',
    status: 'En desarrollo',
    title: 'Plataforma Educativa',
    withAI: true,
    summary:
      'Plataforma web para gestionar contenidos y usuarios de un entorno de aprendizaje.',
    did: [
      'Diseñé la estructura de la aplicación y sus pantallas principales.',
      'Implementé el frontend y la comunicación con el backend, con ayuda de IA.',
      'Validé formularios y casos límite para detectar fallos antes de entregar.',
    ],
    stack: ['JavaScript', 'React', 'C#', 'ASP.NET'],
    links: [{ label: 'Ver proyecto', url: null }],
  },
  {
    id: 'automatizacion-playwright',
    category: 'QA Automation',
    status: 'Publicado',
    title: 'Pruebas Automatizadas con Playwright',
    withAI: true,
    summary:
      'Suite de pruebas end-to-end sobre una tienda online de práctica: 28 casos de prueba, 5 bugs reportados y ejecución automática en GitHub Actions.',
    did: [
      'Diseñé 28 casos de prueba de login, catálogo, carrito y checkout, con su plan de pruebas.',
      'Los automaticé con Playwright y JavaScript (Page Object Model y fixtures), con ayuda de IA y revisándolos yo.',
      'Encontré y reporté 5 bugs, con pasos para reproducir, evidencia y un test que documenta cada uno.',
      'Configuré GitHub Actions para correr toda la suite automáticamente.',
    ],
    stack: ['Playwright', 'JavaScript', 'Page Object Model', 'GitHub Actions'],
    links: [
      { label: 'Ver repositorio', url: 'https://github.com/estudiolragus-lang/playwright-qa-automation' },
    ],
  },
];
