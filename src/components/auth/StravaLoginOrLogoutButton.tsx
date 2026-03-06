'use client'

import { useAuthMe } from "@/lib/hooks/useAuth.hooks";
import { JSX } from "react";
import StravaLoginButton from "./StravaLoginButton";
import StravaLogoutButton from "./StravaLogoutBtn";

export default function StravaLoginOrLogoutButton(): JSX.Element {
  const { data: user, isLoading } = useAuthMe()

  if (isLoading) return (
    <p>Chargement [StravaLoginOrLogoutButton]...</p>
  )

  return (
    user
      ? <StravaLogoutButton />
      : <StravaLoginButton />
  )
}