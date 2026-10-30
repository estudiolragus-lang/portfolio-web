import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import character from '../../assets/images/miCaricatura.webp';
import './CharacterGuide.css';

export default function CharacterGuide({ prompt = '¿Seguimos explorando?', children, to, linkLabel }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <aside className="character-guide" aria-label="Una pista para seguir explorando">
      <img src={character} alt="" width="180" height="180" loading="lazy" decoding="async" />
      <div>
        <button type="button" className="guide-prompt" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          <MessageCircle size={18} aria-hidden="true" />{prompt}
        </button>
        <div id={id} hidden={!open} className="guide-answer">
          <p>{children}</p>
          {to && <Link className="text-link" to={to}>{linkLabel}<ArrowRight size={16} aria-hidden="true" /></Link>}
        </div>
      </div>
    </aside>
  );
}
