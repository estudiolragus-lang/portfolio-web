import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';

test('las seis páginas se pueden renderizar con sus proveedores y relaciones accesibles', async t => {
  const server = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  try {
    const { AudioProvider } = await server.ssrLoadModule('/src/context/AudioContext.jsx');
    const routes = [
      ['/', 'home', 'QA Tester'], ['/about', 'about', 'Del desarrollo'],
      ['/skills', 'skills', 'con base técnica'], ['/projects', 'projects', 'Lo que construí'],
      ['/contact', 'contact', 'Hablemos'], ['/ruta-inexistente', 'notFound', 'Esta ruta se nos escapó'],
    ];
    for (const [path, folder, heading] of routes) {
      await t.test(path, async () => {
        const { default: Page } = await server.ssrLoadModule('/src/pages/' + folder + '/' + folder + '.jsx');
        const markup = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [path] }, createElement(AudioProvider, null, createElement(Page))));
        assert.ok(markup.includes(heading));
        assert.equal((markup.match(/<h1[\s>]/g) ?? []).length, 1);
        assert.ok(!markup.includes('href="undefined"'));
        for (const [, target] of markup.matchAll(/aria-controls="([^"]+)"/g)) {
          assert.ok(markup.includes('id="' + target + '"'), 'No existe el destino accesible ' + target);
        }
        if (folder === 'skills') assert.equal((markup.match(/role="tabpanel"/g) ?? []).length, 4);
        if (folder === 'projects') assert.ok(markup.includes('Datos de ejemplo'));
        if (folder === 'contact') assert.ok(markup.includes('name="_gotcha"'));
      });
    }
  } finally {
    await server.close();
  }
});
