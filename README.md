# Design System Orçamento — Gestão Orçamentária & Transparência Pública

> **Padrão:** Design System Soft Governamental (Baseado no 8-Section Master Standard)  
> **Tema:** Modo Claro Soft Mineral & Modo Noturno Velvet Dark  
> **Cores Centrais:** Cor Principal `#219647` (Verde Esmeralda Institucional) | Primária CTA `#fee000` (Amarelo Solar / Ouro Orçamentário)  
> **Conformidade:** WCAG 2.1 AA / AAA, Lei de Responsabilidade Fiscal (LRF), SIAFIC e Padrões de Transparência Pública  

---

## 1. Visão Geral & Filosofia Visual

O **Design System Orçamento** adapta a consagrada estética *Soft* (superfícies aveludadas, duplo bisel concêntrico, sombras em tripla difusão e microinterações táteis fluidas) para o contexto rigoroso e democrático da **gestão orçamentária e financeira do setor público**.

Substitui completamente metáforas de finanças pessoais e criptoativos por conceitos centrais de finanças públicas:
- **Planejamento:** Plano Plurianual (PPA), Lei de Diretrizes Orçamentárias (LDO) e Lei Orçamentária Anual (LOA).
- **Ciclo da Despesa Pública:** Dotação Atualizada, Empenho, Liquidação, Ordem de Pagamento e Restos a Pagar.
- **Ciclo da Receita:** Previsão Orçamentária, Arrecadação Tributária e Transferências Constitucionais (FPE/FPM/FUNDEB).
- **Controle & Fiscalização:** Limites Prudenciais da LRF, Relatório Resumido da Execução Orçamentária (RREO), Relatório de Gestão Fiscal (RGF) e Prestação de Contas aos Tribunais de Contas (TCU / TCE).

---

## 2. Paleta Cromática Calibrada

### 2.1 Cor Principal: Verde Esmeralda Governamental (`#219647`)
Simboliza solidez institucional, equilíbrio fiscal, compromisso público e sustentabilidade.
- **50:** `#edf8f0` (Tint ultra-suave para seleções)
- **100:** `#d5eedc`
- **200:** `#ade0ba`
- **300:** `#7ece93`
- **400:** `#48b86d`
- **500:** `#219647` (**Cor Principal da Marca**, botões secundários, sidebar e títulos)
- **600:** `#1b7d3a`
- **700:** `#16642f`
- **800:** `#114c24` (**Fundo de Card Escuro Elevado**)
- **900:** `#0b3017`

### 2.2 Primária CTA: Amarelo Solar Ouro (`#fee000`)
Tom de máxima energia democrática e conversão visual para botões de ação principal (*Button-in-Button*), aprovação de empenhos, avisos prioritários e badges de destaque.
- **400:** `#fee000` (**Primária CTA**)
- **Contraste Acessível:** Aplicado com texto escuro carvão mineral (`#0d1711`), proporcionando contraste superior a **13.5:1** (superando com folga os requisitos WCAG AAA).
- **Pill Suave:** `#fffadb` com borda `rgba(254, 224, 0, 0.65)`.
- **Glow Tátil:** `0 6px 20px -2px rgba(254, 224, 0, 0.45)`.

### 2.3 Tons Institucionais Suaves (Soft Sage & Fundos Aveludados)
- `--sage-bg`: `#ebf5ee` — Superfície sálvia mineral para quebrar a monotonia do branco sem criar atrito cognitivo.
- `--sage-border`: `rgba(33, 150, 71, 0.12)` — Delimitação sutil e elegante.

### 2.4 Neutros Minerais Soft (Warm Slate-Emerald Scale)
Elimina a frieza de cinzas sintéticos padrão por meio de uma matriz mineral com leve pigmentação esmeralda:
- `--n-25`: `#ffffff` (Superfície pura de cards)
- `--n-50`: `#f9fbf9`
- `--n-100`: `#f2f6f3` (**Canvas da Página**)
- `--n-200`: `#dee8e1` (Bordas e trilhas de progresso)
- `--n-600`: `#4f6656` (Texto secundário e metadados)
- `--n-900`: `#0d1711` (**Texto primário carvão profundo**)

### 2.5 Acentos Semânticos de Gestão Pública
| Papel Semântico | Cor Sólida | Tint / Alpha | Aplicação no Orçamento |
| :--- | :--- | :--- | :--- |
| **Superávit / Receitas** | `#10b981` | `rgba(16, 185, 129, 0.10)` | Arrecadação dentro da meta, superávit apurado, contas aprovadas |
| **Alerta / LRF** | `#f59e0b` | `rgba(245, 158, 11, 0.10)` | Limite prudencial de pessoal (LRF), prazos de empenho |
| **Déficit / Bloqueio** | `#f43f5e` | `rgba(244, 63, 94, 0.09)` | Anulação de empenho, glosa contratual, estouro orçamentário |
| **Investimentos / PPA** | `#0284c7` | `rgba(2, 132, 199, 0.10)` | Projetos estruturantes, obras públicas, convênios |
| **Auditoria / Transparência**| `#6366f1` | `rgba(99, 102, 241, 0.10)` | Prestação de contas TCU/TCE, dados abertos, portal cidadão |

---

## 3. Biblioteca de Ícones de Orçamento Público (36 Ícones SVG)

Todos os ícones foram projetados na malha de 24×24px, traço uniforme de 1.65px, junções arredondadas e interatividade de cópia com feedback via Toast:

