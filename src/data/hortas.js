export const PITCH_VIDEO_URL = 'COLOCAR_LINK_DO_YOUTUBE_AQUI';

export const HORTAS = [
  { id: 1, name: 'Horta Jardim Ângela', neighborhood: 'Jardim Ângela', lat: -23.6802, lng: -46.7529, status: 'open', emoji: '🌻', thumbBg: '#c8e6c9', crops: ['Tomate', 'Alface', 'Cenoura'], area: '800 m²', volunteers: 28, desc: 'Horta comunitária com foco em hortaliças para distribuição gratuita a famílias em vulnerabilidade alimentar.' },
  { id: 2, name: 'Horta Cidade Tiradentes', neighborhood: 'Cidade Tiradentes', lat: -23.5891, lng: -46.3729, status: 'full', emoji: '🌿', thumbBg: '#b2dfdb', crops: ['Couve', 'Chuchu', 'Abobrinha'], area: '950 m²', volunteers: 41, desc: 'Iniciativa liderada por mulheres da periferia leste, gerando renda e segurança alimentar para a comunidade.' },
  { id: 3, name: 'Horta Parelheiros', neighborhood: 'Parelheiros', lat: -23.8131, lng: -46.7272, status: 'open', emoji: '🍅', thumbBg: '#dcedc8', crops: ['Beterraba', 'Espinafre', 'Rúcula'], area: '1.200 m²', volunteers: 55, desc: 'Área integrada com escola pública, com oficinas de agroecologia e compostagem para alunos e famílias.' },
  { id: 4, name: 'Horta Capão Redondo', neighborhood: 'Capão Redondo', lat: -23.6672, lng: -46.7791, status: 'open', emoji: '🌾', thumbBg: '#f0f4c3', crops: ['Abóbora', 'Milho', 'Feijão'], area: '600 m²', volunteers: 22, desc: 'Área entre blocos residenciais requalificada como horta comunitária produtiva.' },
  { id: 5, name: 'Horta Grajaú Verde', neighborhood: 'Grajaú', lat: -23.7285, lng: -46.7099, status: 'open', emoji: '🫑', thumbBg: '#e8f5e9', crops: ['Pimentão', 'Quiabo', 'Maxixe'], area: '750 m²', volunteers: 19, desc: 'Horta vertical experimental unindo jovens e sensores IoT de baixo custo.' },
  { id: 6, name: 'Horta Interlagos', neighborhood: 'Interlagos', lat: -23.7061, lng: -46.7093, status: 'new', emoji: '🌱', thumbBg: '#a5d6a7', crops: ['Ervas', 'Temperos', 'Flores'], area: '400 m²', volunteers: 12, desc: 'Novo polo de plantas medicinais e ervas aromáticas em expansão.' },
];

export const STATUS_META = { open: 'Vagas abertas', full: 'Lotada', new: 'Nova' };