// Editá este archivo para actualizar los proyectos del portfolio.
// `links`: dejá `url: null` mientras no esté publicado; el botón queda como "Próximamente".
export const projects = [
  {
    id: 'saas-gastronomia',
    category: 'Desarrollo',
    status: 'En desarrollo',
    title: 'SaaS de Gastronomía',
    summary:
      'Sistema web para la gestión de restaurantes: pedidos, cupones de descuento y carta pública para los clientes.',
    did: [
      'Desarrollé el backend con C# y ASP.NET: API REST, consultas y comandos.',
      'Armé la carta pública y el flujo de pedidos para el cliente final.',
      'Probé manualmente cada flujo y registré los errores encontrados.',
    ],
    stack: ['C#', 'ASP.NET', 'JavaScript', 'API REST'],
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
    status: 'En proceso',
    title: 'Pruebas Automatizadas con Playwright',
    summary:
      'Suite de pruebas end-to-end que automatiza los flujos críticos de una aplicación web.',
    did: [
      'Diseño casos de prueba a partir de los flujos principales del usuario.',
      'Los estoy automatizando con Playwright y JavaScript.',
      'Organizo el código con Page Object Model para que sea fácil de mantener.',
    ],
    stack: ['Playwright', 'JavaScript', 'Page Object Model', 'E2E'],
    links: [{ label: 'Ver repositorio', url: null }],
  },
];
