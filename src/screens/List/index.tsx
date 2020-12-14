import React, { useEffect, useState, useMemo, useCallback } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Layout from '../../components/Layout'
import ListComponent from '../../components/List'
import { API } from '../../constants'
import { Person } from '../../types'

const PAGINATION_CHUNK_SIZE = 10

type ParamTypes = {
  page?: string
}

const ListScreen: React.FC = () => {
  const { page = 1 } = useParams<ParamTypes>()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)
  const [allPersonCount, setAllPersonCount] = useState(0)
  const [PersonList, setPerson] = useState<Person[]>([])

  const getPeople = useCallback(async () => {
    try {
      setIsLoading(true)
      const apiPaginatedUrl = `${API.PEOPLE}?page=${page}`
      const { data } = await axios.get(apiPaginatedUrl)
      const { results, count } = data

      setAllPersonCount(count)
      setPerson(results)
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

  return (
    <Layout>
      <ListComponent
        isLoading={isLoading}
        error={error}
        items={PersonList}
        currentPage={page.toString()}
        howManyPagesAvailable={howManyPagesAvailable}
      />
    </Layout>
  )
}

export default ListScreen
