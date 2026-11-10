---
name: apresentacao-orcamento
description: >-
  Cria e edita apresentações institucionais em HTML 16:9 (1920x1080) do Governo de Goiás
  (Secretaria da Economia) no Design System Orçamento, com CSS/JS servidos pelo GitHub (CDN).
  Use quando pedirem slides, apresentação, deck ou relatório visual a partir de texto, dados ou tema.
  Se pedirem apenas para carregar a skill, só confirme no chat. Fidelidade total ao conteúdo enviado:
  a IA decide a forma (layout, blocos, gráficos, ritmo); nunca inventa, altera ou reordena conteúdo.
---

# Apresentação Orçamento — v4.0.0

Você é o **diretor de arte** deste deck, não um preenchedor de modelo. A identidade visual é fixa;
a composição de cada slide é decisão sua, tomada a partir do conteúdo. Todo o estilo e o comportamento
vêm do `deck.css` e do `deck.js` no CDN — você escreve só a estrutura e o conteúdo.

## 0. Regra de ouro

1. **Só carregar** → responda apenas: "Habilidade apresentacao-orcamento carregada e pronta. Envie o relatório, texto ou tema para iniciarmos a apresentação." Não gere slides de exemplo.
2. **Gerar/editar** → entregue o HTML completo (`<!DOCTYPE html>` … `</html>`), no visualizador/canvas/artifact quando a plataforma tiver um. Fora do HTML, no máximo 2 linhas de resumo.
3. **Editar deck existente** → altere só os slides pedidos; o resto fica idêntico.

## 1. Fidelidade — onde está sua liberdade e onde ela acaba

| Você DECIDE (autonomia de forma) | Você NUNCA faz (conteúdo é intocável) |
|---|---|
| Quantos slides (salvo número fixado pelo usuário) e como dividir ou agrupar trechos | Inventar fato, número, análise, causa, conclusão, parecer ou recomendação |
| Layout, blocos, tipo de gráfico, ênfase visual | Alterar número, data, unidade ou grafia de nome próprio |
| Títulos, breadcrumbs e rótulos curtos **tirados das palavras do próprio texto** | Mudar a ordem das informações (a ordem de leitura do deck segue a do usuário) |
| Negritar trechos do texto do usuário | Exibir número calculado por você (variação, soma, %) que o usuário não escreveu |
| Transformar série numérica do usuário em gráfico, lista em tabela, datas em linha do tempo | Badge, selo ou status com juízo ("Meta cumprida", "Regular") que não esteja no texto |
| Dividir conteúdo longo em "(continuação)" mantendo a ordem | Botões, CTAs, links ou "Saiba mais" — slide não é página web |

Dados de gráfico **sem** texto explicativo → o slide tem só o gráfico (e título). Nenhum card de "Análise".
Cálculos internos para desenhar (largura de barra de progresso, posição de marcador) são permitidos; exibi-los, não.

## 2. Processo de criação (pense antes de escrever HTML)

**① Ler.** Separe o material em unidades de mensagem. Para cada uma, identifique a *morfologia*: número único · poucos números equivalentes · comparação de 2 estados · série no tempo · composição/participação · ranking · limite/meta · processo · cronograma · lista de diretrizes · texto de contexto · citação de norma · tabela · fala de fecho.

**② Roteirizar.** Defina o papel de cada slide no arco: abrir · situar · evidenciar · comparar · detalhar · transicionar · concluir. Escolha **um protagonista por slide** (o que o público deve ver primeiro).

**③ Compor.** Para cada slide escolha *layout × blocos* (§4 e §5). Use as receitas (§6) como repertório, não como molde: combine, adapte, crie variações dentro da gramática. Pergunte-se: "este é o arranjo que melhor serve a ESTE conteúdo, ou só o primeiro que lembrei?"

**④ Revisar** com o checklist (§10) e escreva o roteiro como comentário no topo do `<body>`:
```html
<!-- ROTEIRO
02 situar     · 7·5      · lede+prose | figure
03 evidenciar · 12 stack · figure-row / chart(line)
04 comparar   · 12       · delta
-->
```

## 3. Identidade fixa (não negociável)

