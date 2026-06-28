import { Link } from 'react-router-dom'

import { useLocalStorage } from '@/hooks/useLocalStorage'

const COOKIE_CONSENT_STORAGE_KEY = 'rnn:v1:cookie_consent'

export default function CookieBanner() {
  const { value: hasAcceptedCookies, setValue: setHasAcceptedCookies } = useLocalStorage(
    COOKIE_CONSENT_STORAGE_KEY,
    false,
  )

  if (hasAcceptedCookies) return null

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-slate-900">Uso de cookies</div>
            <p className="text-sm text-slate-600">
              Utilizamos cookies e armazenamento local para manter sessão visual,
              preferências, carrinho e continuidade de navegação.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link to="/politica-de-privacidade" className="font-medium text-amber-700 hover:underline">
                Política de Privacidade
              </Link>
              <Link to="/termos-de-uso" className="font-medium text-amber-700 hover:underline">
                Termos de Uso
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setHasAcceptedCookies(true)}
            className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
