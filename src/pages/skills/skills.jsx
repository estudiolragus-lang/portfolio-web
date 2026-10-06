import { FlaskConical, Code2, Wrench, Rocket } from 'lucide-react';
import '../projects/projects.css';
import './skills.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { skillGroups } from '../../data/skills';

const ICONS = { qa: FlaskConical, dev: Code2, tools: Wrench, learning: Rocket };

function Skills() {
  useDocumentTitle('Habilidades');
  return (
    <section className="page-section">
      <header className="page-header">
        <span className="page-eyebrow">Habilidades</span>
        <h1 className="page-title">Mi stack de calidad</h1>
        <p className="page-lead">
          Testing manual como fortaleza, con una base de desarrollo web y la automatización como próximo paso.
        </p>
      </header>

      <div className="skills-grid">
        {skillGroups.map((group) => {
          const Icon = ICONS[group.id] ?? Code2;
          return (
            <article key={group.id} className="skill-card">
              <div className="skill-card__icon">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h2 className="skill-card__title">{group.title}</h2>
              <p className="skill-card__desc">{group.description}</p>
              <ul className="tag-list">
                {group.skills.map((skill) => (
                  <li key={skill} className="tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Skills;
