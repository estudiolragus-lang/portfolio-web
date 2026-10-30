import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, ImageOff } from 'lucide-react';
import './ProjectShots.css';

function ShotImage({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="shot-unavailable"><ImageOff size={24} aria-hidden="true" />No se pudo cargar la imagen. {alt}</span>
    : <img src={src} alt={alt} onError={() => setFailed(true)} decoding="async" {...props} />;
}

export default function ProjectShots({ shots, title, label, footnote = '', contain = false, featured = false }) {
  const [current, setCurrent] = useState(null);
  const [selected, setSelected] = useState(0);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const total = shots.length;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current !== null && !dialog.open) dialog.showModal();
    if (current === null && dialog.open) dialog.close();
  }, [current]);
  const open = (index, e) => { openerRef.current = e.currentTarget; setCurrent(index); };
  const close = () => { setCurrent(null); openerRef.current?.focus({ preventScroll: true }); };
  const go = step => setCurrent(index => index === null ? null : (index + step + total) % total);
  if (!total) return null;
  const shot = current === null ? null : shots[current];
  return <>
    {featured && <div className="shots-featured">
      <button type="button" className="shots-featured__open" aria-label={'Ampliar: ' + shots[selected].title} onClick={e => open(selected, e)}>
        <ShotImage key={shots[selected].id} src={shots[selected].full} alt={shots[selected].alt} width="1400" height="912" loading="lazy" />
        <span className="shots-featured__zoom"><Maximize2 size={16} aria-hidden="true" /><span>Ampliar</span></span>
      </button>
      <p className="shots-featured__caption" aria-live="polite">{shots[selected].title}{footnote && ' · ' + footnote}</p>
    </div>}
    <ul className={'shots' + (contain ? ' shots--contain' : '') + (featured ? ' shots--featured' : '')} aria-label={label ?? 'Capturas de ' + title}>
      {shots.map((s, index) => <li key={s.id}>
        <button type="button" className="shots__thumb" {...(featured ? { 'aria-pressed': selected === index } : {})}
          onClick={e => featured ? setSelected(index) : open(index, e)}>
          <img src={s.thumb} alt="" width="480" height="313" loading="lazy" decoding="async" />
          <span className="shots__label">{s.title}</span><span className="sr-only">{featured ? ' (mostrar captura)' : ' (ver ampliada)'}</span>
        </button>
      </li>)}
    </ul>
    <dialog ref={dialogRef} className="shots-dialog" aria-label={shot ? shot.title : 'Imagen ampliada'} onClose={close}
      onClick={e => { if (e.target === dialogRef.current) close(); }}
      onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); go(e.key === 'ArrowRight' ? 1 : -1); } }}>
      <div className="shots-dialog__toolbar">
        <span aria-live="polite">{shot?.title} · {current === null ? 0 : current + 1} de {total}</span>
        <button type="button" className="shots-control" onClick={close} aria-label="Cerrar imagen"><X size={22} aria-hidden="true" /></button>
      </div>
      {shot && <figure className="shots-dialog__figure">
        <ShotImage key={shot.id} src={shot.full} alt={shot.alt} />
        <figcaption><strong>{shot.title}</strong><span>{shot.caption}</span>{footnote && <small>{footnote}</small>}</figcaption>
      </figure>}
      {total > 1 && <div className="shots-dialog__navigation">
        <button type="button" className="shots-control" onClick={() => go(-1)} aria-label="Captura anterior"><ChevronLeft size={24} aria-hidden="true" /></button>
        <span className="shots-dialog__hint">También podés usar las flechas del teclado</span>
        <button type="button" className="shots-control" onClick={() => go(1)} aria-label="Captura siguiente"><ChevronRight size={24} aria-hidden="true" /></button>
      </div>}
    </dialog>
  </>;
}
