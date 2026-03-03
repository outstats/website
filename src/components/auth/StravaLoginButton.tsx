'use client'

import { useAuthStore } from "@/stores/useAuthStore"
import { useRouter } from "next/navigation"
import { JSX } from "react"

export default function StravaLoginButton(): JSX.Element | null {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const handleLogin = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
    window.location.href = `${apiUrl}/auth/strava`
  }

  if (isAuthenticated) return null

  return (
    <button
      onClick={handleLogin}
      className="bg-orange-300 cursor-pointer"
    >
      Se connecter avec Strava
    </button>
  )
}