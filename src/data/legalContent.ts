export type LegalSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export const politicaPrivacidadeContent: {
  title: string
  description: string
  lastUpdated: string
  sections: LegalSection[]
} = {
  title: 'Política de Privacidade',
  description:
    'Este documento explica como os dados pessoais são tratados no fluxo visual do sistema Raízes do Nordeste.',
  lastUpdated: '25/06/2026',
  sections: [
    {
      title: '1. Dados tratados',
      paragraphs: [
        'O sistema pode armazenar localmente nome, email, telefone, endereço, preferências, itens do carrinho e histórico visual do pedido.',
        'Esses dados são usados apenas para simular a experiência do usuário dentro da aplicação.',
      ],
      bullets: [
        'Dados cadastrais preenchidos no login e cadastro',
        'Itens adicionados ao carrinho',
        'Preferências de perfil e aceite de cookies',
        'Histórico visual de fidelidade e pedido atual',
      ],
    },
    {
      title: '2. Finalidade de uso',
      paragraphs: [
        'Os dados são utilizados para viabilizar login visual, exibição do perfil, persistência do carrinho, simulação de pedido, fidelidade e preferências de navegação.',
        'Não há compartilhamento com serviços externos no fluxo atual do projeto.',
      ],
    },
    {
      title: '3. Armazenamento',
      paragraphs: [
        'As informações são persistidas no navegador por meio de LocalStorage, com foco em experiência local e continuidade de navegação.',
        'O usuário pode limpar esses dados removendo o armazenamento do navegador ou utilizando funcionalidades de reset quando disponíveis.',
      ],
    },
    {
      title: '4. Direitos do titular',
      paragraphs: [
        'Mesmo em ambiente de demonstração, o sistema foi pensado para respeitar princípios da LGPD, como transparência, minimização e controle pelo usuário.',
      ],
      bullets: [
        'Visualizar dados preenchidos no perfil',
        'Alterar preferências',
        'Remover dados locais ao limpar o navegador',
      ],
    },
    {
      title: '5. Contato e atualização',
      paragraphs: [
        'Revisões futuras deste documento devem acompanhar a evolução do sistema para backend real, autenticação real e integrações externas.',
      ],
    },
  ],
}

export const termosUsoContent: {
  title: string
  description: string
  lastUpdated: string
  sections: LegalSection[]
} = {
  title: 'Termos de Uso',
  description:
    'Este documento apresenta as condições de uso da aplicação demonstrativa Raízes do Nordeste.',
  lastUpdated: '25/06/2026',
  sections: [
    {
      title: '1. Natureza da aplicação',
      paragraphs: [
        'A aplicação atual possui caráter demonstrativo e apresenta um fluxo visual de compra, autenticação, carrinho, pagamento e acompanhamento de pedido.',
        'Pagamentos, autenticação e processamento de pedidos são simulados, sem execução transacional real.',
      ],
    },
    {
      title: '2. Responsabilidades do usuário',
      paragraphs: [
        'Ao utilizar o sistema, o usuário se compromete a fornecer dados coerentes para fins de navegação e testes locais.',
      ],
      bullets: [
        'Não inserir informações sensíveis reais em ambiente de demonstração',
        'Usar o sistema apenas para navegação, validação e testes',
        'Respeitar as regras de uso e o contexto não produtivo da aplicação',
      ],
    },
    {
      title: '3. Limitações',
      paragraphs: [
        'A aplicação não garante disponibilidade contínua, persistência entre dispositivos nem validade jurídica de qualquer simulação apresentada.',
        'Resultados visuais de pagamento, pedido e fidelidade não geram obrigações comerciais reais.',
      ],
    },
    {
      title: '4. Propriedade e conteúdo',
      paragraphs: [
        'Layout, textos, estrutura de navegação e documentação pertencem ao projeto e devem ser mantidos conforme as diretrizes definidas para evolução do produto.',
      ],
    },
    {
      title: '5. Alterações',
      paragraphs: [
        'Os termos podem ser ajustados sempre que o fluxo funcional, a política de dados ou a arquitetura do sistema forem revisados.',
      ],
    },
  ],
}
