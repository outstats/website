import { API_ERRORS, ApiError, handleApiResponse } from "./errors.api"


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL


interface RequestOptions extends RequestInit {
  skipAuth?: boolean
}


export class ApiClient {
  private static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('accessToken')
  }


  static setToken(token: string | null): void {
    if (token) {
      localStorage.setItem('accessToken', token)
    } else {
      localStorage.removeItem('accessToken')
    }
  }


  private static async request<T>(endpoint: string, options: RequestOptions): Promise<T> {
    const { skipAuth = false, ...fetchOptions } = options

    const headers = new Headers(fetchOptions.headers)
    headers.set('Content-Type', 'application/json')

    if (!skipAuth) {
      const token = this.getToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
    }

    let res: Response
    try {
      res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...fetchOptions,
        headers
      })
    } catch (e) {
      throw new ApiError(0, API_ERRORS.NETWORK_ERROR, 'Network request failed', e)
    }

    if (res.status === 401 && !skipAuth) {
      this.setToken(null)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth:tokenExpired'))
      }
      throw new ApiError(401, API_ERRORS.UNAUTHORIZED, 'Token expired')
    }

    return handleApiResponse<T>(res)
  }


  static async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { 
      ...options, 
      method: 'GET' 
    })
  }


  static async post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined
    })
  }


  static async put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined
    })
  }

  static async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE'
    })
  }
}