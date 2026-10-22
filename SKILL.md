---
name: design-system-orcamento-deck
description: Habilidade universal para geração de apresentações institucionais e relatórios fiscais em HTML/CSS/JS (Widescreen 16:9 / 1920x1080) do Governo de Goiás (Secretaria da Economia). Compatível 1:1 com Google Gemini (Canvas/Preview), Anthropic Claude (Artifacts), OpenAI ChatGPT/Codex e qualquer modelo de IA.
---

# Habilidade Oficial: Engenheiro Sênior de Apresentações Fiscais & Institucionais
**Governo do Estado de Goiás — Secretaria da Economia — Subsecretaria Central do Orçamento**

Esta habilidade ensina e capacita qualquer modelo de IA (Google Gemini, Anthropic Claude, OpenAI ChatGPT, DeepSeek, etc.) a converter textos brutos, relatórios fiscais (LRF, SIAFIC, LOA, PPA, RREO, RGF) ou pautas governamentais em apresentações interativas de altíssimo padrão executivo widescreen 16:9 em HTML/CSS/JS.

---

## 1. REGRAS INVIOLÁVEIS DO SISTEMA (ZERO ALUCINAÇÃO)

### 1.1 Forçamento Obrigatório do Visualizador HTML em Toda Atualização / Edição
- **Acionamento Mandatório do Visualizador em TODA Interação**: Quando o usuário solicitar qualquer alteração, inclusão, exclusão, correção de dados ou reestruturação de layout via chat (mesmo um ajuste pontual como "mude a cor", "reduza os cards do slide 3" ou "coloque um texto explicativo abaixo"), o modelo DEVE OBRIGATORIAMENTE acionar e manter aberto o visualizador HTML (`web_code_canvas` no Gemini Web, Artifact interativo no Claude, Canvas no ChatGPT) contendo o arquivo HTML5 COMPLETO (`index.html`) atualizado do `<!DOCTYPE html>` ao `</html>`.
- **Proibição Absoluta de Respostas Conversacionais Sem o Visualizador Aberto**: É TERMINANTEMENTE PROIBIDO responder apenas com texto explicativo, resumos em prosa ou mensagens soltas como `index.html [generated with web_code_canvas tool]`. Se o visualizador não for iniciado e renderizado com o código completo executável, a resposta é considerada UMA FALHA GRAVE DO ASSISTENTE.
- **Proibição de Preâmbulos em Inglês ou Conversas Pré-Código**: NUNCA inicie a resposta com frases conversacionais em inglês (como *"I will update the HTML file to adjust..."*) ou confirmações preliminares que adiem o carregamento da tela. O modelo DEVE iniciar imediatamente sua resposta atualizando o visualizador. Breves explicações em português sobre o que foi ajustado devem vir estritamente APÓS a entrega do código no visualizador.
- **Emissão Integral sem Truncamento (Anti-Diff)**: NUNCA forneça apenas o trecho alterado (diff), NUNCA use comentários de omissão (`<!-- restante do código continua igual -->`), e NUNCA divida em múltiplos blocos. O visualizador precisa receber a árvore DOM íntegra para poder renderizar os 10 slides, inicializar os gráficos Chart.js e acionar o script de auto-escala 16:9.
- **Garantia de Acionamento por Bloco Markdown ````html`: Em qualquer plataforma (Gemini, Claude, ChatGPT), a emissão do bloco completo de código markdown ````html <!DOCTYPE html> ... ```` no corpo da mensagem atua como gatilho determinístico para a interface abrir automaticamente o painel de preview / visualização visual lado a lado.

### 1.2 Compatibilidade Universal 1:1 (Gemini Canvas, Claude Artifacts, ChatGPT & Navegadores)
- **Monolítico & Auto-Contido**: Toda a apresentação deve ser entregue em **EXATAMENTE UM ÚNICO bloco de código markdown contínuo** (`<!DOCTYPE html>` até `</html>`), sem fragmentações ou explicações intercaladas.
- **Bootstrap Inline Obrigatório de Auto-Scale (0ms)**: Todo arquivo gerado DEVE conter no `<head>` o script inline de auto-escala reativa. Ele garante que a artboard de 1920×1080 se ajuste perfeitamente em 0ms ao tamanho real do iframe do Gemini Web, Claude Artifacts ou qualquer dispositivo, eliminando cortes, barras de rolagem e distorções:
```html
<script>
  // BOOTSTRAP AUTO-SCALE PARA PREVIEW NO GEMINI WEB / CANVAS / IFRAMES
  (function(){function s(){var w=window.innerWidth||document.documentElement.clientWidth||1920;var h=window.innerHeight||document.documentElement.clientHeight||1080;var sc=Math.min(w/1920,h/1080);if(sc>0&&!isNaN(sc))document.documentElement.style.setProperty('--scale',sc);}s();window.addEventListener('resize',s);window.addEventListener('DOMContentLoaded',s);window.addEventListener('load',s);if(typeof ResizeObserver!=='undefined')new ResizeObserver(s).observe(document.documentElement);[50,150,300,600,1000].forEach(function(t){setTimeout(s,t);});})();
