export interface StravaProfile {
  stravaAthleteId: number
  stravaFirstName: string
  stravaLastName: string
  stravaSummit: boolean
  stravaCity: string
  stravaState: string
  stravaCountry: string
  stravaProfilePicture: string
  stravaCreatedAt: string
}

export interface User {
  id: number
  createdAt: string
  strava: StravaProfile
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface StravaActivity {
  id: number
  name: string
  type: string
  category: string
  distance: number
  movingTime: number
  elapsedTime: number
  startDateLocal: string
  timezone: string
  kudosCount: number
  commentCount: number
}

export interface ActivityStats {
  totalDistanceKm: number
  byCategory: Record<string, number>
}

export interface CallbackResponse {
  accessToken: string
  user: User
}

export interface SyncStatusResponse {
  isSynced: boolean
}