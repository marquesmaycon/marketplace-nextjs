"use client"

import Image from "next/image" 
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { ThemeSwitcher } from "@/components/theme-switcher"
import { getUserFromCookies } from "@/features/auth/actions"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const user = getUserFromCookies()

    if (user) {
      router.push("/")
    }
  }, [router])

  return (
    <main className="relative grid h-full place-items-center">
      <div className="absolute top-8 right-8">
        <ThemeSwitcher />
      </div>
      <Image src="/logoipsum.svg" alt="Logo" width={150} height={37} className="mx-auto mb-4" />
      {children}
    </main>
  )
}