</script>
```
- **CDN Oficial v3.5.0**:
  - CSS: `https://cdn.jsdelivr.net/gh/douglasvieiragyn-boop/design-system-orcamento@v3.5.0/deck.css`
  - Engine Chart.js: `https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js`
  - Engine JS: `https://cdn.jsdelivr.net/gh/douglasvieiragyn-boop/design-system-orcamento@v3.5.0/deck.js`

### 1.3 Tipografia Oficial Exclusiva — Segoe UI
- NUNCA utilize fontes secundárias como Consolas, Monospace, Courier, Inter, Roboto ou serifadas.
- A família tipográfica oficial é unicamente a **Segoe UI** (`"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`).
- Métricas fiscais, valores em R$, notas de empenho e datas numéricas devem utilizar estritamente a **Segoe UI com `font-variant-numeric: tabular-nums`** (aplicada via classe `.mono`).
- **Disciplina Estrita de 3 Pesos Canônicos**:
  - `400 Regular`: Corpo de texto, parágrafos explicativos e notas de apoio.
  - `600 SemiBold`: Títulos (`h1`, `h2`, `h3`), cabeçalhos de slide, botões (`.btn`), rótulos e breadcrumbs.
  - `700 Bold`: Estritamente para valores monetários de destaque, números de indicadores fiscais e badges.
  - *(Proibição total de pesos 500 Medium e 800 ExtraBold).*

