import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { pageMeta } from './src/data/site.js'
import { renderRouteHtml } from './scripts/routeMetadata.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'portfolio-route-metadata',
    enforce: 'post',
    generateBundle(_, bundle) {
      const entry = bundle['index.html'];
      if (!entry || typeof entry.source !== 'string') throw new Error('Falta index.html en el build');
      const html = entry.source;
      entry.source = renderRouteHtml(html, '/', pageMeta['/']);
      for (const [path, metadata] of Object.entries(pageMeta)) {
        if (path === '/') continue;
        this.emitFile({ type: 'asset', fileName: path.slice(1) + '.html', source: renderRouteHtml(html, path, metadata) });
      }
      this.emitFile({ type: 'asset', fileName: '404.html', source: renderRouteHtml(html, '/404', {
        title: 'Página no encontrada', description: 'Esta página no existe. Volvé al inicio para explorar los proyectos de Agustín García.',
      }, true) });
    },
  }],
})
