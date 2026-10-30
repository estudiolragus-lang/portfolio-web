import { Outlet, useNavigation } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/NavBar.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Footer from './components/Footer/Footer.jsx';
import BackgroundHills from './components/BackgroundHills/BackgroundHills.jsx';

function App() {
  const navigation = useNavigation();
  return (
    <div className="app-container">
      <ScrollToTop />
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      {/* El Navbar queda fijo arriba para todas las páginas */}
      <BackgroundHills />
      <Navbar />
      {navigation.state !== 'idle' && <div className="route-loading" role="status">Cargando página…</div>}
      
      {/* El main es el contenedor principal donde cambia el contenido */}
      <main className="main-content" id="contenido" tabIndex={-1}>
        <div className="page-content">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
