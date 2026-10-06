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
          <a href="/projects" className="bubble bubble--tl bubble--primary" onClick={(e) => goTo(e, '/projects')}>
            Ver mis proyectos
          </a>
          <a href="/skills" className="bubble bubble--tr" onClick={(e) => goTo(e, '/skills')}>
            Mis habilidades
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="bubble bubble--ml"
            onClick={() => playSound(pickSound)}
          >
            LinkedIn
          </a>
          <a href={`mailto:${contact.email}`} className="bubble bubble--mr" onClick={() => playSound(pickSound)}>
            Email
          </a>
        </div>
      </div>

    </section>
  );
}

export default Home;
