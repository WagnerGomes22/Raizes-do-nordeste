import { categorias as categoriasMock } from '@/mocks/categorias.js'
import { produtos as produtosMock } from '@/mocks/produtos.js'
import { promocoes as promocoesMock } from '@/mocks/promocoes.js'
import { unidades as unidadesMock } from '@/mocks/unidades.js'

export const categorias = [...categoriasMock].sort((a, b) => a.ordem - b.ordem)
export const produtos = [...produtosMock]
export const promocoes = [...promocoesMock]
export const unidades = [...unidadesMock]

const imageBaseUrl = 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image'

const promptsPorCategoria: Record<string, string> = {
  cat_tapiocas:
    'realistic brazilian tapioca on a rustic ceramic plate, warm natural light, northeastern brazil food photography, appetizing texture, restaurant menu shot',
  cat_cuscuz:
    'realistic brazilian cuscuz with butter and egg on a rustic plate, warm natural light, northeastern brazil breakfast food photography, restaurant menu shot',
  cat_sanduiches:
    'realistic gourmet sandwich with regional brazilian filling, rustic table, appetizing food photography, restaurant menu shot, warm natural light',
  cat_salgados:
    'realistic assortment of brazilian savory snacks, golden crispy texture, rustic serving board, warm natural light, restaurant menu shot',
  cat_doces:
    'realistic northeastern brazilian dessert on a ceramic plate, soft warm light, appetizing food photography, restaurant menu shot',
  cat_bebidas:
    'realistic tropical brazilian beverages in clear glasses, fresh condensation, rustic table, bright food photography, restaurant menu shot',
  cat_acompanhamentos:
    'realistic brazilian side dishes on rustic plates, appetizing texture, warm natural light, restaurant menu photography',
  cat_combos:
    'realistic brazilian meal combo with tapioca and juice on a rustic table, restaurant menu shot, warm natural light, appetizing composition',
}

const moeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatarMoeda(centavos: number) {
  return moeda.format(centavos / 100)
}

export function obterCategoriaPorId(categoriaId: string) {
  return categorias.find((categoria) => categoria.id === categoriaId) ?? null
}

export function obterProdutoPorId(produtoId: string) {
  return produtos.find((produto) => produto.id === produtoId) ?? null
}

export function obterPromocoesAtivas() {
  return promocoes.filter((promocao) => promocao.ativa)
}

export function obterProdutosDestaque() {
  return produtos.filter((produto) => produto.ativo && produto.tags.includes('mais-pedidos'))
}

export function listarProdutos(categoriaId?: string, busca?: string) {
  const termo = busca?.trim().toLowerCase() ?? ''

  return produtos.filter((produto) => {
    if (!produto.ativo) return false
    if (categoriaId && categoriaId !== 'todas' && produto.categoriaId !== categoriaId) return false

    if (!termo) return true

    return (
      produto.nome.toLowerCase().includes(termo) ||
      produto.descricao.toLowerCase().includes(termo) ||
      produto.tags.some((tag) => tag.toLowerCase().includes(termo))
    )
  })
}

export function calcularTotalCarrinho(
  itens: Array<{ produtoId: string; quantidade: number }>,
) {
  return itens.reduce((total, item) => {
    const produto = obterProdutoPorId(item.produtoId)
    if (!produto) return total
    return total + produto.precoCentavos * item.quantidade
  }, 0)
}

export function calcularQuantidadeCarrinho(
  itens: Array<{ produtoId: string; quantidade: number }>,
) {
  return itens.reduce((total, item) => total + item.quantidade, 0)
}

export function obterCategoriaLabel(categoriaId: string) {
  return obterCategoriaPorId(categoriaId)?.nome ?? 'Categoria'
}

export function obterProdutoPlaceholder(produtoId: string) {
  const produto = obterProdutoPorId(produtoId)
  if (!produto) return 'PR'

  return produto.nome
    .split(' ')
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join('')
}

export function obterImagemProduto(
  produtoId: string,
  imageSize: string = 'landscape_4_3',
) {
  const produto = obterProdutoPorId(produtoId)
  if (!produto) return ''

  const prompt =
    promptsPorCategoria[produto.categoriaId] ??
    'realistic brazilian regional dish on a rustic plate, warm natural light, appetizing food photography, restaurant menu shot'

  return `${imageBaseUrl}?prompt=${encodeURIComponent(prompt)}&image_size=${imageSize}`
}
