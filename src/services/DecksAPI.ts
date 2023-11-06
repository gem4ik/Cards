import {
  addDeckRequest,
  CardsResponse,
  DeckByIdResponse,
  DeckResponce,
  GetDeckParams,
} from '@/assets/types/DecksTypes.ts'
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
      getDecksByAuthorId: build.query<DeckByIdResponse, string>({
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
      addDeck: build.mutation<DeckByIdResponse, Partial<addDeckRequest>>({
        query: body => {
          return {
            url: `/v1/decks`,
            method: 'POST',
            body,
          }
        },
        invalidatesTags: ['Deck'],
      }),
      updateDeck: build.mutation<DeckByIdResponse, Partial<addDeckRequest> & { id: string }>({
        query: ({ id, ...data }) => {
          return {
            url: `/v1/decks/${id}`,
            method: 'PATCH',
            body: data,
          }
        },
        async onQueryStarted({ id, ...data }, { getState, queryFulfilled, dispatch }) {
          const state = getState() as RootState
          const { searchParams } = state.app
          const patchResult = dispatch(
            DecksAPI.util.updateQueryData('getDecks', searchParams, draft => {
              const deckIndex = draft.items.findIndex(el => el.id === id)

              if (deckIndex !== -1) {
                draft.items[deckIndex] = { ...draft.items[deckIndex], ...data }
              }
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
      removeDeck: build.mutation<Omit<DeckByIdResponse, 'author'>, string>({
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

export const {
  useGetDecksQuery,
  useGetCardsByIdQuery,
  useAddDeckMutation,
  useRemoveDeckMutation,
  useGetDecksByAuthorIdQuery,
  useUpdateDeckMutation,
} = DecksAPI
