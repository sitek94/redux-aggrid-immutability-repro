import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {FilterModel} from 'ag-grid-community'
export interface GridSlice {
  filterModel: FilterModel | null
}

const initialState: GridSlice = {
  filterModel: null,
}

export const gridSlice = createSlice({
  name: 'grid',
  initialState: () => {
    const storedFilterModel = localStorage.getItem('filterModel')

    if (storedFilterModel) {
      return {
        filterModel: JSON.parse(storedFilterModel),
      }
    }

    return initialState
  },
  reducers: {
    saveFilterModel: (state, action: PayloadAction<FilterModel | null>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log('action.payload', action.payload)

      state.filterModel = action.payload
    },
  },
})

export const {saveFilterModel} = gridSlice.actions

export default gridSlice.reducer
