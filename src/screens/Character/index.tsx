import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useLocation } from 'react-router-dom'
import { API, ROUTES } from '../../constants'
import { Film } from '../../types'
import CharacterScreenTemplate from './template'

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
  const [isFilmListLoading, setIsFilmListLoading] = useState(false)

  const goBackDirection = state?.goBackPageNumber
    ? `${ROUTES.LIST.url}${state.goBackPageNumber}`
    : ROUTES.LIST.url

  const getFilmsData = async (filmsUrl: string[]) => {
    const filmsPromiseArray = filmsUrl.map((url) => axios.get(url))

    axios.all(filmsPromiseArray).then(
      axios.spread((...responses) => {
        const films = responses.map(({ data }) => data)
        setFilmData(films)
      })
    )
  }

  const getPersonData = async () => {
    try {
      const apiPaginatedUrl = `${API.PEOPLE}${id}`
      const { data } = await axios.get(apiPaginatedUrl)
      const { name, films } = data

      setCharacterName(name)
      setIsFilmListLoading(true)
      await getFilmsData(films)
      setIsFilmListLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPersonData()
  }, [])

  const templateProps = {
    filmData,
    characterName,
    isLoading,
    isFilmListLoading,
    goBackDirection,
  }

  return <CharacterScreenTemplate {...templateProps} />
}

export default CharacterScreen
