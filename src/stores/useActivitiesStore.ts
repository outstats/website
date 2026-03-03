import { ActivityStats, StravaActivity } from "@/common/types/auth.types";
import { stravaApi } from "@/lib/api";
import { create } from "zustand";

interface ActivitiesState {
  stats: ActivityStats | null
  activities: StravaActivity[]
  activitiesCount: number

  isSynced: boolean
  isPolling: boolean

  isLoadingStats: boolean
  isLoadingActivities: boolean

  fetchStats: () => Promise<void>
  fetchActivities: (limit?: number, offset?: number) => Promise<void>
  fetchActivityCount: () => Promise<void>

  checkSyncStatus: () => Promise<void>
  startPolling: () => void
  stopPolling: () => void
}

export const useActivitiesStore = create<ActivitiesState>((set) => {
  let interval: NodeJS.Timeout | null = null

  return {
    stats: null,
    activities: [],
    activitiesCount: 0,

    isSynced: false,
    isPolling: false,

    isLoadingStats: true,
    isLoadingActivities: true,

    fetchStats: async () => {
      set({ isLoadingStats: true })
      try {
        const data = await stravaApi.getStats()
        set({ stats: data })
      } catch (e) {
        console.error(`Failed to fetch stats:`, e)
      } finally {
        set({ isLoadingStats: false })
      }
    },

    fetchActivities: async (limit: number = 30, offset: number = 0) => {
      set({ isLoadingActivities: true })
      try {
        const data = await stravaApi.getActivities(limit, offset)
        set({ activities: data })
      } catch (e) {
        console.error(`Failed to fetch activities:`, e)
      } finally {
        set({ isLoadingActivities: false })
      }
    },

    fetchActivityCount: async () => {
      //
    },

    checkSyncStatus: async () => {
      try {
        const { isSynced } = await stravaApi.getSyncStatus()
        set({ isSynced })
      } catch (e) {
        console.error(`Failed to check sync status:`, e)
      }
    },

    startPolling: () => {
      set({ isPolling: true })

      if (interval) clearInterval(interval)

      interval = setInterval(async () => {
        const { isSynced: currentSyncStatus } = await stravaApi.getSyncStatus()

        set({ isSynced: currentSyncStatus })

        if (currentSyncStatus) {
          set({ isPolling: false })
          if (interval) clearInterval(interval)
          interval = null
        }
      }, 1000)
    },

    stopPolling: () => {
      set({ isPolling: false })
      if (interval) clearInterval(interval)
      interval = null
    }
  }
})