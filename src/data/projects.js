// Editá este archivo para actualizar los proyectos del portfolio.
// `links`: dejá `url: null` mientras no esté publicado; el botón queda como "Próximamente".
export const projects = [
  {
    id: 'click-and-wash',
    category: 'Desarrollo',
    status: 'En análisis y diseño',
    title: 'Click&Wash',
    summary:
      'Sistema web para locales de lavado de autos: turnos sin superposición, estado de cada vehículo, control de capacidad, empleados, ingresos y gastos.',
    did: [
      'Analicé el problema de los lavaderos y definí objetivos, usuarios y cuatro roles: administrador, encargado, empleado y cliente.',
      'Prioricé las funcionalidades en MVP, importantes y futuras, con sus reglas de negocio y el flujo completo del servicio.',
      'Diseñé el modelo de datos y la gestión de acceso de las empresas.',
    ],
    stack: ['SQL Server', 'API REST', 'JavaScript', 'Roles y permisos'],
    links: [{ label: 'Ver proyecto', url: null }],
  },
  {
    id: 'plataforma-educativa',
    category: 'Desarrollo',
    status: 'En desarrollo',
    title: 'Plataforma Educativa',
    summary:
      'Plataforma web para gestionar contenidos y usuarios de un entorno de aprendizaje.',
    did: [
      'Diseñé la estructura de la aplicación y sus pantallas principales.',
      'Implementé el frontend y la comunicación con el backend.',
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
    summary:
      'Suite de pruebas end-to-end sobre una tienda online de práctica: 28 casos de prueba, 5 bugs reportados y ejecución automática en GitHub Actions.',
    did: [
      'Diseñé 28 casos de prueba de login, catálogo, carrito y checkout, con su plan de pruebas.',
      'Los automaticé con Playwright y JavaScript, usando Page Object Model y fixtures.',
      'Encontré y reporté 5 bugs, con pasos para reproducir, evidencia y un test que documenta cada uno.',
      'Configuré GitHub Actions para correr toda la suite automáticamente.',
    ],
    stack: ['Playwright', 'JavaScript', 'Page Object Model', 'GitHub Actions'],
    links: [
      { label: 'Ver repositorio', url: 'https://github.com/estudiolragus-lang/playwright-qa-automation' },
    ],
  },
];
