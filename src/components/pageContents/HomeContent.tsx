'use client'

import { useStravaSyncStatus } from "@/lib/hooks/useStrava.hooks"
import { JSX } from "react"
import StravaSyncingIndicator from "../auth/StravaSyncStatus"
import UserProfile from "../data/UserProfile"
import Stats from "../data/Stats"

export default function HomeContent(): JSX.Element {
  const { data: syncStatus, isLoading, error } = useStravaSyncStatus()

  if (isLoading) return (
    <p>Vérification du statut de la synchroniation...</p>
  )

  if (error) return (
    <p>Erreur lors de la synchronisation des données</p>
  )

  return (
    syncStatus?.isSynced ? (
      <div>
        <StravaSyncingIndicator />
        <UserProfile />
        <Stats />
      </div>
    ) : (
      <div>
        <p>Connectez votre compte Strava pour voir les statistiques</p>
      </div>
    )
  )
}