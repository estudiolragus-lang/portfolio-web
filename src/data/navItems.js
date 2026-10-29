import { House, User, Wrench, FolderOpen, Mail } from 'lucide-react';

// Páginas del sitio. Las usan la barra superior y el pie de página.
// `icon` se ve solo en el menú desplegable del celular.
export const NAV_ITEMS = [
  { to: '/', label: 'Inicio', icon: House },
  { to: '/about', label: 'Sobre mí', icon: User },
  { to: '/skills', label: 'Habilidades', icon: Wrench },
  { to: '/projects', label: 'Proyectos', icon: FolderOpen },
  { to: '/contact', label: 'Contacto', icon: Mail },
];
