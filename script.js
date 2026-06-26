/* ═══════════════════════════════════════════════════════════
   CONECTA HORTAS  ·  script.js  v2.0
   FIAP PBL Agrotech · ODS 2
   ═══════════════════════════════════════════════════════════
   Módulos:
     1. CONFIG & DATA
     2. INIT
     3. NAVBAR & SCROLL
     4. LEAFLET MAP
     5. HORTA CARDS (DOM)
     6. STAT COUNTERS
     7. SCROLL REVEAL
     8. CONTACT FORM + EMAILJS
     9. MISC UTILITIES
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   1. CONFIG & DATA
   ═══════════════════════════════════════════════════════════ */

/**
 * EmailJS configuration.
 * ─────────────────────────────────────────────────────
 * SE VOCÊ NÃO RECEBEU O E-MAIL, o motivo quase sempre é um destes:
 *
 *   1. As chaves abaixo ainda estão com os valores de exemplo
 *      ('YOUR_PUBLIC_KEY' etc). Enquanto não forem substituídas,
 *      o site usa o modo de SEGURANÇA (fallback): ele abre o
 *      aplicativo de e-mail do usuário (mailto:) já preenchido,
 *      em vez de enviar de verdade. Isso é PROPOSITAL, para a
 *      mensagem nunca se perder — mas não é o envio automático.
 *
 *   2. No template do EmailJS, o campo "To Email" não está
 *      configurado para usar {{to_email}} (ou fixo com o seu
 *      e-mail). Sem isso, o EmailJS não sabe para quem mandar.
 *
 *   3. O serviço de e-mail conectado (Gmail) perdeu a autorização
 *      OAuth — isso expira de tempos em tempos. Refaça a conexão
 *      em Email Services → seu serviço → Reconnect.
 *
 * COMO ATIVAR O ENVIO AUTOMÁTICO (plano grátis – 200 e-mails/mês):
 *   1. Crie conta em https://www.emailjs.com/
 *   2. Em "Email Services", adicione o Gmail e copie o Service ID
 *      (ex: "service_abc123").
 *   3. Em "Email Templates", crie um template e copie o Template ID
 *      (ex: "template_xyz789"). No campo "To Email" do template,
 *      use {{to_email}} — isso usa o destinatário enviado pelo site.
 *   4. Em "Account" → "General", copie sua Public Key.
 *   5. Substitua os 3 valores abaixo e publique o site novamente.
 *
 * TEMPLATE SUGERIDO (corpo do e-mail no painel do EmailJS):
 *   Nova mensagem pelo site Conecta Hortas:
 *
 *   Nome:    {{from_name}}
 *   E-mail:  {{from_email}}
 *   Assunto: {{assunto}}
 *
 *   Mensagem:
 *   {{mensagem}}
 * ─────────────────────────────────────────────────────
 */
const EMAILJS_CONFIG = {
  publicKey:  'YOUR_PUBLIC_KEY',   // ← substitua pela sua Public Key
  serviceId:  'YOUR_SERVICE_ID',   // ← substitua pelo seu Service ID
  templateId: 'YOUR_TEMPLATE_ID',  // ← substitua pelo seu Template ID
  toEmail:    'vitor.almeidadms05@gmail.com',
};

/**
 * Hortas data — single source of truth for both
 * the Leaflet map and the DOM cards grid.
 */
