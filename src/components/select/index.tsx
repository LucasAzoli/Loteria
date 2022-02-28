/* eslint-disable security/detect-object-injection */
import Image from 'next/image'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'

const DropDownContainer = styled(`div`)`
  width: 215px;
`
const DropDownHeader = styled(`div`)`
  background-color: white;
  display: flex;
  justify-content: space-between;
  color: #333333;
  padding: 14px 23px;
  border-radius: 7.5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  cursor: default;
`
const DropDownList = styled(`ul`)`
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: white;
  padding: 14px 23px;
  border-radius: 7.5px;
  list-style: none;
`
const ListItem = styled(`li`)`
  color: #333333;
  cursor: default;
`

type Concurso = {
  id: number
  nome: string
}

const initialValue: Concurso = {
  id: 0,
  nome: 'Mega-Sena',
}

function Select() {
  const [isOpen, setIsOpen] = useState(false)
  const [select, setSelect] = useState<Concurso>(initialValue)
  const toggling = () => setIsOpen(!isOpen)

  const selecting = (data: Concurso) => () => {
    setSelect(data)
    setIsOpen(false)
  }

  const { isLoading, error, data } = useQuery<Concurso[]>('repoData', () =>
    fetch('https://brainn-api-loterias.herokuapp.com/api/v1/loterias').then(
      res => res.json() as Promise<Concurso[]>
    )
  )

  if (isLoading) {
    return <>Loading...</>
  }

  if (error && error instanceof Error)
    return <>An error has occurred: {error.message}</>

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        {select.nome.toUpperCase()}
        <Image
          src="/images/select-icon.svg"
          alt="Icon of Select box"
          width={10.5}
          height={5.5}
        />
      </DropDownHeader>
      {isOpen && (
        <DropDownList>
          {data &&
            Object.keys(data).map((keyName, i) => (
              <ListItem onClick={selecting(data[i])} key={keyName}>
                {data[i].nome.toUpperCase()}
              </ListItem>
            ))}
        </DropDownList>
      )}
    </DropDownContainer>
  )
}

export default Select
