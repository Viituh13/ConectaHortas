import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { HortasPage } from './pages/HortasPage';
import { AboutPage, ContactPage, VolunteerPage } from './pages/SimplePages';
import './styles/style.css';
import './styles/react.css';

const routeAliases = { '/index.html': '/', '/hortas.html': '/hortas', '/voluntariado.html': '/voluntariado', '/sobre.html': '/sobre', '/contato.html': '/contato' };
const resolvePath = (pathname) => routeAliases[pathname] || pathname;

export default function App() {
  const [path, setPath] = useState(resolvePath(window.location.pathname));
  const [favorites, setFavorites] = useState(() => { try { return JSON.parse(localStorage.getItem('conecta-hortas-favorites')) || []; } catch { return []; } });
  useEffect(() => { const onPop = () => setPath(resolvePath(window.location.pathname)); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => { localStorage.setItem('conecta-hortas-favorites', JSON.stringify(favorites)); }, [favorites]);
  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const page = path === '/hortas' ? <HortasPage favorites={favorites} onToggle={toggleFavorite} /> : path === '/voluntariado' ? <VolunteerPage /> : path === '/sobre' ? <AboutPage /> : path === '/contato' ? <ContactPage /> : <HomePage favoriteCount={favorites.length} />;
  return <Layout currentPath={path}>{page}</Layout>;
}