import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'app',
  initialState: {
    forgottenEmail: '',
  },
  reducers: {
    setEmail: (state, action) => {
      state.forgottenEmail = action.payload
    },
  },
})

export const appActions = slice.actions
export const appReducer = slice.reducer
