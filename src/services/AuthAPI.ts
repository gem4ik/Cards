import { GetMeResponce, SignUpRequest, SignUpResponses } from '@/assets/types/AuthTypes.ts'
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
      signUp: build.mutation<SignUpResponses, SignUpRequest>({
        query: body => {
          return {
            url: 'v1/auth/sign-up',
            method: 'POST',
            body,
          }
        },
      }),
    }
  },
})

export const { useGetMeQuery, useSignUpMutation } = AuthAPI
