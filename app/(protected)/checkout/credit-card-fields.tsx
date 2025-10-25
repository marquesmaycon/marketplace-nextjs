import { withForm } from "@/hooks/form"

import { checkOutFormOptions } from "./form-options"

export const CreditCardFields = withForm({
  ...checkOutFormOptions,
  render: ({ form }) => {
    return (
      <>
        <form.AppField name="cardNumber">
          {({ InputField }) => <InputField label="Card Number" placeholder="0000 0000 0000 0000" autoComplete="off" />}
        </form.AppField>

        <form.AppField name="cardExpirationDate">
          {({ InputField }) => <InputField label="Card Expiration Date" placeholder="MM/YY" autoComplete="off" />}
        </form.AppField>

        <form.AppField name="cardCvv">
          {({ InputField }) => <InputField label="Card CVV" placeholder="333" autoComplete="off" />}
        </form.AppField>

        <form.AppField name="cardHolderName">
          {({ InputField }) => <InputField label="Card Holder Name" placeholder="John Doe" autoComplete="off" />}
        </form.AppField>

        <form.AppField name="installments">
          {({ SelectField }) => (
            <SelectField
              label="Installments"
              placeholder="Select number of installments"
              options={Array.from({ length: 6 }).map((_, index) => ({
                label: `${index + 1} installment(s)`,
                value: String(index + 1)
              }))}
            />
          )}
        </form.AppField>
      </>
    )
  }
})
