import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import './styles/shared.css';
import App from './App.jsx';
import RouteError from './components/RouteError/RouteError.jsx';
import { AudioProvider } from './context/AudioContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

const router = createBrowserRouter([{
  path: '/', element: <App />, errorElement: <RouteError />,
  children: [
    { index: true, lazy: async () => ({ Component: (await import('./pages/home/home.jsx')).default }) },
    { path: 'about', lazy: async () => ({ Component: (await import('./pages/about/about.jsx')).default }) },
    { path: 'skills', lazy: async () => ({ Component: (await import('./pages/skills/skills.jsx')).default }) },
    { path: 'projects', lazy: async () => ({ Component: (await import('./pages/projects/projects.jsx')).default }) },
    { path: 'contact', lazy: async () => ({ Component: (await import('./pages/contact/contact.jsx')).default }) },
    { path: '*', lazy: async () => ({ Component: (await import('./pages/notFound/notFound.jsx')).default }) },
  ],
}]);

createRoot(document.getElementById('root')).render(
  <StrictMode><ThemeProvider><AudioProvider><RouterProvider router={router} /></AudioProvider></ThemeProvider></StrictMode>,
);
