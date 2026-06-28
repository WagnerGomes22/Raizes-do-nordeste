import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppState } from '@/contexts/useAppState'
import {
  calcularTotalCarrinho,
  formatarMoeda,
  obterImagemProduto,
  obterProdutoPorId,
} from '@/data/catalogo'

const metodos = [
  { id: 'pix', titulo: 'Pix', descricao: 'Pagamento instantaneo com confirmacao visual.' },
  { id: 'cartao', titulo: 'Cartao', descricao: 'Simulacao de pagamento aprovado no cartao.' },
  { id: 'dinheiro', titulo: 'Dinheiro', descricao: 'Pagamento na retirada ou entrega.' },
] as const

export default function PagamentoPage() {
  const navigate = useNavigate()
  const { state, finalizePedido, setFormaPagamento } = useAppState()
  const total = calcularTotalCarrinho(state.carrinho)

  useEffect(() => {
    if (state.carrinho.length === 0 && state.pedidoAtual) {
      navigate('/pedido', { replace: true })
    }
  }, [navigate, state.carrinho.length, state.pedidoAtual])

  function handleFinalizar() {
    finalizePedido()
  }

  if (state.carrinho.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Nenhum item para pagar</h1>
        <Link
          to="/cardapio"
          className="mt-4 inline-flex rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white"
        >
          Ir para o cardapio
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
      <section className="space-y-4">
        <div className="text-xs text-slate-500">
          <Link to="/" className="text-amber-700 hover:underline">
            Home
          </Link>{' '}
          <span className="text-slate-400">/</span>{' '}
          <Link to="/carrinho" className="text-amber-700 hover:underline">
            Carrinho
          </Link>{' '}
          <span className="text-slate-400">/</span> Pagamento
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Pagamento</h1>
          <p className="mt-2 text-sm text-slate-600">
            Fluxo visual com resumo do pedido e simulacao de pagamento aprovado.
          </p>
        </div>

        <div className="grid gap-4">
          {metodos.map((metodo) => (
            <button
              key={metodo.id}
              type="button"
              onClick={() => setFormaPagamento(metodo.id)}
              className={`rounded-2xl border p-5 text-left shadow-sm transition-colors ${
                state.formaPagamentoSelecionada === metodo.id
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="text-lg font-semibold text-slate-900">{metodo.titulo}</div>
              <div className="mt-1 text-sm text-slate-600">{metodo.descricao}</div>
            </button>
          ))}
        </div>
      </section>

      <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">Resumo do pedido</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            Metodo selecionado: {state.formaPagamentoSelecionada}
          </h2>
        </div>

        <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
          {state.carrinho.map((item) => {
            const produto = obterProdutoPorId(item.produtoId)
            if (!produto) return null

            return (
              <div
                key={item.produtoId}
                className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={obterImagemProduto(item.produtoId, 'square')}
                    alt={produto.nome}
                    className="h-14 w-14 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <span className="text-slate-600">
                    {item.quantidade}x {produto.nome}
                  </span>
                </div>
                <span className="font-medium text-slate-900">
                  {formatarMoeda(produto.precoCentavos * item.quantidade)}
                </span>
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Total</span>
          <span className="text-xl font-semibold text-slate-900">{formatarMoeda(total)}</span>
        </div>

        <button
          type="button"
          onClick={handleFinalizar}
          className="inline-flex w-full items-center justify-center rounded-xl bg-amber-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700"
        >
          Simular pagamento aprovado
        </button>
      </aside>
    </div>
  )
}
