import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Moon, Sun, Volume2, VolumeX, Menu, X } from 'lucide-react';
import './NavBar.css';

// Importaciones de tus assets
import Logo from '../Logo/Logo.jsx';
import clickSound from '../../assets/sounds/click.mp3';
import pickSound from '../../assets/sounds/pick.mp3';
import sonidoOffSound from '../../assets/sounds/sonidoOff.mp3';
import sonidoOnSound from '../../assets/sounds/sonidoOn.mp3';

// 1. Importamos el hook global
import { useAudio } from '../../context/useAudio.js';
import { useTheme } from '../../context/ThemeContext';
import { NAV_ITEMS } from '../../data/navItems';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const { pathname } = useLocation();
  // Nombre de la página actual (se muestra en pantallas muy angostas)
  const currentPage = NAV_ITEMS.find((item) => item.to === pathname)?.label;

  // Cierra el menú con Escape o al hacer clic fuera de la barra
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => e.key === 'Escape' && setMenuOpen(false);
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  // 2. Extraemos el estado global y las funciones del contexto
  const { isDarkMode, toggleTheme: switchTheme } = useTheme();
  const { soundEnabled, toggleSound, playSound: playGlobalSound } = useAudio();

  // Función local para adaptar tus sonidos del navbar al contexto global
  const playNavSound = (soundFile) => {
    playGlobalSound(soundFile); // Si soundEnabled es false, esto no sonará en ningún lado
  };

  const handleSoundToggle = () => {
    // Suena el efecto del estado al que se pasa. `true` fuerza el sonido aunque esté silenciado.
    playGlobalSound(soundEnabled ? sonidoOffSound : sonidoOnSound, 0.4, true);

    // Cambiamos el estado globalmente para toda la app
    toggleSound();
  };

  const toggleMenu = () => {
    playNavSound(clickSound);
    setMenuOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    playNavSound(clickSound);
    switchTheme();
  };

  const renderLinks = (className) => (
    <ul className={className}>
      {NAV_ITEMS.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={to === '/'}
            onClick={() => {
              playNavSound(pickSound);
              setMenuOpen(false);
            }}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-container">

        {/* Logo */}
        <div className="navbar-logo">
          <NavLink to="/" onClick={() => playNavSound(pickSound)}>
            <Logo />
          </NavLink>
        </div>

        {/* Página actual: solo se ve en pantallas muy angostas, donde no hay logo ni links */}
        {currentPage && (
          <span className="navbar-page" aria-hidden="true">
            {currentPage}
          </span>
        )}

        {/* Navegación principal (en pantallas muy angostas pasa al menú hamburguesa) */}
        {renderLinks('navbar-links')}

        {/* Botón hamburguesa (solo visible en pantallas angostas) */}
        <button
          type="button"
          className="icon-btn menu-toggle"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="navbar-actions"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menú desplegable: links (solo en pantallas muy angostas) y acciones secundarias */}
        <div id="navbar-actions" className={menuOpen ? 'navbar-actions is-open' : 'navbar-actions'}>
          <div className="navbar-links-mobile">
            {renderLinks('navbar-links navbar-links--mobile')}
          </div>

          {/* Botón de Altavoz conectado al estado global */}
          <button onClick={handleSoundToggle} className="icon-btn" title={!soundEnabled ? "Activar sonido" : "Silenciar sonido"}>
            {!soundEnabled ? <VolumeX size={20} /> : <Volume2 size={20} />}
            <span className="icon-btn__label">{!soundEnabled ? 'Activar sonido' : 'Silenciar sonido'}</span>
          </button>

          <div className="divider"></div>

          <button onClick={toggleTheme} className="icon-btn theme-toggle" title={isDarkMode ? "Modo día" : "Modo noche"}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span className="icon-btn__label">{isDarkMode ? 'Modo día' : 'Modo noche'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
