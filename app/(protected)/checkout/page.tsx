import { CheckoutForm } from "@/features/checkout/checkout-form"

export default async function CheckOutPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-sans">Checkout</h2>
      <CheckoutForm />
    </div>
  )
}
