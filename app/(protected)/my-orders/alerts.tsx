import type { ComponentProps } from "react"
import { Ban, CheckCircle, TriangleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

type AlertPaymentErrorProps = ComponentProps<typeof Alert> & {
  title: string
  description: string
  generateDescription: string
  onGenerate: () => void
  onCancel: () => void
}

export function AlertPaymentError({
  title,
  description,
  generateDescription,
  onGenerate,
  onCancel,
  ...props
}: AlertPaymentErrorProps) {
  return (
    <Alert {...props}>
      <TriangleAlert />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
        <div className="mt-2 flex flex-wrap gap-4">
          <Button variant="outline" size="sm" onClick={onGenerate}>
            {generateDescription}
          </Button>
          <Button variant="destructive" size="sm" onClick={onCancel}>
            Cancelar pedido
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}

export function AlertPayed() {
  return (
    <Alert className="text-tiffany-blue">
      <CheckCircle />
      <AlertTitle>Seu pedido foi aprovado!</AlertTitle>
      <AlertDescription>
        Tudo certo com seu pagamento. Em breve você receberá informações sobre o envio.
      </AlertDescription>
    </Alert>
  )
}
export function AlertCanceled() {
  return (
    <Alert variant="destructive">
      <Ban />
      <AlertTitle>Seu pedido foi cancelado</AlertTitle>
    </Alert>
  )
}
