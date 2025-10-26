import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { editOrderInCookies, getOrderFromCookies } from "@/lib/utils"
import type { Order } from "@/types/order"

import { AlertCanceled, AlertPayed, AlertPaymentError } from "./alerts"
import type { EditOrderProps } from "./page"
import { expirations } from "../checkout/form-options"

export const paymentMethodMap: Record<
  Order["paymentMethod"],
  {
    expiredDescription?: string
    generateDescription?: string
    expirationTime?: string
    pendingTitle?: string
    pendingDescription?: string
    copyText?: string
    component: (props: Order & PaymentStatusProps) => React.ReactNode
  }
> = {
  BOLETO: {
    expiredDescription: "O seu boleto expirou",
    generateDescription: "Gerar novo boleto",
    expirationTime: expirations.BOLETO,
    pendingTitle: "Aguardando pagamento",
    pendingDescription: "Copie o código de barras do boleto para realizar o pagamento",
    copyText: "23793.38128 60000.000008 00000.123456 7 89120000001000",
    component: DebitPending
  },
  PIX: {
    expiredDescription: "O seu pagamento expirou",
    generateDescription: "Gerar nova chave PIX",
    expirationTime: expirations.PIX,
    pendingTitle: "Aguardando pagamento",
    pendingDescription: "Copie a chave PIX para realizar o pagamento",
    copyText: "123e4567-e89b-12d3-a456-426614174000",
    component: DebitPending
  },
  CREDIT_CARD: {
    expiredDescription: "O tempo para processar o pagamento acabou",
    generateDescription: "Tentar novamente",
    expirationTime: expirations.CREDIT_CARD,
    component: CreditCardPending
  }
}

type PaymentStatusProps = {
  orderIndex: number
  editOrder?: (props: EditOrderProps) => void
}

export function PaymentStatus({ orderIndex, editOrder }: PaymentStatusProps) {
  const order = getOrderFromCookies(orderIndex)

  const paymentMeta = paymentMethodMap[order.paymentMethod]
  const PendingComponent = paymentMeta.component

  return (
    <div className="space-y-6">
      {order.status === "pending" && <PendingComponent orderIndex={orderIndex} {...order} />}

      {order.status === "expired" && (
        <AlertPaymentError
          className="text-yellow-500"
          title="O seu pagamento expirou"
          description={paymentMeta.expiredDescription || "Você pode gerar um novo pagamento"}
          generateDescription={paymentMeta.generateDescription || "Gerar novo pagamento"}
          onGenerate={() =>
            editOrder?.({
              index: orderIndex,
              updates: { status: "pending", expiresAt: paymentMeta.expirationTime }
            })
          }
          onCancel={() => editOrder?.({ index: orderIndex, updates: { status: "canceled" } })}
        />
      )}

      {order.status === "failed" && (
        <AlertPaymentError
          className="text-orange-500"
          title="O seu pagamento falhou"
          description={paymentMeta.expiredDescription || "Você pode gerar um novo pagamento"}
          generateDescription={paymentMeta.generateDescription || "Gerar novo pagamento"}
          onGenerate={() =>
            editOrder?.({
              index: orderIndex,
              updates: { status: "pending", expiresAt: paymentMeta.expirationTime }
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

function DebitPending({ status, expiresAt, orderIndex, paymentMethod }: Order & PaymentStatusProps) {
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

  const paymentMeta = paymentMethodMap[paymentMethod]

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold">{paymentMeta.pendingTitle}</h4>
        <p className="text-muted-foreground">{paymentMeta.pendingDescription}</p>
      </div>

      <InputGroup>
        <InputGroupInput className="font-mono" value={paymentMeta.copyText} readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copy"
            title="Copy"
            size="icon-xs"
            onClick={() => {
              copyToClipboard(paymentMeta.copyText || "")
            }}
          >
            {isCopied ? <Check /> : <Copy />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CreditCardPending() {
  return <div>Credit Card Payment Pending...</div>
}