const HORTAS = [
  {
    id: 1,
    name: 'Horta Jardim Ângela',
    neighborhood: 'Jardim Ângela',
    city: 'São Paulo',
    lat: -23.6802,
    lng: -46.7529,
    status: 'open',        // 'open' | 'full' | 'new'
    emoji: '🌻',
    thumbBg: '#c8e6c9',
    crops: ['Tomate', 'Alface', 'Cenoura'],
    area: '800 m²',
    volunteers: 28,
    desc: 'Horta comunitária de 800 m² com foco em hortaliças folhosas para distribuição gratuita a famílias em vulnerabilidade alimentar.',
  },
  {
    id: 2,
    name: 'Horta Cidade Tiradentes',
    neighborhood: 'Cidade Tiradentes',
    city: 'São Paulo',
    lat: -23.5891,
    lng: -46.3729,
    status: 'full',
    emoji: '🌿',
    thumbBg: '#b2dfdb',
    crops: ['Couve', 'Chuchu', 'Abobrinha'],
    area: '950 m²',
    volunteers: 41,
    desc: 'Iniciativa liderada por mulheres da periferia leste, gerando renda e segurança alimentar para mais de 300 famílias.',
  },
  {
    id: 3,
    name: 'Horta Parelheiros',
    neighborhood: 'Parelheiros',
    city: 'São Paulo',
    lat: -23.8131,
    lng: -46.7272,
    status: 'open',
    emoji: '🍅',
    thumbBg: '#dcedc8',
    crops: ['Beterraba', 'Espinafre', 'Rúcula'],
    area: '1.200 m²',
    volunteers: 55,
    desc: 'Área integrada com escola pública, com oficinas mensais de agroecologia e compostagem para alunos e pais.',
  },
  {
    id: 4,
    name: 'Horta Capão Redondo',
    neighborhood: 'Capão Redondo',
    city: 'São Paulo',
    lat: -23.6672,
    lng: -46.7791,
    status: 'open',
    emoji: '🌾',
    thumbBg: '#f0f4c3',
    crops: ['Abóbora', 'Milho', 'Feijão'],
    area: '600 m²',
    volunteers: 22,
    desc: 'Parceria com a COHAB: área entre blocos residenciais requalificada como horta comunitária produtiva.',
  },
  {
    id: 5,
    name: 'Horta Grajaú Verde',
    neighborhood: 'Grajaú',
    city: 'São Paulo',
    lat: -23.7285,
    lng: -46.7099,
    status: 'open',
    emoji: '🫑',
    thumbBg: '#e8f5e9',
    crops: ['Pimentão', 'Quiabo', 'Maxixe'],
    area: '750 m²',
    volunteers: 19,
    desc: 'Horta vertical experimental unindo jovens da EJA com sensores IoT de baixo custo para monitoramento inteligente.',
  },
  {
    id: 6,
    name: 'Horta Interlagos',
    neighborhood: 'Interlagos',
    city: 'São Paulo',
    lat: -23.7061,
    lng: -46.7093,
    status: 'new',
    emoji: '🌱',
    thumbBg: '#a5d6a7',
    crops: ['Ervas', 'Temperos', 'Flores'],
    area: '400 m²',
    volunteers: 12,
    desc: 'Novo polo de plantas medicinais e ervas aromáticas com horta-farmácia comunitária em expansão.',
  },
];

/* Status labels & colors */
const STATUS_META = {
  open: { label: 'Vagas abertas', badgeClass: '',           markerColor: '#43a047' },
  full: { label: 'Lotada',        badgeClass: 'badge-full', markerColor: '#e53935' },
  new:  { label: 'Nova',          badgeClass: 'badge-new',  markerColor: '#1565c0' },
};


/* ═══════════════════════════════════════════════════════════
   2. INIT
   ═══════════════════════════════════════════════════════════ */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initLucide();
    initNavbar();
    initHamburger();
    initBackToTop();
    initSmoothScroll();
    initMap();
    renderHortaCards(HORTAS);
    initMapFilters();
    initHortaSearch();
    initScrollReveal();
    initStatCounters();
    initContactForm();
    initCharCounter();
    initEmailJS();
    initHeroParallax();
  });
}


