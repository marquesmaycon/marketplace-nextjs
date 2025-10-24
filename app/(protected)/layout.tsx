import Image from "next/image"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Image src="/logo-ipsum.png" alt="Logo Ipsum" width={75} height={50} />
        <div>
          <span>Maycon Marques</span>
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
}
