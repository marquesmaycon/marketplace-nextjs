"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import LogoIpsum from "@/public/logoipsum.svg"
import { Cart } from "@/components/cart"
import { CartProvider } from "@/contexts/cart-context"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { UserMenu } from "@/components/user-menu"
import { getUserFromCookies } from "@/lib/utils"

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
      <header className="fixed inset-x-0 top-0 z-30">
        <div className="relative z-10 mb-4 rounded-b-2xl p-1.5 shadow-md">
          <div className="from-delft-blue-2/50 via-tiffany-blue/50 to-sky-magenta/50 dark:from-tiffany-blue/50 dark:via-delft-blue/50 dark:to-sky-magenta/50 absolute inset-0 -z-10 rounded-b-2xl bg-linear-to-r backdrop-blur-lg" />
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-1">
              <Link href="/">
                <Image src={LogoIpsum} alt="Logo Ipsum" width={80} height={50} />
              </Link>
              <div className="flex items-center gap-2">
                <Cart />
                <UserMenu />
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 pt-20">{children}</main>
    </CartProvider>
  )
}
