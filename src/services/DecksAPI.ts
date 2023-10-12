import { CardsResponse, DeckResponce, GetDeckParams } from '@/assets/types/DecksTypes.ts'
import { baseApi } from '@/services/base-api.ts'
import { RootState } from '@/services/store.ts'

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
        providesTags: ['Deck'],
      }),
      getCardsById: build.query<CardsResponse, string>({
        query: id => {
          return {
            url: `v1/decks/${id}/cards`,
            method: 'GET',
          }
        },
      }),
      addDeck: build.mutation<any, any>({
        query: body => {
          return {
            url: `/v1/decks`,
            method: 'POST',
            body,
          }
        },
        invalidatesTags: ['Deck'],
      }),
      removeDeck: build.mutation<any, string>({
        query: id => {
          return {
            url: `/v1/decks/${id}`,
            method: 'DELETE',
          }
        },
        async onQueryStarted(id, { getState, queryFulfilled, dispatch }) {
          const state = getState() as RootState
          const { searchParams } = state.app
          const patchResult = dispatch(
            DecksAPI.util.updateQueryData('getDecks', searchParams, draft => {
              draft.items.splice(
                draft.items.findIndex(el => el.id === id),
                1
              )
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Deck'],
      }),
    }
  },
})

export const { useGetDecksQuery, useGetCardsByIdQuery, useAddDeckMutation, useRemoveDeckMutation } =
  DecksAPI
