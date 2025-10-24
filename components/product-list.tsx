"use client"

import { ShoppingCart } from "lucide-react"
import Image from "next/image"

import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/types/product"

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

type ProductListProps = {
  products: Array<Product>
}

export function ProductList({ products }: ProductListProps) {
  const { addItem } = useCart()
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle className="font-sans">{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
            <CardAction>
              <Button size="sm" onClick={() => addItem(product)}>
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
