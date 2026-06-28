# Rede Raízes do Nordeste

Aplicação demonstrativa em `React + TypeScript + Vite` com fluxo visual de login, cardápio, produto, carrinho, pagamento, pedido, fidelidade e perfil.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publicação no GitHub Pages

O projeto já está preparado para deploy automático com GitHub Actions:

- workflow em `.github/workflows/deploy-pages.yml`
- base dinâmica do Vite para o nome do repositório
- fallback de SPA para manter rotas bonitas no GitHub Pages

### Passos

1. Crie um repositório no GitHub com o nome `Rede_Raízes_do_Nordeste` ou outro nome que preferir.
2. Envie este projeto para o repositório.
3. No GitHub, abra `Settings -> Pages`.
4. Em `Source`, selecione `GitHub Actions`.
5. Faça push na branch `main` ou `master`.
6. Aguarde o workflow `Deploy GitHub Pages` concluir.

### URL esperada

Se o repositório estiver em `https://github.com/SEU-USUARIO/Rede_Raízes_do_Nordeste`, a aplicação ficará disponível em:

`https://SEU-USUARIO.github.io/Rede_Raízes_do_Nordeste/`
