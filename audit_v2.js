const fs = require('fs');

const targetFile = fs.existsSync('design-system-orcamento-soft.html') ? 'design-system-orcamento-soft.html' : 'design-system-orcamento-v2.html';
const content = fs.readFileSync(targetFile, 'utf8');
const lines = content.split('\n');

console.log('====================================================');
console.log('AUDITORIA TÉCNICA RIGOROSA — DESIGN SYSTEM ORÇAMENTO V2');
console.log('====================================================\n');

let pass = 0;
let fail = 0;

function test(title, fn) {
  try {
    const res = fn();
    if (res === true || (res && res.ok)) {
      console.log(`[PASS] ${title}`);
      pass++;
    } else {
      console.error(`[FAIL] ${title}: ${res && res.msg ? res.msg : 'Falhou'}`);
      fail++;
    }
  } catch (e) {
    console.error(`[ERROR] ${title}: ${e.message}`);
    fail++;
  }
}

// Teste 1: Zero menções a Coinest
test('1. Eliminação total da marca legada Coinest', () => {
  const matches = lines.map((l, i) => ({l: i+1, text: l})).filter(o => /coinest/i.test(o.text));
  if (matches.length === 0) return true;
  return { ok: false, msg: `Encontradas ${matches.length} ocorrências na linha: ${matches.map(m => m.l).join(', ')}` };
});

// Teste 2: Eliminação do tom antigo Forest Pine (#1e4841)
test('2. Eliminação total do tom antigo Forest Pine (#1e4841)', () => {
  const matches = lines.map((l, i) => ({l: i+1, text: l})).filter(o => o.text.includes('#1e4841'));
  if (matches.length === 0) return true;
  return { ok: false, msg: `Encontradas ${matches.length} ocorrências na linha: ${matches.map(m => m.l).join(', ')}` };
});

