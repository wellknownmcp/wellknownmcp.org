'use client'

import { createContext, useContext } from 'react'

// ✅ On exporte correctement l'interface
export interface SpecContextType {
  slug: string
  content?: string
  front?: Record<string, any>
}

// ✅ Le type est utilisé ici
export const SpecContext = createContext<SpecContextType>({
  slug: '',
  content: '',
  front: {},
})

export function useSpecContext() {
  return useContext(SpecContext)
}

export const SpecProvider = SpecContext.Provider
