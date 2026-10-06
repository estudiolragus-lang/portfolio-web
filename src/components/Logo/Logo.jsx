import './Logo.css';

// Logo en texto: se adapta solo al modo noche/día mediante las variables del tema.
function Logo() {
  return (
    <span className="logo" role="img" aria-label="Agustín, portfolio web">
      <span className="logo__name" aria-hidden="true">
        agustin<span className="logo__cap">G</span>
      </span>
      <span className="logo__sub" aria-hidden="true">
        portofolioWeb
      </span>
    </span>
  );
}

export default Logo;
