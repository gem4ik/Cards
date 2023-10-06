import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from '@/services/appSlice.tsx'
import { baseApi } from '@/services/base-api.ts'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
