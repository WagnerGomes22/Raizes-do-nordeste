# Casos de Uso

## 1. Atores

- Visitante
- Cliente
- Administrador do produto

## 2. Casos de uso principais

### Visitante

- visualizar home;
- navegar pelo cardápio;
- visualizar detalhes do produto;
- ler política de privacidade e termos de uso;
- aceitar cookies;
- criar conta visualmente.

### Cliente

- fazer login visual;
- adicionar produtos ao carrinho;
- alterar quantidades;
- simular pagamento;
- acompanhar pedido;
- consultar fidelidade;
- editar perfil.

### Administrador do produto

- revisar documentos do projeto;
- validar fluxo funcional;
- atualizar conteúdos legais e documentação.

## 3. Diagrama textual

```text
Visitante
   |--> Visualizar Home
   |--> Aceitar Cookies
   |--> Ler Política de Privacidade
   |--> Ler Termos de Uso
   |--> Navegar no Cardápio
   |--> Ver Produto
   |--> Criar Conta

Cliente
   |--> Fazer Login
   |--> Adicionar ao Carrinho
   |--> Ajustar Quantidade
   |--> Finalizar Pedido
   |--> Escolher Pagamento
   |--> Simular Pagamento
   |--> Acompanhar Pedido
   |--> Consultar Fidelidade
   |--> Atualizar Perfil

Administrador do produto
   |--> Revisar Documentação
   |--> Validar Casos de Uso
   |--> Atualizar Regras Legais
```

## 4. Relacionamentos relevantes

- `Visualizar Home` antecede `Navegar no Cardápio`.
- `Navegar no Cardápio` antecede `Ver Produto`.
- `Ver Produto` pode levar a `Adicionar ao Carrinho`.
- `Adicionar ao Carrinho` antecede `Finalizar Pedido`.
- `Escolher Pagamento` antecede `Simular Pagamento`.
- `Simular Pagamento` antecede `Acompanhar Pedido`.
- `Acompanhar Pedido` pode gerar pontos em `Consultar Fidelidade`.
