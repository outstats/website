'use client'

import { useActivitiesStore } from "@/stores/useActivitiesStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { JSX, useEffect, useState } from "react"

export default function StravaSyncingIndicator(): JSX.Element | null {
  const [showMessage, setShowMessage] = useState(true)

  const { isAuthenticated } = useAuthStore()
  const { isSynced, isPolling, startPolling } = useActivitiesStore()

  useEffect(() => {
    if (!isAuthenticated) return
    startPolling()
  }, [isAuthenticated, startPolling])

  useEffect(() => {
    if (isSynced) {
      const timeout = setTimeout(() => {
        setShowMessage(false)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [isSynced])

  if (!showMessage) return null 

  return (
    <div>
      {isPolling ? (
        <p>Synchronisation en cours...</p>
      ) : (
        <p>Synchronisation terminée !</p>
      )}
    </div>
  )
}