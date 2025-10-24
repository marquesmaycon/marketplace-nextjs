import Image from "next/image"

import LogoIpsum from "@/public/logoipsum.svg"

import { Cart } from "@/components/cart"
import { CartProvider } from "@/contexts/cart-context"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { UserMenu } from "@/components/user-menu"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="">
        <div className="mb-4 border-b p-1">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Image src={LogoIpsum} alt="Logo Ipsum" width={100} height={50} />
              <div className="flex items-center gap-2">
                <Cart />
                <UserMenu />
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>
        <main className="container mx-auto px-4">{children}</main>
      </div>
    </CartProvider>
  )
}
