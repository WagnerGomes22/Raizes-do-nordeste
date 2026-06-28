import { Link } from 'react-router-dom'

import { useAppState } from '@/contexts/useAppState'
import {
  calcularQuantidadeCarrinho,
  calcularTotalCarrinho,
  formatarMoeda,
  obterImagemProduto,
  obterProdutoPorId,
} from '@/data/catalogo'

export default function CarrinhoPage() {
  const { state, removeFromCart, updateCartItem } = useAppState()
  const totalCentavos = calcularTotalCarrinho(state.carrinho)
  const quantidadeTotal = calcularQuantidadeCarrinho(state.carrinho)

  return (
    <div className="grid gap-8 xl:grid-cols-[1.3fr_0.8fr]">
      <section className="space-y-4">
        <div className="text-xs text-slate-500">
          <Link to="/" className="text-amber-700 hover:underline">
            Home
          </Link>{' '}
          <span className="text-slate-400">/</span> Carrinho
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Carrinho</h1>
          <p className="mt-2 text-sm text-slate-600">
            Revise os produtos adicionados antes de seguir para o pagamento.
          </p>
        </div>

        {state.carrinho.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <div className="text-lg font-medium text-slate-900">Seu carrinho esta vazio.</div>
            <Link
              to="/cardapio"
              className="mt-4 inline-flex rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white"
            >
              Ir para o cardapio
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {state.carrinho.map((item) => {
              const produto = obterProdutoPorId(item.produtoId)
              if (!produto) return null

              return (
                <article
                  key={item.produtoId}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <img
                        src={obterImagemProduto(item.produtoId, 'square')}
                        alt={produto.nome}
                        className="h-24 w-24 rounded-2xl object-cover"
                        loading="lazy"
                      />
                      <div>
                      <h2 className="text-lg font-semibold text-slate-900">{produto.nome}</h2>
                      <p className="mt-1 text-sm text-slate-600">{produto.descricao}</p>
                      <div className="mt-3 text-sm font-medium text-slate-900">
                        {formatarMoeda(produto.precoCentavos)}
                      </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartItem(item.produtoId, Math.max(1, item.quantidade - 1))
                          }
                          className="inline-flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white"
                        >
                          -
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold text-slate-900">
                          {item.quantidade}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartItem(item.produtoId, item.quantidade + 1)}
                          className="inline-flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.produtoId)}
                        className="text-sm font-medium text-rose-600 hover:underline"
                      >
                        Remover item
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs uppercase tracking-wide text-slate-500">Resumo</div>
        <div className="mt-3 space-y-3 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Itens</span>
            <span>{quantidadeTotal}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total</span>
            <span className="text-lg font-semibold text-slate-900">
              {formatarMoeda(totalCentavos)}
            </span>
          </div>
        </div>

        <Link
          to={state.carrinho.length > 0 ? '/pagamento' : '/cardapio'}
          className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
            state.carrinho.length > 0
              ? 'bg-amber-600 text-white hover:bg-amber-700'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {state.carrinho.length > 0 ? 'Finalizar pedido' : 'Escolher produtos'}
        </Link>
      </aside>
    </div>
  )
}
