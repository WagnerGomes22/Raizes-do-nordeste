# LGPD

## 1. Contexto

O sistema `Raízes do Nordeste` foi estruturado para demonstrar um fluxo visual de compra com persistência local no navegador. Mesmo sem backend real, o projeto considera princípios da Lei Geral de Proteção de Dados Pessoais (LGPD).

## 2. Dados pessoais tratados

No fluxo atual, o sistema pode tratar:

- nome;
- email;
- telefone;
- endereço;
- preferências de navegação;
- dados de carrinho;
- histórico visual de pedido e fidelidade.

## 3. Medidas adotadas

- uso de `LocalStorage` para persistência local controlada;
- uso das chaves `rnn:v1:app_state` e `rnn:v1:cookie_consent` para persistir estado do app e consentimento;
- separação de regras de negócio e conteúdo legal;
- ausência de segredos no código;
- transparência em política e termos;
- aceite visual relacionado a cadastro e cookies.

## 4. Princípios considerados

- finalidade: os dados são usados para sustentar o fluxo demonstrativo;
- adequação: o tratamento está alinhado à experiência oferecida no app;
- necessidade: são mantidos apenas dados úteis ao cenário visual;
- transparência: o usuário pode consultar páginas legais e ver suas informações no perfil;
- segurança: o projeto evita armazenamento sensível fora de locais apropriados.

## 5. Lacunas para evolução futura

Quando houver backend real, o sistema deve avançar em:

- consentimento formal mais detalhado;
- gestão de retenção de dados;
- exclusão estruturada;
- trilha de auditoria;
- integração com políticas reais de segurança e governança.

## 6. Relação com o projeto atual

As implementações de `Política de Privacidade`, `Termos de Uso` e `Banner de Cookies` dão suporte à transparência e à comunicação com o usuário. No código atual, isso aparece principalmente em `src/components/CookieBanner/index.tsx`, `src/contexts/AppStateProvider.tsx` e `src/hooks/useLocalStorage.ts`, mas não substitui adequações jurídicas e técnicas adicionais para ambiente produtivo.
