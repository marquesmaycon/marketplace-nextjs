"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { CartProvider } from "@/contexts/cart-context"
import { Header } from "@/components/layout/header"
import { getUserFromCookies } from "@/features/auth/actions"

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
