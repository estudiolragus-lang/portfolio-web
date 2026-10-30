import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Moon, Sun, Volume2, VolumeX, Menu, X } from 'lucide-react';
import Logo from '../Logo/Logo.jsx';
import { useAudio } from '../../context/useAudio.js';
import { useTheme } from '../../context/ThemeContext';
import { NAV_ITEMS } from '../../data/navItems';
import pickSound from '../../assets/sounds/pick.mp3';
import clickSound from '../../assets/sounds/click.mp3';
import sonidoOn from '../../assets/sounds/sonidoOn.mp3';
import './NavBar.css';

export default function NavBar() {
  const { pathname } = useLocation();
  const [openOn, setOpenOn] = useState(null);
  const menuOpen = openOn === pathname;
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound, playSound } = useAudio();

  useEffect(() => {
    let wasScrolled;
    const updateSurface = () => {
      const scrolled = window.scrollY > 12;
      if (scrolled === wasScrolled) return;
      navRef.current?.classList.toggle('is-scrolled', scrolled);
      wasScrolled = scrolled;
    };
    updateSurface();
    window.addEventListener('scroll', updateSurface, { passive: true });
    return () => window.removeEventListener('scroll', updateSurface);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (e.key === 'Escape') { setOpenOn(null); toggleRef.current?.focus(); }
    };
    const outside = (e) => {
      if (!navRef.current?.contains(e.target)) setOpenOn(null);
    };
    const focusOut = (e) => {
      if (!navRef.current?.contains(e.target)) setOpenOn(null);
    };
    const desktop = window.matchMedia('(min-width: 981px)');
    const resized = (e) => { if (e.matches) setOpenOn(null); };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('focusin', focusOut);
    desktop.addEventListener('change', resized);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', focusOut);
      desktop.removeEventListener('change', resized);
    };
  }, [menuOpen]);

  const links = (mobile = false) => <ul className={mobile ? 'navbar-links navbar-links--mobile' : 'navbar-links'}>
    {NAV_ITEMS.map(({ to, label, icon: Icon }) => <li key={to}>
      <NavLink to={to} end={to === '/'} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
        onClick={() => { playSound(pickSound); setOpenOn(null); }}>
        {mobile && <Icon size={18} aria-hidden="true" />}{label}
      </NavLink>
    </li>)}
  </ul>;

  const actions = () => <>
    <button type="button" className="icon-btn" aria-label={soundEnabled ? 'Silenciar sonido' : 'Activar sonido'} aria-pressed={soundEnabled}
      onClick={() => { if (!soundEnabled) playSound(sonidoOn, .25, true); toggleSound(); }}>
      {soundEnabled ? <Volume2 size={19} aria-hidden="true" /> : <VolumeX size={19} aria-hidden="true" />}
      <span className="icon-btn__label">{soundEnabled ? 'Silenciar sonido' : 'Activar sonido'}</span>
    </button>
    <button type="button" className="icon-btn" aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'} aria-pressed={!isDarkMode}
      onClick={() => { playSound(clickSound); toggleTheme(); }}>
      {isDarkMode ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
      <span className="icon-btn__label">{isDarkMode ? 'Modo claro' : 'Modo oscuro'}</span>
    </button>
  </>;

  return <nav ref={navRef} className="navbar" aria-label="Principal">
    <div className="navbar-container">
      <NavLink to="/" className="navbar-logo" aria-label="Agustín García, inicio" onClick={() => setOpenOn(null)}><Logo /></NavLink>
      <div className="navbar-desktop">{links()}</div>
      <div className="navbar-desktop navbar-actions">{actions()}</div>
      <button ref={toggleRef} type="button" className="icon-btn menu-toggle" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="mobile-navigation"
        onClick={() => setOpenOn(menuOpen ? null : pathname)}>
        {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
      </button>
    </div>
    <div id="mobile-navigation" className="mobile-navigation" hidden={!menuOpen}>
      {links(true)}<div className="mobile-preferences">{actions()}</div>
    </div>
  </nav>;
}
