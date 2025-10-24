"use client"

import { ArrowUpRightIcon, Handbag, MinusIcon, PlusIcon, ShoppingBag, ShoppingCart } from "lucide-react"
import Image from "next/image"

import { useCart } from "@/contexts/cart-context"

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./ui/item"
import { ButtonGroup } from "./ui/button-group"
import { ScrollArea } from "./ui/scroll-area"
import { Badge } from "./ui/badge"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty"
import { Separator } from "./ui/separator"
import { formatPrice } from "@/lib/utils"

export function Cart() {
  const { items, totalItems, totalPrice, updateQuantity, clearCart } = useCart()

  const hasItems = totalItems > 0

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon-sm" variant="outline" className="relative">
          <ShoppingCart />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 tabular-nums">{totalItems}</Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 space-y-2">
        <h2 className="text-center font-semibold">Your Cart</h2>
        {hasItems && (
          <>
            <ScrollArea className="h-96 rounded-lg">
              <div className="space-y-2">
                {items.map((item) => (
                  <Item key={item.id} variant="muted">
                    <ItemMedia>
                      <Image
                        src="https://picsum.photos/200"
                        width={75}
                        height={75}
                        alt="product img"
                        className="rounded-md"
                      />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="font-sans">
                        {item.name} ({item.quantity}x)
                      </ItemTitle>
                      <ItemDescription>{item.description}</ItemDescription>
                    </ItemContent>
                    <ItemActions className="flex-col">
                      <span className="font-mono font-medium">{formatPrice(item.price * item.quantity)}</span>
                      <ButtonGroup aria-label="Item quantity controls" className="h-fit">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <MinusIcon />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <PlusIcon />
                        </Button>
                      </ButtonGroup>
                    </ItemActions>
                  </Item>
                ))}
              </div>
            </ScrollArea>

            <div className="flex items-center justify-between">
              <Button variant="secondary" size="sm" onClick={clearCart}>
                Clear Cart
              </Button>

              <Badge variant="outline" className="px-3 py-1 font-mono text-sm uppercase">
                Total: <span className="ml-1 font-medium">{formatPrice(totalPrice)}</span>
              </Badge>
            </div>
          </>
        )}

        {!hasItems && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Handbag />
              </EmptyMedia>
              <EmptyTitle>Your cart is empty</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t added any items to your cart yet. Start shopping to fill your cart.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline">
                Products Page
                <ArrowUpRightIcon />
              </Button>
            </EmptyContent>
          </Empty>
        )}
        <Separator />
        <Button className="w-full" disabled={!hasItems}>
          Checkout <ShoppingBag />
        </Button>
      </PopoverContent>
    </Popover>
  )
}