1. `painel`: Visão geral do orçamento público
2. `orcamento`: Livro orçamentário / LOA
3. `receitas`: Arrecadação de tributos e ingressos
4. `despesas`: Execução de despesas públicas
5. `empenho`: Nota de Empenho (NE) e reserva orçamentária
6. `liquidacao`: Atesto e verificação da despesa
7. `pagamento`: Ordem Bancária (OB) e liberação financeira
8. `ppa`: Planejamento plurianual (4 anos)
9. `ldo`: Diretrizes e metas fiscais
10. `loa`: Detalhamento da lei orçamentária
11. `transparencia`: Portal da Transparência e olho cidadão
12. `tribunal-contas`: Balança fiscal do TCU e TCEs
13. `licitacao`: Editais, pregões e compras governamentais
14. `contrato`: Gestão e fiscalização de contratos
15. `restos-pagar`: Controle de restos a pagar processados/não processados
16. `superavit`: Superávit fiscal primário e nominal
17. `deficit`: Déficit orçamentário e contingenciamento
18. `saude`: Ações e serviços públicos de saúde (piso constitucional 15%)
19. `educacao`: Manutenção e desenvolvimento do ensino (piso 25%)
20. `infraestrutura`: Obras, mobilidade e habitação
21. `seguranca`: Segurança pública e ordem social
22. `social`: Programas de assistência social e cidadania
23. `servidores`: Despesa com pessoal e limite prudencial da LRF
24. `graficos`: Demonstrativos fiscais (RREO & RGF)
25. `auditoria`: Controle interno e conformidade legal
26. `transferencias`: Repasses federais/estaduais (FPE, FPM, FUNDEB)
27. `calendario`: Cronograma de desembolso e prazos constitucionais
28. `notificacao`: Alertas de metas fiscais e notificações legais
29. `buscar`: Consulta de credores, CNPJ e dotações
30. `documento`: Publicações oficiais e Diário Oficial
31. `exportar`: Dados abertos em CSV, JSON e PDF
32. `autenticacao`: Login Gov.br e certificado ICP-Brasil
33. `ajustes`: Parâmetros da Unidade Gestora (UG)
34. `filtros`: Filtragem por função, subfunção e programa de governo
35. `legislativo`: Poder Legislativo, créditos adicionais e plenário
36. `emendas`: Emendas parlamentares individuais e de bancada

---

## 4. Arquitetura de Cards Double-Bezel

O sistema implementa 7 variações de cards construídas com o padrão de duplo bisel concêntrico:
1. **Card Padrão Branco (`card-soft--default`):** Moldura suave, inner-highlight reflexivo de 85% e sombras sutis.
2. **Card Contornado (`card-soft--outlined`):** Traço tracejado fino para áreas secundárias e filtros.
3. **Card Soft Sage (`card-soft--sage`):** Fundo aveludado `#ebf5ee` para agrupamento institucional sem sobrecarga visual.
4. **Card Invertido Verde Institucional (`card-soft--elevated`):** Fundo `#114c24` com acentos em Amarelo Ouro para destaques de superávit e saldo disponível da dotação.
5. **Card Amarelo CTA Solar (`card-soft--cta`):** Fundo `#fee000` de alta energia e contraste extremo para ações urgentes e fechamentos de prazos fiscais.
6. **Card Vidro Fosco Frosted Glass (`card-soft--glass`):** Efeito translúcido com `backdrop-filter: blur(20px) saturate(160%)`.
7. **Card Vidro Sage (`card-soft--glass-sage`):** Vidro suave com matiz verde para módulos de controle e auditoria.

---

## 5. Aplicação: Living App Shell

A demonstração interativa na Seção 08 apresenta um painel funcional de **Gestão Orçamentária Governamental**:
- **Cabeçalho:** Identificação da Unidade Gestora, status de integração SIAFIC em tempo real e botão de emissão de empenhos em Amarelo CTA (`#fee000`).
- **Cards Principais:**
  - *Fluxo Orçamentário:* Comparativo gráfico de Receitas Realizadas (Amarelo Ouro) vs Despesas Liquidadas (Verde Esmeralda).
  - *Dotação Disponível:* Saldo global apurado com certificação LRF 100% regular.
  - *Execução da LOA:* Índice consolidado com percentual de cumprimento da meta fiscal.
- **Grids Secundários:**
  - *Últimos Empenhos Emitidos:* Saúde, Educação e Infraestrutura Urbana.
  - *Restos a Pagar & Obrigações:* Folha de servidores, repasses e convênios.
  - *Calendário de Obrigações Fiscais:* Audiências públicas, envio do RREO e prazos constitucionais.

---

## 6. Estrutura Canônica de Arquivos

- `design-system-orcamento-soft.html`: Living Styleguide canônico interativo completo (todas as 9 seções, tokens, componentes soft, 36 ícones orçamentários SVG nativos, tabela SIAFIC, 6 gráficos Chart.js em paleta verde governamental e neutros minerais, e Living App Shell).
- `charts-pro.js`: Motor analítico modular Chart.js com as configurações de execução orçamentária, trajetória com curva Bezier, composição funcional e conformidade fiscal.
- `assets/chart.umd.min.js`: Biblioteca Chart.js empacotada localmente para permitir operação 100% offline e resiliente.
- `audit_v2.js`: Suíte automatizada de auditoria técnica rigorosa para validação contínua dos 12 padrões de conformidade do Design System.
- `README.md`: Documentação oficial das diretrizes de arquitetura, acessibilidade WCAG e conformidade orçamentária.
