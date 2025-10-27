import Image from "next/image"
import Link from "next/link"

import LogoIpsum from "@/public/logoipsum.svg"

import { Cart } from "../cart"
import { ThemeSwitcher } from "../theme-switcher"
import { UserMenu } from "../user-menu"

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="relative z-10 mb-4 rounded-b-2xl p-1.5 shadow-md">
        <div className="from-delft-blue-2/50 via-tiffany-blue/50 to-sky-magenta/50 dark:from-tiffany-blue/50 dark:via-delft-blue/50 dark:to-sky-magenta/50 absolute inset-0 -z-10 rounded-b-2xl bg-linear-to-r backdrop-blur-lg" />
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-1">
            <Link href="/">
              <Image src={LogoIpsum} alt="Logo Ipsum" width={80} height={50} className="h-auto" />
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
  )
}
