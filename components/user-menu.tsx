"use client"

import { useQueryClient } from "@tanstack/react-query"
import { LogOut, Logs, UserRound } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { getUserFromCookies, logoutUser } from "@/features/auth/actions"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"

export function UserMenu() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const user = getUserFromCookies()

  async function handleLogout() {
    await logoutUser()
    queryClient.clear()
    toast.success("Você saiu")
    router.push("/register")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <UserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-sans">{user?.name.split(" ").splice(0, 2).join(" ")}</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/my-orders">
            <Logs /> Meus Pedidos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
