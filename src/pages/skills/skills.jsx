import { useRef, useState } from 'react';
import { FlaskConical, Code2, Wrench, Zap } from 'lucide-react';
import '../projects/projects.css';
import './skills.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { skillGroups } from '../../data/skills';

const ICONS = { qa: FlaskConical, auto: Zap, dev: Code2, tools: Wrench };

function Skills() {
  useDocumentTitle('Habilidades');
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const tabRefs = useRef({});
  const active = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];

  // Flechas izquierda/derecha para moverse entre pestañas (patrón de tabs accesible)
  const onKeyDown = (e, index) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const step = e.key === 'ArrowRight' ? 1 : -1;
    const next = skillGroups[(index + step + skillGroups.length) % skillGroups.length];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <section className="page-section">
      <header className="page-header">
        <span className="page-eyebrow">Habilidades</span>
        <h1 className="page-title">Mi stack de calidad</h1>
        <p className="page-lead">
          Testing manual como base, automatización con Playwright ya aplicada en proyectos, y desarrollo
          web para entender el código que pruebo.
        </p>
      </header>

      <div className="skill-tabs" role="tablist" aria-label="Categorías de habilidades">
        {skillGroups.map((group, index) => {
          const Icon = ICONS[group.id] ?? Code2;
          const selected = group.id === active.id;
          return (
            <button
              key={group.id}
              ref={(el) => {
                tabRefs.current[group.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${group.id}`}
              aria-selected={selected}
              aria-controls={`panel-${group.id}`}
              tabIndex={selected ? 0 : -1}
              className={`skill-tab ${selected ? 'is-active' : ''}`}
              onClick={() => setActiveId(group.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{group.title}</span>
              <span className="skill-tab__count">{group.skills.length}</span>
            </button>
          );
        })}
      </div>

      <div
        key={active.id}
        className="skill-panel"
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
      >
        <div className="skill-panel__info">
          <h2 className="skill-panel__title">{active.title}</h2>
          <p className="skill-panel__desc">{active.description}</p>
          <p className="skill-panel__where">
            <strong>Dónde lo apliqué:</strong> {active.where}
          </p>
        </div>
        <ul className="skill-panel__chips" aria-label={`Habilidades de ${active.title}`}>
          {active.skills.map((skill) => (
            <li key={skill} className="skill-chip">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Skills;
