import { CardsItems, CreateCardsRequest } from '@/assets/types/DecksTypes.ts'
import { baseApi } from '@/services/base-api.ts'

const CardsAPI = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getCardById: build.query<CardsItems, string>({
        query: id => {
          return {
            url: `/v1/cards/${id}`,
            method: 'GET',
          }
        },
        providesTags: ['Cards'],
      }),
      addCard: build.mutation<CardsItems, CreateCardsRequest & { id: string }>({
        query: ({ id, ...data }) => {
          return {
            url: `/v1/decks/${id}/cards`,
            method: 'POST',
            body: data,
          }
        },
        invalidatesTags: ['Cards', 'Deck'],
      }),
      updateCardById: build.mutation<CardsItems, CreateCardsRequest>({
        query: id => {
          return {
            url: `v1/decks/${id}`,
            method: 'PATCH',
          }
        },
        invalidatesTags: ['Cards', 'Deck'],
      }),
    }
  },
})

export const { useGetCardByIdQuery, useAddCardMutation } = CardsAPI
