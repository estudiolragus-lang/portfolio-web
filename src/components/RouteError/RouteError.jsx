import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { site } from '../../data/site';

export default function RouteError() {
  const error = useRouteError();
  return <main className="page-section"><span className="page-eyebrow">{site.name}</span><h1 className="page-title">Algo no salió como esperaba.</h1><p className="page-lead">{isRouteErrorResponse(error) && error.status === 404 ? 'Esta página no está disponible.' : 'Podés recargar la página o volver al inicio para seguir explorando.'}</p><a href="/" className="btn btn-primary" style={{ marginTop: 24 }}>Volver al inicio</a></main>;
}
