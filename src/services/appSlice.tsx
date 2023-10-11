import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'app',
  initialState: {
    forgottenEmail: '',
    searchParams: {
      currentPage: 1,
      itemsPerPage: 10,
      orderBy: 'cardsCount-asc',
    },
  },
  reducers: {
    setEmail: (state, action) => {
      state.forgottenEmail = action.payload
    },
    setSearchParams: (state, action) => {
      state.searchParams = action.payload
    },
  },
})

export const appActions = slice.actions
export const appReducer = slice.reducer
