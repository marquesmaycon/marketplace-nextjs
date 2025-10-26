"use client"

import { QueryClientProvider } from "@tanstack/react-query"

import { getQueryClient } from "@/lib/tanstack-query"
import { ThemeProvider } from "@/providers/theme-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
