import { Link } from 'react-router-dom'

import {
  formatarMoeda,
  obterCategoriaLabel,
  obterImagemProduto,
  obterProdutoPlaceholder,
} from '@/data/catalogo'

type ProductCardProps = {
  produto: {
    id: string
    nome: string
    descricao: string
    precoCentavos: number
    categoriaId: string
    tags: string[]
  }
  onAddToCart?: (produtoId: string) => void
}

export default function ProductCard({ produto, onAddToCart }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-40 overflow-hidden bg-slate-100">
        <img
          src={obterImagemProduto(produto.id)}
          alt={produto.nome}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-amber-700 shadow-sm">
          {obterProdutoPlaceholder(produto.id)}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {obterCategoriaLabel(produto.categoriaId)}
            </div>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{produto.nome}</h3>
          </div>
          {produto.tags[0] ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              {produto.tags[0]}
            </span>
          ) : null}
        </div>

        <p className="text-sm text-slate-600">{produto.descricao}</p>

        <div className="flex items-center justify-between gap-3">
          <div className="text-lg font-semibold text-slate-900">
            {formatarMoeda(produto.precoCentavos)}
          </div>
          <div className="flex gap-2">
            <Link
              to={`/produto/${produto.id}`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Ver detalhes
            </Link>
            {onAddToCart ? (
              <button
                type="button"
                onClick={() => onAddToCart(produto.id)}
                className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
              >
                Adicionar
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