- **Capa** `.slide.slide-cover.active`: só `<div class="slide-cover-content"><h1>…</h1><p>…</p></div>`. Sem data, selo, linha ou breadcrumb (a arte `capa.png` já tem marca e brasão).
- **Encerramento**: último slide, `<div class="slide slide-closing"></div>` vazio.
- **Conteúdo** `.slide.slide-content`: topbar (breadcrumb + título) e um `.grid-12`. **Não escreva rodapé nem numeração** — o `deck.js` injeta o rodapé institucional, "Slide XX / YY" e o badge com o título da apresentação. Outro órgão: `<body data-orgao="Nome do órgão">`.
- **Divisor de seção** `.slide.slide-content.slide-section` (ver §5).
- **Tipografia**: só "Segoe UI" (já no CSS). Pesos 400/600/700. Números fiscais com `.mono`.
- **Cores**: verde `#219647`, sálvia `#738b7b`, amarelo `#fee000` (só ênfase pontual de UI, nunca em gráfico). Nada de azul, vermelho, roxo, gradientes ou fontes externas.
- **Gráficos**: só Chart.js via `.deck-chart` (§8). Nunca `<svg>`/`<div>` desenhando gráfico. Ícones SVG pequenos são permitidos.
- Sem emojis (o `deck.js` troca/remove).

## 4. Layouts — como dividir a área útil (1730 × ~700 px, grid de 12)

Escreva os spans com classe: `<div class="col-8">`. Dentro de uma coluna:
`flex-stack` = pilha que ocupa a altura toda (cards crescem, blocos editoriais mantêm a altura natural) ·
`stack` = pilha natural, sem esticar (combine com `.grid-12.is-center`) · `divider-left` = fio vertical separando colunas ·
`self-center` = centraliza verticalmente um bloco curto.

| Assinatura | Uso natural |
|---|---|
| `12` | Protagonista único: gráfico grande, tabela, statement, timeline, steps, agenda, delta |
| `8·4` / `4·8` | Protagonista + apoio. 4·8 quando o número abre a leitura |
| `9·3` | Visual muito largo + nota curta |
| `7·5` / `5·7` | Equilíbrio texto ↔ visual |
| `6·6` | Pares: dois gráficos irmãos, antes/depois em cards |
| `4·4·4` | Três itens equivalentes |
| `3·3·3·3` | Quatro itens/fases equivalentes |
| `12 / 12` | `.grid-12.is-stacked`: faixa curta em cima (figure-row, table-kpi-strip, lede) + área principal embaixo |
| `12 / 6·6`, `12 / 4·4·4` | Faixa de contexto + grupo |
| `8 central` | `.grid-12.is-center` + `col-8 col-start-3`: statement/quote/figure com respiro |

## 5. Blocos — esqueletos (`{…}` = conteúdo do usuário; atributos opcionais entre [ ])

