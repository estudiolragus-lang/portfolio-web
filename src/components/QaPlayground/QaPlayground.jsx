import { useId, useState } from 'react';
import { Bug, RotateCcw, ArrowRight } from 'lucide-react';
import Reveal from '../Reveal/Reveal';
import './QaPlayground.css';

export default function QaPlayground() {
  const [value, setValue] = useState('0');
  const [result, setResult] = useState(null);
  const [report, setReport] = useState(false);
  const id = useId();
  // Error deliberado y aislado: el límite inferior debería ser >= 1, no >= 0.
  const test = event => {
    event.preventDefault();
    const count = Number(value);
    setResult(value.trim() !== '' && Number.isInteger(count) && count >= 0 && count <= 10 ? 'accepted' : 'rejected');
  };
  return <Reveal as="section" className="qa-playground" aria-labelledby={id + '-title'}>
    <div className="qa-playground__intro">
      <span className="page-eyebrow">Una pausa para probar</span>
      <h2 className="section-heading" id={id + '-title'}>Probalo con mirada QA.</h2>
      <p>Un campo. Una regla. Un error escondido. ¿Qué pasa en los límites?</p>
      <span className="qa-demo-label">Demostración ficticia · No forma parte de mis métricas</span>
    </div>
    <div className="qa-experiment">
      <p className="qa-experiment__rule"><strong>Regla:</strong> se pueden reservar entre 1 y 10 lugares, inclusive.</p>
      <form onSubmit={test} className="qa-experiment__form" noValidate>
        <label htmlFor={id + '-count'}>Cantidad de lugares</label>
        <div><input id={id + '-count'} name="demo-count" type="text" inputMode="numeric" maxLength={8} value={value} onChange={event => { setValue(event.target.value); setResult(null); }} autoComplete="off" /><button className="btn btn-primary" type="submit">Probar<ArrowRight size={17} aria-hidden="true" /></button></div>
      </form>
      <p className="qa-result" role="status">{result === 'accepted' ? 'La demo aceptó la reserva de ' + value + ' lugares.' : result === 'rejected' ? 'La demo rechazó la reserva.' : 'Probá 0, 1, 10 u 11 y compará el resultado con la regla.'}</p>
      <div className="qa-experiment__actions">
        <button className="text-link" type="button" aria-expanded={report} aria-controls={id + '-report'} onClick={() => setReport(!report)}><Bug size={17} aria-hidden="true" />{report ? 'Ocultar reporte' : 'Ver cómo lo reportaría'}</button>
        <button className="qa-reset" type="button" aria-label="Reiniciar demostración" onClick={() => { setValue('0'); setResult(null); setReport(false); }}><RotateCcw size={17} aria-hidden="true" /></button>
      </div>
      <div id={id + '-report'} className="qa-report" hidden={!report}>
        <h3>Se acepta una reserva de cero lugares</h3>
        <dl><div><dt>Pasos</dt><dd>Ingresar 0 en «Cantidad de lugares» y pulsar «Probar».</dd></div><div><dt>Esperado</dt><dd>Rechazar la reserva: la cantidad mínima es 1.</dd></div><div><dt>Observado</dt><dd>La demo acepta una reserva de 0 lugares.</dd></div><div><dt>Evidencia</dt><dd>El mensaje confirma «La demo aceptó la reserva de 0 lugares».</dd></div><div><dt>Qué verificaría después</dt><dd>Límites 1 y 10, valores -1 y 11, decimales y campo vacío.</dd></div></dl>
      </div>
    </div>
  </Reveal>;
}
