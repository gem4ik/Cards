import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: build => {
    return {
      getDecks: build.query<any, void>({
        query: () => 'v1/decks',
      }),
    }
  },
})

export const { useGetDecksQuery } = baseApi
