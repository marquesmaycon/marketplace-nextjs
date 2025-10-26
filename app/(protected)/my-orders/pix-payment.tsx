import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { editOrderInCookies, getOrderFromCookies } from "@/lib/utils"
import type { Order } from "@/types/order"
import { AlertCanceled, AlertPayed, AlertPaymentError } from "./alerts"

type PixPaymentProps = {
  orderIndex: number
  editOrder?: ({ index, updates }: { index: number; updates: Partial<Order> }) => void
}

export function PixPayment({ orderIndex, editOrder }: PixPaymentProps) {
  const order = getOrderFromCookies(orderIndex)

  return (
    <div className="space-y-6">
      {order.status === "pending" && <PixPending {...order} orderIndex={orderIndex} />}

      {order.status === "expired" && (
        <AlertPaymentError
          className="text-yellow-500"
          title="O seu pagamento expirou"
          description="Você pode gerar uma nova chave PIX para uma realizar uma nova tentativa de pagamento"
          generateDescription="Gerar nova chave PIX"
          onGenerate={() =>
            editOrder?.({
              index: orderIndex,
              updates: { status: "pending", expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() }
            })
          }
          onCancel={() => editOrder?.({ index: orderIndex, updates: { status: "canceled" } })}
        />
      )}

      {order.status === "payed" && <AlertPayed />}

      {order.status === "canceled" && <AlertCanceled />}
    </div>
  )
}

function PixPending({ status, expiresAt, orderIndex }: Order & PixPaymentProps) {
  const [isCopied, setIsCopied] = useState(false)

  const isExpired = new Date(expiresAt) < new Date()

  useEffect(() => {
    if (isExpired && status === "pending") {
      editOrderInCookies(orderIndex, { status: "expired" })
    }
  }, [isExpired, status, orderIndex])

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold">Copie a chave PIX para realizar o pagamento</h4>
        <p className="text-muted-foreground">Você tem 30 minutos para realizar o pagamento.</p>
      </div>

      <InputGroup>
        <InputGroupInput className="font-mono" placeholder="123e4567-e89b-12d3-a456-426614174000" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copy"
            title="Copy"
            size="icon-xs"
            onClick={() => {
              copyToClipboard("123e4567-e89b-12d3-a456-426614174000")
            }}
          >
            {isCopied ? <Check /> : <Copy />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
