"use client"
import { JSX, useEffect, useState } from "react"

export default function ThemeSwitch(): JSX.Element {
  // const [isDarkTheme, setIsDarkTheme] = useState<Boolean>(false)
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)

  useEffect((): void => {
    const savedTheme: string | null = localStorage.getItem("theme")
    const isInitiallyDark: boolean = savedTheme === "dark"
    setIsDarkTheme(isInitiallyDark)

    if (isInitiallyDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [])

  const toggleTheme = (): void => {
    const newThemeIsDark: boolean = !isDarkTheme
    setIsDarkTheme(newThemeIsDark)

    localStorage.setItem("theme", newThemeIsDark ? "dark" : "light")

    if (newThemeIsDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }

  return (
    <button onClick={toggleTheme} type="button" aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}>
      {isDarkTheme ? <p>Toggle light</p> : <p>Toggle dark</p>}
    </button>
  )
}
