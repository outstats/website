export const queryKeys = {
  auth: {
    all: ['auth'] as const,

    me: () => [...queryKeys.auth.all, 'me'] as const
  },

  strava: {
    all: ['strava'] as const,

    activities: () => [...queryKeys.strava.all, 'activities'] as const,
    activity: (limit?: number, offset?: number) => [...queryKeys.strava.activities(), { limit, offset }] as const,
    stats: () => [...queryKeys.strava.all, 'stats'] as const,
    syncStatus: () => [...queryKeys.strava.all, 'syncStatus'] as const
  }
  
} as const