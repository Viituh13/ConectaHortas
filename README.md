# Conecta Hortas


Projeto acadêmico da FIAP - PBL Agrotech - Fase 5
Alinhado ao ODS 2 da ONU (Fome Zero e Agricultura Sustentável)



Plataforma web que conecta comunidades, hortas urbanas e tecnologia para combater a fome e promover agricultura sustentável em São Paulo.

🔗 Deploy: https://viituh13.github.io/ConectaHortas/
🎬 Pitch vídeo: https://youtube.com/@vitoralmeida-f9g


## Descrição

O Conecta Hortas é um protótipo funcional que mapeia hortas comunitárias, conecta voluntários a atividades de agricultura urbana e centraliza o contato entre a comunidade e os organizadores das hortas — tudo isso sem a necessidade de um servidor backend.

O projeto foi desenvolvido para a disciplina de Projetos: Agrotech da FIAP, evoluindo a cada sprint:

FaseEntregaFase 3Protótipo visual e identidade de marcaFase 4Site funcional, validações reais, busca de hortas, deploy


## Tecnologias

- React
- JavaScript
- HTML
- CSS
- Vite

## Funcionalidades


🗺️ Mapa interativo (Leaflet + OpenStreetMap) com pins customizados por status da horta (vagas abertas, lotada, nova)
🔍 Busca de hortas em tempo real por nome, bairro ou tipo de cultivo
🎛️ Filtros por status diretamente no mapa e nos cards
📊 Painel de impacto com contadores animados (famílias atendidas, voluntários, toneladas colhidas, etc.)
✅ Formulário de contato com validação real:

Nome completo (nome + sobrenome, mínimo 2 letras por parte)
E-mail (formato usuario@dominio.tld)
Mensagem (obrigatória, máximo de 500 caracteres com contador visual)
Mensagens de erro em linguagem clara (ex: "Digite seu nome completo (nome e sobrenome).")



📧 Envio de e-mail via EmailJS, com fallback automático por mailto: caso o serviço não esteja configurado — a mensagem nunca se perde
📱 Totalmente responsivo (mobile, tablet, desktop)
♿ Acessibilidade: atributos ARIA, navegação por teclado, foco visível, mensagens de erro com aria-live
🎨 Identidade visual própria, animações suaves, hover effects e navbar fixa com destaque da página atual



## Nova funcionalidade da Fase 5

O sistema de favoritos permite salvar e remover hortas com um clique. A lista e a quantidade ficam persistidas no `localStorage`, inclusive após atualizar a página, sem backend.

## Estrutura do projeto

conecta-hortas/
├── index.html          → Página inicial (hero + painel de impacto)
├── hortas.html          → Mapa interativo + busca + cards das hortas
├── voluntariado.html    → Benefícios, atividades e depoimentos
├── sobre.html           → ODS 2, objetivos e informações do projeto
├── contato.html         → Formulário de contato com validação e envio de e-mail
├── style.css            → Estilos (compartilhado por todas as páginas)
├── script.js            → Lógica (compartilhado por todas as páginas)
└── imagens/
    ├── identidade-visual-logo.jpg
    └── identidade-visual-mockups.jpg


O projeto agora é uma SPA React com componentes reutilizáveis, páginas roteadas no cliente e CSS da identidade visual da Fase 4.

```text
src/
├── assets/       imagens do projeto
├── components/   layout e cards reutilizáveis
├── data/         dados das hortas
├── pages/        telas da aplicação
├── styles/       estilos compartilhados
├── utils/        validações
├── App.jsx
└── main.jsx
legacy/           HTML da Fase 4 arquivado para referência
tests/            testes automatizados
```




## Execução

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

No Vercel, importe o repositório, mantenha o comando de build `npm run build` e o diretório de saída `dist`. O arquivo `vercel.json` já configura o fallback das rotas React.

## Tecnologias utilizadas

