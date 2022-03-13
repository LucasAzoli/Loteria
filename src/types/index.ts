type Concurso = {
  id: number
  nome: string
  concursoId: number
}

type DataConcurso = {
  id: string
  loteria: number
  numeros: string[]
  data: string
}

export type { Concurso, DataConcurso }
