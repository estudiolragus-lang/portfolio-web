import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Code2, Wrench, Zap, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { skillGroups } from '../../data/skills';
import CharacterGuide from '../../components/CharacterGuide/CharacterGuide';
import NextStep from '../../components/NextStep/NextStep';
import QaPlayground from '../../components/QaPlayground/QaPlayground';
import './skills.css';

const ICONS = { qa: FlaskConical, auto: Zap, dev: Code2, tools: Wrench };
const EVIDENCE = {
  qa: { title: 'Del requerimiento al reporte', text: 'Casos de prueba y bugs documentados en la tienda online de práctica.', to: '/projects#automatizacion-playwright' },
  auto: { title: 'Suite de 28 casos de prueba', text: 'Tienda online de práctica · Playwright y GitHub Actions.', to: '/projects#automatizacion-playwright' },
  dev: { title: 'Click&Wash', text: 'Interfaz, API y base de datos de una plataforma para lavaderos.', to: '/projects#click-and-wash' },
  tools: { title: 'Proceso y documentación', text: 'Control de versiones, planificación y ejecución automática en mis proyectos.', to: '/projects' },
};

export default function Skills() {
  useDocumentTitle();
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const refs = useRef({});
  const onKey = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % skillGroups.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + skillGroups.length) % skillGroups.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = skillGroups.length - 1;
    else return;
    event.preventDefault();
    setActiveId(skillGroups[next].id);
    refs.current[skillGroups[next].id]?.focus();
  };
  const activeEvidence = EVIDENCE[activeId];
  return <section className="page-section">
    <header className="page-header">
      <span className="page-eyebrow">Habilidades</span>
      <h1 className="page-title">Calidad,<br /><span className="text-accent">con base técnica.</span></h1>
      <p className="page-lead">Testing manual como base. Automatización y desarrollo para entender lo que pruebo. Elegí una categoría y explorá dónde la apliqué.</p>
    </header>
    <div className="skill-tabs" role="tablist" aria-label="Categorías de habilidades">
      {skillGroups.map((group, index) => {
        const Icon = ICONS[group.id];
        return <button key={group.id} type="button" ref={el => { refs.current[group.id] = el; }} role="tab" id={'tab-' + group.id} aria-selected={activeId === group.id} aria-controls={'panel-' + group.id} tabIndex={activeId === group.id ? 0 : -1} className="skill-tab" onClick={() => setActiveId(group.id)} onKeyDown={event => onKey(event, index)}>
          <Icon size={19} aria-hidden="true" /><span>{group.title}</span><span className="skill-tab__count">{group.skills.length}</span>
        </button>;
      })}
    </div>
    {skillGroups.map(group => <div key={group.id} className="skill-panel" role="tabpanel" tabIndex={0} id={'panel-' + group.id} aria-labelledby={'tab-' + group.id} hidden={activeId !== group.id}>
      <div className="skill-panel__info">
        <span className="skill-panel__eyebrow">Qué puedo hacer</span>
        <h2>{group.title}</h2><p>{group.description}</p>
        <h3>Con qué herramientas</h3>
        <ul className="skill-panel__chips" aria-label={'Habilidades de ' + group.title}>{group.skills.map(skill => <li className="skill-chip" key={skill}>{skill}</li>)}</ul>
      </div>
      <div className="skill-evidence">
        <span className="skill-panel__eyebrow">Dónde lo apliqué</span>
        <h3>{EVIDENCE[group.id].title}</h3><p>{group.where}</p><p>{EVIDENCE[group.id].text}</p>
        <Link to={EVIDENCE[group.id].to} className="text-link">Explorar proyecto<ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
    </div>)}
    <CharacterGuide prompt="¿Querés ver cómo lo probé?" to={activeEvidence.to} linkLabel="Ver la evidencia">{activeEvidence.text} Podés explorar mi participación y el proceso de pruebas.</CharacterGuide>
    <QaPlayground />
    <NextStep to="/projects" label="Explorar proyectos">Las herramientas tienen más sentido cuando se aplican.</NextStep>
  </section>;
}
