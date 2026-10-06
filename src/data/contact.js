// Editá este archivo para actualizar los datos de contacto del portfolio.
export const contact = {
  email: 'agclaudio10@gmail.com',
  phone: '+54 351 6184200',
  phoneHref: 'tel:+543516184200',
  linkedin: 'https://www.linkedin.com/in/agustin-garcia-2a7478328/',
  github: 'https://github.com/estudiolragus-lang',

  // Endpoint del formulario (ej: 'https://formspree.io/f/xxxxxxxx').
  // Mientras esté vacío, el formulario abre el correo del visitante con el mensaje ya armado.
  formEndpoint: 'https://formspree.io/f/mzedzpnv',

  availability: {
    label: 'Disponible para nuevas oportunidades',
    modes: [
      { id: 'remote', label: 'Remoto', detail: 'Argentina' },
      { id: 'hybrid', label: 'Híbrido', detail: 'Argentina' },
      { id: 'onsite', label: 'Presencial', detail: 'Córdoba' },
    ],
  },
};

// Muestra una URL sin protocolo ni "www." ni barra final
export const shortUrl = (url) =>
  url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
