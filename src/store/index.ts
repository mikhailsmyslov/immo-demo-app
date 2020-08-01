import { configureStore } from '@reduxjs/toolkit'

import news from './news'
import app from './app'

const slices = [news, app]

export const reducers = slices.reduce(
  (acc, slice) => ({ ...acc, [slice.name]: slice.reducer }),
  {}
)

interface IActions {
  [key: string]: Function
}

export const actions: IActions = slices.reduce(
  (acc, slice) => ({ ...acc, ...slice.actions }),
  {}
)

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
