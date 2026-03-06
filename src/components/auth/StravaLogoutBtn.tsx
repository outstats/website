'use client'

import { useLogout } from "@/lib/hooks/useAuth.hooks"
import { useRouter } from "next/navigation"
import { JSX } from "react"

export default function StravaLogoutButton(): JSX.Element {
  const router = useRouter()
  const { mutate: logout, isPending } = useLogout()

  const handleLogout = async () => {
    logout(undefined, {
      onSuccess: () => {
        router.push('/')
      }
    })
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="bg-orange-300 cursor-pointer"
    >
      {
        isPending
          ? 'Deconnexion...'
          : 'Se déconnecter de Strava'
      }     
    </button>
  )
}