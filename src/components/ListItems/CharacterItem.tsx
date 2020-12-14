import React from 'react'
import styled from 'styled-components'
import { Character } from '../../types'
import LinkButton from '../LinkButton'
import { ROUTES } from '../../constants'

const Wrapper = styled.div`
  padding: 50px 10px 50px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;

  @media (min-width: 767px) {
    padding: 50px;
  }
`

const SpeciesNameContainer = styled.div`
  padding-top: 24px;
`

const SpeciesNameText = styled.h3`
  color: #7b8fa4;
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
  speciesName,
  url,
}) => {
  const idRegex = /\d+/g
  const id = url.match(idRegex)?.join()
  const linkDirectionObject = {
    pathname: `${ROUTES.CHARACTER.url}${id}`,
    state: { goBackPageNumber: currentPage },
  }

  return (
    <Wrapper>
      <LeftColumn>
        <NameText>{name}</NameText>
        <SpeciesNameContainer>
          <SpeciesNameText>{speciesName}</SpeciesNameText>
        </SpeciesNameContainer>
      </LeftColumn>
      <LinkButton linkUrl={linkDirectionObject} />
    </Wrapper>
  )
}

export default CharacterItem
