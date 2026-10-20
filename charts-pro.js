
/* ==========================================================================
   CHART.JS ENGINE (REFERÊNCIA CHART-JS.FRAMER.WEBSITE)
   ========================================================================== */
(function() {
  // Instâncias ativas
  const instances = {};

  function formatBRL(val) {
    if (typeof val !== 'number') return val;
    return 'R$ ' + val.toLocaleString('pt-BR');
  }

  function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      isDark,
      grid: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 28, 24, 0.06)',
      ticks: isDark ? '#a3b8aa' : '#52685a',
      legend: isDark ? '#f4f8f5' : '#0d1711',
      tooltipBg: isDark ? '#152c1e' : '#0d1711',
      cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 28, 24, 0.07)'
    };
  }

  function initChartJS() {
    if (typeof Chart === 'undefined') {
      setTimeout(initChartJS, 100);
      return;
    }

    const tc = getThemeColors();

    // 1. BAR CHART
    const ctxBar = document.getElementById('chartjs-bar');
    if (ctxBar) {
      if (instances.bar) instances.bar.destroy();
      instances.bar = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          datasets: [
            {
              label: 'Receita Arrecadada',
              data: [42000, 58000, 51000, 74000, 92000, 88000],
              backgroundColor: '#219647',
              borderRadius: 4,
              borderSkipped: false
            },
            {
              label: 'Despesa Liquidada',
              data: [35000, 44000, 46000, 62000, 70000, 68000],
              backgroundColor: '#738b7b',
              borderRadius: 4,
              borderSkipped: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 650 },
          plugins: {
            legend: {
              position: 'top',
              labels: { color: tc.legend, font: { family: 'Segoe UI', weight: 650, size: 12 }, usePointStyle: true, pointStyle: 'circle' }
            },
            tooltip: {
              backgroundColor: tc.tooltipBg,
              titleFont: { family: 'Segoe UI', weight: 700 },
              bodyFont: { family: 'Segoe UI' },
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: ctx => ` ${ctx.dataset.label}: ${formatBRL(ctx.parsed.y)}`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: tc.ticks, font: { family: 'Segoe UI', weight: 600 } }
            },
            y: {
              grid: { color: tc.grid },
              ticks: {
                color: tc.ticks,
                font: { family: 'Segoe UI' },
                callback: v => formatBRL(v)
              }
            }
          }
        }
      });
    }

    // 2. LINE CHART
    const ctxLine = document.getElementById('chartjs-line');
    if (ctxLine) {
      if (instances.line) instances.line.destroy();
      instances.line = new Chart(ctxLine, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          datasets: [
            {
              label: 'Arrecadação Realizada',
              data: [40000, 58000, 54000, 78000, 82000, 95000],
              borderColor: '#219647',
              backgroundColor: 'rgba(33, 150, 71, 0.16)',
              fill: 'origin',
              tension: 0.28,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: '#219647'
            },
            {
              label: 'Dotação LOA Fixada',
              data: [36000, 48000, 58000, 70000, 80000, 90000],
              borderColor: '#738b7b',
              backgroundColor: 'rgba(115, 139, 123, 0.16)',
              fill: 'origin',
              tension: 0.28,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: '#738b7b'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 650 },
          interaction: { mode: 'nearest', intersect: false },
          plugins: {
            legend: {
              position: 'top',
              labels: { color: tc.legend, font: { family: 'Segoe UI', weight: 650, size: 12 }, usePointStyle: true, pointStyle: 'circle' }
            },
            tooltip: {
              backgroundColor: tc.tooltipBg,
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: ctx => ` ${ctx.dataset.label}: ${formatBRL(ctx.parsed.y)}`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: tc.ticks, font: { family: 'Segoe UI', weight: 600 } }
            },
            y: {
              grid: { color: tc.grid },
              ticks: {
                color: tc.ticks,
                font: { family: 'Segoe UI' },
                callback: v => formatBRL(v)
              }
            }
          }
        }
      });
    }

    // 3. DOUGHNUT CHART
    const ctxDoughnut = document.getElementById('chartjs-doughnut');
    if (ctxDoughnut) {
      if (instances.doughnut) instances.doughnut.destroy();
      instances.doughnut = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
          labels: ['Pessoal & Encargos', 'Investimentos & Obras', 'Custeio Operacional', 'Saúde & UBS', 'Educação FUNDEB', 'Serviço da Dívida'],
          datasets: [{
            data: [48, 16, 14, 10, 8, 4],
            backgroundColor: ['#219647', '#738b7b', '#9eb2a4', '#cbd8cf', '#dee8e1', '#eaf1ed'],
            hoverBackgroundColor: ['#1b7d3a', '#5f7566', '#879b8d', '#b5c3b9', '#c9d4cd', '#dbe5de'],
            borderRadius: 6,
            spacing: 2,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '62%',
          animation: { duration: 650 },
          plugins: {
            legend: {
              position: 'right',
              labels: { color: tc.legend, font: { family: 'Segoe UI', weight: 600, size: 11 }, usePointStyle: true, pointStyle: 'circle', padding: 14 }
            },
            tooltip: {
              backgroundColor: tc.tooltipBg,
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: ctx => ` ${ctx.label}: ${ctx.parsed}% da Despesa`
              }
            }
          }
        }
      });
    }

    // 4. PIE CHART
    const ctxPie = document.getElementById('chartjs-pie');
    if (ctxPie) {
      if (instances.pie) instances.pie.destroy();
      instances.pie = new Chart(ctxPie, {
        type: 'pie',
        data: {
          labels: ['Educação (25%)', 'Infraestrutura Urbana (22%)', 'Segurança Pública (20%)', 'Saúde (18%)', 'Reserva de Contingência (15%)'],
          datasets: [{
            data: [25, 22, 20, 18, 15],
            backgroundColor: ['#219647', '#738b7b', '#9eb2a4', '#cbd8cf', '#dee8e1'],
            hoverBackgroundColor: ['#1b7d3a', '#5f7566', '#879b8d', '#b5c3b9', '#c9d4cd'],
            borderRadius: 6,
            spacing: 2,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 650 },
          plugins: {
            legend: {
              position: 'right',
              labels: { color: tc.legend, font: { family: 'Segoe UI', weight: 600, size: 11 }, usePointStyle: true, pointStyle: 'circle', padding: 14 }
            },
            tooltip: {
              backgroundColor: tc.tooltipBg,
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: ctx => ` ${ctx.label}: ${ctx.parsed}% da LOA`
              }
            }
          }
        }
      });
    }

    // 5. RADAR CHART
    const ctxRadar = document.getElementById('chartjs-radar');
    if (ctxRadar) {
      if (instances.radar) instances.radar.destroy();
      instances.radar = new Chart(ctxRadar, {
        type: 'radar',
        data: {
          labels: ['Limite de Pessoal', 'Aplicação Saúde', 'Aplicação FUNDEB', 'Disponibilidade de Caixa', 'Transparência SIAFIC', 'Previdência'],
          datasets: [
            {
              label: 'Índice de Gestão Fiscal 2026',
              data: [94, 98, 96, 88, 99, 90],
              borderColor: '#219647',
              backgroundColor: 'rgba(33, 150, 71, 0.22)',
              pointRadius: 4,
              pointBackgroundColor: '#219647'
            },
            {
              label: 'Média de Referência Estadual',
              data: [82, 85, 88, 75, 84, 78],
              borderColor: '#738b7b',
              backgroundColor: 'rgba(115, 139, 123, 0.20)',
              pointRadius: 4,
              pointBackgroundColor: '#738b7b'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 650 },
          plugins: {
            legend: {
              position: 'top',
              labels: { color: tc.legend, font: { family: 'Segoe UI', weight: 650, size: 11 }, usePointStyle: true, pointStyle: 'circle' }
            },
            tooltip: {
              backgroundColor: tc.tooltipBg,
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.r} pontos`
              }
            }
          },
          scales: {
            r: {
              angleLines: { color: tc.grid },
              grid: { color: tc.grid },
              pointLabels: { color: tc.ticks, font: { family: 'Segoe UI', size: 11, weight: 600 } },
              ticks: { display: false }
            }
          }
        }
      });
    }

    // 6. POLAR AREA CHART
    const ctxPolar = document.getElementById('chartjs-polar');
    if (ctxPolar) {
      if (instances.polar) instances.polar.destroy();
      instances.polar = new Chart(ctxPolar, {
        type: 'polarArea',
        data: {
          labels: ['Transporte & Vias', 'Habitação Popular', 'Saneamento Básico', 'Tecnologia & Inovação', 'Meio Ambiente'],
          datasets: [{
            data: [78, 62, 54, 46, 38],
            backgroundColor: [
              'rgba(33, 150, 71, 0.90)',
              'rgba(115, 139, 123, 0.88)',
              'rgba(158, 178, 164, 0.85)',
              'rgba(203, 216, 207, 0.85)',
              'rgba(222, 232, 225, 0.85)'
            ],
            borderColor: tc.isDark ? '#12241b' : '#ffffff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 650 },
          plugins: {
            legend: {
              position: 'right',
              labels: { color: tc.legend, font: { family: 'Segoe UI', weight: 600, size: 11 }, usePointStyle: true, pointStyle: 'circle', padding: 12 }
            },
            tooltip: {
              backgroundColor: tc.tooltipBg,
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: ctx => ` ${ctx.label}: R$ ${ctx.parsed.r} Mi`
              }
            }
          },
          scales: {
            r: {
              grid: { color: tc.grid },
              ticks: { display: false }
            }
          }
        }
      });
    }
  }

  // Hook global de atualização quando alterna o tema
  window.updateAllChartsTheme = function() {
    initChartJS();
  };

  // Inicialização no DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChartJS);
  } else {
    initChartJS();
  }
})();
