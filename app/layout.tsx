import type React from "react"
import type { Metadata } from "next"
import { Readex_Pro, DM_Sans } from "next/font/google"
import "./globals.css"
import AIChatWidget from "@/components/ai-chat-widget"
import { Analytics } from "@vercel/analytics/next"

const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-readex",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-beausite",
  display: "swap",
})

export const metadata: Metadata = {
  title: "جادوا - شركة السياحة والسفر | Jado Travel Agency",
  description: "اكتشف أجمل الوجهات السياحية مع شركة جادوا للسياحة والسفر",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${readexPro.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <AIChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
