import { createContext } from 'react'

import type { AppState } from '@/contexts/appStateTypes'

type RegisterInput = {
  nome: string
  email: string
  telefone: string
  endereco: string
  aceitouLgpd: boolean
}

export type AppStateContextValue = {
  state: AppState
  storageKey: string
  feedbackMessage: string | null
  toggleOfertas: () => void
  setOfertasAtivas: (value: boolean) => void
  login: (email: string) => void
  register: (input: RegisterInput) => void
  logout: () => void
  addToCart: (produtoId: string, quantidade?: number) => void
  updateCartItem: (produtoId: string, quantidade: number) => void
  removeFromCart: (produtoId: string) => void
  clearCart: () => void
  setFormaPagamento: (value: AppState['formaPagamentoSelecionada']) => void
  finalizePedido: () => string | null
  advancePedidoStatus: () => void
  updatePerfil: (value: Partial<AppState['perfil']>) => void
  togglePreferencia: (key: keyof AppState['perfil']['preferencias']) => void
  redeemReward: (rewardId: string, custoPontos: number, titulo: string) => boolean
  clearFeedback: () => void
  reset: () => void
}

export const AppStateContext = createContext<AppStateContextValue | null>(null)
