import React, { useEffect, useState, useMemo, useCallback } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { API } from '../../constants'
import { Character } from '../../types'
import CharactersListTemplate from './template'

const PAGINATION_CHUNK_SIZE = 10

type ParamTypes = {
  page?: string
}

const CharactersListScreen: React.FC = () => {
  const { page = 1 } = useParams<ParamTypes>()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)
  const [allPersonCount, setAllPersonCount] = useState(0)
  const [characters, setCharacters] = useState<Character[]>([])

  const getPeople = useCallback(async () => {
    try {
      setIsLoading(true)
      const apiPaginatedUrl = `${API.PEOPLE}?page=${page}`
      const { data } = await axios.get(apiPaginatedUrl)
      const { results, count } = data

      setAllPersonCount(count)
      setCharacters(results)
      setIsLoading(false)
    } catch (error) {
      setError('Error while fetching characters data')
      setIsLoading(false)
    }
  }, [page])

  useEffect(() => {
    getPeople()
  }, [getPeople])

  const howManyPagesAvailable = useMemo(
    () => Math.ceil(allPersonCount / PAGINATION_CHUNK_SIZE),
    [allPersonCount]
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
