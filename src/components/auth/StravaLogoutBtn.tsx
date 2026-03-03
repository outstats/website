'use client'

import { useAuthStore } from "@/stores/useAuthStore"
import { useRouter } from "next/navigation"
import { JSX } from "react"

export default function StravaLogoutButton(): JSX.Element | null {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (!isAuthenticated) return null

  return (
    <button
      onClick={handleLogout}
      className="bg-orange-300 cursor-pointer"
    >
      Se déconnecter de Strava
    </button>
  )
}