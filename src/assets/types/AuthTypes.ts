export type GetMeResponce = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}
export type SignUpRequest = {
  html?: string
  name?: string
  password: string
  email: string
  subject?: string
  sendConfirmationEmail?: boolean
}
export type SignUpResponses = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}
export type LoginResponse = {
  accessToken: string
}
export type EditProfileRequest = {
  avatar?: string
  name?: string
  email?: string
}
export type EditProfileResponse = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}
