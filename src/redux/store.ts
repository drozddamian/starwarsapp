import {
  configureStore,
  getDefaultMiddleware,
  Action,
} from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import rootReducer, { RootState } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
  devTools: true,
})

export type AppThunk = ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
>
