import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchCharacters } from '../../redux/characters'
import CharactersListTemplate from './template'
import { useTypedSelector } from '../../redux/rootReducer'

const PAGINATION_CHUNK_SIZE = 10

type ParamTypes = {
  page?: string
}

const CharactersListScreen: React.FC = () => {
  const dispatch = useDispatch()
  const { page = 1 } = useParams<ParamTypes>()

  const {
    isLoading,
    error,
    allCharactersCount,
    characters,
  } = useTypedSelector((state) => state.characters)

  useEffect(() => {
    dispatch(fetchCharacters(page))
  }, [page])

  const howManyPagesAvailable = useMemo(
    () => Math.ceil(allCharactersCount / PAGINATION_CHUNK_SIZE),
    [allCharactersCount]
  )

  const templateProps = {
    isLoading,
    error,
    characters,
    currentPage: page.toString(),
    howManyPagesAvailable,
  }

  return <CharactersListTemplate {...templateProps} />
}

export default CharactersListScreen
