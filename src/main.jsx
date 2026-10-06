import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Componente Layout
import App from './App.jsx';

// Páginas
import Home from './pages/home/home.jsx';
import About from './pages/about/about.jsx';
import Projects from './pages/projects/projects.jsx';
import Skills from './pages/skills/skills.jsx';
import Contact from './pages/contact/contact.jsx';
import NotFound from './pages/notFound/notFound.jsx';

// 1. IMPORTAR EL PROVIDER
import { AudioProvider } from './context/AudioContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "skills", element: <Skills /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. ENVOLVER LA APP CON EL PROVIDER */}
    <ThemeProvider>
      <AudioProvider>
        <RouterProvider router={router} />
      </AudioProvider>
    </ThemeProvider>
  </StrictMode>
);