import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'app',
  initialState: {
    forgottenEmail: '',
    searchParams: {
      itemsPerPage: 10,
      orderBy: 'cardsCount-asc',
    },
    author: 'All Cards',
  },
  reducers: {
    setEmail: (state, action) => {
      state.forgottenEmail = action.payload
    },
    setSearchParams: (state, action) => {
      state.searchParams = action.payload
    },
    setAuthor: (state, action: PayloadAction<string>) => {
      state.author = action.payload
    },
  },
})

export const appActions = slice.actions
export const appReducer = slice.reducer
