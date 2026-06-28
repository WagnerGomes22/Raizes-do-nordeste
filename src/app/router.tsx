import { createBrowserRouter } from 'react-router-dom'

import App from '@/app/App'
import CarrinhoPage from '@/pages/Carrinho'
import CardapioPage from '@/pages/Cardapio'
import FidelidadePage from '@/pages/Fidelidade'
import HomePage from '@/pages/Home'
import LoginPage from '@/pages/Login'
import NotFoundPage from '@/pages/NotFoundPage'
import PagamentoPage from '@/pages/Pagamento'
import PedidoPage from '@/pages/Pedido'
import PerfilPage from '@/pages/Perfil'
import PoliticaPrivacidadePage from '@/pages/PoliticaPrivacidade'
import ProdutoPage from '@/pages/Produto'
import TermosUsoPage from '@/pages/TermosUso'

const routerBasename =
  import.meta.env.BASE_URL !== '/' ? import.meta.env.BASE_URL.replace(/\/$/, '') : undefined

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { index: true, element: <HomePage /> },
        { path: 'cardapio', element: <CardapioPage /> },
        { path: 'produto/:produtoId', element: <ProdutoPage /> },
        { path: 'carrinho', element: <CarrinhoPage /> },
        { path: 'pagamento', element: <PagamentoPage /> },
        { path: 'pedido', element: <PedidoPage /> },
        { path: 'fidelidade', element: <FidelidadePage /> },
        { path: 'perfil', element: <PerfilPage /> },
        { path: 'politica-de-privacidade', element: <PoliticaPrivacidadePage /> },
        { path: 'termos-de-uso', element: <TermosUsoPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  {
    basename: routerBasename,
  },
)