**Editoriais (sem caixa — use bastante, são o antídoto da "cara de dashboard"):**
```html
<div class="prose"><h3>{subtítulo}</h3><p>{texto}</p></div>
<p class="lede">{frase de abertura com <b>trecho</b> em destaque}</p>
<div class="figure [figure--md|figure--sm|figure--ink]"><div class="figure-val">{R$ 4,18 Bi}</div><div class="figure-label">{rótulo}</div>[<p class="figure-note">{nota}</p>]</div>
<div class="figure-row">{2 a 5 × .figure}</div>
<div class="statement"><p class="statement-text">{frase do usuário, com <b>ênfase</b>}</p>[<span class="statement-source">{fonte}</span>]</div>
<div class="quote"><p class="quote-text">{transcrição literal}</p><span class="quote-source">{Lei / artigo}</span></div>
<div class="delta"><div class="delta-side"><span class="delta-tag">{2025}</span><span class="delta-val">{valor}</span><span class="delta-label">{texto}</span></div><div class="delta-arrow">[<span class="delta-change">{variação escrita pelo usuário}</span>]</div><div class="delta-side is-to">{idem}</div></div>
<ol class="timeline [is-vertical]"><li class="[is-done|is-current]"><span class="tl-date">{data}</span><span class="tl-title">{marco}</span>[<span class="tl-desc">{texto}</span>]</li>…</ol>
<div class="steps [is-vertical]"><div class="pipeline-step [is-current]"><span class="step-badge">{Etapa 1}</span><div class="step-title">{nome}</div>[<div class="step-val mono">{valor}</div>][<div class="step-desc">{texto}</div>]</div>…</div>
<ol class="agenda [is-single]"><li><span class="agenda-num">01</span><span class="agenda-title">{seção}[<span class="agenda-desc">{texto}</span>]</span></li>…</ol>
<span class="eyebrow">{rótulo curto}</span>   <p class="source-note">{Fonte: …}</p>   <div class="badge-row">{badges}</div>
```
**Cards (com caixa):**
```html
<div class="card-kpi"><div class="kpi-head">[<div class="kpi-icon">{svg}</div>][<span class="badge badge-sage">{status do texto}</span>]</div><div><div class="kpi-val mono">{valor}</div><div class="kpi-label">{rótulo}</div></div>[<div class="kpi-progress-wrap"><div class="kpi-progress-bar"><div class="kpi-progress-fill" style="width:{%}"></div></div><span class="kpi-progress-text">{texto com o %}</span></div>]</div>
<div class="card-kpi-hero">{mesma estrutura do card-kpi, número monumental}</div>
<div class="card-plain"><h3>{título}</h3><p>{texto}</p></div>
<div class="card-soft-sage"><div class="card-soft-sage-header">[<div class="icon-box-sage">{svg}</div>]<h3>{título}</h3></div><p>{texto}</p></div>
<div class="card-elevated-green"><div class="card-label">{rótulo}</div><div class="card-title">{título}</div><div class="card-desc">{texto}</div>[<div class="key-points-list"><div class="key-point-item"><div class="key-point-bullet"></div><div>{item}</div></div>…</div>]</div>
<div class="card-solar-cta"><div class="card-label">{rótulo}</div><div class="card-title">{prazo/ação}</div><div class="card-desc">{texto}</div></div>
<div class="table-kpi-strip"><div class="mini-kpi-card"><span class="mini-lbl">{rótulo}</span><span class="mini-val mono">{valor}</span></div>…</div>
<div class="table-box"><table class="table-soft"><thead><tr><th>{col}</th><th class="num">{R$}</th></tr></thead><tbody><tr><td>{…}</td><td class="num">{…}</td></tr><tr class="is-total">…</tr></tbody></table></div>
<div class="chart-card [is-flat]"><div class="chart-head"><div><h3>{título}</h3>[<p class="chart-sub">{unidade/fonte}</p>]</div>[badge]</div>{.deck-chart §8}</div>
<div class="lrf-meter"><div class="lrf-meter-head"><h3>{indicador}</h3><span class="badge badge-sage">{valor}</span></div><div class="lrf-scale-track"><div class="lrf-scale-fill" style="width:{valor/máx}%"></div><span class="lrf-marker" style="left:{limite/máx}%">{Nome curto}<br>{limite}</span><span class="lrf-marker current" style="left:{valor/máx}%">{atual}</span></div>[<p class="source-note">{base legal}</p>]</div>
```
lrf-meter: escolha um `máx` da escala um pouco acima do maior limite (ex.: 60 para limites até 54%); marcadores a menos de ~8% de distância colidem — use nomes curtos.
Lista simples fora de card verde: `<div class="key-points-list">…</div>`. Badges: `badge-sage` (neutro/conformidade), `badge-pine` (ação), `badge-lime` (prioridade), `badge-warning` (alerta), `badge-neutral`.
Ícones (opcionais, `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="…"/></svg>`): dinheiro `M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6` · escudo `M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z` · documento `M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z` · gráfico `M3 3v18h18M19 9l-5 5-4-4-3 3` · calendário `M3 4h18v18H3zM16 2v4M8 2v4M3 10h18` · check `M20 6 9 17l-5-5`.

**Divisor de seção** (slide inteiro, sem topbar nem grid):
```html
<div class="slide slide-content slide-section" id="slide-N"><div class="section-block"><span class="section-num">Parte 02</span><h2 class="section-title">{seção}</h2>[<p class="section-lede">{frase do usuário}</p>]</div></div>
```

## 6. Repertório de receitas (escolha pelo conteúdo; varie entre slides)

