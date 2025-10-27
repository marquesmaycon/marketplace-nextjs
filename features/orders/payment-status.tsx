import { Check, Copy, Loader } from "lucide-react"
import { useEffect, useState } from "react"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import type { Order } from "@/types/order"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { AlertCanceled, AlertPayed, AlertPaymentError } from "./alerts"
import { expirations } from "../checkout/form-options"
import type { EditOrderProps } from "./actions"
import { useGetOrder } from "./hooks"
import { Skeleton } from "@/components/ui/skeleton"

export const paymentMethodMap: Record<
  Order["paymentMethod"],
  {
    expiredDescription?: string
    generateDescription?: string
    expirationTime?: string
    pendingTitle?: string
    pendingDescription?: string
    copyText?: string
    component: (props: DebitPendingProps) => React.ReactNode
  }
> = {
  BOLETO: {
    expiredDescription: "Você não pagou o boleto a tempo",
    generateDescription: "Gerar novo boleto",
    expirationTime: expirations.BOLETO,
    pendingTitle: "Aguardando pagamento",
    pendingDescription: "Copie o código de barras do boleto para realizar o pagamento",
    copyText: "23793.38128 60000.000008 00000.123456 7 89120000001000",
    component: DebitPending
  },
  PIX: {
    expiredDescription: "Você não pagou o PIX a tempo",
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
  editOrder: (props: EditOrderProps) => void
}

export function PaymentStatus({ orderIndex, editOrder }: PaymentStatusProps) {
  const { data: order, isLoading } = useGetOrder(orderIndex)

  const paymentMeta = order ? paymentMethodMap[order.paymentMethod] : null
  const PendingComponent = paymentMeta?.component

  if (isLoading) {
    return <Skeleton className="h-36" />
  }

  if (!order || !PendingComponent) {
    throw new Error("Ocorreu um erro ao carregar o pedido")
  }

  return (
    <div className="space-y-6">
      {order?.status === "pending" && (
        <PendingComponent
          orderIndex={orderIndex}
          onExpired={() => editOrder({ index: orderIndex, updates: { status: "expired" } })}
          onCancel={() => editOrder({ index: orderIndex, updates: { status: "canceled" } })}
          {...order}
        />
      )}

      {order?.status === "expired" && (
        <AlertPaymentError
          className="text-yellow-500"
          title="O seu pagamento expirou"
          description="Você não realizou o pagamento a tempo"
          generateDescription={paymentMeta.generateDescription || "Gerar novo pagamento"}
          onGenerate={() =>
            editOrder({
              index: orderIndex,
              updates: { status: "pending", expiresAt: paymentMeta.expirationTime }
            })
          }
          onCancel={() => editOrder({ index: orderIndex, updates: { status: "canceled" } })}
        />
      )}

      {order?.status === "failed" && (
        <AlertPaymentError
          className="text-orange-500"
          title="O seu pagamento falhou"
          description="Houve um problema ao processar o seu pagamento. Você pode tentar novamente."
          generateDescription={paymentMeta.generateDescription || "Gerar novo pagamento"}
          onGenerate={() =>
            editOrder({
              index: orderIndex,
              updates: { status: "pending", expiresAt: paymentMeta.expirationTime }
            })
          }
          onCancel={() => editOrder({ index: orderIndex, updates: { status: "canceled" } })}
        />
      )}

      {order?.status === "payed" && <AlertPayed />}

      {order?.status === "canceled" && <AlertCanceled />}
    </div>
  )
}

type DebitPendingProps = Order & {
  orderIndex: number
  onExpired: () => void
  onCancel: () => void
}

function DebitPending({ orderIndex, status, expiresAt, paymentMethod, onExpired, onCancel }: DebitPendingProps) {
  const [isCopied, setIsCopied] = useState(false)

  const isExpired = new Date(expiresAt) < new Date()

  useEffect(() => {
    if (isExpired && status === "pending") {
      onExpired()
    }
  }, [isExpired, status, orderIndex, onExpired])

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

      <Button variant="outline" size="sm" className="text-red-500" onClick={() => onCancel()}>
        Cancelar pedido
      </Button>
    </div>
  )
}

function CreditCardPending() {
  return (
    <Alert className="text-indigo-500">
      <Loader />
      <AlertTitle>Pagamento em andamento...</AlertTitle>
      <AlertDescription>
        Seu pagamento com cartão de crédito está sendo processado. Pode levar alguns minutos até sua operadora aprovar
      </AlertDescription>
    </Alert>
  )
}
