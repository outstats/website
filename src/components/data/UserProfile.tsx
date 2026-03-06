'use client'

import { useAuthMe } from "@/lib/hooks/useAuth.hooks"
import { JSX } from "react"

export default function UserProfile(): JSX.Element | null {
  const { data: user, isLoading } = useAuthMe()

  if (isLoading) return (
    <p>Chargement du profil...</p>
  )

  if (!user) return null

  return (
    <p>Welcome {user.strava.stravaFirstName}. From {user.strava.stravaCountry}!</p>
  )
}