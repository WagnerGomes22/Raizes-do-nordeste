import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-xs text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>© {year} Raízes do Nordeste</div>
        <div className="hidden sm:block">Login, cardápio, carrinho e pedido em fluxo visual</div>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/politica-de-privacidade" className="hover:text-slate-700 hover:underline">
            Política de Privacidade
          </Link>
          <Link to="/termos-de-uso" className="hover:text-slate-700 hover:underline">
            Termos de Uso
          </Link>
        </div>
      </div>
    </footer>
  )
}

