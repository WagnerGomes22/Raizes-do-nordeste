import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useAppState } from '@/contexts/useAppState'
import {
  formatarMoeda,
  obterCategoriaLabel,
  obterImagemProduto,
  obterProdutoPlaceholder,
  obterProdutoPorId,
} from '@/data/catalogo'

export default function ProdutoPage() {
  const navigate = useNavigate()
  const { produtoId } = useParams()
  const { addToCart } = useAppState()
  const [quantidade, setQuantidade] = useState(1)
  const produto = obterProdutoPorId(produtoId ?? '')

  if (!produto) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Produto nao encontrado</h1>
        <Link
          to="/cardapio"
          className="mt-4 inline-flex rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white"
        >
          Voltar ao cardapio
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <section className="space-y-4">
        <div className="text-xs text-slate-500">
          <Link to="/" className="text-amber-700 hover:underline">
            Home
          </Link>{' '}
          <span className="text-slate-400">/</span>{' '}
          <Link to="/cardapio" className="text-amber-700 hover:underline">
            Cardapio
          </Link>{' '}
          <span className="text-slate-400">/</span> Produto
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm">
          <img
            src={obterImagemProduto(produto.id, 'landscape_16_9')}
            alt={produto.nome}
            className="h-[360px] w-full object-cover"
          />
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-lg font-semibold text-amber-700 shadow-sm">
            {obterProdutoPlaceholder(produto.id)}
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">
            {obterCategoriaLabel(produto.categoriaId)}
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {produto.nome}
          </h1>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">{produto.descricao}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Preco</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              {formatarMoeda(produto.precoCentavos)}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Quantidade</div>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantidade((prev) => Math.max(1, prev - 1))}
                className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg"
              >
                -
              </button>
              <span className="min-w-10 text-center text-lg font-semibold text-slate-900">
                {quantidade}
              </span>
              <button
                type="button"
                onClick={() => setQuantidade((prev) => prev + 1)}
                className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {produto.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => addToCart(produto.id, quantidade)}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-amber-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700"
          >
            Adicionar ao carrinho
          </button>
          <button
            type="button"
            onClick={() => {
              addToCart(produto.id, quantidade)
              navigate('/carrinho')
            }}
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Adicionar e abrir carrinho
          </button>
        </div>
      </section>
    </div>
  )
}
