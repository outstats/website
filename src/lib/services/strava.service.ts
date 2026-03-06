import { ActivityStats, StravaActivity, SyncStatusResponse } from "@/common/types/auth.types"
import { ApiClient } from "../api/client.api"

export const stravaService = {

  getSyncStatus: async(): Promise<SyncStatusResponse> => {
    return ApiClient.get<SyncStatusResponse>(
      `/strava/sync-status`
    )
  },


  getStats: async(): Promise<ActivityStats> => {
    return ApiClient.get<ActivityStats>(
      `/strava/stats`
    )
  },


  getActivities: async (limit: number = 30, offset: number = 0): Promise<StravaActivity[]> => {
    return ApiClient.get<StravaActivity[]>(
      `/strava/activities?limit=${limit}&offset=${offset}`
    )
  }
}