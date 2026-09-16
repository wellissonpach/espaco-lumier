---
name: Espaço Lumier
description: Complexo nobre integrado para casamentos, 15 anos e celebrações de alto padrão em Brasília
colors:
  primary: "#C5A880"
  primary-hover: "#B89758"
  primary-deep: "#785E34"
  neutral-bg: "#FAF8F5"
  neutral-surface: "#FFFFFF"
  neutral-dark: "#0D0C0B"
  neutral-dark-secondary: "#1E1B19"
  neutral-text: "#2C2825"
  neutral-muted: "#6B6158"
  border-subtle: "#E8DFD3"
  border-medium: "#D9CFC4"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.375rem, 5vw, 4.75rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Playfair Display, Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Cormorant Garamond, Playfair Display, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.15em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-dark:
    backgroundColor: "{colors.neutral-dark-secondary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.xs}"
    padding: "10px 16px"
---

# Design System: Espaço Lumier

## Overview

**Creative North Star: "O Palácio de Cristal e Afeto"**

O Espaço Lumier traduz o encontro poético entre a suntuosidade de um palácio de celebrações clássico — marcado por imponentes lustres de cristal lapidado, arcos coloniais envidraçados e prataria suntuosa — e a calidez do afeto humano que há mais de duas décadas acolhe famílias em Brasília. O sistema visual rejeita deliberadamente tanto o luxo asséptico e impessoal quanto o imediatismo comercial de casas de festa genéricas. Cada tela respira amplitude, nobreza editorial e acolhimento tangível.

A paleta de cores ancora-se no calor luminoso do linho natural cru (`#FAF8F5`) e no dourado champanhe mineral (`#C5A880`), entrecortados pelo contraste solene do carvão nobre (`#1E1B19` e `#0D0C0B`). A tipografia estabelece um diálogo lírico entre a elegância atemporal da Cormorant Garamond e Playfair Display nos títulos, e a precisão funcional e arejada da Plus Jakarta Sans nos textos de apoio e dados informativos.

**Key Characteristics:**
- **Nobreza Sem Frieza:** Atmosfera cinematográfica com iluminação cênica âmbar, texturas de linho e reflexos de cristal.
- **Rigor Editorial:** Uso equilibrado de espaço negativo, proporções clássicas e divisores dourados delicados de 1px com o glifo estelar `✦`.
- **Veracidade Fotográfica:** Planos fechados e abertos de eventos reais, rechauds fumegantes em prata, arranjos florais exuberantes e noivas sorridentes.
- **Micro-Interações Serenas:** Transições suaves de 300ms a 500ms, ausência de animações estridentes e botões táteis refinados.

## Colors

A paleta cromática mimetiza a luminosidade do entardecer no salão nobre, a luz das velas nas mesas postas e a sobriedade do mobiliário clássico.

### Primary
- **Ouro Champagne Lumier** (`#C5A880`): Utilizado como a assinatura luminosa da marca em botões de ação principal, detalhes em itálico de títulos, estrelas decorativas (`✦`) e indicadores de progresso.
- **Ouro Champagne Envelhecido** (`#785E34`): Tom mais escuro e denso do ouro, aplicado em textos destacados sobre fundos claros, bordas ativas e títulos secundários que exigem contraste reforçado.
- **Ouro Dourado Hover** (`#B89758`): Estado interativo de hover para botões primários e links destacados.

### Neutral
- **Fundo Linho Nobre** (`#FAF8F5`): Canvas dominante de toda a experiência visual diurna, transmitindo frescor, leveza e sofisticação orgânica.
- **Superfície Alva** (`#FFFFFF`): Cartões e modais elevados com bordas suaves.
- **Grafite Carvão Quente** (`#1E1B19`): Superfície para botões secundários solenes, cabeçalho escuro e rodapé institucional.
- **Preto Ébano Profundo** (`#0D0C0B`): Fundo da seção Hero cinematográfica e de visualizações ampliadas de fotos (lightbox).
- **Texto Grafite Profundo** (`#2C2825`): Cor de leitura para parágrafos longos, oferecendo excelente contraste sem a dureza do preto puro.
- **Texto Cinza Nobre Acolchoado** (`#6B6158`): Subtítulos, metadados, legendas e rótulos secundários.
- **Borda Linho Suave** (`#E8DFD3`): Divisores de seção, molduras de cards e linhas estruturais de 1px.
- **Borda Linho Média** (`#D9CFC4`): Delimitação de campos de formulário, botões secundários e controles de paginação.

