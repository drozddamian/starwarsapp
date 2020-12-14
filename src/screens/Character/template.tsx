import React from 'react'
import styled from 'styled-components'

import List from '../../components/List'
import FilmListItem from '../../components/List/FilmListItem'
import Layout from '../../components/Layout'
import LinkButton, {
  LinkButtonContainer,
} from '../../components/LinkButton'
import { Film } from '../../types'

const MovieListSubheader = styled.div`
  display: flex;
  align-items: center;
  padding: 35px 0;

  ${LinkButtonContainer} {
    margin: 0 10px;
  }
`

const SubheaderText = styled.h2`
  font-size: 28px;
`

type Props = {
  filmData: Film[]
  characterName: string
  isLoading: boolean
  goBackDirection: string
}

const CharacterScreenTemplate: React.FC<Props> = ({
  filmData,
  characterName,
  isLoading,
  goBackDirection,
}) => {
  const listContent = (
    <>
      <MovieListSubheader>
        <LinkButton goBackDirection={goBackDirection} />
        <SubheaderText>{`${characterName} movies`}</SubheaderText>
      </MovieListSubheader>

      {filmData.map((film) => (
        <FilmListItem key={film.title} {...film} />
      ))}
    </>
  )

  return (
    <Layout>
      <List isLoading={isLoading} error={null} items={listContent} />
    </Layout>
  )
}

export default CharacterScreenTemplate
