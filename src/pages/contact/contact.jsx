import { useEffect, useRef, useState } from 'react';
import { Send, Mail, Phone, ArrowUpRight, Laptop, Building2, MapPin, FileDown, CheckCircle2 } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { contact, shortUrl } from '../../data/contact';
import { LinkedinIcon, GithubIcon } from '../../components/BrandIcons/BrandIcons';
import { useAudio } from '../../context/useAudio';
import { validateContact, contactPayload } from '../../utils/contactForm';
import character from '../../assets/images/miCaricatura.webp';
import pickSound from '../../assets/sounds/pick.mp3';
import Reveal from '../../components/Reveal/Reveal';
import './contact.css';

const MODE_ICONS = { remote: Laptop, hybrid: Building2, onsite: MapPin };
const CHANNELS = [
  { id: 'email', label: 'Email', value: contact.email, href: 'mailto:' + contact.email, Icon: Mail },
  { id: 'linkedin', label: 'LinkedIn', value: shortUrl(contact.linkedin), href: contact.linkedin, Icon: LinkedinIcon, external: true },
  { id: 'github', label: 'GitHub', value: shortUrl(contact.github), href: contact.github, Icon: GithubIcon, external: true },
  { id: 'phone', label: 'Teléfono', value: contact.phone, href: contact.phoneHref, Icon: Phone },
  { id: 'cv', label: 'Currículum', value: 'Descargar PDF', href: contact.cv, Icon: FileDown, download: true },
];
const EMPTY = { name: '', email: '', message: '', _gotcha: '' };

export default function Contact() {
  useDocumentTitle();
  const { playSound } = useAudio();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [errorDetail, setErrorDetail] = useState('');
  const request = useRef(null);
  const formRef = useRef(null);
  useEffect(() => () => { request.current?.abort(); request.current = null; }, []);
  const change = e => {
    const { name, value } = e.target;
    setForm(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: '' }));
    if (status !== 'sending') setStatus('idle');
  };
  const submit = async e => {
    e.preventDefault();
    if (request.current || status === 'sending') return;
    const invalid = validateContact(form);
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      formRef.current?.elements.namedItem(Object.keys(invalid)[0])?.focus();
      return;
    }
    playSound(pickSound);
    if (form._gotcha) { setForm(EMPTY); setStatus('success'); return; }
    const payload = contactPayload(form);
    if (!contact.formEndpoint) {
      window.location.href = 'mailto:' + contact.email + '?subject=' + encodeURIComponent('Contacto desde el portfolio - ' + payload.name) + '&body=' + encodeURIComponent(payload.message + '\n\n— ' + payload.name + ' (' + payload.email + ')');
      setStatus('mailto');
      return;
    }
    const controller = new AbortController();
    request.current = controller;
    setStatus('sending');
    setErrorDetail('');
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(contact.formEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload), signal: controller.signal,
      });
      if (request.current !== controller) return;
      if (!response.ok) {
        setErrorDetail(response.status === 429 ? 'Hay muchos intentos de envío. Esperá unos minutos y probá de nuevo.' : 'El servicio no pudo aceptar el mensaje. Probá de nuevo en unos minutos.');
        setStatus('error');
        return;
      }
      setForm(EMPTY);
      setStatus('success');
    } catch (error) {
      if (request.current !== controller) return;
      setErrorDetail(error.name === 'AbortError' ? 'El servicio tardó demasiado en responder.' : 'No se pudo conectar con el servicio. Revisá tu conexión.');
      setStatus('error');
    } finally {
      clearTimeout(timer);
      if (request.current === controller) request.current = null;
    }
  };
  return <section className="page-section">
    <div className="contact-introduction">
      <header className="page-header">
        <span className="page-eyebrow">Contacto</span><h1 className="page-title">Hablemos<span className="text-accent">.</span></h1>
        <p className="page-lead">¿Tenés una búsqueda de QA Tester o querés conversar sobre un proyecto? Escribime y conversemos.</p>
        <div className="availability">
          <span className="availability__badge"><span className="availability__dot" aria-hidden="true" />{contact.availability.label}</span>
          <ul className="availability__modes" aria-label="Modalidades de trabajo">{contact.availability.modes.map(mode => {
            const Icon = MODE_ICONS[mode.id] ?? MapPin;
            return <li key={mode.id} className="availability__mode"><Icon size={16} aria-hidden="true" /><span><strong>{mode.label}</strong> · {mode.detail}</span></li>;
          })}</ul>
        </div>
      </header>
      <img className="contact-character" src={character} alt="" width="240" height="240" decoding="async" />
    </div>
    <Reveal className="contact-grid">
      <form ref={formRef} className="contact-card contact-form" onSubmit={submit} aria-busy={status === 'sending'} noValidate>
        <fieldset disabled={status === 'sending'} className="contact-fields">
          <legend className="sr-only">Enviame un mensaje</legend>
          <div className="field"><label htmlFor="name">Nombre</label><input id="name" name="name" type="text" autoComplete="name" required maxLength={100} value={form.name} onChange={change} placeholder="Tu nombre" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</div>
          <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={change} placeholder="tu@email.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</div>
          <div className="field"><label htmlFor="message">Mensaje</label><textarea id="message" name="message" rows={6} required maxLength={5000} value={form.message} onChange={change} placeholder="Contame sobre la búsqueda o el proyecto…" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <span className="field-error" id="message-error">{errors.message}</span>}</div>
          <div className="field--trap" aria-hidden="true"><label htmlFor="_gotcha">No completar</label><input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" value={form._gotcha} onChange={change} /></div>
          <button type="submit" className="form-submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}{status === 'success' ? <CheckCircle2 size={18} aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}</button>
        </fieldset>
        <p className={'form-status form-status--' + status} role="status" aria-live="polite">
          {status === 'sending' && 'El mensaje se está enviando…'}
          {status === 'success' && '¡Gracias! El servicio aceptó tu mensaje. Te respondo a la brevedad.'}
          {status === 'mailto' && 'Intenté abrir tu aplicación de correo. Revisá el mensaje y enviálo desde allí, o usá el email de contacto.'}
          {status === 'error' && errorDetail}
        </p>
        {status === 'error' && <a className="text-link" href={'mailto:' + contact.email}>Escribirme por email<ArrowUpRight size={16} aria-hidden="true" /></a>}
        <p className="form-note">El mensaje se envía mediante Formspree. También podés contactarme directamente por email.</p>
      </form>
      <aside className="contact-channels" aria-label="Otros medios de contacto">
        <h2 className="contact-channels__heading">Otros contactos</h2>
        {CHANNELS.map(({ id, label, value, href, Icon, external, download }) => <a key={id} href={href} className="channel" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...(download ? { download: true } : {})} onClick={() => playSound(pickSound)}>
          <span className="channel__icon"><Icon size={18} aria-hidden="true" /></span><span className="channel__text"><span className="channel__label">{label}</span><span className="channel__value">{value}</span></span><ArrowUpRight className="channel__arrow" size={18} aria-hidden="true" />
        </a>)}
      </aside>
    </Reveal>
  </section>;
}
