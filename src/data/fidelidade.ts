type HistoricoFidelidadeItem = {
  id: string
  tipo: 'credito' | 'resgate'
  descricao: string
  pontos: number
  data: string
}

export const recompensas = [
  {
    id: 'rec_001',
    titulo: 'Cafe Regional',
    descricao: 'Troque por um cafe regional em qualquer unidade.',
    custoPontos: 120,
  },
  {
    id: 'rec_002',
    titulo: 'Suco Natural',
    descricao: 'Desbloqueie um suco natural de 300ml.',
    custoPontos: 180,
  },
  {
    id: 'rec_003',
    titulo: 'Tapioca Classica',
    descricao: 'Resgate uma tapioca tradicional do cardapio.',
    custoPontos: 320,
  },
]

export const historicoFidelidadeInicial: HistoricoFidelidadeItem[] = [
  {
    id: 'fid_001',
    tipo: 'credito',
    descricao: 'Compra em Fortaleza',
    pontos: 45,
    data: '2026-06-12T11:10:00.000Z',
  },
  {
    id: 'fid_002',
    tipo: 'credito',
    descricao: 'Combo cuscuz + suco',
    pontos: 28,
    data: '2026-06-18T14:25:00.000Z',
  },
  {
    id: 'fid_003',
    tipo: 'resgate',
    descricao: 'Resgate de cafe regional',
    pontos: -120,
    data: '2026-06-20T08:00:00.000Z',
  },
]
