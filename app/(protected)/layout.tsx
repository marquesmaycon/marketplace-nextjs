import Image from "next/image"

import { Cart } from "@/components/cart"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="mb-4 border-b p-1">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Image src="/logo-ipsum.png" alt="Logo Ipsum" width={75} height={50} />
            <div className="flex items-center gap-2">
              <Cart />
              <span>Maycon Marques</span>
            </div>
          </div>
        </div>
      </div>
      <main className="container mx-auto px-4">{children}</main>
    </div>
  )
}
