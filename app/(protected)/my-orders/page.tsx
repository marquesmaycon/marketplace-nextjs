"use client"

import Link from "next/link"
import { ArrowUpRightIcon, List } from "lucide-react"

import { ItemGroup } from "@/components/ui/item"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"

import { useEditOrder, useGetOrders } from "@/features/orders/hooks"
import { Order } from "@/features/orders/order"

export default function MyOrdersPage() {
  const { data: orders } = useGetOrders()
  const { mutateAsync: editOrder, isPending, variables } = useEditOrder()

  return (
    <div className="space-y-4">
      <h2 className="font-sans">Meus Pedidos</h2>

      <ItemGroup className="gap-8">
        {orders?.reverse().map((order, index) => {
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

      {orders?.length === 0 && (
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
