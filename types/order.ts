import type { PaymentMethod } from "@/app/(protected)/checkout/form-options"

export type Order = {
  products: Array<{ id: number; quantity: number }>
  totalAmount: number
  orderDate: string
  address: string
  status: "pending" | "payed" | "failed" | "expired" | "canceled"
  expiresAt: string
  paymentMethod: PaymentMethod
}
