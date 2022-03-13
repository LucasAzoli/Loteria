/* eslint-disable security/detect-object-injection */
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'

import type { DataConcurso } from '@/types'

const Container = styled(`div`)`
  width: calc(100vw - 600px);
  padding: 92px 96px 92px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: #efefef;

  @media (max-width: 768px) {
    min-height: 350px;
    width: 100vw;
    height: calc(100vh - 600px);
  }

  div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 35px;
    .number {
      padding: 30px 36px;
      color: #333333;
      font-weight: 700;
      font-size: 27px;
      background-color: white;
      border-radius: 50%;
      p {
        text-align: center;
        font-weight: 700;
        font-size: 27px;
      }
    }
  }

  p {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
  }

  @media (max-width: 1600px) {
    div {
      gap: 20px;
      .number {
        padding: 21px 27px;
      }
    }
  }

  @media (max-width: 1024px) {
    padding-right: 20px;
  }

  @media (max-width: 768px) {
    width: 100vw;
    padding: 0px 70px 37px 70px;
    height: auto;
    gap: 80px;

    .style {
      display: none;
    }
  }
`

type PropsResult = {
  concursoId: string
  functionDate: (s: string) => void
}

function Result(props: PropsResult) {
  const { concursoId, functionDate } = props

  const [result, setResult] = useState<string[]>([
    '01',
    '21',
    '25',
    '35',
    '40',
    '52',
  ])

  const { isLoading, error, data, refetch } = useQuery<DataConcurso>(
    'numbersData',
    () =>
      fetch(
        `https://brainn-api-loterias.herokuapp.com/api/v1/concursos/${concursoId}`
      ).then(res => res.json() as Promise<DataConcurso>)
  )

  useEffect(() => {
    if (!error && !isLoading && data) {
      setResult(data.numeros)
      functionDate(data.data)
    }
    refetch()
  }, [concursoId])

  if (isLoading) {
    return <>Loading...</>
  }

  if (error && error instanceof Error)
    return <>An error has occurred: {error.message}</>

  return (
    <Container>
      <div className="style" />
      <div>
        {result &&
          Object.keys(result).map((keyName, i) => (
            <div className="number" key={keyName}>
              <p>{result[i]}</p>
            </div>
          ))}
      </div>
      <p>
        Este sorteio é meramente ilustrativo e não possui nenhuma ligação com a
        CAIXA.
      </p>
    </Container>
  )
}

export default Result
