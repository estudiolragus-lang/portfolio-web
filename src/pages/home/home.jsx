import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Mail } from 'lucide-react';
import './home.css';
import pickSound from '../../assets/sounds/pick.mp3';
import miCaricatura from '../../assets/images/miCaricatura.webp';
import miCaricaturaEmpujando from '../../assets/images/miCaricaturaEmpujando.webp';
import miCaricaturaPensamiento from '../../assets/images/miCaricaturaPensamiento.webp';
import { useAudio } from '../../context/useAudio.js';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { projects } from '../../data/projects';
import { contact, shortUrl } from '../../data/contact';
import { LinkedinIcon } from '../../components/BrandIcons/BrandIcons.jsx';

// Los cuatro globos de la caricatura pensando. `tip` es el tooltip que explica adónde lleva cada uno.
const BUBBLES = [
  {
    id: 'projects',
    pos: 'tl',
    label: 'Ver mis proyectos',
    href: '/projects',
    internal: true,
    primary: true,
    tip: {
      title: 'Mis proyectos',
      text: `Los ${projects.length} proyectos que construí y probé, con lo que hice en cada uno.`,
    },
  },
  {
    id: 'skills',
    pos: 'tr',
    label: 'Mis habilidades',
    href: '/skills',
    internal: true,
    tip: {
      title: 'Mis habilidades',
      text: 'Testing manual, automatización y el desarrollo web que me sirve de base.',
    },
  },
  {
    id: 'linkedin',
    pos: 'ml',
    label: 'LinkedIn',
    href: contact.linkedin,
    tip: {
      title: 'Agustín García en LinkedIn',
      text: 'Mi perfil profesional. Se abre en una pestaña nueva.',
    },
  },
  {
    id: 'email',
    pos: 'mr',
    label: 'Email',
    href: `mailto:${contact.email}`,
    tip: {
      title: 'Escribime',
      text: `${contact.email}. Se abre tu aplicación de correo.`,
    },
  },
];

function Home() {
  useDocumentTitle('');
  const { playSound } = useAudio();
  const navigate = useNavigate();

  // Navega sin recargar la página, así se conserva el estado (sonido, tema)
  const goTo = (e, path) => {
    e.preventDefault();
    playSound(pickSound);
    navigate(path);
  };

  return (
    <section className="hero-container">

      {/* Columna Izquierda: Contenido y Textos */}
      <div className="hero-content">
        <span className="hero-greeting">¡Hola! Soy Agustín</span>

        <h1 className="hero-headline">
          QA Tester <br />
          <span className="text-accent">Manual y Automatizado</span>
        </h1>

        <p className="hero-subheadline">
          Técnico Superior en Desarrollo Web y Aplicaciones Digitales. Busco mi primera oportunidad como <strong>QA Tester</strong>: hoy hago testing manual y estoy sumando automatización con <strong>Playwright</strong>. Mi base en <strong>JavaScript, React y SQL</strong> me permite entender lo que pruebo.
        </p>

        <div className="hero-ctas">
          <a href="/projects" className="cta cta--primary" onClick={(e) => goTo(e, '/projects')}>
            <span className="cta__text">
              <span className="cta__title">Ver mis proyectos</span>
              <span className="cta__sub">{projects.length} casos de estudio</span>
            </span>
            <span className="cta__icon">
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </a>
          <a href="/skills" className="cta cta--secondary" onClick={(e) => goTo(e, '/skills')}>
            <span className="cta__text">
              <span className="cta__title">Mis habilidades</span>
              <span className="cta__sub">QA, desarrollo y herramientas</span>
            </span>
            <span className="cta__icon">
              <ArrowRight size={18} aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="hero-social">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="contact-chip contact-chip--linkedin"
            onClick={() => playSound(pickSound)}
          >
            <span className="contact-chip__icon">
              <LinkedinIcon />
            </span>
            <span className="contact-chip__text">
              <span className="contact-chip__title">LinkedIn</span>
              <span className="contact-chip__sub">{shortUrl(contact.linkedin)}</span>
            </span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="contact-chip contact-chip--mail"
            onClick={() => playSound(pickSound)}
          >
            <span className="contact-chip__icon">
              <Mail size={18} aria-hidden="true" />
            </span>
            <span className="contact-chip__text">
              <span className="contact-chip__title">Email</span>
              <span className="contact-chip__sub">{contact.email}</span>
            </span>
          </a>
        </div>
      </div>

      {/* Columna Derecha: Elemento Visual */}
      <div className="hero-visual">
        {/* Más de 768px: caricatura sentada dentro del círculo */}
        <div className="image-placeholder">
          <img src={miCaricatura} alt="Caricatura 3D de Agustín" />
        </div>

        {/* Entre 930px y 769px: la caricatura "aguanta" el borde derecho de la pantalla */}
        <img
          className="hero-push"
          src={miCaricaturaEmpujando}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        {/* 768px o menos: la caricatura pensando, con los cuatro enlaces dentro de los globos.
            Los globos vienen dibujados en la imagen (vacíos); los textos son enlaces reales encima. */}
        <div className="hero-thinking">
          <img
            src={miCaricaturaPensamiento}
            alt="Caricatura de Agustín sentado, pensando"
            width="1080"
            height="720"
            loading="lazy"
          />
          {BUBBLES.map(({ id, pos, label, href, internal, primary, tip }) => (
            <a
              key={id}
              href={href}
              className={`bubble bubble--${pos}${primary ? ' bubble--primary' : ''}`}
              aria-describedby={`tip-${id}`}
              {...(internal ? {} : { target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' })}
              onClick={internal ? (e) => goTo(e, href) : () => playSound(pickSound)}
            >
              {label}
              {/* Tooltip: aparece con el mouse o el teclado. Está oculto para lectores
                  de pantalla porque ya se anuncia con aria-describedby. */}
              <span id={`tip-${id}`} className="bubble__tip" role="tooltip" aria-hidden="true">
                <strong>{tip.title}</strong>
                {tip.text}
              </span>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}

export default Home;
