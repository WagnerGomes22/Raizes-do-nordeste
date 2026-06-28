import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppState } from '@/contexts/useAppState'

export default function PerfilPage() {
  const { state, togglePreferencia, updatePerfil } = useAppState()
  const [form, setForm] = useState({
    nome: state.perfil.nome,
    email: state.perfil.email,
    telefone: state.perfil.telefone,
    endereco: state.perfil.endereco,
  })
  const [salvo, setSalvo] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updatePerfil(form)
    setSalvo(true)
    window.setTimeout(() => setSalvo(false), 1800)
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs text-slate-500">
          <Link to="/" className="text-amber-700 hover:underline">
            Home
          </Link>{' '}
          <span className="text-slate-400">/</span> Perfil
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Perfil</h1>
          <p className="mt-2 text-sm text-slate-600">
            Atualize seus dados para a simulacao de compra e preferencias.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="perfil-nome" className="text-sm font-medium text-slate-700">
                Nome
              </label>
              <input
                id="perfil-nome"
                value={form.nome}
                onChange={(event) => setForm((prev) => ({ ...prev, nome: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="perfil-email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="perfil-email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="perfil-telefone" className="text-sm font-medium text-slate-700">
                Telefone
              </label>
              <input
                id="perfil-telefone"
                value={form.telefone}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, telefone: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="perfil-endereco" className="text-sm font-medium text-slate-700">
                Endereco
              </label>
              <input
                id="perfil-endereco"
                value={form.endereco}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, endereco: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex rounded-xl bg-amber-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700"
          >
            Salvar dados
          </button>

          {salvo ? (
            <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Perfil atualizado localmente.
            </div>
          ) : null}
        </form>
      </section>

      <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">Preferencias</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Minha experiencia</h2>
        </div>

        <div className="space-y-3">
          {Object.entries(state.perfil.preferencias).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <span className="text-sm capitalize text-slate-700">
                {key === 'recebeOfertas'
                  ? 'Receber ofertas'
                  : key === 'retiradaRapida'
                    ? 'Retirada rapida'
                    : 'Notificacoes do pedido'}
              </span>
              <button
                type="button"
                onClick={() =>
                  togglePreferencia(key as keyof typeof state.perfil.preferencias)
                }
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  value ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {value ? 'Ativo' : 'Inativo'}
              </button>
            </label>
          ))}
        </div>
      </aside>
    </div>
  )
}
