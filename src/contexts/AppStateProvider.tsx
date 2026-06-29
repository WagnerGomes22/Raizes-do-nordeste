import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { AppStateContext } from '@/contexts/appStateContext'
import {
  APP_STATE_STORAGE_KEY,
  defaultAppState,
  type AppState,
} from '@/contexts/appStateTypes'
import { calcularTotalCarrinho, obterProdutoPorId } from '@/data/catalogo'
import { historicoFidelidadeInicial } from '@/data/fidelidade'
import { fluxoPedido } from '@/data/pedidos'
import { criarPerfilMock, obterUsuarioPorEmail, usuarios } from '@/data/usuarios'
import { useLocalStorage } from '@/hooks/useLocalStorage'

function mergeAppStateWithDefaults(
  state: Partial<AppState> | null | undefined,
  initialState: AppState,
): AppState {
  const perfil = state?.perfil
  const fidelidade = state?.fidelidade

  return {
    ...initialState,
    ...state,
    perfil: {
      ...initialState.perfil,
      ...perfil,
      preferencias: {
        ...initialState.perfil.preferencias,
        ...perfil?.preferencias,
      },
    },
    fidelidade: {
      ...initialState.fidelidade,
      ...fidelidade,
      historico: fidelidade?.historico ?? initialState.fidelidade.historico,
      recompensasResgatadas:
        fidelidade?.recompensasResgatadas ?? initialState.fidelidade.recompensasResgatadas,
    },
  }
}

