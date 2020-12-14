import { combineReducers } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import characters from './characters'
import films from './films'

const rootReducer = combineReducers({
  characters: characters.reducer,
  films: films.reducer,
})

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
