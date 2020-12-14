import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store'
import { apiFilms } from '../../api'
import { Film } from '../../types'

const { getCharacterData, getFilms } = apiFilms

type FilmState = {
  isLoading: boolean
  isFilmLoading: boolean
  error: string | null
  characterName: string
  films: Film[]
}

const initialState: FilmState = {
  isLoading: true,
  isFilmLoading: true,
  error: null,
  characterName: '',
  films: [],
}

const slice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    getCharacterDetailsActionStart(state) {
      state.isLoading = true
      state.error = null
    },
    getFilmsActionStart(state) {
      state.isFilmLoading = true
      state.error = null
    },
    filmsActionFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.isFilmLoading = false
      state.error = action.payload
    },
    getCharacterDetailsSuccess(
      state,
      action: PayloadAction<{ name: string }>
    ) {
      const { name } = action.payload

      state.characterName = name
      state.isLoading = false
      state.error = null
    },
    getCharacterFilmsSuccess(state, action: PayloadAction<Film[]>) {
      state.films = action.payload
      state.isFilmLoading = false
      state.error = null
    },
  },
})

export const {
  getCharacterDetailsActionStart,
  getFilmsActionStart,
  getCharacterDetailsSuccess,
  getCharacterFilmsSuccess,
  filmsActionFailure,
} = slice.actions

export const fetchCharacterFilms = (
  characterId: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(getCharacterDetailsActionStart())
    const { name, filmUrls } = await getCharacterData(characterId)
    dispatch(getCharacterDetailsSuccess({ name }))

    if (filmUrls.length === 0) {
      return
    }

    dispatch(getFilmsActionStart())
    const filmsData = await getFilms(filmUrls)
    dispatch(getCharacterFilmsSuccess(filmsData))
  } catch (error) {
    dispatch(filmsActionFailure(error.message))
  }
}

export default slice
