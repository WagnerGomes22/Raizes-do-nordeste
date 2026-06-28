# Plano de Testes

## 1. Objetivo

Validar o fluxo visual principal da aplicação, a persistência local e a navegação entre telas.

## 2. Escopo

- login e cadastro;
- banner de cookies;
- cardápio e produto;
- carrinho e pagamento;
- pedido, fidelidade e perfil;
- páginas legais e links no rodapé.

## 3. Cenários de teste

| ID | Cenário | Passos | Resultado esperado |
|----|---------|--------|--------------------|
| CT-01 | Aceitar cookies | Abrir o app e clicar em `Aceitar` | Banner some e permanece oculto em novas navegações |
| CT-02 | Navegação legal | Abrir links de política e termos | Rotas corretas e conteúdo renderizado |
| CT-03 | Login visual | Preencher email e senha válidos | Usuário é redirecionado para a home |
| CT-04 | Cadastro visual | Preencher dados, confirmar senha e aceitar LGPD | Conta visual é criada e navegação segue para home |
| CT-05 | Busca no cardápio | Pesquisar por termo existente | Lista filtrada mostra produtos compatíveis |
| CT-06 | Filtro por categoria | Selecionar categoria | Apenas produtos da categoria permanecem visíveis |
| CT-07 | Adicionar ao carrinho | Clicar em `Adicionar` | Item entra no carrinho e aviso visual aparece |
| CT-08 | Persistência do carrinho | Recarregar a página após adicionar item | Itens continuam no carrinho |
| CT-09 | Pagamento simulado | Selecionar método e confirmar | Pedido é criado visualmente |
| CT-10 | Acompanhamento do pedido | Avançar status do pedido | Status progride até `Finalizado` |
| CT-11 | Fidelidade | Finalizar pedido e abrir fidelidade | Pontos/histórico refletem o fluxo |
| CT-12 | Perfil | Alterar dados e salvar | Dados ficam persistidos localmente |

## 4. Execução Realizada

Execução manual revisada no fluxo local do projeto, com apoio de navegador real e validação da build.

| ID | Status | Observação |
|----|--------|------------|
| CT-01 | Aprovado | O banner some após `Aceitar` e permanece oculto em novos acessos. |
| CT-02 | Aprovado | `Política de Privacidade` e `Termos de Uso` abriram nas rotas corretas. |
| CT-03 | Aprovado | O login redirecionou para a home e atualizou o cabeçalho. |
| CT-04 | Aprovado | O cadastro com LGPD aceito criou a conta visualmente e levou para a home. |
| CT-05 | Aprovado | A busca por `cartola` filtrou corretamente o cardápio. |
| CT-06 | Aprovado | O filtro `Bebidas` deixou visíveis apenas os itens da categoria. |
| CT-07 | Aprovado | O item entrou no carrinho e o aviso visual apareceu. |
| CT-08 | Aprovado | O carrinho persistiu após refresh da página. |
| CT-09 | Aprovado | O pagamento simulado criou o pedido e redirecionou automaticamente para `/pedido`. |
| CT-10 | Aprovado | O status avançou até `Finalizado`. |
| CT-11 | Aprovado | A fidelidade refletiu o pedido concluído no saldo e no histórico. |
| CT-12 | Aprovado | O perfil salvou os dados e manteve o estado após refresh. |

## 5. Critérios de aceite

- navegação sem necessidade de refresh manual;
- ausência de erros bloqueantes em build;
- persistência local funcionando para estado principal;
- links legais acessíveis no banner de cookies e no rodapé;
- fluxo visual de pedido completo funcionando.

## 6. Evidências sugeridas

- captura de tela das telas principais;
- registro do resultado do `npm run build`;
- validação manual do fluxo completo;
- conferência visual do banner de cookies.
