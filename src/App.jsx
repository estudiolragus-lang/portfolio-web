import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/NavBar.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Footer from './components/Footer/Footer.jsx';
import BackgroundHills from './components/BackgroundHills/BackgroundHills.jsx';

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      {/* El Navbar queda fijo arriba para todas las páginas */}
      <BackgroundHills />
      <Navbar />
      
      {/* El main es el contenedor principal donde cambia el contenido */}
      <main className="main-content">
        <div className="page-content">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;