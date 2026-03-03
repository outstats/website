'use client'

import { useAuthStore } from "@/stores/useAuthStore";
import { ReactNode, useEffect } from "react";

export default function AuthInitializer({ children }: { children: ReactNode }) {
  const initAuth = useAuthStore((state) => state.initAuth)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  return <>{children}</>
}