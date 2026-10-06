import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../projects/projects.css';
import './notFound.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

function NotFound() {
  useDocumentTitle('Página no encontrada');

  return (
    <section className="page-section not-found">
      <span className="not-found__code" aria-hidden="true">404</span>
      <h1 className="page-title">Esta página no existe</h1>
      <p className="page-lead">
        Puede que el link esté mal escrito o que la página se haya movido. Volvé al inicio y seguí
        explorando.
      </p>
      <Link to="/" className="not-found__link">
        <ArrowLeft size={18} aria-hidden="true" />
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFound;