### Named Rules
**The Lumier 10% Gold Rule.** O tom dourado champanhe (`#C5A880`) nunca deve cobrir mais de 10% da área visual de qualquer viewport. Sua nobreza reside na raridade de sua aplicação, operando como jóia focal e guia de olhar.
**The No-Pitch-Black Rule.** Textos nunca utilizam preto puro (`#000000`). Todas as áreas escuras carregam matizes aquecidos de carvão (`#1E1B19` ou `#2C2825`) para preservar a sensação calorosa e humana da marca.

## Typography

A tipografia do Espaço Lumier celebra o contraste harmônico entre a tradição clássica romana e a legibilidade moderna contemporânea.

**Display Font:** Cormorant Garamond (fallback: Georgia, serif)
**Headline Font:** Playfair Display / Cormorant Garamond (fallback: Georgia, serif)
**Body Font:** Plus Jakarta Sans (fallback: system-ui, -apple-system, sans-serif)

**Character:** Uma união romântica e aristocrática da Cormorant Garamond com a sobriedade límpida da Plus Jakarta Sans, conferindo autoridade cerimonial aos títulos e clareza cristalina às especificações e formulários.

### Hierarchy
- **Display** (300 / Light, `clamp(2.375rem, 5vw, 4.75rem)`, line-height 1.1, tracking `-0.02em`): Utilizado no H1 da Hero e nas grandes declarações institucionais. Frequentemente acompanhado de uma palavra final em itálico com a cor Ouro Champagne.
- **Headline** (400 / Regular, `clamp(1.75rem, 3.5vw, 2.75rem)`, line-height 1.2, tracking `-0.01em`): Títulos de seções (O Espaço, Celebrações, Decoração, Buffet, Depoimentos).
- **Title** (500 / Medium, `1.25rem` [20px], line-height 1.3): Títulos de cards de ambientes, pratos do buffet e nomes de avaliadores.
- **Body** (300–400 / Light–Regular, `0.9375rem` [15px], line-height 1.6, max-width `65ch`): Parágrafos explicativos, descrições de serviços e depoimentos de noivas.
- **Label / Eyebrow** (600 / SemiBold, `0.6875rem` [11px], tracking `0.15em` a `0.22em`, uppercase): Badges de categoria, links do menu superior, chips de serviço e indicadores de capacidade.

### Named Rules
**The Golden Italic Accent Rule.** Títulos Display de grande impacto devem reservar sua palavra emocionalmente culminante ("inesquecíveis", "perfeição", "afeto") para ser renderizada em *itálico* com o tom Ouro Champagne (`#C5A880`).
**The Letterspaced Eyebrow Rule.** Todo subtítulo de categoria ou badge precede o título em caixa alta, corpo reduzido (10px a 11px) e espaçamento generoso (`letter-spacing >= 0.15em`), ancorando a hierarquia visual.

## Layout

O modelo espacial baseia-se em um container centralizado (`max-w-7xl` [1280px]), acolchoado horizontalmente por `1.25rem` (20px) em mobile e até `2rem` (32px) em desktop.

- **Ritmo Vertical de Seções:** As seções principais respiram com espaçamentos generosos de `5rem` (80px) em mobile a `7rem` (112px) em desktop (`py-20` a `py-28`), permitindo que a cenografia fotográfica seja apreciada sem aglomeração.
- **Grid de Cards:** Estruturas modulares em 3 colunas no desktop (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), reduzindo fluidamente para 1 coluna no mobile com gap de `1.5rem` a `2rem` (24px a 32px).
- **Divisores Editoriais:** Divisores de seção utilizam linhas centrais de 1px com o glifo estelar `✦` em ouro, quebrando blocos de texto com requinte clássico.

## Elevation & Depth

O Espaço Lumier adota a filosofia de **Tonal Layering & Luz Ambiente**. As superfícies em repouso são planas e integradas, demarcadas por contrastes de linho e grafite com bordas sutis de 1px (`#E8DFD3`). O relevo e a profundidade emergem através de brilhos suaves e sombras difusas que simulam o reflexo de velas e lustres de cristal.

### Shadow Vocabulary
- **Sombra Difusa de Hover** (`box-shadow: 0 10px 30px -10px rgba(44, 40, 37, 0.12)`): Aplicada ao passar o cursor sobre cards de ambiente, pratos e depoimentos.
- **Glow Dourado Sutil** (`box-shadow: 0 4px 20px rgba(197, 168, 128, 0.25)`): Aplicado no botão de WhatsApp e ações flutuantes de conversão.
- **Profundidade de Modal** (`box-shadow: 0 25px 50px -12px rgba(13, 12, 11, 0.4)`): Aplicada no Simulador de Orçamento e no Lightbox sobre backdrop com desfoque de `8px` (`backdrop-blur-md`).

### Named Rules
**The Candlelight Glow Rule.** Sombras duras e opacas são proibidas. As sombras devem ser sempre quentes, difusas e com baixa opacidade, transmitindo a sensação de um ambiente banhado por iluminação indireta.

