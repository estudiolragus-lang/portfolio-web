import { site } from '../src/data/site.js';

const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// HTML de entrada por ruta: los robots sociales no necesitan ejecutar React.
// El contenido de la aplicación sigue renderizándose en el cliente.
export function renderRouteHtml(html, path, metadata, noindex = false) {
  const title = escapeHtml(metadata.title ? metadata.title + ' | ' + site.title : site.title);
  const description = escapeHtml(metadata.description);
  const url = escapeHtml(site.url + path);
  let output = html
    .replace(/<title>[^<]*<\/title>/, '<title>' + title + '</title>')
    .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, '$1' + description + '$2')
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, '$1' + title + '$2')
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/, '$1' + description + '$2')
    .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, '$1' + url + '$2')
    .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, '$1' + url + '$2');
  if (noindex) output = output.replace('</head>', '<meta name="robots" content="noindex" /></head>');
  return output;
}
