import { ProductList } from "@/components/product-list"
import type { Product } from "@/types/product"

async function getProducts(): Promise<Product[]> {
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
    <div className="space-y-12 pt-8">
      <h1 className="text-delft-blue-2 font-sans">Nossos Melhores Produtos</h1>
      <ProductList products={products} />
    </div>
  )
}
