/**
 * ==========================================================================
 * DESIGN SYSTEM ORÇAMENTO — RUNTIME ENGINE DE APRESENTAÇÕES INSTITUCIONAIS
 * Governo do Estado de Goiás — Secretaria da Economia
 * Arquivo: deck.js
 * Versão: 4.0.2 — Gráficos declarativos (.deck-chart + JSON), rodapé automático,
 *                 ajuste automático de densidade, sem ativos base64 mortos.
 *                 4.0.2: "highlight" aceita também o nome do item (não só a posição).
 *
 * O que este arquivo faz sozinho (a IA NÃO precisa escrever):
 *  - escala 16:9 (1920x1080) em qualquer iframe / preview / tela cheia
 *  - controles do apresentador, teclado, tela cheia e exportação PDF
 *  - rodapé institucional + numeração "Slide XX / YY" em todo .slide-content
 *  - badge com o título da apresentação na faixa verde superior
 *  - gráficos Chart.js a partir de <div class="deck-chart"> com JSON de dados
 *  - redução proporcional quando o conteúdo de um slide excede a área útil
 * ==========================================================================
 */

(function () {
  'use strict';

  const VERSION = '4.0.1';
  const ORG_DEFAULT = 'Secretaria de Estado da Economia — Subsecretaria Central do Orçamento';
  const FONT = '"Segoe UI", system-ui, sans-serif';
  const PALETTE = ['#219647', '#738b7b', '#9eb2a4', '#cbd8cf', '#16642f', '#dee8e1'];
  const ARC_PALETTE = ['#219647', '#738b7b', '#9eb2a4', '#cbd8cf', '#dee8e1', '#eaf1ed'];
  const MUTED_BAR = '#cbd8cf';
  const INK = '#0d1711';
  const INK2 = '#4f6656';
  const GRID = 'rgba(20, 48, 42, 0.08)';

  // Metadados por gráfico (formatador, linhas de referência, texto central)
  const EXTRAS = new WeakMap();

  // SVGs OFICIAIS PARA SUBSTITUIÇÃO AUTOMÁTICA DE EMOJIS
  const SVG_ICONS = {
    chart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
    balance: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
    shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    pin: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    alert: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
  };

  let currentSlide = 1;
  let totalSlides = 1;

  // ------------------------------------------------------------------------
  // 1. SANITIZADOR DE EMOJIS (emojis informais -> ícones SVG do sistema)
  // ------------------------------------------------------------------------
  function sanitizeEmojis() {
    const emojiMap = [
      { regex: /📈|📊/g, svg: SVG_ICONS.chart },
      { regex: /⚖️|⚖/g, svg: SVG_ICONS.balance },
      { regex: /🛡️|🛡/g, svg: SVG_ICONS.shield },
      { regex: /📌|📍|📝/g, svg: SVG_ICONS.pin },
      { regex: /⚠️|🚨|❗/g, svg: SVG_ICONS.alert }
    ];
    const residual = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/u;
    document.querySelectorAll('.slide h1, .slide h2, .slide h3, .slide p, .slide li, .slide-breadcrumb').forEach(el => {
      let html = el.innerHTML;
      if (!emojiMap.some(i => { i.regex.lastIndex = 0; return i.regex.test(html); }) && !residual.test(html)) return;
      emojiMap.forEach(item => {
        item.regex.lastIndex = 0;
        html = html.replace(item.regex, `<span class="icon-box-sage" style="display:inline-flex;margin-right:8px;vertical-align:middle;">${item.svg}</span>`);
      });
      html = html.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '');
      el.innerHTML = html;
    });
  }

  // ------------------------------------------------------------------------
  // 2. AUTO-SCALE 16:9
  // ------------------------------------------------------------------------
  function autoScale() {
    const stageW = window.innerWidth || (document.documentElement ? document.documentElement.clientWidth : 1920) || 1920;
    const stageH = window.innerHeight || (document.documentElement ? document.documentElement.clientHeight : 1080) || 1080;
    const scale = Math.min(stageW / 1920, stageH / 1080);
    if (scale > 0 && !isNaN(scale)) {
      document.documentElement.style.setProperty('--scale', scale);
    }
  }

  // ------------------------------------------------------------------------
  // 3. CHART.JS — patch de plataforma, padrões e plugins
  // ------------------------------------------------------------------------
  function patchChartJsPlatform() {
    if (typeof Chart !== 'undefined' && Chart.platforms && Chart.platforms.DomPlatform) {
      const proto = Chart.platforms.DomPlatform.prototype;
      if (!proto._dsPatched) {
        const origGetMaxSize = proto.getMaximumSize;
        proto.getMaximumSize = function (canvas, bbWidth, bbHeight, aspectRatio) {
          if (canvas && canvas.closest && canvas.closest('.slide')) {
            const parent = canvas.parentElement;
            if (parent) {
              const w = parent.clientWidth;
              const h = parent.clientHeight;
              if (w > 0 && h > 0) return { width: w, height: h };
            }
          }
          return origGetMaxSize.call(this, canvas, bbWidth, bbHeight, aspectRatio);
        };
        proto._dsPatched = true;
      }
    }
    registerPlugins();
  }

  function applyChartDefaults() {
    if (typeof Chart === 'undefined') return;
    try {
      Chart.defaults.font.family = FONT;
      Chart.defaults.color = INK2;
      Chart.defaults.plugins.legend.labels.usePointStyle = true;
      Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
    } catch (e) {}
  }

  // Formatação numérica pt-BR fiel ao valor informado (sem abreviar)
  function decimalsOf(v) {
    if (typeof v !== 'number' || !isFinite(v) || Number.isInteger(v)) return 0;
    const s = String(v);
    return s.includes('e') ? 2 : Math.min(3, (s.split('.')[1] || '').length);
  }
  function fmtNumber(v, decimals) {
    if (typeof v !== 'number' || !isFinite(v)) return String(v);
    const d = (decimals === undefined || decimals === null || isNaN(decimals)) ? decimalsOf(v) : decimals;
    return v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  function makeFormatter(tpl, decimals) {
    const t = (typeof tpl === 'string' && tpl.includes('{v}')) ? tpl : '{v}';
    return v => t.replace('{v}', fmtNumber(v, decimals));
  }

  function getContrast(colorStr) {
    if (!colorStr || typeof colorStr !== 'string') return INK;
    let c = colorStr.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    let r, g, b;
    if (/^[0-9a-f]{6}$/i.test(c)) {
      r = parseInt(c.substr(0, 2), 16); g = parseInt(c.substr(2, 2), 16); b = parseInt(c.substr(4, 2), 16);
    } else if (colorStr.startsWith('rgb')) {
      const m = colorStr.match(/\d+/g); if (!m || m.length < 3) return '#ffffff';
      r = +m[0]; g = +m[1]; b = +m[2];
    } else return '#ffffff';
    return ((r * 299 + g * 587 + b * 114) / 1000) >= 148 ? INK : '#ffffff';
  }

  function drawHaloText(ctx, text, x, y, color) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4.5;
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  // Gráficos escritos à mão (sem data-format): valor integral em pt-BR, sem abreviar
  function legacyBarFormat(val) {
    return typeof val === 'number' ? fmtNumber(val) : val;
  }

  function registerPlugins() {
    if (typeof Chart === 'undefined' || !Chart.registry) return;
    applyChartDefaults();
    if (Chart.registry.plugins.get('dsDataLabels')) return;

    // Rótulos de dados desenhados no próprio canvas (saem na impressão)
    const dsDataLabels = {
      id: 'dsDataLabels',
      afterDatasetsDraw(chart) {
        const extra = EXTRAS.get(chart.canvas) || {};
        const pOpts = chart.options.plugins || {};
        if (extra.noLabels || (pOpts.datalabels && pOpts.datalabels.display === false)) return;

        const { ctx } = chart;
        const type = (chart.config.type || '').toLowerCase();
        const fmt = extra.fmt;
        const horizontal = chart.options.indexAxis === 'y';
        const stacked = !!(chart.options.scales && ((chart.options.scales.x && chart.options.scales.x.stacked) || (chart.options.scales.y && chart.options.scales.y.stacked)));
        const pointCount = (chart.data.labels || []).length * chart.data.datasets.length;

        chart.data.datasets.forEach((dataset, di) => {
          if (dataset.datalabels && dataset.datalabels.display === false) return;
          const meta = chart.getDatasetMeta(di);
          if (!meta || meta.hidden || !chart.isDatasetVisible(di)) return;
          const dsType = (meta.type || type).toLowerCase();

          meta.data.forEach((el, i) => {
            if (el.hidden || el.skip || (typeof chart.getDataVisibility === 'function' && !chart.getDataVisibility(i))) return;
            const val = dataset.data[i];
            if (val === null || val === undefined) return;
            ctx.save();

            if (dsType === 'bar') {
              if (pointCount > 28) { ctx.restore(); return; }
              const text = fmt ? fmt(val) : legacyBarFormat(val);
              ctx.font = `bold 14px ${FONT}`;
              if (stacked) {
                const size = horizontal ? Math.abs(el.x - el.base) : Math.abs(el.base - el.y);
                const tw = ctx.measureText(text).width;
                if ((horizontal ? size > tw + 12 : size > 22)) {
                  const bg = Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[i] : dataset.backgroundColor;
                  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                  ctx.fillStyle = getContrast(bg);
                  const c = el.getCenterPoint();
                  ctx.fillText(text, c.x, c.y);
                }
              } else if (horizontal) {
                ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                drawHaloText(ctx, text, el.x + 8, el.y, di === 0 ? '#16642f' : INK2);
              } else {
                ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                drawHaloText(ctx, text, el.x, el.y - 6, di === 0 ? '#16642f' : INK2);
              }
            } else if (dsType === 'doughnut' || dsType === 'pie') {
              // Fidelidade: exibe o valor informado (nunca um % recalculado)
              let text;
              if (fmt) text = fmt(val);
              else {
                const total = dataset.data.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0);
                text = Math.abs(total - 100) < 0.6 ? `${fmtNumber(val)}%` : fmtNumber(val);
              }
              ctx.font = `bold 15px ${FONT}`;
              const tw = ctx.measureText(text).width;
              const midR = ((el.innerRadius || 0) + el.outerRadius) / 2;
              const arcLen = Math.abs(el.endAngle - el.startAngle) * midR;
              const ring = el.outerRadius - (el.innerRadius || 0);
              if (arcLen > tw + 10 && ring > 22) {
                const c = el.getCenterPoint();
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                const bg = Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[i] : dataset.backgroundColor;
                ctx.fillStyle = getContrast(bg);
                ctx.fillText(text, c.x, c.y);
              }
            } else if (dsType === 'line') {
              if ((di === 0 || (dataset.datalabels && dataset.datalabels.display === true)) && pointCount <= 40) {
                const text = fmt ? fmt(val) : legacyBarFormat(val);
                ctx.font = `bold 14px ${FONT}`;
                ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                drawHaloText(ctx, text, el.x, el.y - 11, '#16642f');
              }
            } else if (dsType === 'radar') {
              if (di === 0 || (dataset.datalabels && dataset.datalabels.display === true)) {
                const r = chart.scales.r;
                const cx = r ? r.xCenter : el.x, cy = r ? r.yCenter : el.y;
                const dx = el.x - cx, dy = el.y - cy, dist = Math.hypot(dx, dy);
                const lx = dist > 0 ? el.x + (dx / dist) * 14 : el.x;
                const ly = dist > 0 ? el.y + (dy / dist) * 14 : el.y - 14;
                ctx.font = `bold 13.5px ${FONT}`;
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                drawHaloText(ctx, fmt ? fmt(val) : `${val}`, lx, ly, '#16642f');
              }
            } else if (dsType === 'polararea') {
              const c = el.getCenterPoint();
              ctx.font = `bold 14px ${FONT}`;
              ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
              const bg = Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[i] : dataset.backgroundColor;
              ctx.fillStyle = getContrast(bg);
              ctx.fillText(fmt ? fmt(val) : `${val}`, c.x, c.y);
            }
            ctx.restore();
          });
        });
      }
    };

    // Linhas de referência (limites legais, metas): "target" no JSON
    const dsTargets = {
      id: 'dsTargets',
      afterDatasetsDraw(chart) {
        const extra = EXTRAS.get(chart.canvas);
        if (!extra || !extra.targets || !extra.targets.length) return;
        const horizontal = chart.options.indexAxis === 'y';
        const scale = horizontal ? chart.scales.x : chart.scales.y;
        if (!scale) return;
        const area = chart.chartArea;
        const { ctx } = chart;
        extra.targets.forEach((t, k) => {
          if (typeof t.value !== 'number') return;
          const p = scale.getPixelForValue(t.value);
          ctx.save();
          ctx.setLineDash([7, 6]);
          ctx.lineWidth = 2;
          ctx.strokeStyle = k === 0 ? 'rgba(13, 23, 17, 0.55)' : 'rgba(79, 102, 86, 0.6)';
          ctx.beginPath();
          if (horizontal) { ctx.moveTo(p, area.top); ctx.lineTo(p, area.bottom); }
          else { ctx.moveTo(area.left, p); ctx.lineTo(area.right, p); }
          ctx.stroke();
          ctx.setLineDash([]);
          const label = t.label ? `${t.label}` : (extra.fmt ? extra.fmt(t.value) : String(t.value));
          ctx.font = `bold 13px ${FONT}`;
          if (horizontal) {
            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
            drawHaloText(ctx, label, p + 6, area.top + 2 + k * 18, INK);
          } else {
            ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
            drawHaloText(ctx, label, area.right - 4, p - 5, INK);
          }
          ctx.restore();
        });
      }
    };

    // Texto central da rosca: "center": {"value": "...", "label": "..."}
    const dsCenter = {
      id: 'dsCenter',
      afterDraw(chart) {
        const extra = EXTRAS.get(chart.canvas);
        if (!extra || !extra.center) return;
        const meta = chart.getDatasetMeta(0);
        if (!meta || !meta.data || !meta.data[0]) return;
        const arc = meta.data[0];
        const { ctx } = chart;
        const inner = arc.innerRadius || 0;
        if (inner < 40) return;
        ctx.save();
        ctx.textAlign = 'center';
        let size = Math.min(40, Math.floor(inner * 0.38));
        ctx.font = `bold ${size}px ${FONT}`;
        while (ctx.measureText(extra.center.value || '').width > inner * 1.6 && size > 14) {
          size -= 2; ctx.font = `bold ${size}px ${FONT}`;
        }
        ctx.fillStyle = INK;
        ctx.textBaseline = extra.center.label ? 'bottom' : 'middle';
        ctx.fillText(extra.center.value || '', arc.x, arc.y + (extra.center.label ? 4 : 0));
        if (extra.center.label) {
          ctx.font = `600 ${Math.max(12, Math.round(size * 0.42))}px ${FONT}`;
          ctx.fillStyle = INK2;
          ctx.textBaseline = 'top';
          ctx.fillText(extra.center.label, arc.x, arc.y + 10);
        }
        ctx.restore();
      }
    };

    try { Chart.register(dsDataLabels, dsTargets, dsCenter); } catch (e) {}
  }

  // Registro imediato e reativo (Chart.js pode carregar depois do deck.js)
  if (typeof window !== 'undefined') {
    let _chartHolder = window.Chart;
    if (_chartHolder) registerPlugins();
    try {
      Object.defineProperty(window, 'Chart', {
        configurable: true,
        enumerable: true,
        get() { return _chartHolder; },
        set(newChart) { _chartHolder = newChart; registerPlugins(); }
      });
    } catch (e) {}
  }

  // ------------------------------------------------------------------------
  // 4. GRÁFICOS DECLARATIVOS
  //    <div class="deck-chart" data-type="bar" data-format="R$ {v} Bi">
  //      <script type="application/json">{"labels":[...],"series":[{"label":"...","data":[...]}]}</script>
  //    </div>
  //    Tipos: bar | hbar | stacked | hstacked | line | area | combo | donut | pie | radar | polar
  //    Opcionais no JSON: highlight (índice, nome do item ou lista), target ({value,label} ou lista),
  //                       center ({value,label} — rosca), labels:false, decimals, format
  // ------------------------------------------------------------------------
  function hexA(hex, a) {
    const c = hex.replace('#', '');
    return `rgba(${parseInt(c.substr(0, 2), 16)}, ${parseInt(c.substr(2, 2), 16)}, ${parseInt(c.substr(4, 2), 16)}, ${a})`;
  }

  function readSpec(el) {
    const s = el.querySelector('script[type="application/json"]');
    if (s) {
      try { return JSON.parse(s.textContent); }
      catch (e) { console.warn('[deck.js] JSON inválido em .deck-chart:', e.message); return null; }
    }
    // Compatibilidade v3: data-labels / data-series-N / data-values
    const labels = el.getAttribute('data-labels');
    if (!labels) return null;
    try {
      const spec = { labels: JSON.parse(labels), series: [] };
      ['data-series-1', 'data-series-2', 'data-series-3'].forEach(a => {
        const v = el.getAttribute(a); if (v) spec.series.push(JSON.parse(v));
      });
      const vals = el.getAttribute('data-values');
      if (vals) spec.series.push({ label: '', data: JSON.parse(vals) });
      return spec;
    } catch (e) { return null; }
  }

  function buildChart(el, idx) {
    if (el._dsBuilt) return;
    const spec = readSpec(el);
    if (!spec || !Array.isArray(spec.labels) || !Array.isArray(spec.series) || !spec.series.length) {
      el.innerHTML = '<div class="chart-empty">Dados do gráfico não informados</div>';
      el._dsBuilt = true;
      return;
    }
    let type = String(el.dataset.type || spec.type || 'bar').toLowerCase();
    if (type === 'donut') type = 'doughnut';
    if (type === 'polararea') type = 'polar';
    const decimals = el.dataset.decimals !== undefined ? parseInt(el.dataset.decimals, 10) : spec.decimals;
    const fmt = makeFormatter(el.dataset.format || spec.format, decimals);
    const horizontal = type === 'hbar' || type === 'hstacked';
    const stacked = type === 'stacked' || type === 'hstacked';
    const isArc = type === 'doughnut' || type === 'pie' || type === 'polar';
    const baseType = ({ hbar: 'bar', stacked: 'bar', hstacked: 'bar', area: 'line', combo: 'bar', polar: 'polarArea' })[type] || type;
    // highlight aceita a posição (2, [0,3]) ou o nome do item ("Policlínica", ["A","B"])
    const normHl = v => String(v).trim().toLowerCase();
    const hl = spec.highlight === undefined || spec.highlight === null ? null
      : [].concat(spec.highlight).map(h => {
          if (typeof h === 'number') return h;
          if (typeof h === 'string' && h.trim() !== '' && !isNaN(+h)) return +h;
          return spec.labels.findIndex(l => normHl(l) === normHl(h));
        }).filter(i => i >= 0);

    const datasets = spec.series.map((s, i) => {
      const data = (s.data || []).map(v => (typeof v === 'string' && v.trim() !== '' && !isNaN(+v)) ? +v : v);
      const color = PALETTE.includes(s.color) ? s.color : PALETTE[i % PALETTE.length];
      const dsType = s.type || (type === 'combo' && i > 0 ? 'line' : undefined);
      const effective = dsType || baseType;
      const d = { label: s.label || '', data };
      if (isArc) {
        d.backgroundColor = data.map((_, j) => ARC_PALETTE[j % ARC_PALETTE.length]);
        d.borderColor = '#ffffff';
        d.borderWidth = 2;
        if (baseType === 'doughnut') { d.borderRadius = 6; d.spacing = 2; }
      } else if (effective === 'line' || effective === 'radar') {
        if (dsType) d.type = dsType;
        d.borderColor = color;
        d.backgroundColor = (type === 'area' || effective === 'radar') ? hexA(color, 0.14) : color;
        d.fill = type === 'area' || effective === 'radar';
        d.tension = 0.3;
        d.borderWidth = 3;
        d.pointRadius = 4;
        d.pointBackgroundColor = color;
        if (type === 'combo') d.order = 0;
      } else {
        if (dsType) d.type = dsType;
        d.borderRadius = stacked ? 4 : 8;
        d.borderSkipped = false;
        d.maxBarThickness = 76;
        if (type === 'combo') d.order = 1;
        d.backgroundColor = (hl && spec.series.length === 1) ? data.map((_, j) => hl.includes(j) ? PALETTE[0] : MUTED_BAR) : color;
      }
      return d;
    });

    const tickFont = { family: FONT, weight: '600', size: 13 };
    const targets = spec.target ? [].concat(spec.target) : [];
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: (horizontal || isArc) ? 8 : 28, right: horizontal ? 90 : 8 } },
      plugins: {
        legend: {
          display: isArc || datasets.length > 1,
          position: isArc ? 'right' : 'top',
          align: isArc ? 'center' : 'end',
          labels: { color: INK, font: tickFont, usePointStyle: true, pointStyle: 'circle', padding: 16 }
        },
        tooltip: {
          callbacks: {
            label: c => {
              const v = isArc ? c.parsed : (horizontal ? c.parsed.x : (c.parsed.y !== undefined ? c.parsed.y : c.parsed.r));
              const name = isArc ? c.label : c.dataset.label;
              return `${name ? name + ': ' : ''}${fmt(typeof v === 'object' && v ? v.r : v)}`;
            }
          }
        }
      }
    };

    if (!isArc && baseType !== 'radar') {
      const tvals = targets.map(t => t.value).filter(v => typeof v === 'number');
      const valueAxis = {
        stacked, beginAtZero: baseType !== 'line',
        grid: { color: GRID }, border: { display: false },
        ticks: { color: INK2, font: { family: FONT, size: 12 }, callback: v => fmt(v) }
      };
      if (tvals.length) valueAxis.suggestedMax = Math.max.apply(null, tvals) * 1.08;
      const catAxis = { stacked, grid: { display: false }, border: { color: GRID }, ticks: { color: INK2, font: tickFont } };
      options.indexAxis = horizontal ? 'y' : 'x';
      options.scales = horizontal ? { x: valueAxis, y: catAxis } : { x: catAxis, y: valueAxis };
    }
    if (baseType === 'doughnut') options.cutout = '62%';
    if (baseType === 'radar') {
      options.scales = { r: { beginAtZero: true, grid: { color: GRID }, angleLines: { color: GRID }, pointLabels: { color: INK, font: tickFont }, ticks: { display: false } } };
    }
    if (baseType === 'polarArea') {
      options.scales = { r: { grid: { color: GRID }, ticks: { display: false } } };
    }

    el.innerHTML = `<div class="chart-container-box"><canvas id="deck-chart-${idx + 1}" role="img" aria-label="${(el.getAttribute('aria-label') || '').replace(/"/g, '&quot;')}"></canvas></div>`;
    const canvas = el.querySelector('canvas');
    EXTRAS.set(canvas, { fmt, targets, center: spec.center || null, noLabels: spec.dataLabels === false });
    try {
      new Chart(canvas, { type: baseType, data: { labels: spec.labels, datasets }, options });
    } catch (e) {
      console.warn('[deck.js] Falha ao criar gráfico:', e.message);
    }
    el._dsBuilt = true;
  }

  function initCharts() {
    if (typeof Chart === 'undefined') return;
    patchChartJsPlatform();
    document.querySelectorAll('.deck-chart').forEach(buildChart);
  }

  // ------------------------------------------------------------------------
  // 5. AJUSTE AUTOMÁTICO DE DENSIDADE (conteúdo maior que a área útil)
  // ------------------------------------------------------------------------
  function fitSlide(slide) {
    if (!slide || !slide.classList.contains('slide-content')) return;
    const body = slide.querySelector(':scope > .grid-12');
    if (!body) return;
    body.style.zoom = '';
    let z = 1;
    const overflowing = () => slide.scrollHeight > slide.clientHeight + 1 || slide.scrollWidth > slide.clientWidth + 1;
    while (overflowing() && z > 0.78) {
      z = Math.round((z - 0.04) * 100) / 100;
      body.style.zoom = z;
    }
    if (overflowing()) console.warn(`[deck.js] ${slide.id || 'slide'}: conteúdo excede a área útil mesmo reduzido — divida em dois slides.`);
  }

  // ------------------------------------------------------------------------
  // 6. NAVEGAÇÃO
  // ------------------------------------------------------------------------
  function getChartInstance(canvas) {
    if (typeof Chart === 'undefined' || typeof Chart.getChart !== 'function') return null;
    try { return Chart.getChart(canvas) || null; } catch (e) { return null; }
  }

  function updateSlides() {
    const slides = document.querySelectorAll('.slide');
    totalSlides = slides.length || 1;
    if (currentSlide > totalSlides) currentSlide = totalSlides;
    if (currentSlide < 1) currentSlide = 1;

    slides.forEach((slide, idx) => slide.classList.toggle('active', idx + 1 === currentSlide));

    const indicator = document.getElementById('slideIndicator');
    if (indicator) indicator.innerText = `Slide ${currentSlide} / ${totalSlides}`;
    const prevBtn = document.getElementById('btnPrev');
    const nextBtn = document.getElementById('btnNext');
    if (prevBtn) prevBtn.disabled = currentSlide <= 1;
    if (nextBtn) nextBtn.disabled = currentSlide >= totalSlides;

    pingControls(1500);
    updateFooters();
    autoScale();
    patchChartJsPlatform();

    requestAnimationFrame(() => {
      const active = document.querySelector('.slide.active');
      if (!active) return;
      fitSlide(active);
      active.querySelectorAll('canvas').forEach(canvas => {
        const chart = getChartInstance(canvas);
        if (!chart) return;
        canvas.style.removeProperty('width');
        canvas.style.removeProperty('height');
        try { chart.resize(); chart.update('none'); } catch (err) {}
      });
    });
  }

  function nextSlide() { if (currentSlide < totalSlides) { currentSlide++; updateSlides(); } }
  function prevSlide() { if (currentSlide > 1) { currentSlide--; updateSlides(); } }

  function toggleFullScreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
  }

  let _controlsHideTimer = null;
  function pingControls(ms = 2200) {
    const controls = document.querySelector('.deck-controls');
    if (!controls) return;
    controls.classList.add('visible');
    clearTimeout(_controlsHideTimer);
    _controlsHideTimer = setTimeout(() => {
      if (!controls.matches(':hover')) controls.classList.remove('visible');
    }, ms);
  }

  function ensureControls() {
    if (!document.body) { setTimeout(ensureControls, 30); return; }
    let controls = document.querySelector('.deck-controls');
    if (!controls) {
      controls = document.createElement('div');
      controls.className = 'deck-controls';
      controls.innerHTML = `
        <button id="btnPrev" title="Slide anterior (Seta esquerda / PageUp)">← Anterior</button>
        <span id="slideIndicator">Slide 1 / ${totalSlides}</span>
        <button id="btnNext" title="Próximo slide (Seta direita / PageDown / Espaço)">Próximo →</button>
        <button class="btn-sec btn-solar" id="btnFS" title="Alternar Modo Apresentação em Tela Cheia (F11)">F11 Tela Cheia</button>
        <button class="btn-sec" id="btnPDF" title="Salvar Apresentação em PDF (Ctrl + P)">Exportar PDF</button>
      `;
      document.body.appendChild(controls);
    }
    const bind = (id, fn) => {
      const b = document.getElementById(id);
      if (b && !b._hasDeckListener) {
        b.addEventListener('click', e => { e.stopPropagation(); fn(); });
        b._hasDeckListener = true;
      }
    };
    bind('btnPrev', prevSlide);
    bind('btnNext', nextSlide);
    bind('btnFS', toggleFullScreen);
    bind('btnPDF', exportPDF);

    if (!document._hasFsListener) {
      document.addEventListener('fullscreenchange', () => {
        const btn = document.getElementById('btnFS');
        if (btn) btn.textContent = document.fullscreenElement ? 'Sair Tela Cheia' : 'F11 Tela Cheia';
      });
      document._hasFsListener = true;
    }

    if (!controls._hasHoverListeners) {
      window.addEventListener('mousemove', e => {
        if (window.innerHeight - e.clientY <= 90) pingControls(2500);
        else if (!controls.matches(':hover')) controls.classList.remove('visible');
      });
      controls.addEventListener('mouseenter', () => { controls.classList.add('visible'); clearTimeout(_controlsHideTimer); });
      controls.addEventListener('mouseleave', () => { _controlsHideTimer = setTimeout(() => controls.classList.remove('visible'), 600); });
      controls._hasHoverListeners = true;
    }
  }

  // ------------------------------------------------------------------------
  // 7. RODAPÉ INSTITUCIONAL AUTOMÁTICO + NUMERAÇÃO
  //    Órgão emissor configurável por <body data-orgao="...">
  // ------------------------------------------------------------------------
  function ensureFooters() {
    const org = (document.body && document.body.dataset && document.body.dataset.orgao) || ORG_DEFAULT;
    document.querySelectorAll('.slide.slide-content').forEach(slide => {
      if (slide.querySelector(':scope > .slide-footer')) return;
      const footer = document.createElement('div');
      footer.className = 'slide-footer';
      const a = document.createElement('span'); a.textContent = org;
      const b = document.createElement('span'); b.className = 'slide-page-number';
      footer.appendChild(a); footer.appendChild(b);
      slide.appendChild(footer);
    });
  }

  function updateFooters() {
    const slides = document.querySelectorAll('.slide');
    const total = slides.length || 1;
    slides.forEach((slide, idx) => {
      if (slide.classList.contains('slide-cover') || slide.classList.contains('slide-closing')) return;
      const footer = slide.querySelector('.slide-footer');
      if (!footer) return;
      const spans = footer.querySelectorAll('span');
      if (spans.length > 0 && /Governo (do Estado )?de Goiás/.test(spans[0].textContent)) spans[0].textContent = ORG_DEFAULT;
      const pageStr = `Slide ${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
      const pageEl = footer.querySelector('.slide-page-number');
      if (pageEl) pageEl.textContent = pageStr;
      else if (spans.length >= 2) { spans[1].classList.add('slide-page-number'); spans[1].textContent = pageStr; }
      else {
        const s = document.createElement('span'); s.className = 'slide-page-number'; s.textContent = pageStr; footer.appendChild(s);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. BADGE DE CABEÇALHO (título da apresentação na faixa verde superior)
  // ------------------------------------------------------------------------
  function ensureHeaderBadges() {
    const coverTitleEl = document.querySelector('.slide-cover h1, .slide-cover .slide-title');
    let title = '';
    if (coverTitleEl && coverTitleEl.innerText.trim()) title = coverTitleEl.innerText.trim();
    else if (document.title) title = document.title.split('—')[0].split(' - ')[0].trim();
    if (!title) return;
    document.querySelectorAll('.slide:not(.slide-cover):not(.slide-closing)').forEach(slide => {
      slide.querySelectorAll('.slide-topbar .slide-header-badge').forEach(b => b.remove());
      let badge = slide.querySelector(':scope > .slide-header-badge');
      if (!badge) {
        badge = document.createElement('div');
        badge.className = 'slide-header-badge';
        slide.appendChild(badge);
      }
      if (!badge.innerText.trim()) { badge.innerText = title; badge.title = title; }
    });
  }

  // ------------------------------------------------------------------------
  // 9. IMPRESSÃO / PDF
  // ------------------------------------------------------------------------
  function prepareAllChartsForPrint() {
    const slides = Array.from(document.querySelectorAll('.slide'));
    slides.forEach(s => s.style.setProperty('display', 'flex', 'important'));
    slides.forEach(fitSlide);
    document.querySelectorAll('canvas').forEach(canvas => {
      const chart = getChartInstance(canvas);
      const parent = canvas.parentElement;
      const w = parent && parent.clientWidth > 50 ? parent.clientWidth : 750;
      const h = parent && parent.clientHeight > 50 ? parent.clientHeight : 380;
      if (chart) { try { chart.resize(w, h); chart.update('none'); } catch (e) {} }
    });
    slides.forEach(s => s.style.removeProperty('display'));
  }
  window.addEventListener('beforeprint', prepareAllChartsForPrint);
  function exportPDF() { prepareAllChartsForPrint(); window.print(); }

  // ------------------------------------------------------------------------
  // 10. TECLADO E INICIALIZAÇÃO
  // ------------------------------------------------------------------------
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') nextSlide();
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
    if (e.key === 'Home') { currentSlide = 1; updateSlides(); }
    if (e.key === 'End') { currentSlide = totalSlides; updateSlides(); }
  });
  window.addEventListener('resize', autoScale);

  // Slides gerados sem o contêiner .deck-viewport ficariam ocultos pelo deck.css: envolve-os.
  function ensureViewport() {
    if (document.querySelector('.deck-viewport')) return;
    const slides = Array.from(document.querySelectorAll('body .slide'));
    if (!slides.length) return;
    const vp = document.createElement('div');
    vp.className = 'deck-viewport';
    vp.id = 'deckViewport';
    slides[0].parentNode.insertBefore(vp, slides[0]);
    slides.forEach(s => vp.appendChild(s));
  }

  function initDeck() {
    if (!document.body) { setTimeout(initDeck, 30); return; }
    ensureViewport();
    patchChartJsPlatform();
    sanitizeEmojis();
    ensureControls();
    ensureFooters();
    ensureHeaderBadges();
    initCharts();
    // Link direto para um slide: arquivo.html#5
    const h = parseInt((location.hash || '').replace('#', ''), 10);
    if (!window._dsHashRead && h > 0) { currentSlide = h; window._dsHashRead = true; }
    updateSlides();

    if (typeof ResizeObserver !== 'undefined' && !window._dsResizeObserved) {
      const ro = new ResizeObserver(autoScale);
      ro.observe(document.documentElement);
      window._dsResizeObserved = true;
    }
    if (typeof IntersectionObserver !== 'undefined' && !window._dsIntersectObserved) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { autoScale(); updateSlides(); } });
      });
      io.observe(document.getElementById('deckViewport') || document.body);
      window._dsIntersectObserved = true;
    }
    if (!window._dsVisibilityBound) {
      document.addEventListener('visibilitychange', () => { if (!document.hidden) { autoScale(); updateSlides(); } });
      window.addEventListener('focus', autoScale);
      window._dsVisibilityBound = true;
    }
    [50, 150, 350, 700, 1500].forEach(ms => setTimeout(autoScale, ms));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initDeck);
  else initDeck();
  window.addEventListener('load', initDeck);

  window.DeckOrcamento = { version: VERSION };
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.goToSlide = function (n) { currentSlide = n; updateSlides(); };
  window.updateSlides = updateSlides;
  window.toggleFullScreen = toggleFullScreen;
  window.exportPDF = exportPDF;
})();
