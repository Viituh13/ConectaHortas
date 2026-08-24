import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';
import { STATUS_META } from '../data/hortas';

const markerColors = { open: '#43a047', full: '#e53935', new: '#1565c0' };

function markerIcon(status) {
  return L.divIcon({ className: 'horta-map-marker', html: `<span style="background:${markerColors[status]}">🌱</span>`, iconSize: [36, 44], iconAnchor: [18, 44], popupAnchor: [0, -42] });
}

export function HortaMap({ hortas }) {
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  useEffect(() => {
    if (!mapElement.current || mapRef.current) return undefined;
    const map = L.map(mapElement.current, { scrollWheelZoom: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors', maxZoom: 19 }).addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.eachLayer((layer) => { if (layer instanceof L.Marker) map.removeLayer(layer); });
    const markers = hortas.map((horta) => L.marker([horta.lat, horta.lng], { icon: markerIcon(horta.status), title: horta.name }).addTo(map).bindPopup(`<strong>${horta.name}</strong><br>${horta.neighborhood}<br><small>${STATUS_META[horta.status]}</small>`));
    if (markers.length) map.fitBounds(L.featureGroup(markers).getBounds().pad(0.18));
  }, [hortas]);
  return <div className="map-wrapper" role="region" aria-label="Mapa das hortas comunitárias"><div ref={mapElement} id="hortas-map" /><div className="map-legend"><div className="legend-item"><span className="legend-dot legend-open" /> Com vagas</div><div className="legend-item"><span className="legend-dot legend-full" /> Lotada</div><div className="legend-item"><span className="legend-dot legend-new" /> Nova</div></div></div>;
}