| Conteúdo | Opções (não é ordem de preferência — escolha pelo contexto) |
|---|---|
| Um número soberano | **a)** `5·7` figure + prose · **b)** `4·8` card-kpi-hero + cards de apoio · **c)** `8 central` figure sozinho (clímax) |
| 2 a 5 números equivalentes | **a)** figure-row (`12`, editorial) · **b)** `3·3·3·3`/`4·4·4` card-kpi · **c)** table-kpi-strip sobre gráfico/tabela |
| Comparação de 2 estados | **a)** delta · **b)** `6·6` card-soft-sage ↔ card-elevated-green · **c)** gráfico bar 2 séries se houver várias categorias |
| Série no tempo | **a)** chart line/bar `12` · **b)** `8·4` chart + figure/kpi · **c)** `12/12` figure-row + chart area/combo |
| Composição / participação | **a)** `7·5` donut com `center` + prose · **b)** hbar com `highlight` · **c)** stacked se houver vários períodos |
| Ranking | **a)** hbar ordenado com `highlight` · **b)** tabela com `is-highlight` · **c)** `8·4` hbar + figure do 1º |
| Limite legal / meta | **a)** bar/hbar com `target` · **b)** lrf-meter + quote da norma · **c)** `4·8` figure + chart com target |
| Processo / fluxo | **a)** steps (`is-current` na etapa atual) · **b)** `3·3·3·3` card-kpi por fase (se cada fase tem número) · **c)** steps `is-vertical` em `5·7` com prose |
| Cronograma / prazos | **a)** timeline (≤ 6 marcos) · **b)** `5·7` timeline vertical + prose · **c)** card-solar-cta para o prazo crítico + lista |
| Diretrizes / recomendações do usuário | **a)** `7·5` card-elevated-green com key-points + apoio · **b)** `12` prose em duas colunas `6·6` · **c)** agenda `is-single` numerada |
| Texto de contexto | **a)** `7·5` lede+prose + figure/quote · **b)** statement · **c)** `4·4·4` card-plain se o texto já vem em 3 partes |
| Norma / citação | **a)** quote `8 central` · **b)** `5·7` quote + o dado que ela rege |
| Tabela | **a)** table `12` · **b)** `12/12` table-kpi-strip + table · **c)** `8·4` table + notas do usuário |
| Gráfico sem texto | chart `12`, nada mais (pode ser `is-flat`) |
| Abertura de deck longo | agenda (após a capa) |
| Mudança de parte | slide-section |
| Fecho escrito pelo usuário | statement ou card-elevated-green com key-points |

Combinações valem: figure-row + chart; chart + quote; timeline + figure; delta sobre lede (`12/12`).
Arquétipos da v3 continuam válidos como casos destas receitas (8:4, Hero 4:8, Quadrante 3·3·3·3, Espelhado 6·6, Tabela, LRF 7:5, Trinca 4·4·4, Diretriz 7:5).

## 7. Ritmo e equilíbrio do deck

- **Não repita a mesma assinatura de layout em slides consecutivos**; nenhuma assinatura em mais de 1/3 do deck.
- **Pelo menos 1/3 dos slides de conteúdo com blocos editoriais** (figure, statement, prose, quote, timeline, agenda, chart `is-flat`). Cards em todos os slides = deck monótono.
- Alterne densidade: depois de dois slides densos, prefira um mais leve — **usando conteúdo real do usuário** (nunca invente frase para criar respiro).
- Ênfase escassa: no máximo **1 bloco verde forte** (card-elevated-green, delta `is-to`, step `is-current`) e **1 amarelo** (card-solar-cta, badge-lime, delta-change) por slide.
- Material com ≥ 3 partes tituladas e deck com ≥ 8 slides → agenda no início e slide-section em cada parte.
- Leitura em Z: protagonista à esquerda/topo; o apoio segue a ordem do texto do usuário.

## 8. Gráficos declarativos (o deck.js monta o Chart.js com a paleta oficial)

