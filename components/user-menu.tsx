"use client"

import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { LogOut, Logs, UserRound } from "lucide-react"

import { getUserFromCookies } from "@/lib/utils"

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

  const user = getUserFromCookies()

  const handleLogout = () => {
    Cookies.remove("user")
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
        <DropdownMenuItem>
          <Logs /> Meus Pedidos
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
