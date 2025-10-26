import { NextRequest, NextResponse } from "next/server"

import products from "@/data/products.json"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const ids = searchParams.get("ids")?.split(",") || []

    if (ids.length === 0) {
      return NextResponse.json(products.products)
    }

    const filteredProducts = products.products.filter((product) => ids.includes(String(product.id)))

    return NextResponse.json(filteredProducts)
  } catch (error: unknown) {
    return NextResponse.json({ error: "Internal Server Error", details: error }, { status: 500 })
  }
}
