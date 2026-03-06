import { CallbackResponse, User } from "@/common/types/auth.types"
import { ApiClient } from "../api/client.api"

export const authService = {
  
  getStravaAuthUrl: async (): Promise<string> => {
    return `${process.env.NEXT_PUBLIC_API_URL}/auth/strava`
  },


  handleCallback: async (code: string): Promise<CallbackResponse> => {
    return ApiClient.post<CallbackResponse>(
      `/auth/strava/callback`,
      { code }
    )
  },


  getMe: async (): Promise<User> => {
    return ApiClient.get<User>(
      `/auth/me`
    )
  },


  logout: async (): Promise<void> => {
    return ApiClient.post<void>(
      `/auth/logout`
    )
  }
}