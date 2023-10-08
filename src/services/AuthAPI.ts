import { GetMeResponce } from '@/assets/types/AuthTypes.ts'
import { baseApi } from '@/services/base-api.ts'

const AuthAPI = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getMe: build.query<GetMeResponce, void>({
        query: () => {
          return {
            url: 'v1/auth/me',
            method: 'GET',
          }
        },
      }),
    }
  },
})

export const { useGetMeQuery } = AuthAPI
