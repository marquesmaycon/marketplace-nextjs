// "use client"

// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

import { Header } from "@/components/layout/header"
import { CartProvider } from "@/contexts/cart-context"
import AuthGate from "@/features/auth/auth-gate"
// import { getUserFromCookies } from "@/features/auth/actions"

export default function Layout({ children }: { children: React.ReactNode }) {
  // const router = useRouter()

  // useEffect(() => {
  //   const user = getUserFromCookies()

  //   if (!user) {
  //     router.push("/register")
  //   }
  // }, [router])

  return (
    <CartProvider>
      <Header />
      <main className="container mx-auto px-4 py-20">
        <AuthGate type="protected">{children}</AuthGate>
      </main>
    </CartProvider>
  )
}
