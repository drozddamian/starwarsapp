import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store'
import { apiCharacters } from '../../api'
import { Character, CharactersApiPayload } from '../../types'

const { getCharacters, getSpeciesName } = apiCharacters

type CharactersState = {
  isLoading: boolean
  error: string | null
  characters: Character[]
  allCharactersCount: number
}

const initialState: CharactersState = {
  isLoading: false,
  error: null,
  characters: [],
  allCharactersCount: 0,
}

const slice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    characterActionStart(state) {
      state.isLoading = true
      state.error = null
    },
    characterActionFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    getCharactersSuccess(
      state,
      action: PayloadAction<CharactersApiPayload>
    ) {
      const { characters, count } = action.payload

      state.characters = characters
      state.allCharactersCount = count
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  characterActionStart,
  characterActionFailure,
  getCharactersSuccess,
} = slice.actions

const addSpeciesNameToCharacter = async (character: Character) => {
  const { species } = character

  const speciesName =
    species.length === 0 ? 'Unknown' : await getSpeciesName(species[0])

  return {
    ...character,
    species: `${speciesName} species`,
  }
}

export const fetchCharacters = (
  paginationPage: string | number
): AppThunk => async (dispatch) => {
  try {
    dispatch(characterActionStart())
    const { characters, count } = await getCharacters(paginationPage)

    const charactersWithSpecies = await Promise.all(
      characters.map(addSpeciesNameToCharacter)
    )

    dispatch(
      getCharactersSuccess({
        count,
        characters: charactersWithSpecies,
      })
    )
  } catch (error) {
    dispatch(characterActionFailure(error))
  }
}

export default slice
