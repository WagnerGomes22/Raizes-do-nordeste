import { usuarios as usuariosMock } from '@/mocks/usuarios.js'

export const usuarios = [...usuariosMock]

export function obterUsuarioPorId(usuarioId: string | null) {
  if (!usuarioId) return null
  return usuarios.find((usuario) => usuario.id === usuarioId) ?? null
}

export function obterUsuarioPorEmail(email: string) {
  return usuarios.find((usuario) => usuario.email.toLowerCase() === email.toLowerCase()) ?? null
}

export function criarPerfilMock(payload: {
  nome: string
  email: string
  telefone: string
  endereco: string
}) {
  return {
    nome: payload.nome,
    email: payload.email,
    telefone: payload.telefone,
    endereco: payload.endereco,
    preferencias: {
      recebeOfertas: true,
      retiradaRapida: false,
      notificacoesPedido: true,
    },
  }
}
