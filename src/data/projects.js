// Editá este archivo para actualizar los proyectos del portfolio.
// `links`: dejá `url: null` mientras no esté publicado; el botón queda como "Próximamente"
// (o con el texto de `note`, si lo definís).
import panelThumb from '../assets/images/clickwash/panel-thumb.webp';
import panelFull from '../assets/images/clickwash/panel-full.webp';
import cajaThumb from '../assets/images/clickwash/caja-thumb.webp';
import cajaFull from '../assets/images/clickwash/caja-full.webp';
import gananciaThumb from '../assets/images/clickwash/ganancia-thumb.webp';
import gananciaFull from '../assets/images/clickwash/ganancia-full.webp';
import inventarioThumb from '../assets/images/clickwash/inventario-thumb.webp';
import inventarioFull from '../assets/images/clickwash/inventario-full.webp';

// `state`: 'done' (terminado), 'published' (publicado) o 'planning' (idea en planificación). Define el color del
// punto de estado y, en una idea, el borde punteado de la fila.
// `facts`: los datos clave que se ven al costado de cada proyecto (números y hechos, nunca promesas).
// Para una idea que todavía no está construida: `plan` lista lo que va a tener (se muestra como "Qué va a tener")
// y `stackLabel` aclara que las tecnologías son previstas.
export const projects = [
  {
    id: 'click-and-wash',
    category: 'Desarrollo',
    status: 'Terminado',
    title: 'Click&Wash',
    state: 'done',
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
    facts: ['Más de 200 pruebas', 'Publicado en línea'],
    // Capturas con datos de ejemplo (negocio de demostración, sin clientes reales)
    shots: [
      {
        id: 'panel',
        title: 'Panel del local',
        caption: 'Turnos por etapa, avisos por WhatsApp y resumen del día.',
        alt: 'Panel del local con las columnas En espera, En proceso y Terminados, y el botón para avisar por WhatsApp.',
        thumb: panelThumb,
        full: panelFull,
      },
      {
        id: 'caja',
        title: 'Caja del día',
        caption: 'Cobros por medio de pago, movimientos y cierre con la diferencia.',
        alt: 'Caja del día con los cobros por medio de pago, los movimientos de hoy y el cierre de caja.',
        thumb: cajaThumb,
        full: cajaFull,
      },
      {
        id: 'ganancia',
        title: 'Ganancia',
        caption: 'Ingresos, costo de insumos y gastos, con el punto de equilibrio.',
        alt: 'Pantalla de ganancia del período con ingresos, costo de insumos, gastos y punto de equilibrio.',
        thumb: gananciaThumb,
        full: gananciaFull,
      },
      {
        id: 'inventario',
        title: 'Inventario',
        caption: 'Insumos con stock, mínimo, costo y valor.',
        alt: 'Inventario de insumos con stock, mínimo, costo y valor de cada producto.',
        thumb: inventarioThumb,
        full: inventarioFull,
      },
    ],
    // El código es privado; el sistema está en línea y se puede probar.
    links: [{ label: 'Ver proyecto', url: 'https://clickwash.onrender.com/' }],
  },
  {
    id: 'automatizacion-playwright',
    category: 'QA Automation',
    status: 'Publicado',
    title: 'Pruebas Automatizadas con Playwright',
    state: 'published',
    summary:
      'Suite de pruebas end-to-end sobre una tienda online de práctica: 28 casos de prueba, 5 bugs reportados y ejecución automática en GitHub Actions.',
    did: [
      'Diseñé 28 casos de prueba de login, catálogo, carrito y checkout, con su plan de pruebas.',
      'Los automaticé con Playwright y JavaScript (Page Object Model y fixtures), con ayuda de IA y revisándolos yo.',
      'Encontré y reporté 5 bugs, con pasos para reproducir, evidencia y un test que documenta cada uno.',
      'Configuré GitHub Actions para correr toda la suite automáticamente.',
    ],
    stack: ['Playwright', 'JavaScript', 'Page Object Model', 'GitHub Actions'],
    facts: ['28 casos de prueba', '5 bugs reportados', 'Se ejecuta sola en GitHub Actions'],
    links: [
      { label: 'Ver repositorio', url: 'https://github.com/estudiolragus-lang/playwright-qa-automation' },
    ],
  },
  {
    id: 'tareita',
    category: 'Desarrollo',
    status: 'En planificación',
    title: 'Tareita',
    state: 'planning',
    summary:
      'Idea de una aplicación web para equipos de estudio y de trabajo: cada persona tiene una caricatura en pixel art que cambia según cuántas tareas del día completó, y el equipo ve el avance de todos en una sala compartida. Todavía no hay código: hoy el producto está pensado y documentado.',
    did: [
      'Pensé el producto y definí sus reglas en decenas de decisiones: roles y permisos, planes con jornadas y recreos, tareas compartidas, reglas para menores de edad y un límite gratuito de 10 integrantes.',
      'Mapeé 28 pantallas y 12 ventanas emergentes, con lo que debe llevar cada una.',
      'Armé el modelo de datos, el plan técnico y una estrategia de pruebas con las reglas que habría que verificar.',
      'Calculé los costos del servidor con los precios oficiales de Render y un punto de equilibrio para los planes.',
      'Preparé borradores de los textos legales (para revisar con un profesional) y una lista de preguntas para el contador.',
      'Trabajé la documentación con IA (Claude): yo decidía y respondía, la IA redactaba y ordenaba.',
    ],
    // Lo que todavía es un plan: se muestra aparte de "Mi rol", que cuenta solo lo hecho.
    plan: [
      'Una sala por día donde se ve a todo el equipo, con la caricatura de cada persona y cuántas tareas completó.',
      'Caricaturas en pixel art con 6 estados que cambian según el avance, y un creador de personajes por piezas.',
      'Plan por día, semana o mes, con una o varias jornadas por día y recreos del equipo o personales.',
      'Tareas compartidas, reprogramación de las que no se hicieron y cálculo del tiempo disponible por tarea.',
      'Chat del día (solo mayores de 18), anotaciones y resumen de horas planificadas contra realizadas.',
      'Roles de dueño e integrante con permisos, reportes y un panel de administración.',
      'Pensada para sentirse fluida: la sala se actualiza sola cada 30 a 60 segundos al principio y pasa a tiempo real después, y se mide con una prueba de carga antes de abrirla al público.',
      'Plan gratuito de hasta 10 integrantes y planes pagos con Mercado Pago más adelante.',
    ],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Playwright', 'Render'],
    facts: ['28 pantallas mapeadas', '12 ventanas emergentes', 'Plan técnico y modelo de datos'],
    stackLabel: 'Tecnologías previstas',
    links: [{ label: 'Ver proyecto', url: null, note: 'Todavía es una idea' }],
  },
];
