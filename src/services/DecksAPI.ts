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
      getDecksByAuthorId: build.query<any, any>({
        query: id => {
          return {
            url: `/v1/decks/${id}`,
            method: 'GET',
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
        providesTags: ['Cards'],
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
      addNewCard: build.mutation<any, any>({
        query: ({ id, ...data }) => {
          return {
            url: `/v1/decks/${id}/cards`,
            method: 'POST',
            body: data,
          }
        },
        async onQueryStarted(id, { queryFulfilled, dispatch }) {
          try {
            const { data } = await queryFulfilled

            dispatch(
              DecksAPI.util.updateQueryData('getCardsById', id, draft => {
                draft.items.unshift(data.items)
              })
            )
          } catch (e) {
            console.log(e)
          }
        },
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useGetCardsByIdQuery,
  useAddDeckMutation,
  useRemoveDeckMutation,
  useGetDecksByAuthorIdQuery,
  useAddNewCardMutation,
} = DecksAPI
