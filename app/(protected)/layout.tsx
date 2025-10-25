import Image from "next/image"

import LogoIpsum from "@/public/logoipsum.svg"

import { Cart } from "@/components/cart"
import { CartProvider } from "@/contexts/cart-context"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { UserMenu } from "@/components/user-menu"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="sticky top-0">
        <div className="relative z-10 mb-4 rounded-b-md p-1.5 shadow-lg">
          <div className="from-delft-blue-2/50 via-tiffany-blue/50 to-sky-magenta/50 dark:from-tiffany-blue/50 dark:via-delft-blue/50 dark:to-sky-magenta/50 absolute inset-0 -z-10 bg-linear-to-r [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] backdrop-blur-lg" />
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-1">
              <Image src={LogoIpsum} alt="Logo Ipsum" width={80} height={50} />
              <div className="flex items-center gap-2">
                <Cart />
                <UserMenu />
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="container mx-auto px-4">{children}</main>
    </CartProvider>
  )
}
