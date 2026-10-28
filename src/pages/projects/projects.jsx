import { useState } from 'react';
import { ExternalLink, Clock, ChevronDown } from 'lucide-react';
import './projects.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { projects } from '../../data/projects';
import ProjectShots from '../../components/ProjectShots/ProjectShots.jsx';
import pickSound from '../../assets/sounds/pick.mp3';
import { useAudio } from '../../context/useAudio.js';
import { openExternal } from '../../utils/openExternal.js';

// En pantallas anchas el primer proyecto arranca abierto; en celular, todos cerrados para que no sea tan largo
const isWide = () => window.matchMedia('(min-width: 769px)').matches;

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
          Tres proyectos donde aplico desarrollo y calidad: dos sistemas web y una suite de pruebas
          automatizadas.
        </p>
        <p className="page-note">
          <strong>Cómo trabajo:</strong> estos proyectos los desarrollé con mucha ayuda de inteligencia
          artificial. Yo defino qué hay que construir, reviso, pruebo y decido; la IA escribe buena parte del
          código. Mis conocimientos de QA y desarrollo me permiten dirigirla y detectar lo que está mal.
        </p>
      </header>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article key={project.id} className="project-card">
            <div className="project-card__top">
              <span className="project-badge">{project.category}</span>
              {project.withAI && <span className="project-badge project-badge--ai">Con ayuda de IA</span>}
              <span className="project-status">{project.status}</span>
            </div>

            <h2 className="project-card__title">{project.title}</h2>
            <p className="project-card__summary">{project.summary}</p>

            <ul className="tag-list project-card__stack" aria-label="Tecnologías utilizadas">
              {project.stack.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>

            {project.shots && <ProjectShots shots={project.shots} title={project.title} footnote="Datos de ejemplo" />}

            <details className="project-details" open={index === 0 && openFirst}>
              <summary className="project-details__summary">
                <span>
                  Mi rol <span className="project-details__count">({project.did.length})</span>
                </span>
                <ChevronDown size={18} className="project-details__chevron" aria-hidden="true" />
              </summary>
              <ul className="project-card__list">
                {project.did.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>

            <div className="project-card__actions">
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
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
