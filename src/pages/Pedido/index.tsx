import { Link } from 'react-router-dom'

import { useAppState } from '@/contexts/useAppState'
import { formatarMoeda } from '@/data/catalogo'
import { fluxoPedido, fluxoPedidoLabel } from '@/data/pedidos'

const dataHora = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})

export default function PedidoPage() {
  const { state, advancePedidoStatus } = useAppState()
  const pedido = state.pedidoAtual

  if (!pedido) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Nenhum pedido em andamento</h1>
        <Link
          to="/cardapio"
          className="mt-4 inline-flex rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white"
        >
          Iniciar novo pedido
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs text-slate-500">
          <Link to="/" className="text-amber-700 hover:underline">
            Home
          </Link>{' '}
          <span className="text-slate-400">/</span> Acompanhamento do pedido
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Acompanhamento do pedido
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Use o botao abaixo para simular o avancar do status.
          </p>
        </div>

        <div className="space-y-4">
          {fluxoPedido.map((etapa, index) => {
            const etapaAtual = fluxoPedido.indexOf(pedido.status)
            const concluida = index <= etapaAtual

            return (
              <div key={etapa} className="flex items-start gap-4">
                <div
                  className={`mt-1 flex size-10 items-center justify-center rounded-full text-sm font-semibold ${
                    concluida ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-base font-semibold text-slate-900">
                    {fluxoPedidoLabel[etapa]}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    {concluida ? 'Etapa concluida ou atual.' : 'Aguardando andamento do pedido.'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={advancePedidoStatus}
          disabled={pedido.status === 'finalizado'}
          className={`inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
            pedido.status === 'finalizado'
              ? 'bg-slate-100 text-slate-400'
              : 'bg-amber-600 text-white hover:bg-amber-700'
          }`}
        >
          {pedido.status === 'finalizado' ? 'Pedido finalizado' : 'Avancar status'}
        </button>
      </section>

      <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">Resumo</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{pedido.id}</h2>
        </div>
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Criado em</span>
            <span>{dataHora.format(new Date(pedido.criadoEm))}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Pagamento</span>
            <span className="font-medium text-slate-900">{pedido.formaPagamento}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total</span>
            <span className="font-medium text-slate-900">
              {formatarMoeda(pedido.totalCentavos)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  )
}