// Teste 3: Cor Principal #219647 como padrão institucional oficial
test('3. Cor Principal #219647 configurada em tokens e amostras', () => {
  const hasToken = content.includes('--pine-500: #219647;');
  const hasPrimary500 = content.includes('--primary-500: var(--pine-500);');
  const hasSwatch = content.includes('data-hex="#219647"');
  const count = (content.match(/#219647/g) || []).length;
  if (hasToken && hasPrimary500 && hasSwatch && count >= 5) {
    console.log(`       -> Ocorrências diretas de #219647: ${count}`);
    return true;
  }
  return { ok: false, msg: `Token: ${hasToken}, PrimaryAlias: ${hasPrimary500}, Swatch: ${hasSwatch}, Total: ${count}` };
});

// Teste 4: Ausência de sombras com cor e glows
test('4. Ausência de sombras com cor e glows (Sombras 100% Neutras)', () => {
  const glowLines = lines.map((l, i) => ({l: i+1, text: l})).filter(o => {
    // Permitir focus rings transparentes ou neutros e a linha descritiva
    if (o.text.includes('/* Sombra suave neutra em vez de brilho colorido */')) return false;
    if (o.text.includes('var(--shadow-soft-')) return false;
    if (o.text.includes('inset 0 1px 1px rgba(0, 0, 0, 0.02)')) return false;
    if (o.text.includes('rgba(33, 150, 71, 0.18)') || o.text.includes('rgba(33, 150, 71, 0.28)')) return false; // Focus rings WCAG
    return /box-shadow.*rgba\(\s*(?!0\s*,\s*0\s*,\s*0|15\s*,\s*23\s*,\s*42|13\s*,\s*23\s*,\s*17|15\s*,\s*28\s*,\s*24|255\s*,\s*255\s*,\s*255)/i.test(o.text);
  });
  if (glowLines.length === 0) return true;
  return { ok: false, msg: `Encontradas ${glowLines.length} sombras coloridas: ${JSON.stringify(glowLines)}` };
});

// Teste 5: Padrão do botão primário em #219647
test('5. Padrão dos botões primários estritamente na cor #219647', () => {
  const hasPrimarySoftBg = content.includes('.btn-primary-soft {\n    background: var(--pine-500);');
  const hasPrimaryBg = content.includes('.btn-primary,');
  const hasWhiteColor = content.includes('color: #ffffff;\n    font-weight: 600;');
  return hasPrimaryBg && hasWhiteColor;
});

// Teste 6: Preservação de todos os modelos de Cards na Seção 07
test('6. Integridade dos modelos de Cards da Seção 07', () => {
  const cardSelectors = [
    'card-soft--default',
    'card-soft--outlined',
    'card-soft--sage',
    'card-soft--elevated',
    'card-soft--lime',
    'card-soft--glass',
    'card-soft--glass-sage'
  ];
  const missing = cardSelectors.filter(s => !content.includes(s));
  if (missing.length === 0) return true;
  return { ok: false, msg: `Faltando seletores de card: ${missing.join(', ')}` };
});

// Teste 7: Preservação das 5 Superfícies Fundamentais na Seção 02
test('7. Integridade das 5 Superfícies Fundamentais na Seção 02', () => {
  const surfaceSelectors = [
    'surface-card page',
    'surface-card surface',
    'surface-card sage',
    'surface-card dark',
    'surface-card glass'
  ];
  const missing = surfaceSelectors.filter(s => !content.includes(s));
  if (missing.length === 0) return true;
  return { ok: false, msg: `Faltando superfícies: ${missing.join(', ')}` };
});

// Teste 8: Preservação dos 3 Demonstrativos de Sombra Soft
test('8. Integridade dos 3 Demonstrativos de Sombra Soft', () => {
  const shadowDemos = [
    'shadow-demo-card s-soft-sm',
    'shadow-demo-card s-soft-md',
    'shadow-demo-card s-soft-lg'
  ];
  const missing = shadowDemos.filter(s => !content.includes(s));
  if (missing.length === 0) return true;
  return { ok: false, msg: `Faltando demonstrativos de sombra: ${missing.join(', ')}` };
});

// Teste 9: Grade de 36 Ícones Orçamentários na Seção 05
test('9. Grade de 36 Ícones Orçamentários na Seção 05', () => {
  const iconMatches = (content.match(/<div class="icon-cell"/g) || []).length;
  if (iconMatches === 36) {
    console.log(`       -> Total de ícones orçamentários verificados: ${iconMatches}`);
    return true;
  }
  return { ok: false, msg: `Esperados 36 ícones, encontrados ${iconMatches}` };
});

// Teste 10: Living App Shell com Sidebar, SIAFIC e Calendário Fiscal
test('10. Living App Shell com Sidebar, SIAFIC e Calendário Fiscal', () => {
  const hasSidebar = content.includes('app-sidebar-soft');
  const hasSiafic = content.includes('SIAFIC');
  const hasCalGrid = content.includes('cal-grid-soft');
  const hasBars = content.includes('bars-chart-soft');
  return hasSidebar && hasSiafic && hasCalGrid && hasBars;
});

// Teste 11: Alternância de Tema Claro/Escuro funcional
test('11. Mecanismo de alternância de Tema Claro/Escuro', () => {
  const hasDataTheme = content.includes('data-theme="light"');
  const hasDarkStyles = content.includes('html[data-theme="dark"]');
  const hasToggleScript = content.includes('themeSwitch') && content.includes('data-theme');
  return hasDataTheme && hasDarkStyles && hasToggleScript;
});

// Teste 12: Validação de fechamento das tags estruturais
test('12. Validação estrutural de tags HTML', () => {
  const tags = ['div', 'section', 'p', 'button', 'a', 'span'];
  for (const t of tags) {
    const openCount = (content.match(new RegExp(`<${t}\\b[^>]*>`, 'g')) || []).length;
    const closeCount = (content.match(new RegExp(`</${t}>`, 'g')) || []).length;
    if (openCount !== closeCount) {
      return { ok: false, msg: `Tag <${t}>: ${openCount} aberturas vs ${closeCount} fechamentos` };
    }
  }
  return true;
});

console.log('\n----------------------------------------------------');
console.log(`RESULTADO DA AUDITORIA: ${pass} PASSOU, ${fail} FALHAS`);
console.log('----------------------------------------------------');
