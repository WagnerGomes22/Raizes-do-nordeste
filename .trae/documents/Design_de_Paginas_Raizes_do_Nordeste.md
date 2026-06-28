# Design de Páginas — Raízes do Nordeste (Desktop-first)

## Global Styles (tokens)
- Background: `slate-50`
- Texto: `slate-900`
- Cor de marca (accent): `amber-600` (hover `amber-700`)
- Tipografia: base `text-base`, títulos `text-2xl/3xl` com `font-semibold`
- Botões: primário `bg-amber-600 text-white rounded-lg px-4 py-2 hover:bg-amber-700 focus:ring-2`
- Links: `text-amber-700 hover:underline`

## Layout (responsivo)
- Desktop-first com container central (`max-w-6xl mx-auto px-6`).
- Layout híbrido: app shell em Flex (Header/Body/Footer) + grids para cards.
- Breakpoints: em telas menores, reduzir padding e colapsar navegação para lista vertical.

---

## Página: Inicial (/)
### Meta Information
- Title: "Raízes do Nordeste"
- Description: "Projeto base React + Vite + Tailwind para o Raízes do Nordeste."
- Open Graph: `og:title`, `og:description`, `og:type=website`

### Page Structure
- Estrutura em seções empilhadas (stacked sections): Hero → Área de Demonstração (estado) → Rodapé.

### Sections & Components
1. Header
   - Logotipo/nome do projeto à esquerda.
   - Navegação à direita: links para "Início" e "Exemplo" (estado ativo destacado).
2. Hero
   - Título principal + subtítulo curto.
   - CTA primário: "Ir para Exemplo".
3. Demonstração (Context + LocalStorage)
   - Card com:
     - Label do estado atual (ex.: preferência ligada/desligada).
     - Botão para alternar estado.
     - Texto auxiliar indicando que o valor persiste após recarregar.
4. Footer
   - Linha simples com copyright e link para Home.

---

## Página: Exemplo (/exemplo)
### Meta Information
- Title: "Exemplo — Raízes do Nordeste"
- Description: "Página interna para validar roteamento e componentes."

### Page Structure
- Duas colunas no desktop:
  - Coluna esquerda: conteúdo textual.
  - Coluna direita: painel/preview com cards.

### Sections & Components
1. Breadcrumb/Topo
   - Link de volta para "Início".
2. Conteúdo
   - Bloco de texto explicando propósito da página (roteamento + estado global).
3. Painel de Estado
   - Repetir o mesmo controle de alternância do Context.
   - Mostrar também a chave de armazenamento (somente exibida como texto, sem editar).

---

## Página: 404 (/*)
### Meta Information
- Title: "Página não encontrada — Raízes do Nordeste"
- Description: "Rota inválida."

### Page Structure
- Centralizado (flex) com card.

### Sections & Components
- Mensagem "404" + explicação curta.
- Botão/link "Voltar para a Página Inicial".