CamadaTecnologiaEstruturaHTML5 semânticoEstiloCSS3 (variáveis, grid, flexbox, animações)InteratividadeJavaScript puro (vanilla, sem frameworks)MapaLeaflet.js + tiles do OpenStreetMapÍconesLucide IconsTipografiaGoogle Fonts — Fraunces (display) + DM Sans (corpo)Envio de e-mailEmailJS (com fallback mailto:)DeployGitHub Pages

Não há dependências de build (sem Node, sem npm) — é HTML/CSS/JS puro, pronto para rodar em qualquer navegador.


▶️ Como executar localmente

Não é necessário nenhum servidor ou instalação. Basta:


Baixar/clonar a pasta conecta-hortas/
Abrir o arquivo index.html diretamente no navegador
ou, para evitar eventuais bloqueios de CORS em alguns navegadores, servir a pasta com um servidor local simples:


bash   # Python 3
   cd conecta-hortas
   python3 -m http.server 8080

Depois acesse http://localhost:8080 no navegador.


📧 Configurando o envio de e-mail (EmailJS)

O formulário de contato (contato.html) está pronto para enviar e-mails de verdade através do EmailJS, sem precisar de backend. Por padrão, ele funciona em modo de segurança: abre o cliente de e-mail do usuário com a mensagem pré-preenchida (mailto:), garantindo que nada se perca até a integração ser configurada.

Para ativar o envio 100% automático (plano grátis — 200 e-mails/mês):


Crie uma conta em emailjs.com
Em Email Services, conecte sua conta do Gmail e copie o Service ID
Em Email Templates, crie um template usando as variáveis {{from_name}}, {{from_email}}, {{assunto}}, {{mensagem}} — e configure o campo To Email como {{to_email}}. Copie o Template ID
Em Account → General, copie sua Public Key
Abra script.js e substitua os valores no topo do arquivo:


js   const EMAILJS_CONFIG = {
     publicKey:  'SUA_PUBLIC_KEY',
     serviceId:  'SEU_SERVICE_ID',
     templateId: 'SEU_TEMPLATE_ID',
     toEmail:    'vitor.almeidadms05@gmail.com',
   };


Salve e publique novamente o site


O arquivo script.js contém comentários detalhados explicando os erros mais comuns de configuração (campo "To Email" ausente no template, OAuth do Gmail expirado, etc.).


🚀 Deploy (GitHub Pages)

O site está publicado via GitHub Pages:

🔗 https://viituh13.github.io/ConectaHortas/

PáginaURLIníciohttps://viituh13.github.io/ConectaHortas/index.htmlHortashttps://viituh13.github.io/ConectaHortas/hortas.htmlVoluntariadohttps://viituh13.github.io/ConectaHortas/voluntariado.htmlSobrehttps://viituh13.github.io/ConectaHortas/sobre.htmlContatohttps://viituh13.github.io/ConectaHortas/contato.html

Como foi feito:


Repositório ConectaHortas criado no GitHub com os arquivos na raiz (ou em /docs, conforme a configuração escolhida)
Em Settings → Pages, a branch de publicação foi selecionada (geralmente main)
O GitHub gera automaticamente a URL pública no formato https://<usuario>.github.io/<repositorio>/



Como o projeto é multi-página estática (sem build), qualquer atualização enviada via git push é refletida automaticamente no site publicado em poucos minutos.



Alternativa equivalente, caso prefira: Netlify Drop — basta arrastar a pasta conecta-hortas/ para publicar sem nenhuma configuração.


🌍 Alinhamento com o ODS 2

Este projeto contribui diretamente para metas específicas do Objetivo de Desenvolvimento Sustentável nº 2 da Agenda 2030 da ONU:


Meta 2.1 — Acesso universal a alimentos seguros e nutritivos
Meta 2.3 — Aumento da produtividade e renda de pequenos produtores
Meta 2.4 — Sistemas de produção de alimentos sustentáveis e resilientes


🎓 Instituição

FIAP — Faculdade de Informática e Administração Paulista
Disciplina: Projetos — Agrotech (PBL)
Fase 4 · 2025


📄 Licença

- Projeto acadêmico desenvolvido para fins educacionais no contexto do PBL da FIAP. Uso livre para fins de estudo.
