import { useContext } from 'react'

import { LoteriaContext } from '@/context/loteria-context'

export function useSelect() {
  return useContext(LoteriaContext)
}
