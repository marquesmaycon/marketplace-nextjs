import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { getOrdersFromCookies } from "@/lib/utils"
import type { Order } from "@/types/order"

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async ({ order }: { order: Order }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const orders = getOrdersFromCookies()
      orders.push(order)

      Cookies.set("orders", JSON.stringify(orders), { expires: 7 })
    }
  })
}
