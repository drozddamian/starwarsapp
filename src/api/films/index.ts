import axios from 'axios'
import { API } from '../../constants'
import { CharacterSpecificationPayload, Film } from '../../types'

const getCharacterData = async (
  characterId: string
): Promise<CharacterSpecificationPayload> => {
  const characterSpecificationsUrl = `${API.PEOPLE}${characterId}`
  const { data } = await axios.get(characterSpecificationsUrl)
  const { name, films } = data

  return {
    name,
    filmUrls: films,
  }
}

const getFilms = async (filmUrls: string[]): Promise<Film[]> => {
  const filmsPromiseArray = filmUrls.map((url) => axios.get(url))
  let filmsData: Film[] = []

  await axios.all(filmsPromiseArray).then(
    axios.spread((...responses) => {
      filmsData = responses.map(({ data }) => data as Film)
    })
  )

  return filmsData
}

export default {
  getCharacterData,
  getFilms,
}
