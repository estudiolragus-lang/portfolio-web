import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Mail, FileDown, FlaskConical } from 'lucide-react';
import character from '../../assets/images/miCaricatura.webp';
import pushing from '../../assets/images/miCaricaturaEmpujando.webp';
import thinking from '../../assets/images/miCaricaturaPensamiento.webp';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useAudio } from '../../context/useAudio';
import pickSound from '../../assets/sounds/pick.mp3';
import { projects } from '../../data/projects';
import { contact } from '../../data/contact';
import { LinkedinIcon } from '../../components/BrandIcons/BrandIcons';
import Reveal from '../../components/Reveal/Reveal';
import NextStep from '../../components/NextStep/NextStep';
import './home.css';

const BUBBLES = [
  { id: 'projects', pos: 'tl', label: 'Mis proyectos', to: '/projects' },
  { id: 'skills', pos: 'tr', label: 'Mis habilidades', to: '/skills' },
  { id: 'linkedin', pos: 'ml', label: 'LinkedIn', href: contact.linkedin },
  { id: 'email', pos: 'mr', label: 'Email', href: 'mailto:' + contact.email },
];

export default function Home() {
  useDocumentTitle();
  const { playSound } = useAudio();
  const wide = useMediaQuery('(min-width: 769px)');
  const mid = useMediaQuery('(min-width: 769px) and (max-width: 930px)');
  const completed = projects.filter(p => p.state !== 'planning');
  const planning = projects.filter(p => p.state === 'planning');
  const pick = () => playSound(pickSound);
  return <>
    <section className="hero-container" aria-labelledby="hero-title">
      <div className="hero-content">
        <span className="hero-greeting"><span aria-hidden="true" />¡Hola! Soy Agustín</span>
        <h1 id="hero-title" className="hero-headline">QA Tester<br /><span className="text-accent">con base en desarrollo<span className="hero-period">.</span></span></h1>
        <p className="hero-subheadline">Analizo, pruebo y automatizo para encontrar problemas y entender por qué ocurren.</p>
        <p className="hero-detail">Testing manual · Playwright · JavaScript y SQL</p>
        <div className="hero-ctas">
          <Link to="/projects" className="btn btn-primary" onClick={pick}>Explorar proyectos<ArrowUpRight size={18} aria-hidden="true" /></Link>
          <a href={contact.cv} download className="btn btn-secondary" onClick={pick}>Descargar CV<FileDown size={18} aria-hidden="true" /></a>
        </div>
        <div className="hero-social">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-link" onClick={pick}><LinkedinIcon />LinkedIn<ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href={'mailto:' + contact.email} className="text-link" onClick={pick}><Mail size={18} aria-hidden="true" />Email</a>
          <Link to="/skills" className="text-link" onClick={pick}>Mis habilidades<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="hero-visual">
        {wide ? <div className={mid ? 'hero-pushing' : 'hero-circle'}>
          <img src={mid ? pushing : character} alt="Caricatura de Agustín" width="480" height="480" fetchPriority="high" />
          <a href="#proyectos-destacados" className="hero-invitation">¿Vemos lo que probé?<ArrowRight size={16} aria-hidden="true" /></a>
        </div> : <div className="hero-thinking">
          <img src={thinking} alt="Caricatura de Agustín pensando, rodeado de enlaces para explorar" width="1080" height="720" fetchPriority="high" />
          {BUBBLES.map(b => b.to
            ? <Link key={b.id} className={'bubble bubble--' + b.pos} to={b.to} onClick={pick}>{b.label}</Link>
            : <a key={b.id} className={'bubble bubble--' + b.pos} href={b.href} {...(b.id === 'linkedin' ? { target: '_blank', rel: 'noopener noreferrer' } : {})} onClick={pick}>{b.label}</a>)}
        </div>}
      </div>
    </section>
    <section id="proyectos-destacados" className="home-featured page-section" tabIndex={-1} aria-labelledby="featured-title">
      <Reveal>
        <span className="page-eyebrow">Proyectos</span>
        <h2 id="featured-title" className="section-heading">De la idea a la evidencia<span className="hero-period">.</span></h2>
        <p className="section-description">{completed.length} proyectos realizados. {planning.length} idea en planificación.</p>
      </Reveal>
      <div className="featured-grid">
        {completed.map(project => <Reveal as="article" key={project.id} className="featured-project">
          <div className="featured-copy">
            <span className="project-badge">{project.category === 'Desarrollo' ? 'Desarrollo + QA' : 'Automatización + QA'}</span>
            <h3>{project.title}</h3>
            <p>{project.preview ?? project.summary}</p>
            <Link to={'/projects#' + project.id} className="text-link" onClick={pick}>Explorar caso<ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          {project.shots ? <img className="featured-shot" src={project.shots[0].thumb} alt="Vista previa del panel de Click&Wash, con datos de ejemplo" width="480" height="313" loading="lazy" decoding="async" />
            : <div className="featured-evidence"><FlaskConical size={30} aria-hidden="true" /><strong>28<span>casos de prueba</span></strong><strong>5<span>bugs reportados</span></strong><span className="evidence-caption">Tienda online de práctica · GitHub Actions</span></div>}
        </Reveal>)}
      </div>
      <NextStep to="/about" label="Conocé mi recorrido">Detrás de cada prueba, una forma de pensar.</NextStep>
    </section>
  </>;
}
