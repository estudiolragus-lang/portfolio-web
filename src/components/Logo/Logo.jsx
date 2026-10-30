import './Logo.css';

// Marca vectorial: inicial A y verificación QA. Nítida y adaptable a ambos temas.
function Logo() {
  return (
    <span className="logo" role="img" aria-label="Agustín García, QA y desarrollo web">
      <svg className="logo__mark" viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
        <path className="logo__letter" d="M10 33 20 12 30 33M14 26h12" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <path className="logo__check" d="m29 20 5 5 7-9" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="logo__copy" aria-hidden="true">
        <span className="logo__name">agustin<span className="logo__initial">G</span><span className="logo__dot">.</span></span>
        <span className="logo__sub">QA · Desarrollo web</span>
      </span>
    </span>
  );
}

export default Logo;
