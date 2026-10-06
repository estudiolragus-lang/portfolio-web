import { useState } from 'react';
import { Send, Mail, Phone, ArrowUpRight, Laptop, Building2, MapPin } from 'lucide-react';
import '../projects/projects.css';
import './contact.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { contact, shortUrl } from '../../data/contact';
import { LinkedinIcon, GithubIcon } from '../../components/BrandIcons/BrandIcons.jsx';
import pickSound from '../../assets/sounds/pick.mp3';
import { useAudio } from '../../context/useAudio.js';

const MODE_ICONS = { remote: Laptop, hybrid: Building2, onsite: MapPin };

const CHANNELS = [
  { id: 'email', label: 'Email', value: contact.email, href: `mailto:${contact.email}`, Icon: Mail, external: false },
  { id: 'linkedin', label: 'LinkedIn', value: shortUrl(contact.linkedin), href: contact.linkedin, Icon: LinkedinIcon, external: true },
  { id: 'github', label: 'GitHub', value: shortUrl(contact.github), href: contact.github, Icon: GithubIcon, external: true },
  { id: 'phone', label: 'Teléfono', value: contact.phone, href: contact.phoneHref, Icon: Phone, external: false },
];

const EMPTY_FORM = { name: '', email: '', message: '', _gotcha: '' };
const SEND_TIMEOUT_MS = 15000;

function Contact() {
  useDocumentTitle('Contacto');
  const { playSound } = useAudio();
  const [form, setForm] = useState(EMPTY_FORM);
  // idle | sending | success | mailto | error
  const [status, setStatus] = useState('idle');
  const [errorDetail, setErrorDetail] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== 'idle' && status !== 'sending') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playSound(pickSound);

    // Campo trampa para bots: una persona nunca lo completa. Si viene lleno, se descarta sin avisar.
    if (form._gotcha) {
      setForm(EMPTY_FORM);
      setStatus('success');
      return;
    }

    // Sin servicio configurado: abre el correo del visitante con el mensaje armado
    if (!contact.formEndpoint) {
      const subject = `Contacto desde el portfolio - ${form.name}`;
      const body = `${form.message}

— ${form.name} (${form.email})`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    // Si el servicio no responde, se corta el envío en vez de quedar esperando para siempre
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
    try {
      const response = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.errors?.map((err) => err.message).join(' ') || `Error ${response.status}`);
      }
      setForm(EMPTY_FORM);
      setStatus('success');
    } catch (err) {
      setErrorDetail(err.name === 'AbortError' ? 'El servicio tardó demasiado en responder.' : err.message);
      setStatus('error');
    } finally {
      clearTimeout(timer);
    }
  };

  return (
    <section className="page-section">
      <header className="page-header">
        <span className="page-eyebrow">Contacto</span>
        <h1 className="page-title">Hablemos</h1>
        <p className="page-lead">
          ¿Tenés una búsqueda de QA Tester o querés conversar sobre un proyecto? Escribime y te respondo a la
          brevedad.
        </p>

        <div className="availability">
          <span className="availability__badge">
            <span className="availability__dot" aria-hidden="true" />
            {contact.availability.label}
          </span>
          <ul className="availability__modes" aria-label="Modalidades de trabajo">
            {contact.availability.modes.map((mode) => {
              const Icon = MODE_ICONS[mode.id] ?? MapPin;
              return (
                <li key={mode.id} className="availability__mode">
                  <Icon size={16} aria-hidden="true" />
                  <span>
                    <strong>{mode.label}</strong> · {mode.detail}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      <div className="contact-grid">
        {/* Formulario */}
        <form className="contact-card contact-form" onSubmit={handleSubmit} >
          <div className="field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre"
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
            />
          </div>

          <div className="field">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="Contame sobre la búsqueda o el proyecto…"
            />
          </div>

          {/* Campo trampa para bots, oculto para personas */}
          <div className="field--trap" aria-hidden="true">
            <label htmlFor="_gotcha">No completar</label>
            <input
              id="_gotcha"
              name="_gotcha"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form._gotcha}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="form-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
            <Send size={18} aria-hidden="true" />
          </button>

          <p
            className={`form-status form-status--${status}`}
            role="status"
            aria-live="polite"
          >
            {status === 'success' && '¡Gracias! Recibí tu mensaje y te respondo a la brevedad.'}
            {status === 'mailto' && 'Se abrió tu aplicación de correo con el mensaje listo para enviar.'}
            {status === 'error' &&
              `No pude enviar el mensaje${errorDetail ? ` (${errorDetail})` : ''}. Probá de nuevo o escribime a ${contact.email}.`}
          </p>
        </form>

        {/* Otros canales */}
        <aside className="contact-channels" aria-label="Otros medios de contacto">
          {CHANNELS.map(({ id, label, value, href, Icon, external }) => (
            <a
              key={id}
              href={href}
              className="channel"
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              onClick={() => playSound(pickSound)}
            >
              <span className="channel__icon">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className="channel__text">
                <span className="channel__label">{label}</span>
                <span className="channel__value">{value}</span>
              </span>
              <ArrowUpRight className="channel__arrow" size={18} aria-hidden="true" />
            </a>
          ))}
        </aside>
      </div>
    </section>
  );
}

export default Contact;
