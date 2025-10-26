"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { CartProvider } from "@/contexts/cart-context"
import { getUserFromCookies } from "@/lib/utils"
import { Header } from "@/components/layout/header"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const user = getUserFromCookies()

    if (!user) {
      router.push("/register")
    }
  }, [router])

  return (
    <CartProvider>
      <Header />
      <main className="container mx-auto px-4 py-20">{children}</main>
    </CartProvider>
  )
}
