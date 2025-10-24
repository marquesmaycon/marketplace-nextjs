import { ProductList } from "@/components/product-list"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/types/product"

async function getProducts(): Promise<{ products: Product[] }> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const res = await fetch(`${baseUrl}/api/products`)

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}

export default async function Home() {
  const { products } = await getProducts()

  return (
    <div className="space-y-4">
      <h1>Products</h1>
      <Separator />
      <ProductList products={products} />
    </div>
  )
}
