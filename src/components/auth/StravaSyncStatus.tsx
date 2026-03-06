'use client'

import { useStravaSyncStatus } from "@/lib/hooks/useStrava.hooks"
import { JSX } from "react"

export default function StravaSyncStatus(): JSX.Element {
  const { data: syncStatus, isLoading, error } = useStravaSyncStatus()

  if (isLoading) {
    return <p>Vérification du status de la synchronisation...</p>
  }

  if (error) {
    return <p>Erreur lors de la synchronisation des activités</p>
  }

  return (
    syncStatus?.isSynced
      ? <p>Activités synchronisées</p>
      : <p>Synchronisation en cours...</p>
  )
}