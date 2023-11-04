import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '@/components'

const slice = createSlice({
  name: 'app',
  initialState: {
    forgottenEmail: '',
    searchParams: {
      itemsPerPage: 10,
      orderBy: 'cardsCount-asc',
    },
    author: 'All Cards',
    sort: {
      key: 'cardsCount',
      direction: 'asc',
    } as Sort,
    currentPage: 1 as number,
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
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
})

export const appActions = slice.actions
export const appReducer = slice.reducer
