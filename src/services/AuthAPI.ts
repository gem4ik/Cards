import {
  GetMeResponce,
  LoginResponse,
  SignUpRequest,
  SignUpResponses,
} from '@/assets/types/AuthTypes.ts'
import { Data } from '@/components/auth/signIn/signIn.tsx'
import { baseApi } from '@/services/base-api.ts'

const AuthAPI = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getMe: build.query<GetMeResponce, void>({
        query: () => {
          return 'v1/auth/me'
        },
        providesTags: ['Me'],
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
      SignIn: build.mutation<LoginResponse, Data>({
        query: body => {
          return {
            url: '/v1/auth/login',
            method: 'POST',
            body,
          }
        },
        invalidatesTags: ['Me'],
      }),
    }
  },
})

export const { useGetMeQuery, useSignUpMutation, useSignInMutation } = AuthAPI