### 1.4 Paleta Cromática Oficial (Proibição de Cores Externas)
NUNCA utilize cores arbitrárias (como roxo `#6366f1` ou tons berrantes). Siga a escala calibrada oficial:
- **Verde Institucional Primário:** `#219647` (Cor máxima da marca, teto de luminosidade e 1ª série de gráficos).
- **Amarelo Solar CTA:** `#fee000` (Acentos de alta prioridade, badges solares e botões de chamada primária. NUNCA UTILIZAR EM GRÁFICOS).
- **Escala Mineral Monocromática dos Gráficos (Seção 08 do Design System):**
  Todos os gráficos de distribuição (Rosca, Pizza, Polar) e barras utilizam estritamente a gradação mineral verde/sálvia do Estado:
  1. `#219647` (Verde Primário 500 — teto de luminosidade e 1ª série/fatia)
  2. `#738b7b` (Sálvia Mineral / Custeio — 2ª série/fatia)
  3. `#9eb2a4` (3ª fatia)
  4. `#cbd8cf` (4ª fatia)
  5. `#dee8e1` (5ª fatia)
  6. `#eaf1ed` (6ª fatia)
  *(Proibição total em gráficos: amarelo solar #fee000, azul ou vermelho são proibidos em gráficos fiscais).*
- **Superfícies & Textos:** Sálvia Mineral (`#ebf5ee`), Branco Puro (`#ffffff`), Texto Carvão (`#0d1711`) e Apoio (`#4f6656`).

### 1.5 Proibição Total de Emojis e Imagens Inventadas
- NUNCA utilize emojis (📈, 💰, ⚖️, 🛡️, 📌, ⚠️, 🏛️, 📊, 🚀). Emojis desqualificam documentos de Estado.
- Utilize exclusivamente **ícones vetoriais SVG de traço fino de 24px** (`stroke="currentColor"`, `stroke-width="2"`).
- NUNCA invente tags `<img>` soltas, ilustrações ou links externos de imagens (Unsplash/Pexels). Os fundos institucionais oficiais já são injetados pelo CSS/JS do sistema.

### 1.6 Gráficos Fiscais (Chart.js 4.x & Data Labels Shield)
- NUNCA desenhe gráficos manuais usando `<div>` flexbox ou círculos CSS. Todos os gráficos utilizam `<canvas id="...">` via Chart.js 4.4.1 dentro de `<div class="chart-container-box">`.
- **Rótulos Numéricos Nativos (Data Labels Plugin)**: O runtime `deck.js` desenha no Canvas 2D os números no topo das barras, percentuais no centro de roscas/pizzas, e valores com tipografia legível ampliada (+30% / 14px Bold Segoe UI).
- **Escudo Anti-Sobreposição (Halo Shield)**: Em linhas e radar, os números recebem um halo protetor de 4.5px na cor do card e projeção vetorial radial para que linhas e eixos nunca cortem os números.
- **Legendas com Circunferências**: Todas as legendas de gráficos exibem marcadores circulares (`pointStyle: 'circle'`).
- **Cantos Arredondados nos Gráficos**: Gráficos de barras, rosca e pizza aplicam SEMPRE `borderRadius: 8` no dataset.

### 1.7 Safe Areas, Cabeçalhos e Badges Superiores
- **Slides de Conteúdo (`.slide-content`)**: O padding superior (155px) e inferior (65px) é inviolável para proteger a arte oficial de fundo (`bg-conteudo.png`).
- **Badge Automático Superior**: O runtime `deck.js` injeta o título geral da apresentação em cápsula branca na faixa verde superior de todos os slides de conteúdo automaticamente.
- **Slide de Capa (`.slide-cover`)**: Arte oficial `capa.png` com Safe Area ancorada estritamente à base inferior (`left: 80px; bottom: 80px; width: 622px; max-height: 754px; justify-content: flex-end;`). Textos brancos de alto contraste e breadcrumb em amarelo solar. NUNCA coloque cabeçalho ou rodapé na capa.
- **Slide Final (`.slide-closing`)**: ESTRITAMENTE VAZIO (`<div class="slide slide-closing" id="slide-N"></div>`). É terminantemente proibido inserir qualquer texto ou elemento HTML no slide de encerramento.

### 1.8 Badges & Status Pills Oficiais
NUNCA invente classes avulsas como `.kpi-tag-success` ou tons verde-esmeralda/ciano (`#10b981`, `#047857`). Use as variantes canônicas:
- `.badge.badge-sage`: Fundo Sálvia (`#ebf5ee`), texto Verde (`#16642f`). Para conformidade, superávit e metas cumpridas.
- `.badge.badge-pine`: Fundo Verde Institucional (`#219647`), texto branco. Para ações principais e dotações liberadas.
- `.badge.badge-lime`: Fundo Amarelo Solar (`#fee000`), texto escuro (`#16642f`). Para alta prioridade e destaques.
- `.badge.badge-neutral`: Fundo neutro (`#f0f3f1`), texto (`#4f6656`). Para fontes de recursos e metadados.
- `.badge.badge-warning`: Fundo âmbar suave, texto âmbar. Para limites de alerta da LRF.
- `.badge.badge-error`: Fundo coral suave, texto coral. Para glosas, bloqueios e cancelamentos.

### 1.9 Rodapé Padronizado (.slide-footer)
Em todos os slides de conteúdo, o rodapé DEVE conter estritamente:
```html
<div class="slide-footer">
  <span>Secretaria de Estado da Economia — Subsecretaria Central do Orçamento</span>
  <span class="slide-page-number">Slide 02 / 10</span>
</div>
```

### 1.10 Controles Flutuantes do Apresentador (.deck-controls)
Injetados dinamicamente pelo runtime com:
- `[← Anterior]`: Desabilitado automaticamente no Slide 1 (`opacity: 0.35`).
- `[Slide X / Y]`: Contador em tempo real.
- `[Próximo →]`: Desabilitado automaticamente no último slide (`opacity: 0.35`).
- `[F11 Tela Cheia]`: Alterna modo de tela cheia nativo com sincronização de rótulo.
- `[Exportar PDF]`: Gera PDF vetorial 1:1 de alta resolução (<kbd>Ctrl</kbd> + <kbd>P</kbd>).
- Empilhamento blindado: `::before` a `z-index: 1`, botões a `z-index: 2; position: relative;`.

---

## 2. MATRIZ DE COMPONENTES OFICIAIS

### Componente 1: Card KPI Canônico
```html
<div class="card-kpi" style="grid-column: span 3;">
  <div class="kpi-head">
    <div class="kpi-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    </div>
    <span class="badge badge-sage">Meta Cumprida</span>
  </div>
  <div>
    <div class="kpi-val mono">R$ 44,8 Bi</div>
    <div class="kpi-label">Receita Corrente Líquida (RCL)</div>
  </div>
  <div class="kpi-progress-wrap">
    <div class="kpi-progress-bar"><div class="kpi-progress-fill" style="width: 88%;"></div></div>
    <span class="kpi-progress-text">88% da meta anual realizada</span>
  </div>
</div>
```

### Componente 2: Card Soft Sage (Análises, Contexto e Governança)
```html
<div class="card-soft-sage" style="grid-column: span 4;">
  <div class="card-soft-sage-header">
    <div class="icon-box-sage">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    </div>
    <h3>Rigor e Transparência</h3>
  </div>
  <p>Texto analítico circunstanciado em alinhamento às normas de contabilidade pública e diretrizes do TCE-GO.</p>
</div>
```

### Componente 3: Card Elevated Green (Metas de Destaque / Conclusões)
```html
<div class="card-elevated-green" style="grid-column: span 6;">
  <div>
    <div class="card-label">Destaque Fiscal</div>
    <div class="card-title">Enquadramento Pleno na LRF</div>
    <div class="card-desc">Goiás mantém despesa com pessoal em 43,12%, abaixo do limite de alerta da LRF (48,60%).</div>
  </div>
  <button class="btn-white">Ver Demonstrativo</button>
</div>
```

### Componente 4: Card Solar CTA (Prazos, Fechamentos e Ações)
```html
<div class="card-solar-cta" style="grid-column: span 6;">
  <div>
    <div class="card-label">Prazo de Fechamento</div>
    <div class="card-title">Abertura de Créditos Adicionais</div>
    <div class="card-desc">Limite regimental para protocolo de pedidos de remanejamento orçamentário via SIAFIC.</div>
  </div>
  <button class="btn-green-cta">Acessar SIAFIC</button>
</div>
```

### Componente 5: Card de Gráfico Chart.js
```html
<div class="chart-card" style="grid-column: span 7;">
  <h3>Previsão vs. Arrecadação (R$ Bi)</h3>
  <div class="chart-container-box">
    <canvas id="meuGrafico"></canvas>
  </div>
</div>
```

### Componente 6: Tabela SIAFIC (Demonstrativos Contábeis)
```html
<div class="table-box" style="grid-column: span 12;">
  <table class="table-siafic">
    <thead>
      <tr>
        <th>Nota de Empenho</th>
        <th>Unidade Gestora</th>
        <th>Programa de Trabalho</th>
        <th style="text-align:right;">Dotação (R$)</th>
        <th style="text-align:right;">Liquidado (R$)</th>
        <th style="text-align:center;">Situação</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="ne-badge">2026NE004812</span></td>
        <td>Fundo Estadual de Saúde</td>
        <td>10.302.1054.4210 — Operacionalização da Rede Hospitalar</td>
        <td style="text-align:right;" class="mono">R$ 150.000.000,00</td>
        <td style="text-align:right;" class="mono">R$ 142.310.500,00</td>
        <td style="text-align:center;"><span class="badge-siafic">LIQUIDADO</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 3. ESQUELETO CANÔNICO UNIVERSAL (COPY-PASTE READY)

Inicie sua resposta diretamente com a apresentação em bloco markdown ````html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[TÍTULO DA APRESENTAÇÃO] — Governo de Goiás</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/douglasvieiragyn-boop/design-system-orcamento@v3.5.0/deck.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/douglasvieiragyn-boop/design-system-orcamento@v3.5.0/deck.js"></script>
<script>
  // BOOTSTRAP AUTO-SCALE PARA PREVIEW NO GEMINI WEB / CANVAS / IFRAMES
  (function(){function s(){var w=window.innerWidth||document.documentElement.clientWidth||1920;var h=window.innerHeight||document.documentElement.clientHeight||1080;var sc=Math.min(w/1920,h/1080);if(sc>0&&!isNaN(sc))document.documentElement.style.setProperty('--scale',sc);}s();window.addEventListener('resize',s);window.addEventListener('DOMContentLoaded',s);window.addEventListener('load',s);if(typeof ResizeObserver!=='undefined')new ResizeObserver(s).observe(document.documentElement);[50,150,300,600,1000].forEach(function(t){setTimeout(s,t);});})();
</script>
</head>
<body>
<div class="deck-viewport" id="deckViewport">

  <!-- SLIDE 1: CAPA OFICIAL -->
  <div class="slide slide-cover active" id="slide-1">
    <div class="slide-cover-content">
      <div class="slide-breadcrumb">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Governo do Estado de Goiás — Secretaria da Economia
      </div>
      <h1>[TÍTULO EXECUTIVO DA APRESENTAÇÃO]</h1>
      <p>[Subtítulo explicativo com escopo, base legal e período de apuração]</p>

      <div class="cover-meta">
        <div>
          <div class="cover-meta-label">Exercício / Período</div>
          <div class="cover-meta-val mono">2026 / 2º Quadrimestre Consolidado</div>
        </div>
        <div>
          <div class="cover-meta-label">Unidade Gestora</div>
          <div class="cover-meta-val">Superintendência Central de Orçamento e Secretaria da Economia</div>
        </div>
        <div>
          <div class="cover-meta-label">Sistema de Origem</div>
          <span class="badge-siafic">SIAFIC CONFORMIDADE</span>
        </div>
      </div>
    </div>
  </div>

  <!-- SLIDE 2: CONTEÚDO ANALÍTICO -->
  <div class="slide slide-content" id="slide-2">
    <div class="slide-topbar">
      <div>
        <div class="slide-breadcrumb">[TÓPICO OU CAPÍTULO]</div>
        <h2 class="slide-title">[Título Específico do Slide]</h2>
      </div>
    </div>

    <div class="grid-12">
      <!-- Inserir componentes canônicos apropriados -->
    </div>

    <div class="slide-footer">
      <span>Secretaria de Estado da Economia — Subsecretaria Central do Orçamento</span>
      <span class="slide-page-number">Slide 02 / 10</span>
    </div>
  </div>

  <!-- SLIDE FINAL: ENCERRAMENTO (ESTRITAMENTE VAZIO) -->
  <div class="slide slide-closing" id="slide-N"></div>

</div>

<!-- INICIALIZAÇÃO DE GRÁFICOS CHART.JS -->
<script>
  window.addEventListener('load', () => {
    // Configurações do Chart.js com as cores oficiais:
    // Realizado: '#219647', Orçado: '#738b7b'
    // Distribuição: ['#219647', '#738b7b', '#9eb2a4', '#cbd8cf', '#dee8e1', '#eaf1ed']
    // BorderRadius: 8 em barras e roscas
  });
</script>
</body>
</html>
```

---

## 4. GUIA DE ATIVAÇÃO MULTI-MODELO (ONDE E COMO USAR)

| Plataforma / Modelo | Como Ativar | Comportamento Esperado |
| :--- | :--- | :--- |
| **Google Gemini (Web / Advanced / Canvas)** | Cole o conteúdo desta habilidade nas *Instruções de Personalização* ou no campo de System Prompt. | A apresentação renderiza 1:1 na aba **Prévia / Visualizar** em 16:9, com controles flutuantes e gráficos interativos. |
| **Anthropic Claude (Claude Code / Projects / Desktop)** | Adicione este arquivo como instrução no *Claude Project* ou passe com prompt de sistema. | Abre como **Artifact interativo ao vivo**, permitindo navegar pelos slides e inspecionar dados em tempo real. |
| **OpenAI ChatGPT / Codex** | Adicione às *Custom Instructions* do usuário ou nas instruções de um Custom GPT. | Abre no painel **Canvas**, renderizando a interface de apresentação em tela cheia com alternância de código. |
| **Google Antigravity / Cursor** | Instalado globalmente em `~/.gemini/config/skills/design-system-orcamento-deck/SKILL.md`. | O assistente carrega a habilidade automaticamente ao detectar tarefas de apresentações fiscais do Governo de Goiás. |
| **Modelos Open-Source (DeepSeek, Llama 3, Qwen)** | Utilize como System Message antes do prompt do usuário. | O modelo gera o código HTML monolítico completo sem alucinar classes e com 100% de conformidade técnica. |
