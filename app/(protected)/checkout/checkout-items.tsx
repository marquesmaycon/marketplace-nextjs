import Image from "next/image"

import { CardContent } from "@/components/ui/card"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { useCart } from "@/contexts/cart-context"

export function CheckoutItems() {
  const { items } = useCart()
  return (
    <CardContent className="space-y-2">
      <h4 className="font-sans font-semibold">Items</h4>
      <div className="space-y-2">
        {items.map(({ id, name, quantity, image }) => (
          <Item key={id} className="bg-rose-quartz/10 p-3">
            <ItemMedia>
              <Image src={image} width={50} height={50} alt={name} className="rounded-md" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="font-sans">
                {name} (x{quantity})
              </ItemTitle>
            </ItemContent>
          </Item>
        ))}
      </div>
    </CardContent>
  )
}
