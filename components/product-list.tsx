"use client"

import { Plus } from "lucide-react"
import Image from "next/image"

import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/types/product"
import { formatPrice } from "@/lib/utils"

import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemTitle
} from "./ui/item"

type ProductListProps = {
  products: Array<Product>
}

export function ProductList({ products }: ProductListProps) {
  const { addItem } = useCart()
  return (
    <ItemGroup className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((product) => {
        const { id, name, description, image, price } = product
        return (
          <Item key={id} variant="outline" className="dark:bg-delft-blue/80 group bg-tiffany-blue/10">
            <ItemHeader>
              <div className="w-auto overflow-hidden rounded-sm">
                <Image
                  src={image}
                  alt={name}
                  width={400}
                  height={400}
                  className="aspect-square rounded-sm object-cover transition-transform duration-400 group-hover:scale-105"
                />
              </div>
            </ItemHeader>
            <ItemContent>
              <ItemTitle>
                <span className="font-sans">{name}</span>
                <Badge className="bg-sky-magenta font-mono">{formatPrice(price)}</Badge>
              </ItemTitle>
              <ItemDescription>{description}</ItemDescription>
            </ItemContent>
            <ItemFooter>
              <ItemActions>
                <Button size="sm" onClick={() => addItem(product)}>
                  Adicionar ao carrinho
                  <Plus />
                </Button>
              </ItemActions>
            </ItemFooter>
          </Item>
        )
      })}
    </ItemGroup>
  )
}
