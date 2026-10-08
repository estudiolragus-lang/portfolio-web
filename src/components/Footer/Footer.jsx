import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUp, Mail } from 'lucide-react';
import Logo from '../Logo/Logo.jsx';
import { LinkedinIcon, GithubIcon } from '../BrandIcons/BrandIcons.jsx';
import './Footer.css';
import pickSound from '../../assets/sounds/pick.mp3';
import { useAudio } from '../../context/useAudio.js';
import { NAV_ITEMS } from '../../data/navItems';
import { contact } from '../../data/contact';

const SOCIAL = [
  { id: 'linkedin', label: 'LinkedIn', href: contact.linkedin, Icon: LinkedinIcon, external: true },
  { id: 'github', label: 'GitHub', href: contact.github, Icon: GithubIcon, external: true },
  { id: 'email', label: 'Email', href: `mailto:${contact.email}`, Icon: Mail, external: false },
];

function Footer() {
  const { playSound } = useAudio();
  const { pathname } = useLocation();

  const scrollToTop = () => {
    playSound(pickSound);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Llamada a la acción: no se muestra en la propia página de contacto */}
        {pathname !== '/contact' && (
          <section className="footer-cta" aria-label="Contacto">
            <div>
              <h2 className="footer-cta__title">¿Buscás un QA Tester?</h2>
              <p className="footer-cta__text">Escribime y conversemos sobre tu equipo.</p>
            </div>
            <Link to="/contact" className="footer-cta__button" onClick={() => playSound(pickSound)}>
              Contactarme
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </section>
        )}

        <div className="footer-main">
          <NavLink to="/" className="footer__logo" aria-label="Ir al inicio" onClick={() => playSound(pickSound)}>
            <Logo />
          </NavLink>

          <nav aria-label="Pie de página">
            <ul className="footer-links">
              {NAV_ITEMS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => (isActive ? 'footer-link is-active' : 'footer-link')}
                    onClick={() => playSound(pickSound)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="footer-social">
            {SOCIAL.map(({ id, label, href, Icon, external }) => (
              <li key={id}>
                <a
                  href={href}
                  className="footer-social__link"
                  aria-label={label}
                  title={label}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  onClick={() => playSound(pickSound)}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom">
          <p className="footer-bottom__copy">
            © {new Date().getFullYear()} Agustín García · Hecho con React y Vite
          </p>
          <button type="button" className="footer-top" onClick={scrollToTop}>
            <ArrowUp size={14} aria-hidden="true" />
            Volver arriba
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
