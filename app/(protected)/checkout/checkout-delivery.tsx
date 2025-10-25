import { CardContent } from "@/components/ui/card"
import { withForm } from "@/hooks/form"

import { checkOutFormOptions, paymentMethodsMeta } from "./form-options"

export const CheckoutDelivery = withForm({
  ...checkOutFormOptions,
  render: ({ form }) => {
    return (
      <CardContent className="space-y-2">
        <h4 className="font-sans font-semibold">Delivery Information</h4>
        <form.Subscribe selector={(state) => state.values}>
          {({
            name,
            email,
            phone,
            cpf,
            address,
            neighborhood,
            city,
            state,
            cep,
            country,
            paymentMethod,
            installments
          }) => {
            const paymentMethodLabel = paymentMethodsMeta.find((method) => method.value === paymentMethod)?.label
            return (
              <div className="text-foreground/80 space-y-1">
                <p className="text-sm">Name: {name}</p>
                <p className="text-sm">Email: {email}</p>
                <p className="text-sm">Phone: {phone}</p>
                <p className="text-sm">CPF: {cpf}</p>
                <p className="text-sm">
                  Address: {address} {neighborhood} {city} {state} {cep} {country}
                </p>
                <p className="text-sm">Payment Method: {paymentMethodLabel}</p>
                {paymentMethod === "CREDIT_CARD" && <p>Installments: {installments} </p>}
              </div>
            )
          }}
        </form.Subscribe>
      </CardContent>
    )
  }
})
