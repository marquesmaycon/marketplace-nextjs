"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { getUserFromCookies } from "@/features/auth/actions"

type AuthGateProps = {
  type?: "public" | "protected"
  children: React.ReactNode
}

export default function AuthGate({ children, type = "protected" }: AuthGateProps) {
  const router = useRouter()

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return getUserFromCookies()
    }
  })

  useEffect(() => {
    if (isLoading) return

    if (type === "protected" && !user) {
      router.replace("/register")
      return
    }

    if (type === "public" && user) {
      router.replace("/")
      return
    }
  }, [user, router, type, isLoading])

  if (isLoading) return null
  if (type === "protected" && !user) return null
  if (type === "public" && user) return null

  return <>{children}</>
}
