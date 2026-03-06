'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useMemo } from "react"

export function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = useMemo(
    () => 
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            retry: (failureCount, error: any) => {
              if (
                error?.status === 401 ||
                error?.status === 403 ||
                error?.code === 'UNAUTHORIZED' ||
                error?.code === 'FORBIDDEN'
              ) {
                return false
              }

              return failureCount < 3
            },
            staleTime: 1000 * 60 * 1
          },

          mutations: {
            retry: 1
          }
        }
      }),
    []
  )

  return (
    <QueryClientProvider
      client={queryClient}
    >
      {children}
    </QueryClientProvider>
  )
}