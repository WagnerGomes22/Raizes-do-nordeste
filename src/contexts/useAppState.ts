import { useContext } from 'react'

import { AppStateContext } from '@/contexts/appStateContext'

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState deve ser usado dentro de AppStateProvider')
  return ctx
}

