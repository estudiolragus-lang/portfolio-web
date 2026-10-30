import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageMeta, site } from '../data/site';

export function useDocumentTitle(title, description) {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/';
    const metadata = pageMeta[path] ?? pageMeta['/'];
    const name = title ?? metadata.title;
    const fullTitle = name ? `${name} | ${site.title}` : site.title;
    const desc = description ?? metadata.description;
    const url = `${site.url}${path}`;
    document.title = fullTitle;
    [
      ['meta[name="description"]', 'content', desc], ['link[rel="canonical"]', 'href', url],
      ['meta[property="og:url"]', 'content', url], ['meta[property="og:title"]', 'content', fullTitle],
      ['meta[property="og:description"]', 'content', desc],
    ].forEach(([selector, attribute, value]) => document.head.querySelector(selector)?.setAttribute(attribute, value));
  }, [pathname, title, description]);
}
