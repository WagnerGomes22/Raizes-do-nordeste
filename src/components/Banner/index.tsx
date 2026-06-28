import { Link } from 'react-router-dom'

type BannerProps = {
  eyebrow: string
  title: string
  description: string
  primaryLabel: string
  primaryTo: string
  secondaryLabel?: string
  secondaryTo?: string
}

export default function Banner({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
}: BannerProps) {
  return (
    <section className="overflow-hidden rounded-3xl bg-slate-900 text-white shadow-sm">
      <div className="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-amber-200">
            {eyebrow}
          </span>
          <div className="space-y-3">
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm text-slate-200 sm:text-base">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={primaryTo}
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-amber-400"
            >
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryTo ? (
              <Link
                to={secondaryTo}
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="grid gap-3 rounded-3xl bg-white/10 p-4 backdrop-blur">
          <div className="rounded-2xl bg-white/10 p-4">
            <div className="text-xs uppercase tracking-wide text-amber-100">Destaque do dia</div>
            <div className="mt-2 text-lg font-semibold">Sabores do Nordeste</div>
            <div className="mt-1 text-sm text-slate-200">
              Cardapio visual com fluxo completo de compra.
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-300">Entrega</div>
              <div className="mt-1 text-sm font-medium">Retirada e delivery visual</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-300">Pagamento</div>
              <div className="mt-1 text-sm font-medium">Pix, cartao e dinheiro</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
