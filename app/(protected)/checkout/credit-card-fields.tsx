import { withForm } from "@/hooks/form"

import { checkOutFormOptions } from "./form-options"
import { formatCardExpiry, formatCardNumber, formatCVV } from "@/lib/utils"

export const CreditCardFields = withForm({
  ...checkOutFormOptions,
  render: ({ form }) => {
    return (
      <>
        <form.AppField name="cardNumber">
          {({ InputField }) => (
            <InputField
              label="Número do Cartão"
              placeholder="0000 0000 0000 0000"
              autoComplete="off"
              mask={formatCardNumber}
            />
          )}
        </form.AppField>

        <form.AppField name="cardExpirationDate">
          {({ InputField }) => (
            <InputField label="Data de Validade" placeholder="MM/AA" autoComplete="off" mask={formatCardExpiry} />
          )}
        </form.AppField>

        <form.AppField name="cardCvv">
          {({ InputField }) => <InputField label="CVV" placeholder="333" autoComplete="off" mask={formatCVV} />}
        </form.AppField>

        <form.AppField name="cardHolderName">
          {({ InputField }) => <InputField label="Nome do Titular" placeholder="Nome Completo" autoComplete="off" />}
        </form.AppField>

        <form.AppField name="installments">
          {({ SelectField }) => (
            <SelectField
              label="Parcelas"
              placeholder="Selecione o número de parcelas"
              options={Array.from({ length: 6 }).map((_, index) => ({
                label: `${index + 1} parcela(s)`,
                value: String(index + 1)
              }))}
            />
          )}
        </form.AppField>
      </>
    )
  }
})