/* ═══════════════════════════════════════════════════════════
   3. NAVBAR & SCROLL
   ═══════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = document.body.dataset.page || 'index';

  /* Active link: agora é definido pela página atual (site multi-página),
     não mais pela posição de scroll dentro de uma única página. */
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === currentPage);
  });

  const update = () => {
    /* Scrolled class */
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    /* Back-to-top */
    const btn = document.getElementById('backTop');
    if (btn) btn.classList.toggle('visible', window.scrollY > 480);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const menu  = document.getElementById('nav-links');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* Close on link click */
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* Close on outside click */
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target) && menu.classList.contains('open')) {
      btn.classList.remove('open');
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

function initBackToTop() {
  document.getElementById('backTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id  = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   4. LEAFLET MAP
   ═══════════════════════════════════════════════════════════ */
let leafletMap    = null;
let allMarkers    = [];       // { marker, horta } pairs
let activeFilter  = 'all';

function initMap() {
  if (typeof L === 'undefined') {
    console.warn('[ConectaHortas] Leaflet not loaded yet – retrying in 1s');
    setTimeout(initMap, 1000);
    return;
  }

  /* Center on São Paulo */
  leafletMap = L.map('hortas-map', {
    center: [-23.680, -46.600],
    zoom: 11,
    zoomControl: true,
    scrollWheelZoom: false,  // friendlier on embedded pages
  });

  /* Tile layer – OpenStreetMap */
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(leafletMap);

  /* Add markers */
  HORTAS.forEach(h => addMarker(h));

  /* Fit bounds to all markers */
  const group = L.featureGroup(allMarkers.map(m => m.marker));
  leafletMap.fitBounds(group.getBounds().pad(0.18));
}

function createCustomIcon(color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
      <filter id="shadow" x="-30%" y="-20%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="rgba(0,0,0,0.25)"/>
      </filter>
      <g filter="url(#shadow)">
        <path d="M18 0C8.06 0 0 8.06 0 18c0 12.42 16.2 25.2 17.1 25.92a1.5 1.5 0 001.8 0C19.8 43.2 36 30.42 36 18 36 8.06 27.94 0 18 0z"
              fill="${color}"/>
        <circle cx="18" cy="18" r="9" fill="white" opacity=".92"/>
        <!-- Leaf icon inside pin -->
        <path d="M18 10 C14 12 12 16 14 20 C16 24 22 22 22 18 C22 14 18 10 18 10Z"
              fill="${color}" opacity=".9"/>
        <line x1="18" y1="20" x2="18" y2="24" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
      </g>
    </svg>`;
  return L.divIcon({
    className: '',
    html: svg,
    iconSize:   [36, 44],
    iconAnchor: [18, 44],
    popupAnchor:[0, -46],
  });
}

function addMarker(horta) {
  const meta   = STATUS_META[horta.status];
  const icon   = createCustomIcon(meta.markerColor);
  const marker = L.marker([horta.lat, horta.lng], { icon, title: horta.name })
    .addTo(leafletMap)
    .bindPopup(buildPopupHTML(horta), {
      maxWidth: 280,
      className: 'ch-popup',
    });

  /* Show detail panel on popup open */
  marker.on('popupopen', () => showDetailPanel(horta));
  allMarkers.push({ marker, horta });
}

function buildPopupHTML(h) {
  const meta = STATUS_META[h.status];
  return `
    <div class="popup-title">${h.name}</div>
    <div class="popup-loc">📍 ${h.neighborhood}, ${h.city}</div>
    <div class="popup-desc">${h.desc.substring(0, 90)}…</div>
    <a href="contato.html" class="popup-btn">Quero participar →</a>`;
}

function showDetailPanel(h) {
  const panel = document.getElementById('hortaDetailPanel');
  const content = document.getElementById('detail-content');
  if (!panel || !content) return;

  const meta  = STATUS_META[h.status];
  const crops = h.crops.map(c => `<span>${c}</span>`).join('');

  content.innerHTML = `
    <div style="display:flex;align-items:flex-start;gap:24px;flex-wrap:wrap">
      <div style="font-size:4rem;line-height:1">${h.emoji}</div>
      <div style="flex:1;min-width:200px">
        <h3 style="font-family:var(--font-display);font-size:1.3rem;color:var(--text-dark);margin-bottom:6px">${h.name}</h3>
        <p style="color:var(--text-light);font-size:.85rem;margin-bottom:12px">📍 ${h.neighborhood}, ${h.city} &nbsp;·&nbsp; ${h.area}</p>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">${crops}</div>
        <p style="color:var(--text-mid);font-size:.9rem;line-height:1.6;margin-bottom:16px">${h.desc}</p>
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
          <span style="font-size:.82rem;color:var(--text-light)">👥 ${h.volunteers} voluntários ativos</span>
          <span class="horta-badge ${meta.badgeClass}" style="position:static">${meta.label}</span>
          <a href="contato.html" class="btn btn-primary" style="padding:9px 20px;font-size:.84rem">Quero participar</a>
        </div>
      </div>
    </div>`;

  /* Apply tag styles inline since they live inside dynamic HTML */
  content.querySelectorAll('div[style*="gap:6px"] > span').forEach(s => {
    s.style.cssText = 'background:var(--green-pale);color:var(--green-dark);font-size:.72rem;font-weight:600;padding:3px 10px;border-radius:999px;display:inline-block';
  });

  panel.hidden = false;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* Close detail panel */
if (typeof document !== 'undefined') {
  document.getElementById('detailClose')?.addEventListener('click', () => {
    document.getElementById('hortaDetailPanel').hidden = true;
    if (leafletMap) leafletMap.closePopup();
  });
}


/* ═══════════════════════════════════════════════════════════
   5. HORTA CARDS (DOM)
   ═══════════════════════════════════════════════════════════ */
function renderHortaCards(list) {
  const grid = document.getElementById('hortasGrid');
  if (!grid) return;

  grid.innerHTML = list.map((h, i) => {
    const meta  = STATUS_META[h.status];
    const crops = h.crops.map(c => `<span>${c}</span>`).join('');
    return `
      <article class="horta-card" data-id="${h.id}" data-status="${h.status}" data-delay="${i * 80}">
        <div class="horta-thumb" style="background:${h.thumbBg}">
          <span class="horta-emoji" role="img" aria-label="${h.name}">${h.emoji}</span>
          <span class="horta-badge ${meta.badgeClass}">${meta.label}</span>
        </div>
        <div class="horta-body">
          <h3>${h.name}</h3>
          <p class="horta-loc">
            <i data-lucide="map-pin" aria-hidden="true"></i>
            ${h.neighborhood}, ${h.city}
          </p>
          <div class="horta-tags" aria-label="Cultivos">${crops}</div>
          <p class="horta-desc">${h.desc}</p>
          <div class="horta-card-footer">
            <span class="horta-volunteers">
              <i data-lucide="users" aria-hidden="true"></i>
              ${h.volunteers} voluntários
            </span>
            <button class="btn btn-card" onclick="flyToHorta(${h.id})" aria-label="Ver ${h.name} no mapa">
              Ver no mapa
            </button>
          </div>
        </div>
      </article>`;
  }).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
  /* Trigger reveal for already-visible cards */
  setTimeout(() => revealCards(), 200);
}

/* Fly to horta on map when card btn clicked */
if (typeof window !== 'undefined') {
  window.flyToHorta = function(id) {
    const found = allMarkers.find(m => m.horta.id === id);
    if (!found || !leafletMap) return;

    document.getElementById('hortas-map')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      leafletMap.flyTo([found.horta.lat, found.horta.lng], 15, { duration: 1.2 });
      setTimeout(() => found.marker.openPopup(), 1400);
    }, 600);
  };
}


/* ═══════════════════════════════════════════════════════════
   MAP FILTERS
   ═══════════════════════════════════════════════════════════ */
function initMapFilters() {
  document.querySelectorAll('.map-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilter(activeFilter);
    });
  });
}

function applyFilter(filter) {
  const filtered = filter === 'all'
    ? HORTAS
    : HORTAS.filter(h => {
        if (filter === 'open') return h.status === 'open' || h.status === 'new';
        if (filter === 'full') return h.status === 'full';
        return true;
      });

  /* Toggle map markers */
  allMarkers.forEach(({ marker, horta }) => {
    const show = filter === 'all' || filtered.includes(horta);
    if (show) {
      if (!leafletMap.hasLayer(marker)) marker.addTo(leafletMap);
    } else {
      if (leafletMap.hasLayer(marker)) leafletMap.removeLayer(marker);
    }
  });

  /* Re-render cards */
  renderHortaCards(filtered);
}


/* ═══════════════════════════════════════════════════════════
   5b. BUSCA DE HORTAS EM TEMPO REAL
   (nova funcionalidade obrigatória — Fase 4)
   ═══════════════════════════════════════════════════════════ */
function initHortaSearch() {
  const input   = document.getElementById('hortaSearch');
  const clearBtn = document.getElementById('clearSearch');
  const countEl  = document.getElementById('searchResultsCount');
  if (!input) return;

  input.addEventListener('input', () => {
    const term = input.value.trim();
    clearBtn.hidden = term.length === 0;
    runSearch(term, countEl);
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.hidden = true;
    runSearch('', countEl);
    input.focus();
  });
}

function runSearch(term, countEl) {
  const normalized = normalizeText(term);

  /* Respect the active map filter (open/full/all) combined with search */
  const base = activeFilter === 'all'
    ? HORTAS
    : HORTAS.filter(h => activeFilter === 'open'
        ? (h.status === 'open' || h.status === 'new')
        : h.status === 'full');

  const results = normalized
    ? base.filter(h => {
        const haystack = normalizeText(
          `${h.name} ${h.neighborhood} ${h.city} ${h.crops.join(' ')} ${h.desc}`
        );
        return haystack.includes(normalized);
      })
    : base;

  /* Update results count message */
  if (countEl) {
    countEl.textContent = normalized
      ? `${results.length} horta${results.length === 1 ? '' : 's'} encontrada${results.length === 1 ? '' : 's'} para "${term}"`
      : '';
  }

  /* Render cards + empty state */
  const grid  = document.getElementById('hortasGrid');
  const empty = document.getElementById('hortasEmpty');
  if (results.length === 0) {
    if (grid)  grid.innerHTML = '';
    if (empty) empty.hidden = false;
  } else {
    if (empty) empty.hidden = true;
    renderHortaCards(results);
  }

  /* Sync map markers with the filtered results */
  allMarkers.forEach(({ marker, horta }) => {
    const show = results.includes(horta);
    if (show) {
      if (leafletMap && !leafletMap.hasLayer(marker)) marker.addTo(leafletMap);
    } else {
      if (leafletMap && leafletMap.hasLayer(marker)) leafletMap.removeLayer(marker);
    }
  });
}

/* Remove accents/case for friendlier search (ex: "Alface" === "alface") */
function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}



/* ═══════════════════════════════════════════════════════════
   6. STAT COUNTERS
   ═══════════════════════════════════════════════════════════ */
const countersStarted = { value: false };

function initStatCounters() {
  window.addEventListener('scroll', checkCounters, { passive: true });
  checkCounters();
}

function checkCounters() {
  if (countersStarted.value) return;
  const targets = document.querySelectorAll('.impact-num[data-target], .stat-num[data-target]');
  if (!targets.length) return;

  const first = targets[0];
  const rect  = first.getBoundingClientRect();
  if (rect.top > window.innerHeight) return;

  countersStarted.value = true;
  targets.forEach(el => animateCounter(el, parseInt(el.dataset.target, 10)));
}

function animateCounter(el, target) {
  const duration = 2000;
  const start    = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    /* Ease out quart */
    const eased = 1 - Math.pow(1 - t, 4);
    const val   = Math.round(eased * target);
    el.textContent = val.toLocaleString('pt-BR');
    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}


/* ═══════════════════════════════════════════════════════════
   7. SCROLL REVEAL
   ═══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  window.addEventListener('scroll', revealCards, { passive: true });
  revealImpactCards();
  window.addEventListener('scroll', revealImpactCards, { passive: true });
}

function revealCards() {
  document.querySelectorAll('.horta-card:not(.visible)').forEach(card => {
    const rect  = card.getBoundingClientRect();
    const delay = parseInt(card.dataset.delay || '0', 10);
    if (rect.top < window.innerHeight - 60) {
      setTimeout(() => {
        card.style.transition = `opacity .5s ease ${delay}ms, transform .5s ease ${delay}ms`;
        card.classList.add('visible');
      }, 0);
    }
  });
}

function revealImpactCards() {
  document.querySelectorAll('.impact-card:not(.visible)').forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      setTimeout(() => {
        card.style.transition = `opacity .5s ease ${i * 60}ms, transform .5s ease ${i * 60}ms`;
        card.classList.add('visible');
      }, 0);
    }
  });
}


/* ═══════════════════════════════════════════════════════════
   8. CONTACT FORM + EMAILJS
   ═══════════════════════════════════════════════════════════ */
function initEmailJS() {
  if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.dataset.submitted = 'false';

  /* As mensagens de erro só aparecem após a tentativa de envio */
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => {
      if (form.dataset.submitted === 'true') validateField(field, form);
    });
    field.addEventListener('input', () => {
      if (form.dataset.submitted === 'true' && field.classList.contains('error')) {
        validateField(field, form);
      }
    });
  });

  form.addEventListener('submit', handleFormSubmit);
}

/* ── Field validation ──
   Regras exigidas pela Fase 4:
   - Nome: obrigatório, nome + sobrenome, cada parte com 2+ letras
   - E-mail: obrigatório, formato válido (usuario@dominio.tld)
   - Mensagem: obrigatória, máx. 500 caracteres
   Todas as mensagens de erro são escritas em linguagem simples,
   dizendo ao usuário o que fazer (não apenas "campo inválido"). */
function shouldDisplayValidationMessages(form) {
  return form?.dataset?.submitted === 'true';
}

function setFieldError(field, message, form = null) {
  const shouldShow = shouldDisplayValidationMessages(form || field?.closest('form'));
  const visibleMessage = shouldShow ? message || '' : '';
  const errEl = field ? document.getElementById(`${field.id}-error`) : null;

  if (errEl) errEl.textContent = visibleMessage;

  if (field) {
    field.classList.toggle('error', !!visibleMessage);
    field.setAttribute('aria-invalid', visibleMessage ? 'true' : 'false');
  }

  return !visibleMessage;
}

function clearFieldErrors(form) {
  form.querySelectorAll('input, textarea, select').forEach(field => {
    const errEl = document.getElementById(`${field.id}-error`);
    if (errEl) errEl.textContent = '';
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
  });
}

function validateField(field, form = field?.closest('form')) {
  let msg = '';
  const v = field.value.trim();

  if (field.id === 'nome') {
    msg = validateFullName(v);
  } else if (field.id === 'email') {
    msg = validateEmail(v);
  } else if (field.id === 'mensagem') {
    msg = validateMessage(v);
  } else if (field.tagName === 'SELECT' && field.required && !v) {
    msg = 'Selecione um assunto para sua mensagem.';
  } else if (field.required && !v) {
    msg = 'Este campo é obrigatório.';
  }

  return setFieldError(field, msg, form);
}

/* Nome completo: pelo menos duas palavras, cada uma com 2+ letras.
   Aceita: "João Silva", "Maria Souza"
   Rejeita: "João", "A Silva", "João S" */
function validateFullName(value) {
  if (!value) return 'Digite seu nome completo.';

  const words = value
    .split(/\s+/)
    .filter(Boolean);

  if (words.length < 2) {
    return 'Digite seu nome completo (nome e sobrenome).';
  }

  /* Cada palavra precisa ter ao menos 2 letras (aceita acentos) */
  const lettersOnly = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
  const tooShortOrInvalid = words.some(
    w => w.length < 2 || !lettersOnly.test(w)
  );

  if (tooShortOrInvalid) {
    return 'Cada parte do nome deve ter pelo menos 2 letras (ex: Maria Souza).';
  }

  return '';
}

/* E-mail: exige usuário + @ + domínio com ponto + extensão de 2+ letras.
   Aceita: "joao@gmail.com"
   Rejeita: "joao", "joao@", "joao.com" */
function validateEmail(value) {
  if (!value) return 'Digite seu e-mail.';

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

  if (!emailRegex.test(value)) {
    return 'Digite um e-mail válido (ex: joao@gmail.com).';
  }

  return '';
}

/* Mensagem: obrigatória, mínimo 10 e máximo 500 caracteres */
function validateMessage(value) {
  if (!value) return 'Escreva sua mensagem antes de enviar.';
  if (value.length < 10) return 'Sua mensagem está muito curta. Conte um pouco mais.';
  if (value.length > 500) return 'Sua mensagem passou do limite de 500 caracteres.';
  return '';
}

function validateAll(form) {
  let valid = true;
  form.dataset.submitted = 'true';
  /* Valida os 3 campos obrigatórios + o select de assunto */
  ['nome', 'email', 'mensagem', 'assunto'].forEach(id => {
    const field = form.querySelector(`#${id}`);
    if (field && !validateField(field, form)) valid = false;
  });
  return valid;
}

/* ── Submit handler ── */
async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  form.dataset.submitted = 'true';

  if (!validateAll(form)) {
    shakeButton(form.querySelector('[type="submit"]'));
    /* Foca no primeiro campo com erro para facilitar a correção */
    form.querySelector('.error')?.focus();
    return;
  }

  /* Honeypot anti-spam */
  if (form._gotcha?.value) return;

  /* Evita envio duplicado em menos de 10s */
  if (form._submitting) return;
  form._submitting = true;
  setTimeout(() => { form._submitting = false; }, 10000);

  const btn       = document.getElementById('submitBtn');
  const successEl = document.getElementById('formSuccess');
  const errorEl   = document.getElementById('formErrorMsg');
  const errorText = document.getElementById('formErrorText');

  setButtonLoading(btn, true);
  successEl.hidden = true;
  errorEl.hidden   = true;

  const data = {
    from_name:  form.nome.value.trim(),
    from_email: form.email.value.trim(),
    assunto:    form.assunto.value || 'Não especificado',
    mensagem:   form.mensagem.value.trim(),
    to_email:   EMAILJS_CONFIG.toEmail,
  };

  const emailJsReady =
    typeof emailjs !== 'undefined' &&
    EMAILJS_CONFIG.publicKey  !== 'YOUR_PUBLIC_KEY' &&
    EMAILJS_CONFIG.serviceId  !== 'YOUR_SERVICE_ID' &&
    EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID';

  try {
    if (emailJsReady) {
      /* ── Envio real via EmailJS ── */
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        data
      );
      console.log('[ConectaHortas] EmailJS OK:', response.status, response.text);
    } else {
      /* ── EmailJS não configurado: abre o cliente de e-mail do usuário
            como alternativa garantida, para a mensagem nunca se perder ── */
      console.warn('[ConectaHortas] EmailJS não configurado — usando fallback mailto.');
      await fakeSend(900); // simula o tempo de carregamento do botão
      openMailtoFallback(data, 900);
    }

    /* Sucesso */
    form.reset();
    clearFieldErrors(form);
    form.dataset.submitted = 'false';
    document.getElementById('charCount').textContent = '0 / 500 caracteres';
    successEl.hidden = false;
    successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => { successEl.hidden = true; }, 7000);

  } catch (err) {
    console.error('[ConectaHortas] Erro ao enviar e-mail:', err);

    /* Se o EmailJS falhar (chave errada, limite excedido, etc.),
       usa o fallback mailto para garantir que a mensagem chegue. */
    if (errorText) {
      errorText.textContent =
        'Não foi possível enviar automaticamente. Abrimos seu aplicativo de e-mail para você concluir o envio para ' +
        EMAILJS_CONFIG.toEmail + '.';
    }
    errorEl.hidden = false;
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => { errorEl.hidden = true; }, 9000);
    openMailtoFallback(data, 900);

  } finally {
    setButtonLoading(btn, false);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    form._submitting = false;
  }
}

