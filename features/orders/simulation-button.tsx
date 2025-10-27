import { Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getExpiration } from "@/lib/utils"
import type { Order } from "@/types/order"

import type { EditOrderProps } from "./actions"
import { statusMap } from "./order"

const simulationOptions: { label: string; status: Order["status"] }[] = [
  { label: "Pagamento pendente", status: "pending" },
  { label: "Pagamento bem sucedido", status: "payed" },
  { label: "Pagamento expirado", status: "expired" },
  { label: "Falha no pagamento", status: "failed" },
  { label: "Pedido cancelado", status: "canceled" }
]

type SimulationButtonProps = {
  orderIndex: number
  paymentMethod: Order["paymentMethod"]
  onEditOrder: (props: EditOrderProps) => void
}

export function SimulationButton({ orderIndex, paymentMethod, onEditOrder }: SimulationButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="">
          Simular <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {simulationOptions.map((option) => {
          const status = statusMap[option.status]
          const expiresAt = getExpiration(paymentMethod)
          return (
            <DropdownMenuItem
              key={option.status}
              onClick={() => onEditOrder({ index: orderIndex, updates: { status: option.status, expiresAt } })}
            >
              {status.icon} {option.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
