import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo.jsx';
import './Footer.css';

// En pantallas angostas (≤768px) el logo se muestra acá, en lugar de la barra superior.
function Footer() {
  return (
    <footer className="footer">
      <NavLink to="/" className="footer__logo" aria-label="Ir al inicio">
        <Logo />
      </NavLink>
      <p className="footer__copy">© {new Date().getFullYear()} Agustín. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
