import {configureStore} from '@reduxjs/toolkit'

import gridSlice from './grid.slice'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

export const store = configureStore({
  reducer: {
    grid: gridSlice,
  },
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
