import { useStravaStats } from "@/lib/hooks/useStrava.hooks"
import { JSX } from "react"

export default function Stats(): JSX.Element | null {
  const { data: stats, isLoading, error } = useStravaStats()

  if (isLoading) return (
    <p>Chargement des statistiques...</p>
  )

  if (error) return (
    <p>Erreur lors du chargement des statistiques</p>
  )

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