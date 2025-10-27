"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeftIcon, ArrowRightIcon, Plus } from "lucide-react"

import { formatPrice } from "@/lib/utils"

import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { ButtonGroup } from "../../components/ui/button-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemTitle
} from "../../components/ui/item"
import { useGetProducts } from "./hook"
import { ProductsSkeleton } from "./products-skeleton"
import { useAddToCart } from "../cart/hooks"

export function ProductList() {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetProducts(page)

  const { mutateAsync: addToCart, isPending, variables } = useAddToCart()

  if (isLoading) {
    return <ProductsSkeleton />
  }

  return (
    <div className="flex h-full flex-col gap-6">
      <ItemGroup className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data?.products?.map((product) => {
          const { id, name, description, image, price } = product
          const isAdding = isPending && variables?.id === id
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
                <ItemActions className="flex-1">
                  <Button size="sm" onClick={() => addToCart(product)} loading={isAdding} className="w-full">
                    Adicionar ao carrinho
                    <Plus />
                  </Button>
                </ItemActions>
              </ItemFooter>
            </Item>
          )
        })}
      </ItemGroup>
      <ButtonGroup className="mt-auto ml-auto">
        <ButtonGroup>
          {Array.from({ length: data?.totalPages || 0 }, (_, i) => i + 1).map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={page === pageNumber ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Previous"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Next"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === data?.totalPages}
          >
            <ArrowRightIcon />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  )
}
