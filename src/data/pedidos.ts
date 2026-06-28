import { pedidos as pedidosMock } from '@/mocks/pedidos.js'

export const pedidos = [...pedidosMock]

export const fluxoPedido = ['recebido', 'preparo', 'pronto', 'finalizado'] as const

export type FluxoPedidoStatus = (typeof fluxoPedido)[number]

export const fluxoPedidoLabel: Record<FluxoPedidoStatus, string> = {
  recebido: 'Pedido Recebido',
  preparo: 'Em Preparo',
  pronto: 'Pronto para Retirada',
  finalizado: 'Finalizado',
}

export const statusPedidoLabel: Record<string, string> = {
  paid: 'Pago',
  preparing: 'Em preparo',
  ready: 'Pronto',
  delivered: 'Entregue',
  canceled: 'Cancelado',
  recebido: fluxoPedidoLabel.recebido,
  preparo: fluxoPedidoLabel.preparo,
  pronto: fluxoPedidoLabel.pronto,
  finalizado: fluxoPedidoLabel.finalizado,
}
