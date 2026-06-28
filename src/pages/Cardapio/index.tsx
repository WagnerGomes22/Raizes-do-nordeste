import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import ProductCard from '@/components/ProductCard'
import { useAppState } from '@/contexts/useAppState'
import { categorias, listarProdutos } from '@/data/catalogo'

export default function CardapioPage() {
  const { addToCart, state } = useAppState()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoriaAtual = searchParams.get('categoria') ?? 'todas'
  const [busca, setBusca] = useState('')

  const produtosFiltrados = useMemo(
    () => listarProdutos(categoriaAtual, busca),
    [busca, categoriaAtual],
  )

  function atualizarCategoria(categoriaId: string) {
    const next = new URLSearchParams(searchParams)
    if (categoriaId === 'todas') next.delete('categoria')
    else next.set('categoria', categoriaId)
    setSearchParams(next)
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="text-xs text-slate-500">
              <Link to="/" className="text-amber-700 hover:underline">
                Home
              </Link>{' '}
              <span className="text-slate-400">/</span> Cardapio
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Cardapio</h1>
            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
              Use busca, filtre por categoria e adicione itens ao carrinho.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Carrinho com {state.carrinho.length} tipo(s) de produto.
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <input
              type="search"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Buscar por nome, descricao ou tag"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
            />
            <Link
              to="/carrinho"
              className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700"
            >
              Ver carrinho
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => atualizarCategoria('todas')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                categoriaAtual === 'todas'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todas
            </button>
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                type="button"
                onClick={() => atualizarCategoria(categoria.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  categoriaAtual === categoria.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {categoria.nome}
              </button>
            ))}
          </div>
        </div>

        {produtosFiltrados.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
            Nenhum produto encontrado para os filtros aplicados.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {produtosFiltrados.map((produto) => (
              <ProductCard
                key={produto.id}
                produto={produto}
                onAddToCart={(produtoId) => addToCart(produtoId, 1)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
