// Editá este archivo para actualizar las habilidades del portfolio.
// `where`: dónde las apliqué (se muestra en el panel de cada categoría).
export const skillGroups = [
  {
    id: 'qa',
    title: 'Testing y QA',
    description:
      'Lo que aplico para asegurar la calidad de un producto, de entender el requerimiento a reportar el bug.',
    where: 'Pruebas manuales de Click&Wash y plan de pruebas de la tienda online de práctica.',
    skills: [
      'Testing manual',
      'Análisis de requerimientos',
      'Diseño y ejecución de casos de prueba',
      'Pruebas funcionales',
      'Pruebas de regresión',
      'Smoke testing',
      'Reporte de bugs',
      'Postman',
      'Selenium IDE',
      'Google Lighthouse',
    ],
  },
  {
    id: 'auto',
    title: 'Automatización',
    description:
      'Pasé del testing manual a automatizar: pruebas de punta a punta que corren solas en cada cambio.',
    where: 'Suite de 28 casos con Playwright y GitHub Actions, y recorridos de punta a punta de Click&Wash.',
    skills: ['Playwright', 'Pruebas E2E', 'Page Object Model', 'Fixtures', 'JavaScript', 'GitHub Actions', 'Pruebas de API'],
  },
  {
    id: 'dev',
    title: 'Desarrollo',
    description:
      'Mi base técnica: entiendo el código que pruebo y puedo dirigir su desarrollo, con ayuda de IA.',
    where: 'Click&Wash: API, base de datos e interfaz.',
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'SQL Server', 'ASP.NET', 'Angular', 'HTML y CSS'],
  },
  {
    id: 'tools',
    title: 'Herramientas',
    description: 'Con lo que organizo, documento y trabajo en equipo.',
    where: 'Todos los proyectos: control de versiones, tableros y documentación.',
    skills: ['Git y GitHub', 'Jira', 'Confluence', 'Trello', 'Google Workspace', 'Claude Code (IA)'],
  },
];
