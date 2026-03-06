import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../api/queryKeys.api"
import { stravaService } from "../services/strava.service"


export function useStravaStats() {
  return useQuery({
    queryKey: queryKeys.strava.stats(),
    queryFn: () => stravaService.getStats(),
    staleTime: 1000 * 60 * 10,
    retry: 2
  })
}


export function useStravaActivities(limit: number = 30, offset: number = 0) {
  return useQuery({
    queryKey: queryKeys.strava.activity(limit, offset),
    queryFn: () => stravaService.getActivities(limit, offset),
    staleTime: 1000 * 60 * 5,
    retry: 2
  })
}


export function useStravaSyncStatus(enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.strava.syncStatus(),
    queryFn: () => stravaService.getSyncStatus(),
    refetchInterval: (query) => {
      if (
        query.state.data?.isSynced || 
        query.state.error
      ) {
        return false
      }
      return 2000
    },
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.code === 'UNAUTHORIZED') {
        return false
      }
      return failureCount < 3
    },
    enabled
  })
}