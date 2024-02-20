import { configureStore } from '@reduxjs/toolkit'
import { countriesReducer } from './Slices/CountriesSlice'

export const store = configureStore({
  reducer: {
    countriesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch