import { Link, NavLink } from 'react-router-dom'
import { UtensilsCrossed } from 'lucide-react'

import { useAppState } from '@/contexts/useAppState'
import { calcularQuantidadeCarrinho } from '@/data/catalogo'
import { cn } from '@/lib/utils'

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-amber-100 text-amber-900'
      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
  )
}

export default function Header() {
  const { state } = useAppState()
  const quantidadeCarrinho = calcularQuantidadeCarrinho(state.carrinho)

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-amber-600 text-white">
            <UtensilsCrossed className="size-5" aria-hidden />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Raízes do Nordeste</div>
            <div className="text-xs text-slate-500">Fluxo visual de pedidos</div>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-1" aria-label="Navegação principal">
          <NavLink to="/" className={navLinkClassName} end>
            Home
          </NavLink>
          <NavLink to="/cardapio" className={navLinkClassName}>
            Cardápio
          </NavLink>
          <NavLink to="/carrinho" className={navLinkClassName}>
            Carrinho {quantidadeCarrinho > 0 ? `(${quantidadeCarrinho})` : ''}
          </NavLink>
          <NavLink to="/pedido" className={navLinkClassName}>
            Pedido
          </NavLink>
          <NavLink to="/fidelidade" className={navLinkClassName}>
            Fidelidade
          </NavLink>
          <NavLink to="/perfil" className={navLinkClassName}>
            Perfil
          </NavLink>
          <NavLink to={state.usuarioLogadoId ? '/perfil' : '/login'} className={navLinkClassName}>
            {state.usuarioLogadoId ? 'Conta' : 'Login'}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

