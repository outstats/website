import { StravaActivity, User, ActivityStats, CallbackResponse, SyncStatusResponse } from "@/common/types/auth.types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export class ApiClient {
  
  private static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('accessToken')
  }

  
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken()

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>)
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }
    return res.json()
  }


  static async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { 
      method: 'GET' 
    })
  }


  static async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined
    })
  }
}


export const authApi = {
  
  getStravaAuthUrl: async (): Promise<string> => {
    return `${API_BASE_URL}/auth/strava`
  },


  handleCallback: async (code: string): Promise<CallbackResponse> => {
    return ApiClient.post('/auth/strava/callback', { code })
  },


  getMe: async (): Promise<User> => {
    return ApiClient.get('/auth/me')
  },


  logout: async () => {
    return ApiClient.post('/auth/logout')
  }
}


export const stravaApi = {

  getSyncStatus: async (): Promise<SyncStatusResponse> => {
    return ApiClient.get('/strava/sync-status')
  },


  getStats: async (): Promise<ActivityStats> => {
    return ApiClient.get('/strava/stats')
  },


  getActivities: async (limit: number = 30, offset: number = 0): Promise<StravaActivity[]> => {
    return ApiClient.get(`/strava/activities?limit=${limit}&offset=${offset}`)
  }
}