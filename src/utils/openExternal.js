// Abre un enlace externo (target="_blank") de forma confiable.
//
// Intenta abrirlo en una pestaña nueva. Hay navegadores, extensiones y paneles
// integrados que bloquean las pestañas nuevas y el enlace "no hace nada": en ese caso
// se abre en la misma pestaña, que nunca falla.
export function openExternal(event) {
  const link = event.currentTarget;

  // Con Ctrl, Cmd, Shift, Alt o el botón del medio, el navegador ya sabe qué hacer
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

  // Solo enlaces web que piden pestaña nueva (no mailto: ni tel:)
  if (link.target !== '_blank' || !/^https?:/i.test(link.href)) return;

  event.preventDefault();
  const win = window.open(link.href, '_blank');
  if (win) {
    win.opener = null;
  } else {
    window.location.assign(link.href);
  }
}
