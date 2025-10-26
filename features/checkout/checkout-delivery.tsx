import { CardContent } from "@/components/ui/card"
import { withForm } from "@/hooks/form"

import { checkOutFormOptions } from "./form-options"

export const CheckoutDelivery = withForm({
  ...checkOutFormOptions,
  render: ({ form }) => {
    return (
      <CardContent className="space-y-2">
        <h4 className="font-sans font-semibold">Informações de Entrega</h4>
        <form.Subscribe selector={(state) => state.values}>
          {({ name, email, phone, cpf, address, neighborhood, city, state, cep, country }) => {
            return (
              <div className="text-foreground/80 space-y-1">
                <p className="text-sm">Nome: {name}</p>
                <p className="text-sm">Email: {email}</p>
                <p className="text-sm">Telefone: {phone}</p>
                <p className="text-sm">CPF: {cpf}</p>
                <p className="text-sm">
                  Endereço: {address} {neighborhood} {city} {state} {cep} {country}
                </p>
              </div>
            )
          }}
        </form.Subscribe>
      </CardContent>
    )
  }
})
