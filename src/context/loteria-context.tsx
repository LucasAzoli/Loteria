import React, { useState } from 'react'

export const LoteriaContext = React.createContext({})

type Concurso = {
  id: number
  nome: string
}

const loteria: Concurso = {
  id: 0,
  nome: 'Mega-Sena',
}

export function LoteriaProvider() {
  const [state, setSelect] = useState<Concurso>(loteria)

  return (
    <LoteriaContext.Provider value={(state, setSelect)}>
      {}
    </LoteriaContext.Provider>
  )
}
