import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useParams, useLocation } from 'react-router-dom'

import Layout from '../../components/Layout'
import Loader from '../../components/Loader'
import FilmListItem from '../../components/List/FilmListItem'
import LinkButton, {
  LinkButtonContainer,
} from '../../components/LinkButton'
import { API, ROUTES } from '../../constants'
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

const ListContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  background-color: gray;
  border: 1px solid black;
  padding: 10px 0 10px 50px;
`
const Title = styled.h1`
  font-size: 24px;
  color: white;
  text-transform: uppercase;
`

type ParamTypes = {
  id: string
}

type Location = {
  goBackPageNumber?: string
}

const CharacterScreen: React.FC = () => {
  const { id } = useParams<ParamTypes>()
  const { state } = useLocation<Location>()

  const [filmData, setFilmData] = useState<Film[]>([])
  const [characterName, setCharacterName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const goBackDirection = state?.goBackPageNumber
    ? `${ROUTES.LIST.url}${state.goBackPageNumber}`
    : ROUTES.LIST.url

  const getFilmsData = async (filmsUrl: string[]) => {
    const filmsPromiseArray = filmsUrl.map((url) => axios.get(url))

    axios
      .all(filmsPromiseArray)
      .then(
        axios.spread((...responses) => {
          const films = responses.map(({ data }) => data)
          setFilmData(films)
        })
      )
      .catch((errors) => {
        console.error(errors)
      })
  }

  const getPersonData = async () => {
    try {
      const apiPaginatedUrl = `${API.PEOPLE}${id}`
      const { data } = await axios.get(apiPaginatedUrl)
      const { name, films } = data

      setCharacterName(name)
      await getFilmsData(films)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPersonData()
  }, [getPersonData])

  const listContent = (
    <>
      <MovieListSubheader>
        <LinkButton goBackDirection={goBackDirection} />
        <SubheaderText>{`${characterName} movies`}</SubheaderText>
      </MovieListSubheader>

      <ListContentContainer>
        {filmData.map((film) => (
          <FilmListItem key={film.title} {...film} />
        ))}
      </ListContentContainer>
    </>
  )

  return (
    <Layout>
      <Header>
        <Title>star wars viewer</Title>
      </Header>

      {isLoading ? <Loader /> : listContent}
    </Layout>
  )
}

export default CharacterScreen
