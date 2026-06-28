# Documentação

Esta pasta centraliza os documentos de apoio ao projeto `Raízes do Nordeste`.

## Estrutura

- `screenshots/`
  Armazena as capturas reais das telas principais usadas como evidência visual da aplicação.

- `politica-privacidade.md`
  Explica como os dados do usuário são tratados no sistema.

- `termos-de-uso.md`
  Define as condições de uso da aplicação demonstrativa.

- `wireframes.md`
  Reúne capturas reais das principais telas do fluxo e mantém wireframes textuais como apoio.

- `casos-de-uso.md`
  Lista atores, casos de uso e um diagrama textual do sistema.

- `plano-de-testes.md`
  Documenta cenários de teste, resultados esperados e critérios de aceite.

- `lgpd.md`
  Descreve como o sistema atende aos princípios e requisitos da LGPD.

## Objetivo

Os documentos desta pasta servem para:

- orientar evolução funcional e técnica do produto;
- apoiar validação de requisitos;
- registrar decisões de privacidade, uso e qualidade;
- facilitar revisão entre produto, design, desenvolvimento e testes.

## Observação

As páginas legais renderizadas no app seguem o mesmo conteúdo-base de `Política de Privacidade` e `Termos de Uso`, adaptado ao contexto visual da aplicação.

## Referências Técnicas Reais

- Rotas principais: `src/app/router.tsx`
- Estado global e persistência: `src/contexts/AppStateProvider.tsx`
- Banner de cookies: `src/components/CookieBanner/index.tsx`
- Card de produto reutilizável: `src/components/ProductCard/index.tsx`
- Catálogo e imagens dos produtos: `src/data/catalogo.ts`
- Persistência local: `src/hooks/useLocalStorage.ts`
- Chaves atuais de armazenamento: `rnn:v1:app_state` e `rnn:v1:cookie_consent`
