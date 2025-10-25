"use client"

import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"

import { checkOutFormOptions, paymentMethodsMeta } from "./form-options"
import { CreditCardFields } from "./credit-card-fields"

export default function CheckOutForm() {
  const form = useAppForm({
    ...checkOutFormOptions,
    onSubmit: ({ value }) => {
      console.log("Checkout form submitted:", value)
    }
  })

  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Personal Information</FieldLegend>
          <FieldDescription>Provide your personal details for the order.</FieldDescription>
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
          <FieldLegend>Address Information</FieldLegend>
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
          <FieldLegend>Payment</FieldLegend>
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
          <Field orientation="horizontal">
            <form.AppForm>
              <form.ResetButton variant="secondary" />
            </form.AppForm>
            <form.AppForm>
              <form.SubmitButton label="Finish" className="flex-1" />
            </form.AppForm>
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  )
}
