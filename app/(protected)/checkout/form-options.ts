import { formOptions } from "@tanstack/react-form"
import z from "zod"

const paymentMethods = ["PIX", "CREDIT_CARD", "BOLETO"] as const

export const paymentMethodsMeta: Array<{ value: (typeof paymentMethods)[number]; label: string }> = [
  { value: "PIX", label: "PIX" },
  { value: "CREDIT_CARD", label: "Credit Card" },
  { value: "BOLETO", label: "Boleto" }
]

export const checkoutSchema = z.object({
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
  installments: z.string()
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
