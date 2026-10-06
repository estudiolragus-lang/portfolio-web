import { ExternalLink, Clock } from 'lucide-react';
import './projects.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { projects } from '../../data/projects';
import pickSound from '../../assets/sounds/pick.mp3';
import { useAudio } from '../../context/useAudio.js';

function Projects() {
  useDocumentTitle('Proyectos');
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
      </header>

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-card__top">
              <span className="project-badge">{project.category}</span>
              <span className="project-status">{project.status}</span>
            </div>

            <h2 className="project-card__title">{project.title}</h2>
            <p className="project-card__summary">{project.summary}</p>

            <h3 className="project-card__label">Qué hice</h3>
            <ul className="project-card__list">
              {project.did.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <ul className="tag-list" aria-label="Tecnologías utilizadas">
              {project.stack.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="project-card__actions">
              {project.links.map((link) =>
                link.url ? (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    onClick={() => playSound(pickSound)}
                  >
                    {link.label}
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                ) : (
                  <span key={link.label} className="btn-disabled">
                    <Clock size={16} aria-hidden="true" />
                    Próximamente
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
