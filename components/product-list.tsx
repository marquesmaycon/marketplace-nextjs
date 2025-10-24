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
      {products.map((pd) => (
        <Item key={pd.name} variant="outline">
          <ItemHeader>
            <Image
              src={pd.image}
              alt={pd.name}
              width={200}
              height={200}
              className="aspect-square w-full rounded-sm object-cover"
            />
          </ItemHeader>
          <ItemContent>
            <ItemTitle>
              <span>{pd.name}</span>
              <Badge className="bg-sky-magenta">{formatPrice(pd.price)}</Badge>
            </ItemTitle>
            <ItemDescription>{pd.description}</ItemDescription>
          </ItemContent>
          <ItemFooter>
            <ItemActions>
              <Button size="sm" onClick={() => addItem(pd)}>
                Add to Cart <Plus />
              </Button>
            </ItemActions>
          </ItemFooter>
        </Item>
      ))}
    </ItemGroup>
  )
}
