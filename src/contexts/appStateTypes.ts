export const APP_STATE_STORAGE_KEY = 'rnn:v1:app_state'

export type PaymentMethod = 'pix' | 'cartao' | 'dinheiro'

export type CartItem = {
  produtoId: string
  quantidade: number
}

export type PedidoStatus = 'recebido' | 'preparo' | 'pronto' | 'finalizado'

export type PedidoAtual = {
  id: string
  status: PedidoStatus
  formaPagamento: PaymentMethod
  criadoEm: string
  itens: CartItem[]
  totalCentavos: number
}

export type PerfilState = {
  nome: string
  email: string
  telefone: string
  endereco: string
  preferencias: {
    recebeOfertas: boolean
    retiradaRapida: boolean
    notificacoesPedido: boolean
  }
}

export type FidelidadeState = {
  pontos: number
  historico: Array<{
    id: string
    tipo: 'credito' | 'resgate'
    descricao: string
    pontos: number
    data: string
  }>
  recompensasResgatadas: string[]
}

export type AppState = {
  ofertasAtivas: boolean
  usuarioLogadoId: string | null
  cadastroAceitoLgpd: boolean
  carrinho: CartItem[]
  formaPagamentoSelecionada: PaymentMethod
  pedidoAtual: PedidoAtual | null
  perfil: PerfilState
  fidelidade: FidelidadeState
}

export const defaultAppState: AppState = {
  ofertasAtivas: true,
  usuarioLogadoId: null,
  cadastroAceitoLgpd: false,
  carrinho: [],
  formaPagamentoSelecionada: 'pix',
  pedidoAtual: null,
  perfil: {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    preferencias: {
      recebeOfertas: true,
      retiradaRapida: false,
      notificacoesPedido: true,
    },
  },
  fidelidade: {
    pontos: 240,
    historico: [],
    recompensasResgatadas: [],
  },
}

