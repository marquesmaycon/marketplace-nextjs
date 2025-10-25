import { formOptions } from "@tanstack/react-form"
import z from "zod"
import { pt } from "zod/locales"

z.config(pt())

const paymentMethods = ["PIX", "CREDIT_CARD", "BOLETO"] as const

export const paymentMethodsMeta: Array<{ value: (typeof paymentMethods)[number]; label: string }> = [
  { value: "PIX", label: "PIX" },
  { value: "CREDIT_CARD", label: "Cartão de Crédito" },
  { value: "BOLETO", label: "Boleto" }
]

export const checkoutSchema = z
  .object({
    name: z.string().min(2),
    email: z.email(),
    phone: z.string().min(10),
    cpf: z
      .string()
      .min(14, "CPF deve ter 11 dígitos")
      .refine(
        (val) => {
          const cpfNumbers = val.replace(/\D/g, "")
          return cpfNumbers.length === 11
        },
        { error: "CPF deve ter 11 dígitos" }
      ),
    cep: z.string().min(8, "CEP deve ter 8 dígitos"),
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
    installments: z.string()
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "CREDIT_CARD") {
      const cardNumbers = data.cardNumber.replace(/\s/g, "")

      if (cardNumbers.length < 13 || cardNumbers.length > 19) {
        ctx.addIssue({
          code: "custom",
          message: "Número do cartão inválido",
          path: ["cardNumber"]
        })
      }

      if (!data.cardHolderName || data.cardHolderName.trim().length < 2) {
        ctx.addIssue({
          code: "custom",
          message: "Nome do portador é obrigatório",
          path: ["cardHolderName"]
        })
      }

      if (!data.cardExpirationDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpirationDate)) {
        ctx.addIssue({
          code: "custom",
          message: "Data de expiração inválida (MM/AA)",
          path: ["cardExpirationDate"]
        })
      }

      if (!data.cardCvv || data.cardCvv.length < 3 || data.cardCvv.length > 4) {
        ctx.addIssue({
          code: "custom",
          message: "CVV inválido",
          path: ["cardCvv"]
        })
      }

      if (!data.installments || parseInt(data.installments) < 1 || parseInt(data.installments) > 12) {
        ctx.addIssue({
          code: "custom",
          message: "Número de parcelas inválido",
          path: ["installments"]
        })
      }
    }
  })

export const checkOutFormOptions = formOptions({
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
    installments: ""
  },
  validators: {
    onSubmit: checkoutSchema
  }
})
