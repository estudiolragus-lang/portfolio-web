import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './ProjectShots.css';

// Galería de capturas de un proyecto: miniaturas en la tarjeta y, al tocar una, la imagen grande
// en un cuadro de diálogo nativo (cierra con Escape, devuelve el foco y se mueve con las flechas).
function ProjectShots({ shots, title, label, footnote = '', contain = false }) {
  const [current, setCurrent] = useState(null);
  const dialogRef = useRef(null);
  const total = shots.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current !== null && !dialog.open) dialog.showModal();
    if (current === null && dialog.open) dialog.close();
  }, [current]);

  const go = (step) => setCurrent((i) => (i + step + total) % total);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  // Un clic en el fondo oscuro (fuera de la imagen) cierra el diálogo
  const onDialogClick = (e) => {
    if (e.target === dialogRef.current) setCurrent(null);
  };

  const shot = current === null ? null : shots[current];

  return (
    <>
      <ul className={`shots ${contain ? 'shots--contain' : ''}`} aria-label={label ?? `Capturas de ${title}`}>
        {shots.map((s, index) => (
          <li key={s.id}>
            <button type="button" className="shots__thumb" onClick={() => setCurrent(index)}>
              <img src={s.thumb} alt="" width="480" height="313" loading="lazy" />
              <span className="shots__label">{s.title}</span>
              <span className="sr-only"> (ver ampliada)</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="shots-dialog"
        aria-label={shot ? `${shot.title}` : 'Imagen ampliada'}
        onClose={() => setCurrent(null)}
        onClick={onDialogClick}
        onKeyDown={onKeyDown}
      >
        {shot && (
          <figure className="shots-dialog__figure">
            <img src={shot.full} alt={shot.alt} />
            <figcaption>
              <strong>{shot.title}</strong>
              <span>{shot.caption}</span>
              <small>
                {current + 1} de {total}
                {footnote ? ` · ${footnote}` : ''}
              </small>
            </figcaption>
          </figure>
        )}
        <button type="button" className="shots-dialog__close" onClick={() => setCurrent(null)} aria-label="Cerrar">
          <X size={22} aria-hidden="true" />
        </button>
        {total > 1 && (
          <>
            <button type="button" className="shots-dialog__nav shots-dialog__nav--prev" onClick={() => go(-1)} aria-label="Captura anterior">
              <ChevronLeft size={26} aria-hidden="true" />
            </button>
            <button type="button" className="shots-dialog__nav shots-dialog__nav--next" onClick={() => go(1)} aria-label="Captura siguiente">
              <ChevronRight size={26} aria-hidden="true" />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}

export default ProjectShots;
