import { useState } from "react"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { AlertCircle, ChevronDown, Ellipsis, TriangleAlert, Truck, XCircle } from "lucide-react"

import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { Order } from "@/types/order"
import type { Product } from "@/types/product"

import { SimulationButton } from "./simulation-button"
import type { EditOrderProps } from "./page"
import { PaymentStatus } from "./payment-status"

export const statusMap: Record<Order["status"], { label: string; className: string; icon: React.ReactNode }> = {
  pending: {
    label: "Pendente",
    className: "bg-delft-blue-2",
    icon: <Ellipsis className="text-delft-blue-2" />
  },
  payed: {
    label: "Pago",
    className: "bg-tiffany-blue",
    icon: <Truck className="text-tiffany-blue" />
  },
  expired: {
    label: "Expirado",
    className: "bg-yellow-500",
    icon: <AlertCircle className="text-yellow-500" />
  },
  failed: {
    label: "Falhou",
    className: "bg-orange-500",
    icon: <TriangleAlert className="text-orange-500" />
  },
  canceled: {
    label: "Cancelado",
    className: "bg-red-500",
    icon: <XCircle className="text-red-500" />
  }
}

type OrderProps = Order & {
  orderIndex: number
  isUpdating: boolean
  editOrder: (props: EditOrderProps) => void
}

export function Order({ orderIndex, products, orderDate, status, editOrder, isUpdating, paymentMethod }: OrderProps) {
  const [open, setOpen] = useState(false)

  const { data: productsList, isLoading } = useQuery<Product[]>({
    queryKey: ["products", products.map((p) => p.id)],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/products?ids=${products.map((p) => p.id).join(",")}`)
      return res.json()
    },
    enabled: !!open
  })

  const statusInfo = statusMap[status]

  return (
    <Collapsible key={orderDate} className="group" open={open} onOpenChange={setOpen}>
      <Item variant="outline" className="flex-col justify-between gap-4">
        <div className="flex w-full gap-4">
          <ItemMedia variant="icon">{isUpdating ? <Spinner /> : statusInfo.icon}</ItemMedia>
          <ItemContent>
            <ItemTitle className="flex flex-wrap font-sans">
              <span>Pedido #{orderIndex + 1}</span>
              <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
            </ItemTitle>
            <ItemDescription>
              Data: {new Date(orderDate).toLocaleDateString()} - {paymentMethod}
            </ItemDescription>
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
          <Separator />

          <PaymentStatus orderIndex={orderIndex} editOrder={editOrder} />

          <Separator />

          <h4 className="font-semibold">Itens do pedido:</h4>
          {isLoading && <Spinner />}

          <ItemGroup className="grid gap-4 md:grid-cols-2">
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
          </ItemGroup>

          <Separator />

          <SimulationButton orderIndex={orderIndex} onEditOrder={editOrder} />
        </CollapsibleContent>
      </Item>
    </Collapsible>
  )
}
