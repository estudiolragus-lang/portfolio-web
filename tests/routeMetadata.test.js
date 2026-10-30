import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderRouteHtml } from '../scripts/routeMetadata.js';
import { pageMeta, site } from '../src/data/site.js';

const template = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('cada ruta tiene título, descripción y canonical propios sin perder el arranque de React', () => {
  for (const [path, metadata] of Object.entries(pageMeta)) {
    const html = renderRouteHtml(template, path, metadata);
    const title = metadata.title ? metadata.title + ' | ' + site.title : site.title;
    assert.ok(html.includes('<title>' + title + '</title>'));
    assert.ok(html.includes('rel="canonical" href="' + site.url + path + '"'));
    assert.ok(html.includes('property="og:url" content="' + site.url + path + '"'));
    assert.ok(html.includes(metadata.description.replaceAll('&', '&amp;')));
    assert.ok(html.includes('src="/src/main.jsx"'));
    assert.ok(!html.includes('content="noindex"'));
  }
});

test('la página de error incluye noindex y escapa el contenido de los metadatos', () => {
  const html = renderRouteHtml(template, '/404', { title: 'Error <404>', description: 'Texto "seguro" & claro' }, true);
  assert.ok(html.includes('content="noindex"'));
  assert.ok(html.includes('Error &lt;404&gt;'));
  assert.ok(html.includes('Texto &quot;seguro&quot; &amp; claro'));
});
