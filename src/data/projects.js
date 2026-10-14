// Editá este archivo para actualizar los proyectos del portfolio.
// `links`: dejá `url: null` mientras no esté publicado; el botón queda como "Próximamente"
// (o con el texto de `note`, si lo definís).
export const projects = [
  {
    id: 'click-and-wash',
    category: 'Desarrollo',
    status: 'Terminado',
    title: 'Click&Wash',
    summary:
      'Plataforma para lavaderos de autos (SaaS multi-empresa): turnos, clientes, equipo, inventario, caja y finanzas, con un mapa público para que los conductores encuentren dónde lavar y reserven.',
    did: [
      'Construí la API con Node.js y Express sobre PostgreSQL, con 28 migraciones SQL propias.',
      'Armé la interfaz con React: reserva de turnos con mapa, panel del lavadero, caja y ganancia, y reportes descargables en Excel.',
      'Implementé roles y permisos (dueño, encargado, empleado, cliente y administrador), aislamiento entre empresas y planes con límites que cumple la API.',
      'Cuidé la seguridad de las cuentas: sesión en cookie HttpOnly, verificación por correo, bloqueo por intentos fallidos y protección CSRF.',
      'Escribí más de 170 pruebas de API y 24 recorridos de punta a punta con Playwright.',
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
