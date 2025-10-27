import "./globals.css"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner"

import { Footer } from "@/components/layout/footer"

import Providers from "./providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Marketplace Next.js",
  description: "Um marketplace construído com Next.js, TypeScript e Tailwind CSS com backend simulado."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex h-screen flex-col antialiased`}>
        <Providers>{children}</Providers>
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  )
}
