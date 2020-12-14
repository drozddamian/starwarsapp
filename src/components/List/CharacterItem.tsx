import React from 'react'
import styled from 'styled-components'
import { Character } from '../../types'
import LinkButton from '../LinkButton'
import SpeciesName from '../SpeciesName'
import { ROUTES } from '../../constants'

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const NameText = styled.h3``

type Props = {
  currentPage: string
} & Character

const CharacterItem: React.FC<Props> = ({
  currentPage,
  name,
  species,
  url,
}) => {
  const idRegex = /\d+/g
  const id = url.match(idRegex)?.join()
  const linkDirectionObject = {
    pathname: `${ROUTES.CHARACTER.url}${id}`,
    state: { goBackPageNumber: currentPage },
  }
  const speciesUrl = species.join()

  return (
    <Wrapper>
      <LeftColumn>
        <NameText>{name}</NameText>
        <SpeciesName speciesUrl={speciesUrl} />
      </LeftColumn>
      <LinkButton linkUrl={linkDirectionObject} />
    </Wrapper>
  )
}

export default CharacterItem
