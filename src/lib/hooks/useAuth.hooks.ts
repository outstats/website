import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "../api/queryKeys.api"
import { authService } from "../services/auth.service"
import { CallbackResponse } from "@/common/types/auth.types"
import { ApiClient } from "../api/client.api"
import { useEffect } from "react"


export function useAuthMe() {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: () => authService.getMe(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: typeof window !== 'undefined'
  })
}


export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (code: string): Promise<CallbackResponse> => {
      const res = await authService.handleCallback(code)

      ApiClient.setToken(res.accessToken)

      return res
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me(), data.user)
    },
    onError: (error) => {
      console.error(`Login failed:`, error)
    }
  })
}


export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      ApiClient.setToken(null)
      queryClient.removeQueries({ queryKey: queryKeys.auth.all })
      queryClient.removeQueries({ queryKey: queryKeys.strava.all })
    },
    onError: (error) => {
      console.error(`Logout failed:`, error)
    }
  })
}


export function useInitAuth() {
  const { data: user, isLoading, error } = useAuthMe()

  useEffect(() => {
    if (!isLoading) {
      window.dispatchEvent(new CustomEvent(`auth:initialized`, { detail: { user, error } }))
    }
  }, [user, isLoading, error])

  return {
    user,
    isLoading,
    error,
    isAuthentificated: !!user && !error
  }
}