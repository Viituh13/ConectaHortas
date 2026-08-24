import { useEffect, useState } from 'react';
import { ArrowUp, Leaf, Menu, PlayCircle, Sprout } from 'lucide-react';
import { PITCH_VIDEO_URL } from '../data/hortas';

const links = [['/', 'Início'], ['/hortas', 'Hortas'], ['/voluntariado', 'Voluntariado'], ['/sobre', 'Sobre'], ['/contato', 'Contato']];

export function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

export function Navbar({ currentPath }) {
  const [open, setOpen] = useState(false);
  return <nav className="navbar scrolled" aria-label="Menu principal"><div className="nav-container">
    <a href="/" className="nav-logo" aria-label="Conecta Hortas - início" onClick={(event) => { event.preventDefault(); navigate('/'); }}><strong className="react-logo-mark"><Sprout size={22} /> Conecta <span>Hortas</span></strong></a>
    <button className={`hamburger ${open ? 'open' : ''}`} aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)}><Menu /></button>
    <ul className={`nav-links ${open ? 'open' : ''}`}>{links.map(([path, label]) => <li key={path}><a href={path} className={`nav-link ${currentPath === path ? 'active' : ''}`} onClick={(event) => { event.preventDefault(); setOpen(false); navigate(path); }}>{label}</a></li>)}<li><a className="nav-cta" href={PITCH_VIDEO_URL} target="_blank" rel="noreferrer"><PlayCircle size={15} /> Pitch</a></li></ul>
  </div></nav>;
}

export function Footer() {
  return <footer className="footer"><div className="footer-top"><div className="container footer-grid"><div className="footer-brand"><strong className="footer-name"><Leaf size={20} /> Conecta Hortas</strong><p>Transformando espaços urbanos em fontes de vida, alimento e comunidade sustentável.</p><div className="footer-ods"><span>Alinhado ao</span><strong>ODS 2 - Fome Zero</strong></div></div><nav className="footer-links"><h5>Navegação</h5>{links.map(([path, label]) => <a key={path} href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>{label}</a>)}</nav><div className="footer-links"><h5>Projeto</h5><a href={PITCH_VIDEO_URL}>Pitch Vídeo</a><a href="mailto:vitor.almeidadms05@gmail.com">E-mail</a></div></div></div><div className="footer-bottom"><div className="container"><span>© 2025 Conecta Hortas · FIAP PBL Agrotech</span><span>Feito com 🌿 por estudantes apaixonados por impacto social</span></div></div></footer>;
}

export function Layout({ currentPath, children }) {
  useEffect(() => { document.title = `Conecta Hortas - ${currentPath === '/' ? 'Início' : currentPath.slice(1)}`; }, [currentPath]);
  return <><Navbar currentPath={currentPath} /><main>{children}</main><Footer /><button className="back-top visible" aria-label="Voltar ao topo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={18} /></button></>;
}