import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CheckOutForm from "./checkout-form"

export default function CheckOutPage() {
  return (
    <div className="space-y-4">
      <h2>Checkout</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 lg:grid-cols-3">
        <Card className="md:col-span-3 lg:col-span-2">
          <CardContent>
            <CheckOutForm />
          </CardContent>
        </Card>
        <Card className="sticky top-18 h-fit md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
            <CardDescription>Revise os detalhes do seu pedido antes de finalizar a compra.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action="">form</form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
