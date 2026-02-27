# Design Doc: BoilerGuh WebApp Evolution

**Data:** 2026-02-27
**Status:** Aprovado ✅
**Autor:** Antigravity (AI)

## 1. Visão Geral
Transformar o cardápio estático do BoilerGuh em uma WebApp interativa e escalável, focada em alta performance para conexões lentas e preparada para integração futura com sistemas de PDV e gestão de pedidos.

## 2. Objetivos
- **UX Premium:** Interface fluida com visual Sunset/Glassmorphism.
- **Funcionalidades:** 
    - Busca em tempo real e categorias.
    - Carrinho de compras com soma automática.
    - Identificação do cliente (Nome/Mesa).
    - Envio de pedido formatado via WhatsApp.
- **Escalabilidade:** Estrutura pronta para migrar de arquivos estáticos para banco de dados real.

## 3. Arquitetura Técnica
- **Core:** Vite + React + TypeScript.
- **Estilização:** Vanilla CSS Moderno (CSS Variables, Flexbox/Grid, Glassmorphism).
- **Gestão de Estado:** React Context API para o Carrinho.
- **Dados:** Arquivo `src/data/products.ts` (Single Source of Truth).
- **Performance:** 
    - Bundling otimizado via Vite.
    - Lazy loading de imagens de drinks.
    - Componentes atômicos para renderização eficiente.

## 4. UI/UX Design
### 4.1 Identidade Visual
- Manter paleta Sunset: `#FF8C42` (Accent), `#2D1B33` (Dark Purple), `#0f0f0f` (Night).
- Efeito Glassmorphism em cartões e modais.
- Tipografia: Inter (com pesos variados para hierarquia).

### 4.2 Fluxo do Usuário
1. **Entrada:** Loader suave -> Menu Principal.
2. **Exploração:** Barra de busca fixa ou navegação por categorias (chips).
3. **Seleção:** Clicar no item abre detalhes ou adiciona direto ao carrinho.
4. **Carrinho:** Drawer ou Página dedicada mostrando itens, quantidades e total.
5. **Finalização:** Modal de identificação -> Botão "Confirmar Pedido" -> WhatsApp Redirect.

## 5. Estrutura de Pedido (WhatsApp)
Formato da mensagem enviada ao bar:
```text
🧾 PEDIDO #ORDEM - BOILER GUH
---------------------------
Cliente: [NOME]
Mesa: [MESA]
---------------------------
ITENS:
- 1x Drink Tal (R$ 30,00)
- 2x Combo X (R$ 600,00)
---------------------------
TOTAL: R$ 630,00
---------------------------
Obrigado! 🍹
```

## 6. Próximos Passos (Plano de Implementação)
1. Instalação e Configuração do ambiente Vite na pasta `webapp/`.
2. Modelagem dos dados de produtos.
3. Criação dos componentes base (Header, Layout, Card).
4. Implementação da lógica do Carrinho.
5. Implementação da Busca e Filtros.
6. Finalização e Integração com WhatsApp.

---
*Este documento serve como guia para a implementação da nova WebApp do BoilerGuh.*
