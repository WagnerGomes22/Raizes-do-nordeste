import { Link } from 'react-router-dom'

import Banner from '@/components/Banner'
import ProductCard from '@/components/ProductCard'
import { useAppState } from '@/contexts/useAppState'
import {
  categorias,
  formatarMoeda,
  obterPromocoesAtivas,
  obterProdutosDestaque,
  produtos,
} from '@/data/catalogo'

export default function HomePage() {
  const { state, addToCart } = useAppState()
  const destaques = obterProdutosDestaque().slice(0, 4)
  const promocoes = obterPromocoesAtivas().slice(0, state.ofertasAtivas ? 3 : 1)
  const categoriasResumo = categorias.map((categoria) => ({
    ...categoria,
    quantidade: produtos.filter((produto) => produto.categoriaId === categoria.id).length,
  }))

  return (
    <div className="space-y-8">
      <Banner
        eyebrow="Home"
        title="Sabores regionais em um fluxo visual completo"
        description="Explore categorias, destaque produtos, monte seu carrinho e avance ate o acompanhamento do pedido."
        primaryLabel="Ver cardapio"
        primaryTo="/cardapio"
        secondaryLabel={state.usuarioLogadoId ? 'Meu perfil' : 'Entrar'}
        secondaryTo={state.usuarioLogadoId ? '/perfil' : '/login'}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categoriasResumo.map((categoria) => (
          <Link
            key={categoria.id}
            to={`/cardapio?categoria=${categoria.id}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <div className="text-xs uppercase tracking-wide text-slate-500">{categoria.slug}</div>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">{categoria.nome}</h2>
            <div className="mt-4 text-sm text-slate-600">{categoria.quantidade} produtos ativos</div>
          </Link>
        ))}
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Produtos em destaque
              </h2>
              <p className="text-sm text-slate-600">
                Itens mais pedidos prontos para adicionar ao carrinho.
              </p>
            </div>
            <Link to="/cardapio" className="text-sm font-medium text-amber-700 hover:underline">
              Ver tudo
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {destaques.map((produto) => (
              <ProductCard
                key={produto.id}
                produto={produto}
                onAddToCart={(produtoId) => addToCart(produtoId, 1)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Programa de fidelidade
                </div>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  Seus pontos acumulados
                </h2>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                {state.fidelidade.pontos} pts
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Consulte recompensas, historico e resgates diretamente na area de fidelidade.
            </p>
            <Link
              to="/fidelidade"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
            >
              Ver fidelidade
            </Link>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Banner promocional
                </div>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Ofertas do dia</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {state.ofertasAtivas ? 'ativas' : 'pausadas'}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {promocoes.map((promocao) => (
                <div key={promocao.id} className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-medium text-slate-900">{promocao.nome}</div>
                  <div className="mt-1 text-sm text-slate-600">{promocao.descricao}</div>
                  <div className="mt-2 text-xs uppercase tracking-wide text-amber-700">
                    Minimo {formatarMoeda(promocao.minPedidoCentavos)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
