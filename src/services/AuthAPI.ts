import {
  EditProfileRequest,
  EditProfileResponse,
  GetMeResponce,
  LoginResponse,
  SignUpRequest,
  SignUpResponses,
} from '@/assets'
import { Data } from '@/components'
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
      logout: build.mutation<void, void>({
        query: () => ({
          url: '/v1/auth/logout',
          method: 'POST',
        }),
      }),
      editProfile: build.mutation<EditProfileResponse, EditProfileRequest>({
        query: body => {
          return {
            url: '/v1/auth/me',
            method: 'PATCH',
            body,
          }
        },
        onQueryStarted: async (body, { queryFulfilled, dispatch }) => {
          const patchResult = dispatch(
            AuthAPI.util.updateQueryData('getMe', undefined, draft => {
              draft.name = body.name!
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Me'],
      }),
      editProfileAvatar: build.mutation<EditProfileResponse, FormData>({
        query: body => {
          return {
            url: '/v1/auth/me',
            method: 'PATCH',
            body,
          }
        },
        invalidatesTags: ['Me'],
      }),
    }
  },
})

export const {
  useGetMeQuery,
  useSignUpMutation,
  useSignInMutation,
  useLogoutMutation,
  useEditProfileMutation,
  useEditProfileAvatarMutation,
} = AuthAPI
