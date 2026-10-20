/**
 * ==========================================================================
 * DESIGN SYSTEM ORÇAMENTO — RUNTIME ENGINE DE APRESENTAÇÕES INSTITUCIONAIS
 * Governo do Estado de Goiás — Secretaria da Economia
 * Arquivo: deck.js (Imutável / Produção)
 * ==========================================================================
 */

(function () {
  'use strict';

  // SVGs OFICIAIS PARA SUBSTITUIÇÃO AUTOMÁTICA DE EMOJIS (ANTI-HALLUCINATION)
  const SVG_ICONS = {
    chart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
    balance: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
    shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    pin: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    alert: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
  };

  let currentSlide = 1;
  let totalSlides = 1;
  let chartInstances = {};

  // 1. SANITIZADOR AUTOMÁTICO DE EMOJIS (Transforma emojis informais em SVGs de Estado)
  function sanitizeEmojis() {
    const emojiMap = [
      { regex: /📈|📊/g, svg: SVG_ICONS.chart },
      { regex: /⚖️|⚖/g, svg: SVG_ICONS.balance },
      { regex: /🛡️|🛡/g, svg: SVG_ICONS.shield },
      { regex: /📌|📍|📝/g, svg: SVG_ICONS.pin },
      { regex: /⚠️|🚨|❗/g, svg: SVG_ICONS.alert }
    ];

    document.querySelectorAll('.card-soft-sage, .slide-title, .breadcrumb, h3, p').forEach(el => {
      let html = el.innerHTML;
      emojiMap.forEach(item => {
        if (item.regex.test(html)) {
          html = html.replace(item.regex, `<span class="icon-box-sage" style="display:inline-flex;margin-right:8px;vertical-align:middle;">${item.svg}</span>`);
        }
      });
      // Remove outros emojis residuais
      html = html.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '');
      el.innerHTML = html;
    });
  }

  // 2. AUTO-SCALE GPU 16:9
  function autoScale() {
    const stageW = window.innerWidth;
    const stageH = window.innerHeight;
    const scale = Math.min(stageW / 1920, stageH / 1080);
    document.documentElement.style.setProperty('--scale', scale);
  }

  // 3. AUTO-RENDERIZADOR DECLARATIVO DE GRÁFICOS CHART.JS
  function initCharts() {
    if (typeof Chart === 'undefined') return;

    // A. Gráficos Declarativos via data-attributes
    document.querySelectorAll('.deck-chart').forEach((el, index) => {
      const type = el.getAttribute('data-type') || 'bar';
      const canvasId = `auto-chart-${index + 1}`;
      el.innerHTML = `<div class="chart-container-box"><canvas id="${canvasId}"></canvas></div>`;
      const ctx = document.getElementById(canvasId);

      if (type === 'bar') {
        const labels = JSON.parse(el.getAttribute('data-labels') || '["Jan/Fev", "Mar/Abr", "Mai/Jun", "Jul/Ago", "Set/Out"]');
        const s1 = JSON.parse(el.getAttribute('data-series-1') || '{"label": "Receita Realizada", "data": [42, 58, 51, 74, 92]}');
        const s2 = JSON.parse(el.getAttribute('data-series-2') || '{"label": "Despesa Liquidada", "data": [35, 44, 46, 62, 70]}');

        chartInstances[canvasId] = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              { label: s1.label, data: s1.data, backgroundColor: '#219647', borderRadius: 6, borderSkipped: false },
              { label: s2.label, data: s2.data, backgroundColor: '#738b7b', borderRadius: 6, borderSkipped: false }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top', labels: { color: '#0d1711', font: { family: 'Segoe UI', weight: '600', size: 13 }, usePointStyle: true, pointStyle: 'circle' } }
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#4f6656', font: { family: 'Segoe UI', weight: '600' } } },
              y: { grid: { color: 'rgba(20, 48, 42, 0.08)' }, ticks: { color: '#4f6656', font: { family: 'Segoe UI' }, callback: v => `R$ ${v}M` } }
            }
          }
        });
      } else if (type === 'donut' || type === 'doughnut') {
        const labels = JSON.parse(el.getAttribute('data-labels') || '["Educação", "Saúde", "Infraestrutura", "Segurança", "Administração"]');
        const values = JSON.parse(el.getAttribute('data-values') || '[28.1, 22.4, 18.5, 16.8, 14.2]');

        chartInstances[canvasId] = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: values,
              backgroundColor: ['#219647', '#738b7b', '#9eb2a4', '#cbd8cf', '#dee8e1', '#eaf1ed'],
              borderRadius: 6,
              spacing: 3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '62%',
            plugins: {
              legend: { position: 'right', labels: { color: '#0d1711', font: { family: 'Segoe UI', weight: '600', size: 12 }, usePointStyle: true, pointStyle: 'circle', padding: 14 } }
            }
          }
        });
      }
    });
  }

  // 4. ATUALIZADOR DE SLIDES & PLAYER
  function updateSlides() {
    const slides = document.querySelectorAll('.slide');
    totalSlides = slides.length || 1;

    slides.forEach((slide, idx) => {
      if (idx + 1 === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    const indicator = document.getElementById('slideIndicator');
    if (indicator) indicator.innerText = `Slide ${currentSlide} / ${totalSlides}`;

    autoScale();

    // Redimensiona instâncias do Chart.js para evitar distorção
    Object.values(chartInstances).forEach(chart => {
      if (chart && typeof chart.resize === 'function') chart.resize();
    });
  }

  function nextSlide() {
    if (currentSlide < totalSlides) {
      currentSlide++;
      updateSlides();
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      currentSlide--;
      updateSlides();
    }
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    }
  }

  // 5. INJEÇÃO AUTOMÁTICA DOS CONTROLES DO APRESENTADOR
  function ensureControls() {
    if (!document.querySelector('.deck-controls')) {
      const controls = document.createElement('div');
      controls.className = 'deck-controls';
      controls.innerHTML = `
        <button id="btnPrev">← Anterior</button>
        <span id="slideIndicator" style="padding-inline: 8px;">Slide 1 / ${totalSlides}</span>
        <button id="btnNext">Próximo →</button>
        <button class="btn-sec btn-solar" id="btnFS">F11 Tela Cheia</button>
        <button class="btn-sec" id="btnPrint">Salvar PDF (Ctrl+P)</button>
      `;
      document.body.appendChild(controls);

      document.getElementById('btnPrev').addEventListener('click', prevSlide);
      document.getElementById('btnNext').addEventListener('click', nextSlide);
      document.getElementById('btnFS').addEventListener('click', toggleFullScreen);
      document.getElementById('btnPrint').addEventListener('click', () => window.print());
    }
  }

  // 6. TECLADO
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') nextSlide();
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
    if (e.key === 'Home') { currentSlide = 1; updateSlides(); }
    if (e.key === 'End') { currentSlide = totalSlides; updateSlides(); }
  });

  window.addEventListener('resize', autoScale);

  // INICIALIZAÇÃO GERAL
  window.addEventListener('DOMContentLoaded', () => {
    sanitizeEmojis();
    ensureControls();
    initCharts();
    updateSlides();
  });

  // Exporta funções para escopo global caso botões inline sejam usados
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.toggleFullScreen = toggleFullScreen;
})();