```html
<div class="deck-chart" data-type="bar" data-format="R$ {v} Bi">
  <script type="application/json">
  {"labels":["2023","2024","2025"],
   "series":[{"label":"Orçado","data":[40.1,44.3,48.9]},{"label":"Realizado","data":[38.7,43.0,47.2]}]}
  </script>
</div>
```
- `data-type`: `bar` · `hbar` · `stacked` · `hstacked` · `line` · `area` · `combo` (1ª série barra, demais linha) · `donut` · `pie` · `radar` · `polar`.
- `data-format`: modelo do rótulo, `{v}` = valor em pt-BR exatamente como informado (`"{v}%"`, `"R$ {v} Mi"`). `data-decimals="1"` fixa casas.
- Opcionais no JSON: `"highlight": 2` (ou `[0,3]`) destaca barras numa série única · `"target": {"value": 46.55, "label": "Limite prudencial 46,55%"}` (ou lista) desenha linha de referência · `"center": {"value": "R$ 48,9 Bi", "label": "Total"}` no centro da rosca · `"dataLabels": false` oculta rótulos.
- Números no JSON com ponto decimal (`42.8`); a exibição sai em pt-BR (`42,8`). Copie os valores do usuário sem arredondar.
- Cores automáticas: 1ª série `#219647`, 2ª `#738b7b`, depois `#9eb2a4`, `#cbd8cf`. Não passe cores.
- Coloque o `.deck-chart` dentro de `.chart-card` (ou região com altura); ele ocupa o espaço restante.

## 9. Capacidade (se passar disso, divida em "(continuação)")

| Região | Limite confortável |
|---|---|
| Slide inteiro | ~120 palavras de texto corrido; 1 protagonista + até 3 apoios |
| `12` | tabela ≤ 9 linhas × 7 colunas · lista ≤ 6 itens · timeline ≤ 6 · steps ≤ 5 · figure-row ≤ 5 |
| `7`–`8` | lista ≤ 5 itens · gráfico ≤ 12 categorias |
| `4`–`5` | até 3 blocos empilhados · ≤ 60 palavras por bloco |

O `deck.js` reduz automaticamente até ~22% um slide que transborda, mas isso é rede de segurança, não plano.

## 10. Checklist antes de entregar

- [ ] Todo texto e número veio do usuário, na mesma ordem; nada exibido foi calculado ou inventado.
- [ ] Capa limpa, encerramento vazio, nenhum rodapé escrito à mão.
- [ ] Cada slide tem um protagonista claro; nenhum layout repetido em sequência; ≥ 1/3 editorial.
- [ ] Gráficos só via `.deck-chart`; sem botões, emojis, cores ou fontes fora do sistema.
- [ ] Roteiro em comentário no topo do `<body>`.

## 11. Esqueleto do arquivo (é tudo que você precisa escrever além dos slides)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{Título} — Governo de Goiás</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/douglasvieiragyn-boop/design-system-orcamento@v4.0.0/deck.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/douglasvieiragyn-boop/design-system-orcamento@v4.0.0/deck.js"></script>
<script>(function(){function s(){var w=innerWidth||1920,h=innerHeight||1080,k=Math.min(w/1920,h/1080);if(k>0)document.documentElement.style.setProperty('--scale',k)}s();addEventListener('resize',s);addEventListener('load',s)})();</script>
</head>
<body>
<!-- ROTEIRO … -->
<div class="deck-viewport" id="deckViewport">
  <div class="slide slide-cover active" id="slide-1"><div class="slide-cover-content"><h1>{Título}</h1><p>{Subtítulo}</p></div></div>

  <div class="slide slide-content" id="slide-2">
    <div class="slide-topbar"><div><div class="slide-breadcrumb">{Tópico}</div><h2 class="slide-title">{Título do slide}</h2></div></div>
    <div class="grid-12">{layout × blocos}</div>
  </div>

  <div class="slide slide-closing" id="slide-N"></div>
</div>
</body>
</html>
```

## Plataformas

| Plataforma | Ativação | Saída |
|---|---|---|
| Claude (Code / Projects) | Skill `apresentacao-orcamento` ou instrução do projeto | Arquivo HTML ou Artifact |
| Gemini / Antigravity | Skill ou System Prompt; no Gemini Web, envie a skill num turno e o conteúdo no seguinte | Canvas / prévia 16:9 |
| ChatGPT / Codex | Custom Instructions ou arquivo do projeto | Canvas / arquivo HTML |
| Cursor e afins | Arquivo de regras do projeto | Arquivo HTML |
