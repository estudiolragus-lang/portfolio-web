import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useNoIndex } from '../../hooks/useNoIndex';
import character from '../../assets/images/miCaricatura.webp';
import './notFound.css';

export default function NotFound() {
  useDocumentTitle('Página no encontrada');
  useNoIndex();
  return <section className="page-section not-found">
    <div>
      <span className="page-eyebrow">Error 404</span>
      <h1 className="page-title">Esta ruta se nos escapó<span className="text-accent">.</span></h1>
      <p className="page-lead">Puede que el enlace esté mal escrito o que la página se haya movido. Sigamos por un camino conocido.</p>
      <div className="not-found__actions"><Link to="/" className="btn btn-primary"><ArrowLeft size={17} aria-hidden="true" />Volver al inicio</Link><Link to="/projects" className="text-link">Explorar proyectos<ArrowRight size={17} aria-hidden="true" /></Link></div>
    </div>
    <img src={character} alt="Caricatura de Agustín" width="320" height="320" />
  </section>;
}
