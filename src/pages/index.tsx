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
  background-image: url('/images/sidebar.svg');
  background-repeat: no-repeat;
  width: 40vw;
  height: 100vh;
  background-position: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 92px 0 92px 96px;
  background-size: auto 1080px;

  @media (max-width: 1024px) {
    background-size: auto 1024px;
    height: 100vh;
    width: 50vw;
    padding-right: 60px;
  }

  @media (max-width: 768px) {
    background-position: center;
    background-size: 768px;
    height: 600px;
    width: 100vw;
    align-items: center;
    padding: 0 0 90px 0;
    background-image: url('/images/sidebar-mobile.svg');
    justify-content: center;
    gap: 70px;
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

function Home() {
  const [Concursos, setConcursos] = useState<Concurso[]>(test)
  const [select, setSelect] = useState<Concurso>(initialValue)
  const [date, setDate] = useState<string>('2022-03-07T20:46:24.757Z')

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
      <Sidebar>
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
      <Result
        concursoId={select.concursoId.toString()}
        functionDate={setDateHome}
      />
    </Container>
  )
}

export default Home
