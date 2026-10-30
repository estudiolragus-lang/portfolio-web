import { useRef } from 'react';
import { ExternalLink, ChevronDown, Target, ClipboardCheck, FlaskConical, Lightbulb } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { projects } from '../../data/projects';
import ProjectShots from '../../components/ProjectShots/ProjectShots';
import Reveal from '../../components/Reveal/Reveal';
import NextStep from '../../components/NextStep/NextStep';
import { useAudio } from '../../context/useAudio';
import pickSound from '../../assets/sounds/pick.mp3';
import './projects.css';

function ProjectCase({ project }) {
  const { playSound } = useAudio();
  const frame = useRef(null);
  const planning = project.state === 'planning';
  const titleId = project.id + '-title';
  const glow = e => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--pointer-x', (e.clientX - rect.left) + 'px');
    element.style.setProperty('--pointer-y', (e.clientY - rect.top) + 'px');
  };
  return <Reveal as="article" id={project.id} tabIndex={-1} className={'project-case interactive-surface' + (planning ? ' project-case--planning' : '')} aria-labelledby={titleId} onPointerMove={glow}>
    <div className="project-case__intro">
      <div className="project-case__labels">
        <span className={'project-status project-status--' + project.state}><span className="project-status__dot" aria-hidden="true" />{project.status}</span>
        <span className="project-badge">{project.category === 'Desarrollo' && !planning ? 'Desarrollo + QA' : project.category}</span>
      </div>
      <h2 id={titleId}>{project.title}</h2>
      <p className="project-case__summary">{project.preview}</p>
      <dl className="case-story">
        <div><dt><Target size={18} aria-hidden="true" />El problema</dt><dd>{project.problem}</dd></div>
        <div><dt><ClipboardCheck size={18} aria-hidden="true" />Mi aporte</dt><dd>{project.contribution}</dd></div>
        <div><dt>{planning ? <Lightbulb size={18} aria-hidden="true" /> : <FlaskConical size={18} aria-hidden="true" />}{planning ? 'Lo documentado' : 'La evidencia'}</dt><dd>{project.facts.join(' · ')}</dd></div>
      </dl>
      {project.stackLabel && <p className="project-case__caption">{project.stackLabel}</p>}
      <ul className="tag-list" aria-label={project.stackLabel ?? 'Tecnologías utilizadas'}>{project.stack.map(tech => <li key={tech} className="tag">{tech}</li>)}</ul>
      <div className="project-case__actions">
        {project.links.map(link => link.url ? <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={() => playSound(pickSound)}>{link.label}<ExternalLink size={16} aria-hidden="true" /></a>
          : <span key={link.label} className="project-case__caption">{link.note}</span>)}
        <a href={'#proceso-' + project.id} className="text-link" onClick={() => {
          // Se abre antes de que el ancla desplace y enfoque el contenido.
          if (frame.current) frame.current.open = true;
        }}>Explorar mi proceso<ChevronDown size={16} aria-hidden="true" /></a>
      </div>
    </div>
    <div className="project-case__visual">
      {project.shots ? <ProjectShots shots={project.shots} title={project.title} footnote="Datos de ejemplo" featured /> :
        <div className={'project-evidence' + (planning ? ' project-evidence--planning' : '')}>
          {planning ? <Lightbulb size={36} aria-hidden="true" /> : <FlaskConical size={36} aria-hidden="true" />}
          <p className="project-evidence__label">{planning ? 'Primero, pensar el producto.' : 'De probar a documentar.'}</p>
          <ul>{project.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
          <p className="project-case__caption">{planning ? 'Sin código publicado. Tecnologías y funcionalidades previstas.' : 'Suite sobre una tienda online de práctica. El código y la documentación están en el repositorio.'}</p>
        </div>}
    </div>
    <details ref={frame} className="case-process" id={'proceso-' + project.id}>
      <summary>Mi proceso y participación<ChevronDown size={18} aria-hidden="true" /></summary>
      <div className="case-process__body">
        <p>{project.summary}</p>
        <h3>Mi rol</h3>
        <ul>{project.did.map(item => <li key={item}>{item}</li>)}</ul>
        {project.plan && <><h3>Qué va a tener</h3><ul>{project.plan.map(item => <li key={item}>{item}</li>)}</ul></>}
      </div>
    </details>
  </Reveal>;
}

export default function Projects() {
  useDocumentTitle();
  const completed = projects.filter(p => p.state !== 'planning');
  const planning = projects.filter(p => p.state === 'planning');
  return <section className="page-section">
    <header className="page-header">
      <span className="page-eyebrow">Proyectos</span>
      <h1 className="page-title">Lo que construí <span className="text-accent">y probé.</span></h1>
      <p className="page-lead">Desarrollo, calidad y evidencia real. {completed.length} proyectos realizados y {planning.length} idea en planificación.</p>
    </header>
    <div className="projects-list">{projects.map(project => <ProjectCase project={project} key={project.id} />)}</div>
    <NextStep to="/contact" label="Hablemos">¿Te interesa cómo puedo aportar a tu equipo?</NextStep>
  </section>;
}
