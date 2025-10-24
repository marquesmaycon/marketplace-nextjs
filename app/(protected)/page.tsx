import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/types/product"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

async function getProducts(): Promise<{ products: Product[] }> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const res = await fetch(`${baseUrl}/api/products`)

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
            <CardAction>
              <Button size="sm">
                <span>+</span>
                <ShoppingCart />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="grid place-items-center">
            <Image src={product.image} alt="product image" width={200} height={200} className="rounded-lg" />
            <span className="p-2">{product.price.toFixed(2)}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
