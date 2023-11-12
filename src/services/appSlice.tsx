import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '@/components'

const slice = createSlice({
  name: 'app',
  initialState: {
    forgottenEmail: '',
    searchParams: {
      orderBy: 'cardsCount-asc',
    },
    author: 'All Cards',
    sort: {
      key: 'cardsCount',
      direction: 'asc',
    } as Sort,
    currentPage: 1,
    itemsPerPage: 10,
    rangeValue: ['1', '10'],
    searchName: '',
  },
  reducers: {
    setAuthor: (state, action: PayloadAction<string>) => {
      state.author = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setEmail: (state, action) => {
      state.forgottenEmail = action.payload
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload
    },
    setRangeValue: (state, action) => {
      state.rangeValue = action.payload
    },
    setSearchName: (state, action) => {
      state.searchName = action.payload
    },
    setSearchParams: (state, action) => {
      state.searchParams = action.payload
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload
    },
  },
})

export const appActions = slice.actions
export const appReducer = slice.reducer