## Shapes

A linguagem de formas é **Refinada e Afetuosa**:
- **Raio Padrão dos Cards:** `2px` a `4px` (`rounded-xs` a `rounded-sm`), garantindo silhuetas arquitetônicas clássicas e bem delineadas.
- **Raio de Botões de Ação:** `4px` a `6px` (`rounded-sm` a `rounded-md`), oferecendo um toque tátil amigável sem parecer infantil.
- **Pills e Badges:** `9999px` (`rounded-full`) para pequenas tags flutuantes, indicadores numéricos e o badge de autoridade da Hero.
- **Arcos Arquitetônicos:** Inspiração direta nos arcos coloniais envidraçados do salão principal, refletidos na simetria das seções.

## Components

### Buttons
- **Shape:** Micro-raio suave de 4px (`rounded-sm` a `rounded-md`).
- **Primary (WhatsApp / Conversão):** Fundo Ouro Champagne (`#C5A880`), texto branco ou linho (`#FAF8F5`), tipografia em caixa alta semi-bold (11px, `tracking-[0.14em]`), padding `8px 16px` a `12px 24px`. No hover, escurece para `#B89758` com suave elevação.
- **Secondary Dark (Ações de Salão / Catálogo):** Fundo Grafite Carvão (`#1E1B19`), texto Linho Nobre (`#FAF8F5`), no hover transita para Ouro Envelhecido (`#785E34`).
- **Ghost Border (Simular Evento / Explorar):** Borda de 1px em Ouro Champanhe (`#C5A880`/60) ou Branco Translúcido, fundo transparente ou vidro fumê com backdrop-blur.

### Cards / Containers
- **Corner Style:** `rounded-sm` (4px).
- **Background:** Linho claro (`#FAF8F5`) com borda perimetral de 1px (`#E8DFD3`).
- **Aspect Ratio Fotográfico:** Proporção `4:3` para espaços e ambientes; `1:1` para gastronomia e doces; `16:9` para cerimônias noturnas.
- **Comportamento Interativo:** Ao hover, zoom sutil da imagem interna (`scale-105`, 700ms) e elevação da sombra para nível ambiente.

### Badges & Chips
- **Estilo:** Pílula arredondada (`rounded-full`) ou retangular com micro-raio (`rounded-xs`), borda delicada de 1px, fundo translúcido em linho ou preto fumê com `backdrop-blur-sm`.
- **Tipografia:** Caixa alta em 10px ou 11px, `tracking-[0.16em]`, peso 600.

### Inputs & Formulários (Simulador de Orçamento)
- **Estilo:** Fundo branco puro (`#FFFFFF`) ou linho suave, borda de 1px em `#E8DFD3`, raio de 4px (`rounded-sm`), padding confortável de 12px 16px.
- **Focus:** Borda transita para `#C5A880` com anel de foco suave em tom champanhe (`ring-1 ring-[#C5A880]/30`).

### Navigation
- **Header Flutuante:** Transição de estado com o scroll — transparente com gradiente escuro no topo da Hero; linho leitoso translúcido (`#FAF8F5`/95 com `backdrop-blur-md`) e borda inferior sutil de 1px ao rolar a página.
- **Links de Navegação:** Caixa alta em 11px, tracking `0.16em`, com linha sublinhada dourada expansiva que cresce do centro para as bordas no hover.

## Do's and Don'ts

### Do:
- **Do** priorizar sempre fotografias reais de celebrações ocorridas no Espaço Lumier (salão, mesas montadas, buffet, iluminação, pista Paris).
- **Do** utilizar a combinação tipográfica Cormorant Garamond nos títulos e Plus Jakarta Sans no corpo de texto.
- **Do** manter os tons de fundo ancorados no bege linho (`#FAF8F5`) e no carvão aquecido (`#1E1B19`).
- **Do** garantir que todos os botões de ação culminem em conexões diretas com o atendimento humano (WhatsApp Concierge ou Simulador de Orçamento).
- **Do** aplicar o divisor dourado com `✦` para separar blocos conceituais de conteúdo.

### Don't:
- **Don't** utilizar preto absoluto (`#000000`) para textos ou fundos, exceto em overlays de modal quando estritamente necessário.
- **Don't** aplicar cores saturadas ou vibrantes (vermelho neon, azul elétrico, verde limão) que firam a elegância atemporal do espaço.
- **Don't** usar sombras duras, opacas ou pretas com alto contraste que pareçam recortes digitais artificiais.
- **Don't** sobrecarregar telas com dourado excessivo; lembre-se da Lumier 10% Gold Rule.
- **Don't** inventar depoimentos ou fotos de banco de imagem quando houver acervo fotográfico autoral disponível.
