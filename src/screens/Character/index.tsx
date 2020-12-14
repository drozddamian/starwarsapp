import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchCharacterFilms } from '../../redux/films'
import { ROUTES } from '../../constants'
import CharacterScreenTemplate from './template'
import { useTypedSelector } from '../../redux/rootReducer'

type ParamTypes = {
  id: string
}

type Location = {
  goBackPageNumber?: string
}

const CharacterScreen: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams<ParamTypes>()
  const { state } = useLocation<Location>()

  const {
    isLoading,
    isFilmLoading,
    error,
    characterName,
    films,
  } = useTypedSelector((state) => state.films)

  const goBackDirection = state?.goBackPageNumber
    ? `${ROUTES.LIST.url}${state.goBackPageNumber}`
    : ROUTES.LIST.url

  useEffect(() => {
    dispatch(fetchCharacterFilms(id))
  }, [])

  const templateProps = {
    films,
    characterName,
    isLoading,
    isFilmLoading,
    error,
    goBackDirection,
  }

  return <CharacterScreenTemplate {...templateProps} />
}

export default CharacterScreen
