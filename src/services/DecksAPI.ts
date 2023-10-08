import { CardsResponse, DeckResponce, GetDeckParams } from '@/assets/types/DecksTypes.ts'
import { baseApi } from '@/services/base-api.ts'

const DecksAPI = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getDecks: build.query<DeckResponce, GetDeckParams>({
        query: params => {
          return {
            url: 'v1/decks',
            method: 'GET',
            params: params ?? {},
          }
        },
      }),
      getCardsById: build.query<CardsResponse, string>({
        query: id => {
          return {
            url: `v1/decks/${id}/cards`,
            method: 'GET',
          }
        },
      }),
    }
  },
})

export const { useGetDecksQuery, useGetCardsByIdQuery } = DecksAPI
