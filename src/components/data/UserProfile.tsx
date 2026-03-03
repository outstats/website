'use client'

import { useAuthStore } from "@/stores/useAuthStore"
import { JSX } from "react"

export default function UserProfile(): JSX.Element | null {
  const user = useAuthStore((state) => state.user)

  if (!user) return null

  const stravaProfile = user.strava

  return (
    <p>Welcome {stravaProfile.stravaFirstName}. From {stravaProfile.stravaCountry}!</p>
  )
}