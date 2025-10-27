import type { Product } from "@/types/product"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { addToCart, clearCart, getCart, updateCartItem } from "./actions"

export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (product: Product) => await addToCart(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })
}

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (args: { id: number; quantity: number }) => await updateCartItem(args.id, args.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })
}

export const useClearCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => await clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })
}
