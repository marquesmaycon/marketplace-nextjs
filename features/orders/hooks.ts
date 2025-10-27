import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { createOrder, editOrder, getOrder, getOrders } from "./actions"

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders
  })
}

export const useGetOrder = (index: number) => {
  return useQuery({
    queryKey: ["orders", index],
    queryFn: () => getOrder(index)
  })
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder
  })
}

export const useEditOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editOrder,
    onSuccess: () => {
      toast.info("Pedido atualizado com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    }
  })
}
