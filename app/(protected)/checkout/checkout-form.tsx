"use client"

import { useForm } from "@tanstack/react-form"
import z from "zod"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const paymentMethods = ["PIX", "CREDIT_CARD", "BOLETO"] as const

const paymentMethodsMeta: Array<{ value: (typeof paymentMethods)[number]; label: string }> = [
  { value: "PIX", label: "PIX" },
  { value: "CREDIT_CARD", label: "Credit Card" },
  { value: "BOLETO", label: "Boleto" }
]

const checkoutSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(10),
  cpf: z.string().min(11),
  cep: z.string().min(4),
  address: z.string().min(5),
  neighborhood: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().min(2),
  paymentMethod: z.enum(paymentMethods),
  cardNumber: z.string(),
  cardHolderName: z.string(),
  cardExpirationDate: z.string(),
  cardCvv: z.string(),
  installments: z.number()
})

export default function CheckOutForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      cep: "",
      address: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "",
      paymentMethod: "",
      cardNumber: "",
      cardHolderName: "",
      cardExpirationDate: "",
      cardCvv: "",
      installments: 0
    },
    validators: {
      onSubmit: checkoutSchema
    },
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
            <form.Field name="name">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Your full name"
                      autoComplete="off"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>
            <div className="grid gap-4 md:grid-cols-2">
              <form.Field name="phone">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Your phone number"
                        autoComplete="off"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>

              <form.Field name="email">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Your email address"
                        autoComplete="off"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <form.Field name="cep">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>CEP</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Your CEP"
                        autoComplete="off"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
              <form.Field name="address">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Your address"
                        autoComplete="off"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <form.Field name="city">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>City</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Your city"
                        autoComplete="off"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
              <form.Field name="state">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>State</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Your state"
                        autoComplete="off"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            </div>
            <form.Field name="country">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Your country"
                      autoComplete="off"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Payment</FieldLegend>
          <FieldDescription>Provide your payment details for the order.</FieldDescription>
          <FieldGroup>
            <form.Field name="paymentMethod">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="form-tanstack-select-language">Payment Method</FieldLabel>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    <Select name={field.name} value={field.state.value} onValueChange={field.handleChange}>
                      <SelectTrigger
                        id="form-tanstack-select-language"
                        aria-invalid={isInvalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select a payment method" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        {paymentMethodsMeta.map((pm) => (
                          <SelectItem key={pm.value} value={pm.value}>
                            {pm.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )
              }}
            </form.Field>
            <form.Subscribe selector={(state) => state.values.paymentMethod === "CREDIT_CARD"}>
              {(pm) => (
                <>
                  {pm && (
                    <>
                      <form.Field name="cardNumber">
                        {(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>Card Number</FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                aria-invalid={isInvalid}
                                placeholder="0000 0000 0000 0000"
                                autoComplete="off"
                              />
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                          )
                        }}
                      </form.Field>
                      <form.Field name="cardExpirationDate">
                        {(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>Card Expiration Date</FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                aria-invalid={isInvalid}
                                placeholder="MM/YY"
                                autoComplete="off"
                              />
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                          )
                        }}
                      </form.Field>
                      <form.Field name="cardCvv">
                        {(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>Card CVV</FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                aria-invalid={isInvalid}
                                placeholder="333"
                                autoComplete="off"
                              />
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                          )
                        }}
                      </form.Field>
                      <form.Field name="cardHolderName">
                        {(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>Card Holder Name</FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                aria-invalid={isInvalid}
                                placeholder="The name as on card"
                                autoComplete="off"
                              />
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                          )
                        }}
                      </form.Field>
                      <form.Field name="installments">
                        {(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>Payment Method</FieldLabel>
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              <Select
                                name={field.name}
                                value={String(field.state.value)}
                                onValueChange={(value) => field.handleChange(Number(value))}
                              >
                                <SelectTrigger id={field.name} aria-invalid={isInvalid} className="min-w-[120px]">
                                  <SelectValue placeholder="Select a payment method" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                  {Array.from({ length: 6 }).map((_, index) => (
                                    <SelectItem key={index} value={String(index + 1)}>
                                      {index + 1} installment(s)
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </Field>
                          )
                        }}
                      </form.Field>
                    </>
                  )}
                </>
              )}
            </form.Subscribe>
          </FieldGroup>
        </FieldSet>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  )
}
