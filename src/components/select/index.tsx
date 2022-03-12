/* eslint-disable security/detect-object-injection */
import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'

import type { Concurso } from '@/types'

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
  width: 215px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: white;
  padding: 14px 23px;
  border-radius: 7.5px;
  list-style: none;
  z-index: 100;
  position: absolute;
`
const ListItem = styled(`li`)`
  color: #333333;
  cursor: default;
`

type PropsSelect = {
  concursos: Concurso[]
  functionConcurso: (select: Concurso) => void
}

function Select(propsSelect: PropsSelect) {
  const [isOpen, setIsOpen] = useState(false)
  const toggling = () => setIsOpen(!isOpen)

  const { concursos, functionConcurso } = propsSelect

  const [select, setSelect] = useState<Concurso>(concursos[0])

  const selecting = (sel: Concurso) => () => {
    setSelect(sel)
    functionConcurso(sel)
    setIsOpen(false)
  }

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
          {concursos &&
            concursos.map(
              (value: Concurso, index: number, array: Concurso[]) => (
                <ListItem key={value.id} onClick={selecting(array[index])}>
                  {value.nome.toUpperCase()}
                </ListItem>
              )
            )}
        </DropDownList>
      )}
    </DropDownContainer>
  )
}

export default Select
