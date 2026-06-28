import { Outlet, useLocation } from 'react-router-dom'

import CookieBanner from '@/components/CookieBanner'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { useAppState } from '@/contexts/useAppState'

export default function App() {
  const location = useLocation()
  const { feedbackMessage, clearFeedback } = useAppState()

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">
          <div
            key={`${location.pathname}${location.search}`}
            className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6"
          >
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
      <CookieBanner />

      {feedbackMessage ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-28 z-50 flex justify-center px-4">
          <div className="pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
            <span className="flex-1">{feedbackMessage}</span>
            <button
              type="button"
              onClick={clearFeedback}
              className="rounded-lg border border-white/20 px-2 py-1 text-xs font-medium text-white/90 transition-colors hover:bg-white/10"
            >
              Fechar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

