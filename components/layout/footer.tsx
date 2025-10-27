import { ArrowUpRight } from "lucide-react"

const links = [
  {
    name: "WhatsApp",
    href: "https://web.whatsapp.com/send?phone=5544991173753&text=Oi%20Maycon%2C%20vim%20do%20seu%20portf%C3%B3lio"
  },
  { name: "Instagram", href: "https://instagram.com/marquesmaycon/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mayconhenrique/" },
  { name: "GitHub", href: "https://github.com/marquesmaycon" }
]

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-x-clip pb-4">
      <div className="animate-mask-fade pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[400px] w-[1600px] -translate-x-1/2 mask-radial-[50%_50%] mask-radial-from-black mask-radial-to-transparent mask-radial-at-bottom" />

      <div className="container mx-auto flex w-full flex-col gap-8 px-4 text-xs md:flex-row md:justify-between">
        <span className="flex justify-center p-4 text-gray-500">&copy; 2025 Maycon Marques. All rights reserved.</span>
        <nav className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
          {links.map(({ name, href }) => (
            <a key={name} href={href} target="_blank" className="inline-flex items-center gap-1.5 hover:underline">
              <span className="font-semibold">{name}</span>
              <ArrowUpRight className="size-4" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
