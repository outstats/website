import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AuthInitializer from "@/components/auth/AuthInitializer"
import "../style/globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "OutStats",
  description: "The OutStats website",
  icons: "/images/logos/outstats.png"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="fr">
      <body className={`flex-col justify-between ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthInitializer>
          <div className="min-h-screen">
            <Navbar />
            {children}
          </div>

          <Footer />
        </AuthInitializer>
      </body>
    </html>
  )
}