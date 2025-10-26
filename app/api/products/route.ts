import { NextRequest, NextResponse } from "next/server"

import products from "@/data/products.json"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const ids = searchParams.get("ids")?.split(",") || []

    if (ids.length === 0) {
      const page = parseInt(searchParams.get("page") || "1")
      const itemsPerPage = 16

      const startIndex = (page - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const paginatedProducts = products.products.slice(startIndex, endIndex)

      return NextResponse.json({
        products: paginatedProducts,
        currentPage: page,
        totalPages: Math.ceil(products.products.length / itemsPerPage),
        totalProducts: products.products.length
      })
    }

    const filteredProducts = products.products.filter((product) => ids.includes(String(product.id)))

    return NextResponse.json(filteredProducts)
  } catch (error: unknown) {
    return NextResponse.json({ error: "Internal Server Error", details: error }, { status: 500 })
  }
}
