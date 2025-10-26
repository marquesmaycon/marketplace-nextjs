"use client"

import { useState } from "react"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { ArrowUpRightIcon, List } from "lucide-react"

import { ItemGroup } from "@/components/ui/item"
import { editOrderInCookies, getOrdersFromCookies } from "@/lib/utils"
import type { Order as OrderType } from "@/types/order"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"

import { Order } from "./order"

export type EditOrderProps = { index: number; updates: Partial<OrderType> }

export default function MyOrdersPage() {
  const [orders, setOrders] = useState(getOrdersFromCookies())

  const {
    mutateAsync: editOrder,
    isPending,
    variables
  } = useMutation({
    mutationFn: async ({ index, updates }: EditOrderProps) => {
      await new Promise((res) => setTimeout(res, 1000))
      editOrderInCookies(index, updates)
      setOrders(getOrdersFromCookies())
    },
    onSuccess: () => {
      toast.info("Pedido atualizado com sucesso!")
    }
  })

  return (
    <div className="space-y-4">
      <h2 className="font-sans">Meus Pedidos</h2>
      <ItemGroup className="gap-8">
        {orders.map((order, index) => {
          const isUpdating = isPending && variables?.index === index
          return (
            <Order
              key={order.totalAmount + index}
              orderIndex={index}
              editOrder={editOrder}
              isUpdating={isUpdating}
              {...order}
            />
          )
        })}
      </ItemGroup>

      {orders.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <List />
            </EmptyMedia>
            <EmptyTitle>Você não tem pedidos ainda</EmptyTitle>
            <EmptyDescription>Comece fazendo seu primeiro pedido.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/">
              <Button variant="link" size="sm">
                Página de produtos <ArrowUpRightIcon />
              </Button>
            </Link>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}