/* Abre o cliente de e-mail padrão do usuário com os dados já preenchidos.
   Funciona 100% das vezes, mesmo sem nenhuma configuração de backend,
   e serve como rede de segurança caso o EmailJS não esteja ativo. */
function openMailtoFallback(data, delay = 0) {
  const subject = encodeURIComponent(`[Conecta Hortas] ${data.assunto} — ${data.from_name}`);
  const body = encodeURIComponent(
    `Nome: ${data.from_name}\n` +
    `E-mail: ${data.from_email}\n` +
    `Assunto: ${data.assunto}\n\n` +
    `Mensagem:\n${data.mensagem}`
  );
  const mailtoUrl = `mailto:${EMAILJS_CONFIG.toEmail}?subject=${subject}&body=${body}`;

  if (delay > 0) {
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, delay);
    return;
  }

  window.location.href = mailtoUrl;
}

function fakeSend(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setButtonLoading(btn, loading) {
  if (!btn) return;
  btn.disabled = loading;
  btn.classList.toggle('loading', loading);
  btn.innerHTML = loading
    ? `<span class="btn-spinner" aria-hidden="true"></span> <span>Enviando…</span>`
    : `<i data-lucide="send" aria-hidden="true"></i> <span>Enviar Mensagem</span>`;
}

function shakeButton(btn) {
  if (!btn) return;
  btn.style.animation = 'shake .4s ease';
  btn.addEventListener('animationend', () => btn.style.animation = '', { once: true });
}

/* ── Contador de caracteres (máx. 500) ── */
function initCharCounter() {
  const textarea = document.getElementById('mensagem');
  const counter  = document.getElementById('charCount');
  if (!textarea || !counter) return;

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    counter.textContent = `${len} / 500 caracteres`;
    counter.style.color = len > 480 ? '#e53935' : len > 400 ? '#f57c00' : '';
    if (len > 500) textarea.value = textarea.value.substring(0, 500);
  });
}


/* ═══════════════════════════════════════════════════════════
   9. MISC UTILITIES
   ═══════════════════════════════════════════════════════════ */
function initLucide() {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  else {
    /* Retry once fonts/scripts may not have loaded yet */
    setTimeout(() => {
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 800);
  }
}

function initHeroParallax() {
  const blobs = document.querySelectorAll('.blob');
  if (!blobs.length) return;

  let lastY = 0;
  const update = () => {
    const y = window.scrollY;
    if (Math.abs(y - lastY) < 2) return;
    lastY = y;
    blobs.forEach((blob, i) => {
      const factor = 0.06 * (i + 1);
      blob.style.transform = `translateY(${y * factor}px)`;
    });
  };

  window.addEventListener('scroll', update, { passive: true });
}

/* Inject dynamic nav-link active style */
(function injectStyles() {
  if (typeof document === 'undefined') return;

  const s = document.createElement('style');
  s.textContent = `
    .nav-link.active { background: var(--green-pale); color: var(--green-dark); font-weight: 600; }
  `;
  document.head.appendChild(s);
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateFullName,
    validateEmail,
    validateMessage,
    validateField,
    validateAll,
  };
}
