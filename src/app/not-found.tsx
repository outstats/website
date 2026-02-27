'use client'

import { usePathname } from "next/navigation"
import { useRouter } from "next/router"

export default function NotFound() {
  const router = useRouter()
  const pathName = usePathname()

  return (
    <div>
      <h1 className="text-2xl">Erreur 404</h1>
      <p>La page {pathName} n'existe pas</p>

      <button
        onClick={() => router.back()}
        type='button'
      >
        Retour
      </button>
    </div>
  )
}