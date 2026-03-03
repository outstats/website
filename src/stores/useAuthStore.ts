import { User } from "@/common/types/auth.types";
import { authApi } from "@/lib/api";
import { create } from "zustand";

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean

  initAuth: () => Promise<void>
  login: (code: string) => Promise<void>
  logout: () => Promise<void>

  refreshUser: () => Promise<void>
  setUser: (user: User | null) => void
  setAccessToken: (token: string | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,

  initAuth: async () => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      try {
        const user = await authApi.getMe()
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
          isLoading: false
        })
      } catch (e) {
        localStorage.removeItem('accessToken')
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false
        })
      }
    } else {
      set({ isLoading: false })
    }
  },

  login: async (code: string) => {
    set({ isLoading: true })

    try {
      const { accessToken, user } = await authApi.handleCallback(code)

      localStorage.setItem('accessToken', accessToken)

      set({
        user,
        accessToken,
        isAuthenticated: true,
        isLoading: false
      })
    } catch (e) {
      console.error(`Login failed:`, e)
      set({ isLoading: false })
      throw e
    }
  },

  logout: async () => {
    try {
      await authApi.logout()
    } catch (e) {
      console.error(`Logout error:`, e)
    } finally {
      localStorage.removeItem('accessToken')
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false
      })
    }
  },

  refreshUser: async () => {
    try {
      const user = await authApi.getMe()
      set({ user })
    } catch (e) {
      console.error(`Failed to refresh user:`, e)
    }
  },

  setUser: (user: User | null) => set({ user }),

  setAccessToken: (token: string | null) => set({ accessToken: token })
}))