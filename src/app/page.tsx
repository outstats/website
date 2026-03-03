import StravaLoginButton from "@/components/auth/StravaLoginButton"
import StravaLogoutButton from "@/components/auth/StravaLogoutBtn"
import StravaSyncingIndicator from "@/components/auth/StravaSyncingIndicator"
import Stats from "@/components/data/Stats"
import UserProfile from "@/components/data/UserProfile"
import HomeContent from "@/components/pageContents/HomeContent"
import { JSX } from "react"

export default function Home(): JSX.Element {
  return (
    <div>
      <h1 className="text-2xl">OutStats</h1>
      
      <StravaLoginButton />
      <StravaLogoutButton />
      
      <HomeContent />
    </div>
  )
}
