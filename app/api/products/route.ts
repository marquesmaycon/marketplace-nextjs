import { NextRequest, NextResponse } from "next/server"

import products from "@/data/products.json"

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(products)
  } catch (error: unknown) {
    return NextResponse.json({ error: "Internal Server Error", details: error }, { status: 500 })
  }
}
