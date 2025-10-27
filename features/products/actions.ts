import { delay } from "@/lib/utils"
import type { Product } from "@/types/product"

type GetProductsResponse = {
  products: Product[]
  currentPage: number
  totalPages: number
  totalProducts: number
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export async function getProducts(page = 1): Promise<GetProductsResponse> {
  await delay(500)
  const res = await fetch(`${baseUrl}/api/products?page=${page}`)

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}

export const getProductsById = async (id: number[]): Promise<Product[]> => {
  await delay(500)
  const res = await fetch(`${baseUrl}/api/products?ids=${id.join(",")}`)

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}
