"use client"

import { Contact, CreditCard, MapPinHouse } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldDescription, FieldGroup, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"

import { CheckoutDelivery } from "./checkout-delivery"
import { CreditCardFields } from "./credit-card-fields"
import { checkOutFormOptions, paymentMethodsMeta } from "./form-options"
import { CheckoutItems } from "./checkout-items"
import { formatCEP, formatCPF, formatPrice } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { Badge } from "@/components/ui/badge"

export function CheckoutForm() {
  const { totalPrice } = useCart()
  const form = useAppForm({
    ...checkOutFormOptions,
    onSubmit: ({ value }) => {
      console.log("Checkout form submitted:", value)
    }
  })

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5 lg:grid-cols-3">
      <Card className="md:col-span-3 lg:col-span-2">
        <CardContent>
          <form
            id="checkout-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <FieldSet>
                <FieldLegend>
                  <h4 className="inline-flex items-center gap-2 font-sans">
                    <Contact /> Informações Pessoais
                  </h4>
                </FieldLegend>
                <FieldDescription>Forneça seus dados pessoais para o pedido</FieldDescription>

                <FieldGroup>
                  <div className="grid gap-4 md:grid-cols-2">
                    <form.AppField name="name">
                      {({ InputField }) => <InputField label="Nome" placeholder="Seu nome completo" />}
                    </form.AppField>
                    <form.AppField name="cpf">
                      {({ InputField }) => <InputField label="CPF" placeholder="Seu CPF" mask={formatCPF} />}
                    </form.AppField>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <form.AppField name="phone">
                      {({ InputField }) => <InputField label="Telefone" placeholder="Seu número de telefone" />}
                    </form.AppField>

                    <form.AppField name="email">
                      {({ InputField }) => (
                        <InputField label="Email" placeholder="Seu endereço de email" type="email" />
                      )}
                    </form.AppField>
                  </div>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>
                  <h4 className="inline-flex items-center gap-2 font-sans">
                    <MapPinHouse /> Informações de Endereço
                  </h4>
                </FieldLegend>
                <FieldDescription>Forneça os detalhes do seu endereço para o pedido.</FieldDescription>
                <FieldGroup>
                  <div className="grid gap-4 md:grid-cols-2">
                    <form.AppField name="cep">
                      {({ InputField }) => <InputField label="CEP" placeholder="Seu CEP" mask={formatCEP} />}
                    </form.AppField>
                    <form.AppField name="address">
                      {({ InputField }) => <InputField label="Endereço" placeholder="Seu endereço" />}
                    </form.AppField>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <form.AppField name="city">
                      {({ InputField }) => <InputField label="Cidade" placeholder="Sua cidade" />}
                    </form.AppField>
                    <form.AppField name="state">
                      {({ InputField }) => <InputField label="Estado" placeholder="Seu estado" />}
                    </form.AppField>
                  </div>
                  <form.AppField name="country">
                    {({ InputField }) => <InputField label="País" placeholder="Seu país" />}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>
                  <h4 className="inline-flex items-center gap-2 font-sans">
                    <CreditCard /> Informações de Pagamento
                  </h4>
                </FieldLegend>
                <FieldDescription>Forneça os detalhes de pagamento para o pedido.</FieldDescription>
                <FieldGroup>
                  <form.AppField name="paymentMethod">
                    {({ SelectField }) => (
                      <SelectField
                        label="Método de Pagamento"
                        options={paymentMethodsMeta}
                        placeholder="Selecione um método de pagamento"
                      />
                    )}
                  </form.AppField>
                  <form.Subscribe selector={(state) => state.values.paymentMethod}>
                    {(method) => method === "CREDIT_CARD" && <CreditCardFields form={form} />}
                  </form.Subscribe>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <form.AppForm>
                  <form.ResetButton variant="ghost" className="w-fit" />
                </form.AppForm>
              </FieldSet>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <Card className="sticky top-18 h-fit md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="font-sans">Resumo</CardTitle>
          <CardDescription>Revise os detalhes do seu pedido antes de finalizar a compra.</CardDescription>
        </CardHeader>
        <CheckoutDelivery form={form} />
        <CheckoutItems />
        <CardContent className="space-y-2">
          <h4 className="font-sans font-semibold">Pagamento</h4>
          <form.Subscribe selector={({ values }) => [values.paymentMethod, values.installments]}>
            {([paymentMethod, installments]) => {
              const paymentMethodLabel = paymentMethodsMeta.find((method) => method.value === paymentMethod)?.label
              return (
                <div className="text-foreground/80 space-y-2">
                  <p className="text-sm">Método: {paymentMethodLabel}</p>
                  <div className="flex flex-col gap-4">
                    {paymentMethod === "CREDIT_CARD" && (
                      <Badge className="w-full font-mono text-sm" variant="secondary">
                        Parcelas: {installments}x de {formatPrice(totalPrice / +installments)}
                      </Badge>
                    )}
                    <Badge className="bg-sky-magenta w-full px-3 py-1 font-mono text-base">
                      Valor Total: {formatPrice(totalPrice)}
                    </Badge>
                  </div>
                </div>
              )
            }}
          </form.Subscribe>
        </CardContent>
        <CardFooter>
          <form.AppForm>
            <form.SubmitButton label="Finalizar" className="flex-1" form="checkout-form" />
          </form.AppForm>
        </CardFooter>
      </Card>
    </div>
  )
}
