import { Link } from 'react-router-dom'

import { useAppState } from '@/contexts/useAppState'
import { recompensas } from '@/data/fidelidade'

const dataHora = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})

export default function FidelidadePage() {
  const { state, redeemReward } = useAppState()

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs text-slate-500">
          <Link to="/" className="text-amber-700 hover:underline">
            Home
          </Link>{' '}
          <span className="text-slate-400">/</span> Fidelidade
        </div>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Fidelidade</h1>
            <p className="mt-2 text-sm text-slate-600">
              Consulte pontos acumulados, historico e recompensas disponiveis.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-50 px-5 py-4 text-right">
            <div className="text-xs uppercase tracking-wide text-amber-700">Saldo atual</div>
            <div className="mt-2 text-3xl font-semibold text-slate-900">
              {state.fidelidade.pontos} pts
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Recompensas</h2>
          <div className="grid gap-4">
            {recompensas.map((recompensa) => {
              const resgatada = state.fidelidade.recompensasResgatadas.includes(recompensa.id)
              const pontosInsuficientes = state.fidelidade.pontos < recompensa.custoPontos

              return (
                <article
                  key={recompensa.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {recompensa.titulo}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">{recompensa.descricao}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {recompensa.custoPontos} pts
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      redeemReward(
                        recompensa.id,
                        recompensa.custoPontos,
                        recompensa.titulo,
                      )
                    }
                    disabled={resgatada || pontosInsuficientes}
                    className={`mt-4 inline-flex rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      resgatada || pontosInsuficientes
                        ? 'bg-slate-100 text-slate-400'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    {resgatada
                      ? 'Ja resgatada'
                      : pontosInsuficientes
                        ? 'Pontos insuficientes'
                        : 'Resgatar'}
                  </button>
                </article>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Historico</h2>
          <div className="space-y-4">
            {state.fidelidade.historico.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{item.descricao}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {dataHora.format(new Date(item.data))}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.pontos >= 0
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {item.pontos >= 0 ? '+' : ''}
                    {item.pontos} pts
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
