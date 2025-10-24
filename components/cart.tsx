import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./ui/item"
import Image from "next/image"
import { ButtonGroup } from "./ui/button-group"
import { ScrollArea } from "./ui/scroll-area"

export function Cart() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon-sm">
          <ShoppingCart />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <ScrollArea>
          <Item variant="muted">
            <ItemMedia>
              <Image src="https://picsum.photos/200" width={50} height={50} alt="product img" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Basic Item</ItemTitle>
              <ItemDescription>A simple item with title and description.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <span>99,30</span>
              <ButtonGroup aria-label="Item quantity controls" className="h-fit">
                <Button variant="outline" size="icon-sm">
                  <MinusIcon />
                </Button>
                <Button variant="outline" size="icon-sm">
                  <PlusIcon />
                </Button>
              </ButtonGroup>
            </ItemActions>
          </Item>
        </ScrollArea>
        <Button className="mt-4 w-full">Checkout</Button>
      </PopoverContent>
    </Popover>
  )
}
