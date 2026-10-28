// Editá este archivo para actualizar la página "Sobre mí".
import angularThumb from '../assets/images/certificados/angular-thumb.webp';
import angularFull from '../assets/images/certificados/angular-full.webp';
import coderhouseThumb from '../assets/images/certificados/coderhouse-thumb.webp';
import coderhouseFull from '../assets/images/certificados/coderhouse-full.webp';

export const about = {
  name: 'Agustín García',
  role: 'QA Tester Junior',
  intro:
    'Técnico Superior en Desarrollo Web y Aplicaciones Digitales, hoy especializándome en testing QA. Busco mi primera oportunidad profesional como QA Tester, con base de desarrollador.',
  bio: [
    'Me recibí en 2026 como Técnico Superior en Desarrollo Web y Aplicaciones Digitales en el Instituto Cervantes. Vivo en Córdoba, Argentina.',
    'Ahora me especializo en testing: desde noviembre de 2026 curso la Carrera QA Manager en EducaciónIT (10 cursos, 149 horas), que suma pruebas de API, automatización con Selenium y preparación para la certificación ISTQB.',
    'Mi foco es la calidad del software. Me formé en testing QA manual: analizo requerimientos, diseño y ejecuto casos de prueba, hago pruebas funcionales, de regresión y smoke, y reporto los bugs con claridad para que el equipo pueda resolverlos rápido.',
    'Como vengo del desarrollo, entiendo lo que pruebo. Trabajo con JavaScript y React, con Angular y ASP.NET, y con bases de datos SQL Server. Además desarrollé Click&Wash (Node.js, Express y PostgreSQL) con ayuda de inteligencia artificial.',
    'Hoy mi fuerte es el testing manual, y ya automaticé pruebas de punta a punta con Playwright y GitHub Actions en mis proyectos.',
  ],
  facts: [
    { icon: 'location', label: 'Ubicación', value: 'Córdoba, Argentina' },
    { icon: 'languages', label: 'Idiomas', value: 'Inglés C1 · Español nativo' },
    { icon: 'target', label: 'Busco', value: 'Primera oportunidad como QA Tester (manual o automatizado)' },
  ],
  education: [
    {
      title: 'Carrera QA Manager',
      place: 'EducaciónIT',
      period: 'Desde noviembre de 2026 · 10 cursos, 149 horas',
      status: 'En curso',
    },
    {
      title: 'Tecnicatura Superior en Desarrollo Web y Aplicaciones Digitales',
      place: 'Instituto Cervantes',
      period: '2024 – 2026',
      status: 'Finalizada',
      // Materias cursadas que más tienen que ver con el perfil
      highlights: ['Testeador de Software', 'Proyecto Integrador I y II', 'Bases de Datos', 'Ciberseguridad', 'Aplicaciones para Móviles'],
    },
  ],
  courses: [
    { title: 'Testing QA Manual', place: 'Coderhouse', detail: '26 horas · Certificado (febrero de 2025)' },
    { title: 'Angular', place: 'EducaciónIT', detail: '18 horas · Certificado (diciembre de 2025)' },
  ],
  // Certificados (imágenes de los diplomas): se ven ampliados al tocarlos
  certificates: [
    {
      id: 'coderhouse',
      title: 'Testing QA Manual · Coderhouse',
      caption: '26 horas en 7 semanas · 5 de febrero de 2025',
      alt: 'Certificado de Coderhouse del curso Testing QA Manual, a nombre de Agustin Garcia, con 26 horas de duración.',
      thumb: coderhouseThumb,
      full: coderhouseFull,
    },
    {
      id: 'angular',
      title: 'Angular · EducaciónIT',
      caption: '18 horas · 14 de diciembre de 2025',
      alt: 'Certificado de aprobación de EducaciónIT del curso Angular, a nombre de Agustin Garcia, con 18 horas.',
      thumb: angularThumb,
      full: angularFull,
    },
  ],
  softSkills: [
    'Enfoque en calidad y detalle',
    'Comunicación efectiva',
    'Pensamiento analítico',
    'Trabajo en equipo',
    'Aprendizaje continuo',
  ],
};
