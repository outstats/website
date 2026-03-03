'use client'

import { useAuthStore } from "@/stores/useAuthStore"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function StravaCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const login = useAuthStore((state) => state.login)

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const error = searchParams.get('error')

      if (error) {
        console.error(`Strava authorization error:`, error)
        router.push('/')
        return
      }

      if (!code) {
        console.error(`No authorization code received`)
        router.push('/')
        return
      }

      try {
        await login(code)
        router.push('/')
      } catch (e) {
        console.error(`Login failed:`, error)
        router.push('/')
      }
    }
    handleCallback()
  }, [searchParams, login, router])

  return (
    <div>
      <p>Connexion en cours...</p>
    </div>
  )
}