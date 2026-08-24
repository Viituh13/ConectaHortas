import { Heart, Search } from 'lucide-react';
import { useState } from 'react';
import { HORTAS } from '../data/hortas';
import { HortaCard } from '../components/HortaCard';
import { HortaMap } from '../components/HortaMap';

export function HortasPage({ favorites, onToggle }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const filtered = HORTAS.filter((horta) => `${horta.name} ${horta.neighborhood} ${horta.crops.join(' ')}`.toLowerCase().includes(query.toLowerCase()) && (filter === 'all' || horta.status === filter));
  const favoriteHortas = HORTAS.filter((horta) => favorites.includes(horta.id));

  return <section className="section hortas-section page-section-top"><div className="container">
    <div className="section-header"><span className="section-tag">🗺 Mapa Verde</span><h2>Nossas Hortas <em>Comunitárias</em></h2><p>Encontre uma iniciativa, conheça os cultivos e faça parte dessa rede viva.</p></div>
    <HortaMap hortas={filtered} />
    <div className="favorite-summary" id="favoritas"><div><Heart size={21} /><strong>Minhas Hortas Favoritas</strong><span>{favorites.length} {favorites.length === 1 ? 'horta salva' : 'hortas salvas'}</span></div><p>{favorites.length ? `Você possui ${favorites.length} ${favorites.length === 1 ? 'horta favorita' : 'hortas favoritas'}.` : 'Você ainda não possui hortas favoritas.'}</p></div>
    <div className="map-controls">{[['all', 'Todas as hortas'], ['open', 'Com vagas abertas'], ['full', 'Lotadas']].map(([value, label]) => <button key={value} className={`map-filter-btn ${filter === value ? 'active' : ''}`} onClick={() => setFilter(value)}>{label}</button>)}</div>
    <div className="search-bar-wrap"><div className="search-bar"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar por nome, bairro ou cultivo..." aria-label="Pesquisar hortas" /></div><span className="search-results-count">{filtered.length} resultado(s)</span></div>
    <div className="hortas-grid">{filtered.map((horta) => <HortaCard key={horta.id} horta={horta} favorite={favorites.includes(horta.id)} onToggle={onToggle} />)}</div>
    {!filtered.length && <div className="hortas-empty"><Search size={30} /><h3>Nenhuma horta encontrada</h3><p>Tente buscar por outro nome, bairro ou cultivo.</p></div>}
    <div className="section-header favorites-heading"><span className="section-tag">Salvas no navegador</span><h2>Suas escolhas, sempre <em>à mão</em></h2><p>Os favoritos ficam armazenados neste navegador via localStorage.</p></div>
    <div className="hortas-grid">{favoriteHortas.map((horta) => <HortaCard key={`favorite-${horta.id}`} horta={horta} favorite onToggle={onToggle} />)}</div>
  </div></section>;
}
