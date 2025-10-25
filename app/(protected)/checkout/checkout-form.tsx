"use client"

import { Contact, CreditCard, MapPinHouse } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldDescription, FieldGroup, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"

import { CheckoutDelivery } from "./checkout-delivery"
import { CreditCardFields } from "./credit-card-fields"
import { checkOutFormOptions, paymentMethodsMeta } from "./form-options"
import { CheckoutItems } from "./checkout-items"

export function CheckoutForm() {
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
                  <h4 className="inline-flex items-center gap-2">
                    <Contact /> Personal Information
                  </h4>
                </FieldLegend>
                <FieldDescription>Provide your personal details for the order</FieldDescription>

                <FieldGroup>
                  <div className="grid gap-4 md:grid-cols-2">
                    <form.AppField name="name">
                      {({ InputField }) => <InputField label="Name" placeholder="Your full name" />}
                    </form.AppField>
                    <form.AppField name="cpf">
                      {({ InputField }) => <InputField label="CPF" placeholder="Your CPF" />}
                    </form.AppField>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <form.AppField name="phone">
                      {({ InputField }) => <InputField label="Phone" placeholder="Your phone number" />}
                    </form.AppField>

                    <form.AppField name="email">
                      {({ InputField }) => <InputField label="Email" placeholder="Your email address" type="email" />}
                    </form.AppField>
                  </div>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>
                  <h4 className="inline-flex items-center gap-2">
                    <MapPinHouse /> Address Information
                  </h4>
                </FieldLegend>
                <FieldDescription>Provide your address details for the order.</FieldDescription>
                <FieldGroup>
                  <div className="grid gap-4 md:grid-cols-2">
                    <form.AppField name="cep">
                      {({ InputField }) => <InputField label="CEP" placeholder="Your CEP" />}
                    </form.AppField>
                    <form.AppField name="address">
                      {({ InputField }) => <InputField label="Address" placeholder="Your address" />}
                    </form.AppField>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <form.AppField name="city">
                      {({ InputField }) => <InputField label="City" placeholder="Your city" />}
                    </form.AppField>
                    <form.AppField name="state">
                      {({ InputField }) => <InputField label="State" placeholder="Your state" />}
                    </form.AppField>
                  </div>
                  <form.AppField name="country">
                    {({ InputField }) => <InputField label="Country" placeholder="Your country" />}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>
                  <h4 className="inline-flex items-center gap-2">
                    <CreditCard /> Payment Information
                  </h4>
                </FieldLegend>
                <FieldDescription>Provide your payment details for the order.</FieldDescription>
                <FieldGroup>
                  <form.AppField name="paymentMethod">
                    {({ SelectField }) => (
                      <SelectField
                        label="Payment Method"
                        options={paymentMethodsMeta}
                        placeholder="Select a payment method"
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
          <CardTitle className="font-sans">Summary</CardTitle>
          <CardDescription>Revise os detalhes do seu pedido antes de finalizar a compra.</CardDescription>
        </CardHeader>
        <CheckoutItems />
        <CheckoutDelivery form={form} />
        <CardFooter>
          <form.AppForm>
            <form.SubmitButton label="Finish" className="flex-1" form="checkout-form" />
          </form.AppForm>
        </CardFooter>
      </Card>
    </div>
  )
}
