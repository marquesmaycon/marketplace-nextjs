"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { ArrowUpRightIcon, Handbag, MinusIcon, PlusIcon, ShoppingBag, ShoppingCart } from "lucide-react"
import Image from "next/image"

import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/utils"
import { useClearCart, useUpdateCartItem } from "@/features/cart/hooks"

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./ui/item"
import { ButtonGroup } from "./ui/button-group"
import { ScrollArea } from "./ui/scroll-area"
import { Badge } from "./ui/badge"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty"
import { Separator } from "./ui/separator"
import { Spinner } from "./ui/spinner"

export function Cart() {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const { items, totalItems, totalPrice, isLoading } = useCart()

  const { mutateAsync: updateQuantity, isPending: isUpdating, variables } = useUpdateCartItem()
  const { mutateAsync: clearCart, isPending: isClearing } = useClearCart()

  const hasItems = totalItems > 0

  const handleCheckout = () => {
    setOpen(false)
    router.push("/checkout")
  }

  const handleStartShopping = () => {
    setOpen(false)
    router.push("/")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline" className="relative">
          <ShoppingCart />
          <Badge className="bg-sky-magenta absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 tabular-nums">
            {isLoading ? <Spinner /> : totalItems}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-auto w-96 space-y-2" align="end" alignOffset={-100}>
        <h3 className="text-center font-sans">Seu Carrinho</h3>
        {hasItems && (
          <>
            <ScrollArea className="h-96 rounded-lg">
              <div className="space-y-2">
                {items.map((item) => (
                  <Item key={item.id} className="bg-rose-quartz/20">
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
                          disabled={isUpdating && variables?.id === item.id}
                          onClick={() => updateQuantity({ id: item.id, quantity: item.quantity - 1 })}
                        >
                          <MinusIcon />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          disabled={isUpdating && variables?.id === item.id}
                          onClick={() => updateQuantity({ id: item.id, quantity: item.quantity + 1 })}
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
              <Button variant="secondary" size="sm" onClick={() => clearCart()} loading={isClearing}>
                Esvaziar Carrinho
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
              <EmptyTitle>Seu carrinho está vazio</EmptyTitle>
              <EmptyDescription>Comece a comprar para preencher seu carrinho.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="ghost" onClick={handleStartShopping}>
                Página de Produtos
                <ArrowUpRightIcon />
              </Button>
            </EmptyContent>
          </Empty>
        )}
        <Separator />
        <Button className="w-full transition-opacity" variant="gradient" disabled={!hasItems} onClick={handleCheckout}>
          Checkout <ShoppingBag />
        </Button>
      </PopoverContent>
    </Popover>
  )
}
