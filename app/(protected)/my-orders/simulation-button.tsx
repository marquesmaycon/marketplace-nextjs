import { Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Order } from "@/types/order"

type SimulationButtonProps = {
  orderIndex: number
  onEditOrder: ({ index, updates }: { index: number; updates: Partial<Order> }) => void
}

export function SimulationButton({ orderIndex, onEditOrder }: SimulationButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mt-8">
        <Button variant="secondary" size="sm" className="">
          Simular <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onEditOrder({ index: orderIndex, updates: { status: "pending" } })}>
          Pagamento pendente
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEditOrder({ index: orderIndex, updates: { status: "payed" } })}>
          Pagamento bem sucedido
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEditOrder({ index: orderIndex, updates: { status: "expired" } })}>
          Pagamento expirado
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEditOrder({ index: orderIndex, updates: { status: "failed" } })}>
          Falha no pagamento
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
