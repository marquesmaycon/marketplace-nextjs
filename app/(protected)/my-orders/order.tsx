import { useState } from "react"
import Image from "next/image"

import { AlertCircle, ChevronDown, Ellipsis, ShieldAlertIcon, Truck, XCircle } from "lucide-react"

import { useQuery } from "@tanstack/react-query"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import type { Order } from "@/types/order"

import { PixPayment } from "./pix-payment"
import { SimulationButton } from "./simulation-button"
import type { Product } from "@/types/product"

const statusMap: Record<Order["status"], { label: string; icon: React.ReactNode }> = {
  pending: {
    label: "Pendente",
    icon: <Ellipsis className="text-yellow-400" />
  },
  payed: {
    label: "Pago",
    icon: <Truck className="text-tiffany-blue" />
  },
  failed: {
    label: "Falhou",
    icon: <ShieldAlertIcon className="text-yellow-500" />
  },
  expired: {
    label: "Expirado",
    icon: <AlertCircle className="text-orange-500" />
  },
  canceled: {
    label: "Cancelado",
    icon: <XCircle className="text-red-500" />
  }
}

type OrderProps = Order & {
  orderIndex: number
  isUpdating: boolean
  editOrder: ({ index, updates }: { index: number; updates: Partial<Order> }) => void
}

export function Order({ orderIndex, products, orderDate, status, editOrder, isUpdating }: OrderProps) {
  const [open, setOpen] = useState(false)

  const { data: productsList, isLoading } = useQuery<Product[]>({
    queryKey: ["products", products.map((p) => p.id)],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/products?ids=${products.map((p) => p.id).join(",")}`)
      return res.json()
    },
    enabled: !!open
  })

  console.log(productsList)

  const statusInfo = statusMap[status]

  return (
    <Collapsible key={orderDate} className="group" open={open} onOpenChange={setOpen}>
      <Item variant="outline" className="flex-col justify-between gap-4">
        <div className="flex w-full gap-4">
          <ItemMedia variant="icon">{isUpdating ? <Spinner /> : statusInfo.icon}</ItemMedia>
          <ItemContent>
            <ItemTitle className="flex flex-wrap font-sans">
              <span>Pedido #{orderIndex + 1}</span>
              <span>Status: {statusInfo.label}</span>
            </ItemTitle>
            <ItemDescription>Data: {new Date(orderDate).toLocaleDateString()}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <CollapsibleTrigger asChild>
              <Button type="button">
                Abrir <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
          </ItemActions>
        </div>
        <CollapsibleContent className="w-full space-y-4">
          <Separator className="mb-6" />

          <div>
            <h4 className="mb-4 font-semibold">Itens do pedido:</h4>
            {isLoading && <Spinner />}

            {!isLoading && productsList?.length === 0 && <p>Nenhum produto encontrado.</p>}

            {productsList?.map((product) => {
              const quantity = products.find((p) => p.id === product.id)?.quantity || 0
              return (
                <Item key={product.id} className="bg-rose-quartz/20">
                  <ItemMedia>
                    <Image src={product.image} width={75} height={75} alt="product img" className="rounded-md" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="font-sans">
                      {product.name} ({quantity}x)
                    </ItemTitle>
                    <ItemDescription>{product.description}</ItemDescription>
                  </ItemContent>
                </Item>
              )
            })}
          </div>

          <Separator className="mb-6" />

          {true && <PixPayment orderIndex={orderIndex} editOrder={editOrder} />}

          <SimulationButton orderIndex={orderIndex} onEditOrder={editOrder} />
        </CollapsibleContent>
      </Item>
    </Collapsible>
  )
}
