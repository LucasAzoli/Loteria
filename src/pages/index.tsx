import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'

import type { Concurso } from '@/types'

import Result from '../components/result'
import Select from '../components/select'

const Container = styled(`div`)`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`

const Sidebar = styled(`div`)`
  width: 500px;
  height: 100vh;
  background-color: ${props => props.color || '#6befa3'};
  padding: 92px 0 92px 96px;
  flex-direction: column;
  justify-content: space-between;
  display: flex;

  @media (max-width: 768px) {
    background-position: center;
    background-size: 768px;
    height: 450px;
    width: 100vw;
    align-items: center;
    padding: 0 0 0 0;
    background-image: url('/images/sidebar-mobile.svg');
    justify-content: center;
    gap: 70px;
  }
`

const Curve = styled(`div`)`
  background-color: ${props => props.color || '#6befa3'};

  .curve {
    height: 100vh;
    overflow: hidden;
    width: 120px;
    border-bottom-left-radius: 100%;
    border-top-left-radius: 100%;
    background-color: #efefef;

    @media (max-width: 768px) {
      width: 100vw;
      height: 150px;
      border-bottom-left-radius: 0%;
      border-top-left-radius: 100%;
      border-top-right-radius: 100%;
    }
  }
`

const Logo = styled(`div`)`
  display: flex;
  gap: 22px;
  h1 {
    color: white;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const DadosConcurso = styled(`div`)`
  display: flex;
  gap: 14px;
  flex-direction: column;
  p {
    color: white;
    font-weight: 400;
    font-size: 14px;
  }
  h2 {
    font-weight: 700;
    font-size: 20px;
    color: white;
  }
  .mobile {
    display: none;
  }
  @media (max-width: 768px) {
    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
    }
  }
`

const test: Concurso[] = [
  {
    id: 0,
    nome: 'mega-sena',
    concursoId: 4526,
  },
]

const initialValue: Concurso = {
  id: 0,
  nome: 'Mega-Sena',
  concursoId: 2359,
}

const colors = [
  '#6BEFA3',
  '#8666EF',
  '#DD7AC6',
  '#FFAB64',
  '#5AAD7D',
  '#BFAF83',
]

function Home() {
  const [Concursos, setConcursos] = useState<Concurso[]>(test)
  const [select, setSelect] = useState<Concurso>(initialValue)
  const [date, setDate] = useState<string>('2022-03-07T20:46:24.757Z')
  const [color, setColor] = useState<string>('#6befa3')

  const { isLoading, error, data } = useQuery<Concurso[]>('concursoData', () =>
    fetch('https://brainn-api-loterias.herokuapp.com/api/v1/loterias').then(
      res => res.json() as Promise<Concurso[]>
    )
  )

  const ConcursoIdResp = useQuery<Concurso[]>('concursoIds', () =>
    fetch(
      'https://brainn-api-loterias.herokuapp.com/api/v1/loterias-concursos'
    ).then(res => res.json() as Promise<Concurso[]>)
  )

  useEffect(() => {
    if (data && ConcursoIdResp.data) {
      data.forEach((e, i) => {
        e.concursoId =
          ConcursoIdResp.data[parseInt(i.toString(), 10)].concursoId
      })
      setConcursos(data)
    }
  }, [data, ConcursoIdResp.data])

  if (isLoading) {
    return <>Loading...</>
  }

  if (error && error instanceof Error)
    return <>An error has occurred: {error.message}</>

  const setSelectHome = (sel: Concurso) => {
    setSelect(sel)
    setColor(colors[sel.id])
  }

  const setDateHome = (s: string) => {
    setDate(s)
  }

  const fomatDate = (s: string) => {
    const sSplit: string[] = s.split('-')
    return `${sSplit[0]}/${sSplit[2][0]}${sSplit[2][1]}/${sSplit[1]}`
  }

  return (
    <Container>
      <Sidebar color={color}>
        <Select concursos={Concursos} functionConcurso={setSelectHome} />
        <Logo>
          <Image
            src="/images/loteria-icon.svg"
            alt="Icon of loteria"
            width={60}
            height={55}
          />
          <h1>{select.nome.toUpperCase()}</h1>
        </Logo>
        <DadosConcurso>
          <p className="desktop">CONCURSO</p>
          <h2 className="desktop">
            {select.concursoId} – {fomatDate(date)}
          </h2>
          <p className="mobile">CONCURSO Nº {select.concursoId}</p>
        </DadosConcurso>
      </Sidebar>
      <Curve color={color}>
        <div className="curve" />
      </Curve>
      <Result
        concursoId={select.concursoId.toString()}
        functionDate={setDateHome}
      />
    </Container>
  )
}

export default Home
