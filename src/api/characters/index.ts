import axios from 'axios'
import { API } from '../../constants'
import { CharactersApiPayload } from '../../types'

const getCharacters = async (
  apiPage: string | number
): Promise<CharactersApiPayload> => {
  const apiPaginatedUrl = `${API.PEOPLE}?page=${apiPage}`
  const { data } = await axios.get(apiPaginatedUrl)
  const { results, count } = data

  return { results, count }
}

export default {
  getCharacters,
}
