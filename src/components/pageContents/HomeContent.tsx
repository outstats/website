'use client'

import { useActivitiesStore } from "@/stores/useActivitiesStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { JSX, useEffect } from "react"
import StravaSyncingIndicator from "../auth/StravaSyncingIndicator"
import UserProfile from "../data/UserProfile"
import Stats from "../data/Stats"

export default function HomeContent(): JSX.Element {
  const { isLoading, isAuthenticated } = useAuthStore()
  const { fetchStats, fetchActivities } = useActivitiesStore()

  useEffect(() => {
    if (!isAuthenticated) return
    fetchStats()
    fetchActivities()
  }, [isAuthenticated, fetchStats, fetchActivities])

  if (isLoading) return <p>Chargement...</p>

  return (
    <>
      {isAuthenticated ? (
        <div>
          <StravaSyncingIndicator />
          <UserProfile />
          <Stats />
        </div>
      ) : (
        <div>
          <p>Connectez votre compte Strava pour voir les statistiques</p>
        </div>
      )}
    </>
  )
}