function hasMissingAppStateFields(state: Partial<AppState> | null | undefined) {
  if (!state) return true

  return (
    !state.perfil ||
    !state.perfil.preferencias ||
    !state.fidelidade ||
    typeof state.fidelidade.pontos !== 'number' ||
    !Array.isArray(state.fidelidade.historico) ||
    !Array.isArray(state.fidelidade.recompensasResgatadas)
  )
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const feedbackTimeoutRef = useRef<number | null>(null)
  const initialState = useMemo<AppState>(() => {
    const usuarioInicial = usuarios[0] ?? null

    return {
      ...defaultAppState,
      perfil: usuarioInicial
        ? {
            nome: usuarioInicial.nome,
            email: usuarioInicial.email,
            telefone: usuarioInicial.telefone,
            endereco: 'Rua das Palmeiras, 123 - Meireles, Fortaleza',
            preferencias: {
              recebeOfertas: true,
              retiradaRapida: false,
              notificacoesPedido: true,
            },
          }
        : defaultAppState.perfil,
      fidelidade: {
        ...defaultAppState.fidelidade,
        historico: historicoFidelidadeInicial,
      },
    }
  }, [])

  const { value: state, setValue: setState, remove } = useLocalStorage<AppState>(
    APP_STATE_STORAGE_KEY,
    initialState,
  )
  const normalizedState = useMemo(
    () => mergeAppStateWithDefaults(state, initialState),
    [initialState, state],
  )

  useEffect(() => {
    if (hasMissingAppStateFields(state)) {
      setState(normalizedState)
    }
  }, [normalizedState, setState, state])

  const clearFeedback = useCallback(() => {
    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current)
      feedbackTimeoutRef.current = null
    }

    setFeedbackMessage(null)
  }, [])

  const showFeedback = useCallback(
    (message: string) => {
      clearFeedback()
      setFeedbackMessage(message)

      feedbackTimeoutRef.current = window.setTimeout(() => {
        setFeedbackMessage(null)
        feedbackTimeoutRef.current = null
      }, 2400)
    },
    [clearFeedback],
  )

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current)
      }
    }
  }, [])

  const value = useMemo(() => {
    const updateState = (
      valueOrUpdater: AppState | ((prev: AppState) => AppState),
    ) => {
      setState((prev) => {
        const safePrev = mergeAppStateWithDefaults(prev, initialState)
        const next =
          valueOrUpdater instanceof Function ? valueOrUpdater(safePrev) : valueOrUpdater

        return mergeAppStateWithDefaults(next, initialState)
      })
    }

    return {
      state: normalizedState,
      storageKey: APP_STATE_STORAGE_KEY,
      feedbackMessage,
      toggleOfertas: () =>
        updateState((prev) => ({ ...prev, ofertasAtivas: !prev.ofertasAtivas })),
      setOfertasAtivas: (ofertasAtivas: boolean) =>
        updateState((prev) => ({ ...prev, ofertasAtivas })),
      login: (email: string) =>
        updateState((prev) => {
          const usuario = obterUsuarioPorEmail(email)
          if (!usuario) {
            return {
              ...prev,
              usuarioLogadoId: 'local-session',
              perfil: {
                ...prev.perfil,
                email,
              },
            }
          }

          return {
            ...prev,
            usuarioLogadoId: usuario.id,
            perfil: {
              ...prev.perfil,
              nome: usuario.nome,
              email: usuario.email,
              telefone: usuario.telefone,
            },
          }
        }),
      register: (input) =>
        updateState((prev) => ({
          ...prev,
          usuarioLogadoId: `cad-${Date.now()}`,
          cadastroAceitoLgpd: input.aceitouLgpd,
          perfil: {
            ...criarPerfilMock(input),
            preferencias: prev.perfil.preferencias,
          },
        })),
      logout: () =>
        updateState((prev) => ({
          ...prev,
          usuarioLogadoId: null,
        })),
      addToCart: (produtoId: string, quantidade = 1) => {
        const produto = obterProdutoPorId(produtoId)
        const quantidadeLabel = quantidade > 1 ? `${quantidade}x ` : ''

        updateState((prev) => {
          const itemAtual = prev.carrinho.find((item) => item.produtoId === produtoId)

          if (itemAtual) {
            return {
              ...prev,
              carrinho: prev.carrinho.map((item) =>
                item.produtoId === produtoId
                  ? { ...item, quantidade: item.quantidade + quantidade }
                  : item,
              ),
            }
          }

          return {
            ...prev,
            carrinho: [...prev.carrinho, { produtoId, quantidade }],
          }
        })

        showFeedback(
          `${quantidadeLabel}${produto?.nome ?? 'Produto'} adicionado ao pedido.`,
        )
      },
      updateCartItem: (produtoId: string, quantidade: number) =>
        updateState((prev) => ({
          ...prev,
          carrinho:
            quantidade <= 0
              ? prev.carrinho.filter((item) => item.produtoId !== produtoId)
              : prev.carrinho.map((item) =>
                  item.produtoId === produtoId ? { ...item, quantidade } : item,
                ),
        })),
      removeFromCart: (produtoId: string) =>
        updateState((prev) => ({
          ...prev,
          carrinho: prev.carrinho.filter((item) => item.produtoId !== produtoId),
        })),
      clearCart: () =>
        updateState((prev) => ({
          ...prev,
          carrinho: [],
        })),
      setFormaPagamento: (formaPagamentoSelecionada) =>
        updateState((prev) => ({
          ...prev,
          formaPagamentoSelecionada,
        })),
      finalizePedido: () => {
        const pedidoId = `PED-${Date.now()}`
        let created = false

        updateState((prev) => {
          if (prev.carrinho.length === 0) return prev

          created = true
          const totalCentavos = calcularTotalCarrinho(prev.carrinho)
          const pontosGanhos = Math.floor(totalCentavos / 100)

          return {
            ...prev,
            pedidoAtual: {
              id: pedidoId,
              status: fluxoPedido[0],
              formaPagamento: prev.formaPagamentoSelecionada,
              criadoEm: new Date().toISOString(),
              itens: prev.carrinho,
              totalCentavos,
            },
            carrinho: [],
            fidelidade: {
              ...prev.fidelidade,
              pontos: prev.fidelidade.pontos + pontosGanhos,
              historico: [
                {
                  id: `fid-${Date.now()}`,
                  tipo: 'credito',
                  descricao: `Pedido ${pedidoId}`,
                  pontos: pontosGanhos,
                  data: new Date().toISOString(),
                },
                ...prev.fidelidade.historico,
              ],
            },
          }
        })

        return created ? pedidoId : null
      },
      advancePedidoStatus: () =>
        updateState((prev) => {
          if (!prev.pedidoAtual) return prev

          const indiceAtual = fluxoPedido.indexOf(prev.pedidoAtual.status)
          const proximoStatus =
            indiceAtual >= 0 && indiceAtual < fluxoPedido.length - 1
              ? fluxoPedido[indiceAtual + 1]
              : prev.pedidoAtual.status

          return {
            ...prev,
            pedidoAtual: {
              ...prev.pedidoAtual,
              status: proximoStatus,
            },
          }
        }),
      updatePerfil: (perfilAtualizado) =>
        updateState((prev) => ({
          ...prev,
          perfil: {
            ...prev.perfil,
            ...perfilAtualizado,
            preferencias: {
              ...prev.perfil.preferencias,
              ...perfilAtualizado.preferencias,
            },
          },
        })),
      togglePreferencia: (key) =>
        updateState((prev) => ({
          ...prev,
          perfil: {
            ...prev.perfil,
            preferencias: {
              ...prev.perfil.preferencias,
              [key]: !prev.perfil.preferencias[key],
            },
          },
        })),
      redeemReward: (rewardId: string, custoPontos: number, titulo: string) => {
        let success = false

        updateState((prev) => {
          if (prev.fidelidade.pontos < custoPontos) return prev

          success = true

          return {
            ...prev,
            fidelidade: {
              ...prev.fidelidade,
              pontos: prev.fidelidade.pontos - custoPontos,
              recompensasResgatadas: [...prev.fidelidade.recompensasResgatadas, rewardId],
              historico: [
                {
                  id: `fid-${Date.now()}`,
                  tipo: 'resgate',
                  descricao: `Resgate ${titulo}`,
                  pontos: -custoPontos,
                  data: new Date().toISOString(),
                },
                ...prev.fidelidade.historico,
              ],
            },
          }
        })

        return success
      },
      clearFeedback,
      reset: remove,
    }
  }, [clearFeedback, feedbackMessage, initialState, normalizedState, remove, setState, showFeedback])

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}
