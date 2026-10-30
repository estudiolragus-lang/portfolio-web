import { MapPin, Languages, Target, GraduationCap, BookOpen, ArrowDown } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { about } from '../../data/about';
import { site } from '../../data/site';
import character from '../../assets/images/miCaricatura.webp';
import ProjectShots from '../../components/ProjectShots/ProjectShots';
import Reveal from '../../components/Reveal/Reveal';
import NextStep from '../../components/NextStep/NextStep';
import './about.css';

const ICONS = { location: MapPin, languages: Languages, target: Target };
const timeline = [
  ...about.courses.map(course => ({ ...course, period: course.detail, status: 'Certificado', kind: 'course' })),
  { ...about.education[1], kind: 'education' },
  { ...about.education[0], kind: 'next' },
];

export default function About() {
  useDocumentTitle();
  return <section className="page-section">
    <div className="about-introduction">
      <header className="page-header">
        <span className="page-eyebrow">Sobre mí</span>
        <h1 className="page-title">Del desarrollo <br />a la <span className="text-accent">calidad.</span></h1>
        <p className="page-lead">Soy {site.name}, {site.role}. {about.intro}</p>
        <a href="#mi-recorrido" className="text-link">Conocé mi recorrido<ArrowDown size={17} aria-hidden="true" /></a>
      </header>
      <img src={character} className="about-character" alt="Caricatura de Agustín" width="320" height="320" decoding="async" />
    </div>
    <div className="about-grid">
      <Reveal as="article" className="about-card about-bio">
        <h2 className="about-card__heading">Entender lo que pruebo.</h2>
        {about.bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </Reveal>
      <Reveal as="aside" className="about-card about-facts" aria-label="Datos rápidos">
        <ul className="about-facts__list">{about.facts.map(fact => {
          const Icon = ICONS[fact.icon] ?? Target;
          return <li key={fact.label} className="about-fact"><span className="about-fact__icon"><Icon size={19} aria-hidden="true" /></span><span><span className="about-fact__label">{fact.label}</span><span className="about-fact__value">{fact.value}</span></span></li>;
        })}</ul>
      </Reveal>
    </div>
    <section id="mi-recorrido" aria-labelledby="timeline-title" className="about-journey">
      <span className="page-eyebrow">Mi recorrido</span>
      <h2 className="section-heading" id="timeline-title">Aprender. Construir. Probar.</h2>
      <div className="journey-grid">
        <ol className="timeline">{timeline.map(item => <Reveal as="li" key={item.title} className={'timeline-item' + (item.kind === 'next' ? ' timeline-item--next' : '')}>
          <span className="timeline-icon">{item.kind === 'course' ? <BookOpen size={19} aria-hidden="true" /> : <GraduationCap size={19} aria-hidden="true" />}</span>
          <div className="timeline-content">
            <span className="project-badge">{item.status}</span>
            <h3>{item.title}</h3>
            <p>{item.place}</p><p className="timeline-period">{item.period}</p>
            {item.highlights && <ul className="tag-list" aria-label="Materias destacadas">{item.highlights.map(subject => <li key={subject} className="tag">{subject}</li>)}</ul>}
          </div>
        </Reveal>)}</ol>
        <Reveal as="aside" className="about-certificates">
          <h3>Formación con evidencia</h3>
          <p>Podés ampliar cada certificado para verlo completo.</p>
          <ProjectShots shots={about.certificates} title="certificados" label="Certificados de formación" contain />
        </Reveal>
      </div>
    </section>
    <Reveal as="section" className="about-working" aria-labelledby="working-title">
      <span className="page-eyebrow">Cómo trabajo</span>
      <h2 className="section-heading" id="working-title">Los detalles también cuentan.</h2>
      <p className="section-description">Defino qué hay que verificar, reviso los resultados y documento los problemas para que se puedan reproducir.</p>
      <ul className="tag-list">{about.softSkills.map(skill => <li className="tag" key={skill}>{skill}</li>)}</ul>
    </Reveal>
    <NextStep to="/skills" label="Explorar mis habilidades">De la formación a la práctica.</NextStep>
  </section>;
}
