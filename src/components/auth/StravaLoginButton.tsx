'use client'

import { useLogin } from "@/lib/hooks/useAuth.hooks"
import { JSX } from "react"

export default function StravaLoginButton(): JSX.Element {
  const { mutate, isPending } = useLogin()

  const handleLogin = async () => {
    const authUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/strava`
    window.location.href = authUrl
  }

  return (
    <button
      onClick={handleLogin}
      disabled={isPending}
      className="bg-orange-300 cursor-pointer"
    >
      {
        isPending
          ? 'Connexion...'
          : 'Se connecter avec Strava'
      }
    </button>
  )
}