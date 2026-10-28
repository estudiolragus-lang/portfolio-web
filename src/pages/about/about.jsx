import { MapPin, Languages, Target, GraduationCap, BookOpen } from 'lucide-react';
import '../projects/projects.css';
import './about.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { about } from '../../data/about';
import ProjectShots from '../../components/ProjectShots/ProjectShots.jsx';

const FACT_ICONS = { location: MapPin, languages: Languages, target: Target };

function About() {
  useDocumentTitle(
    'Sobre mí',
    'Técnico Superior en Desarrollo Web que se especializa en testing QA con la Carrera QA Manager de EducaciónIT. Formación, cursos y forma de trabajo de Agustín García.',
  );
  return (
    <section className="page-section">
      <header className="page-header">
        <span className="page-eyebrow">Sobre mí</span>
        <h1 className="page-title">Hola, soy {about.name}</h1>
        <p className="page-lead">{about.intro}</p>
      </header>

      <div className="about-grid">
        {/* Historia */}
        <article className="about-card about-bio">
          {about.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        {/* Datos rápidos */}
        <aside className="about-card about-facts" aria-label="Datos rápidos">
          <ul className="about-facts__list">
            {about.facts.map((fact) => {
              const Icon = FACT_ICONS[fact.icon] ?? Target;
              return (
                <li key={fact.label} className="about-fact">
                  <span className="about-fact__icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="about-fact__text">
                    <span className="about-fact__label">{fact.label}</span>
                    <span className="about-fact__value">{fact.value}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      {/* Formación */}
      <h2 className="about-heading">Formación</h2>
      <div className="about-grid about-grid--even">
        <article className="about-card">
          <ul className="about-courses">
            {about.education.map((item) => (
              <li key={item.title} className="about-item">
                <span className="about-fact__icon">
                  <GraduationCap size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="about-item__title">{item.title}</h3>
                  <p className="about-item__meta">
                    {item.place} · {item.period}
                  </p>
                  <span className="project-badge">{item.status}</span>
                  {item.highlights && (
                    <ul className="about-highlights" aria-label="Materias destacadas">
                      {item.highlights.map((subject) => (
                        <li key={subject} className="tag">
                          {subject}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="about-card">
          <ul className="about-courses">
            {about.courses.map((course) => (
              <li key={course.title} className="about-item">
                <span className="about-fact__icon">
                  <BookOpen size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="about-item__title">{course.title}</h3>
                  <p className="about-item__meta">
                    {course.place} · {course.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <ProjectShots shots={about.certificates} title="certificados" label="Certificados" contain />
        </article>
      </div>

      {/* Habilidades blandas */}
      <h2 className="about-heading">Cómo trabajo</h2>
      <ul className="tag-list tag-list--lg">
        {about.softSkills.map((skill) => (
          <li key={skill} className="tag">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default About;
