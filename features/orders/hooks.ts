import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { editOrderInCookies, getOrdersFromCookies } from "@/lib/utils"
import type { Order } from "@/types/order"

export type EditOrderProps = { index: number; updates: Partial<Order> }

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 500))
      return getOrdersFromCookies()
    }
  })
}

export const useEditOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ index, updates }: EditOrderProps) => {
      await new Promise((res) => setTimeout(res, 1000))
      editOrderInCookies(index, updates)
    },
    onSuccess: () => {
      toast.info("Pedido atualizado com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    }
  })
}
