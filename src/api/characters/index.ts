import axios from 'axios'
import { API } from '../../constants'
import { CharactersApiPayload } from '../../types'

const getCharacters = async (
  apiPage: string | number
): Promise<CharactersApiPayload> => {
  const apiPaginatedUrl = `${API.PEOPLE}?page=${apiPage}`
  const { data } = await axios.get(apiPaginatedUrl)
  const { results, count } = data

  return { count, characters: results }
}

const getSpeciesName = async (speciesApiUrl: string): Promise<string> => {
  const {
    data: { name },
  } = await axios.get(speciesApiUrl)
  return name
}

export default {
  getCharacters,
  getSpeciesName,
}
