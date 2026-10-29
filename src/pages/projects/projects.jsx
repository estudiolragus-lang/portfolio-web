import { useState } from 'react';
import { ExternalLink, Clock, ChevronDown } from 'lucide-react';
import './projects.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { projects } from '../../data/projects';
import ProjectShots from '../../components/ProjectShots/ProjectShots.jsx';
import pickSound from '../../assets/sounds/pick.mp3';
import { useAudio } from '../../context/useAudio.js';
import { openExternal } from '../../utils/openExternal.js';

// En pantallas anchas el "Mi rol" del primer proyecto arranca abierto; en celular, todos cerrados para que no sea tan largo
const isWide = () => window.matchMedia('(min-width: 769px)').matches;

// Un desplegable con una lista (por ejemplo, "Mi rol" o "Qué va a tener")
function Desplegable({ titulo, items, abierto = false }) {
  return (
    <details className="project-details" open={abierto}>
      <summary className="project-details__summary">
        <span>
          {titulo} <span className="project-details__count">({items.length})</span>
        </span>
        <ChevronDown size={18} className="project-details__chevron" aria-hidden="true" />
      </summary>
      <ul className="project-row__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </details>
  );
}

function Projects() {
  useDocumentTitle(
    'Proyectos',
    'Proyectos de Agustín García: Click&Wash (sistema web para lavaderos), suite de pruebas automatizadas con Playwright y más.',
  );
  const [openFirst] = useState(isWide);
  const { playSound } = useAudio();

  return (
    <section className="page-section">
      <header className="page-header">
        <span className="page-eyebrow">Proyectos</span>
        <h1 className="page-title">Lo que construí y probé</h1>
        <p className="page-lead">
          Dos proyectos terminados donde aplico desarrollo y calidad (un sistema web y una suite de pruebas
          automatizadas) y una idea en planificación.
        </p>
        <p className="page-note">
          <strong>Cómo trabajo:</strong> los proyectos terminados los desarrollé con mucha ayuda de inteligencia
          artificial. Yo defino qué hay que construir, reviso, pruebo y decido; la IA escribe buena parte del
          código. Mis conocimientos de QA y desarrollo me permiten dirigirla y detectar lo que está mal.
        </p>
      </header>

      <div className="projects-list">
        {projects.map((project, index) => {
          const titleId = `proyecto-${project.id}`;
          const isIdea = project.state === 'planning';

          return (
            <article
              key={project.id}
              className={`project-row${isIdea ? ' project-row--idea' : ''}`}
              aria-labelledby={titleId}
            >
              <div className="project-row__rail">
                <span className={`project-status project-status--${project.state}`}>
                  <span className="project-status__dot" aria-hidden="true" />
                  {project.status}
                </span>
                <span className="project-row__category">{project.category}</span>
              </div>

              <div className="project-row__main">
                <h2 id={titleId} className="project-row__title">
                  {project.title}
                </h2>
                <p className="project-row__summary">{project.summary}</p>

                {project.stackLabel && <p className="project-row__caption">{project.stackLabel}</p>}
                <ul className="tag-list" aria-label={project.stackLabel ?? 'Tecnologías utilizadas'}>
                  {project.stack.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="project-more">
                  <Desplegable titulo="Mi rol" items={project.did} abierto={index === 0 && openFirst} />
                  {project.plan && <Desplegable titulo="Qué va a tener" items={project.plan} />}
                </div>
              </div>

              <div className="project-row__evidence">
                <ul className="project-facts" aria-label="Datos clave">
                  {project.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>

                {project.shots && (
                  <div className="project-row__shots">
                    <ProjectShots shots={project.shots} title={project.title} footnote="Datos de ejemplo" />
                    <p className="project-row__caption">Capturas con datos de ejemplo</p>
                  </div>
                )}

                <div className="project-row__actions">
                  {project.links.map((link) =>
                    link.url ? (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        onClick={(e) => {
                          playSound(pickSound);
                          openExternal(e);
                        }}
                      >
                        {link.label}
                        <ExternalLink size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      <span key={link.label} className="btn-disabled">
                        <Clock size={16} aria-hidden="true" />
                        {link.note ?? 'Próximamente'}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
