import React from 'react'
import styled from 'styled-components'

import List from '../../components/List'
import FilmListItem from '../../components/ListItems/FilmListItem'
import Layout from '../../components/Layout'
import LinkButton, {
  LinkButtonContainer,
} from '../../components/LinkButton'
import { Film } from '../../types'
import SkeletonItem from '../../assets/SkeletonItem.png'

const MovieListSubheader = styled.div`
  display: flex;
  align-items: center;
  padding: 35px 0;
  border-bottom: 1px solid lightgray;

  ${LinkButtonContainer} {
    margin: 0 10px;
  }
`

const SubheaderText = styled.h2`
  font-size: 28px;
`

const PlaceholderImage = styled.img`
  padding: 30px 0 30px 50px;
`

type Props = {
  films: Film[]
  characterName: string
  isLoading: boolean
  isFilmLoading: boolean
  error: string | null
  goBackDirection: string
}

const CharacterScreenTemplate: React.FC<Props> = ({
  films,
  characterName,
  isLoading,
  isFilmLoading,
  error,
  goBackDirection,
}) => {
  const listContent = (
    <>
      <MovieListSubheader>
        <LinkButton goBackDirection={goBackDirection} />
        <SubheaderText>{`${characterName} movies`}</SubheaderText>
      </MovieListSubheader>

      {isFilmLoading ? (
        <PlaceholderImage src={SkeletonItem} alt="Loading..." />
      ) : (
        films.map((film) => <FilmListItem key={film.title} {...film} />)
      )}
    </>
  )

  return (
    <Layout>
      <List isLoading={isLoading} error={error} items={listContent} />
    </Layout>
  )
}

export default CharacterScreenTemplate
