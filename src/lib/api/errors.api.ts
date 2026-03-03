export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const API_ERRORS = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN: 'UNKNOWN'
} as const

function getErrorCode(status: number): string {
  const errorMap: Record<number, string> = {
    401: API_ERRORS.UNAUTHORIZED,
    403: API_ERRORS.FORBIDDEN,
    404: API_ERRORS.NOT_FOUND,
    422: API_ERRORS.NETWORK_ERROR
  }
  return errorMap[status] ?? API_ERRORS.UNKNOWN
}

export async function handleApiResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const code = getErrorCode(res.status)
    let details: unknown

    try {
      details = await res.json()
    } catch {
      details = res.statusText
    }

    throw new ApiError(
      res.status,
      code,
      `Request failed: ${res.status} ${res.statusText}`,
      details
    )
  }
  
  return res.json()
}