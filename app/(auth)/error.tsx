"use client"

import { RefreshCcw } from "lucide-react"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="space-y-4 text-center">
      <h2 className="font-sans">{error.message}</h2>
      <Button variant="secondary" onClick={() => reset()} className="mx-auto text-center">
        Recarregar página <RefreshCcw />
      </Button>
    </div>
  )
}
