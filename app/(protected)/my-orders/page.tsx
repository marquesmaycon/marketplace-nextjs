"use client"

import { ArrowUpRightIcon, List } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { ItemGroup } from "@/components/ui/item"
import { useEditOrder, useGetOrders } from "@/features/orders/hooks"
import { Order } from "@/features/orders/order"
import { OrdersSkeleton } from "@/features/orders/orders-skeleton"

export default function MyOrdersPage() {
  const { data: orders, isLoading } = useGetOrders()
  const { mutateAsync: editOrder, isPending, variables } = useEditOrder()

  return (
    <div className="h-full space-y-4">
      <h2 className="font-sans">Meus Pedidos</h2>

      {isLoading && <OrdersSkeleton />}

      <ItemGroup className="gap-8">
        {orders?.map((order, index) => {
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
              <Button variant="link" size="sm" className="dark:text-foreground">
                Página de produtos <ArrowUpRightIcon />
              </Button>
            </Link>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}
