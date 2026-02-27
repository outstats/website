import { JSX } from "react";
import Link from "next/link"
import ThemeSwitch from "@/components/buttons/ThemeSwitch"

export default function(): JSX.Element {
  return (
    <nav className="flex justify-between">
      <div className="flex gap-3">
        <Link href='/'>
          Home
        </Link>

        <Link href='/about'>
          About
        </Link>
      </div>

      <ThemeSwitch />
    </nav>
  )
}