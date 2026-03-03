import { stravaApi } from "@/lib/api"
import { useActivitiesStore } from "@/stores/useActivitiesStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { JSX, useEffect, useState } from "react"

interface ActivityStats {
  totalDistanceKm: number
  byCategory: Record<string, number>
}

export default function Stats(): JSX.Element | null {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const stats = useActivitiesStore((state) => state.stats)
  const isLoadingStats = useActivitiesStore((state) => state.isLoadingStats)
  const fetchStats = useActivitiesStore((state) => state.fetchStats)

  useEffect(() => {
    if (!isAuthenticated) return
    fetchStats()
  }, [isAuthenticated, fetchStats])

  if (isLoadingStats) return <p>Chargement des statistiques...</p>

  if (!stats) return null

  return ((
    <div>
      <div>
        <p><strong>Distance totale</strong></p>
        <p>{stats.totalDistanceKm.toFixed(1)} km</p>
      </div>

      {Object.entries(stats.byCategory).map(([category, distance]) => (
        <div key={category}>
          <p><strong>{category}</strong></p>
          <p>{distance.toFixed(1)} km</p>
        </div>
      ))}
    </div>
  ))
}