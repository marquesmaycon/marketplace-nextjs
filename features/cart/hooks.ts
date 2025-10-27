import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import type { Product } from "@/types/product"

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
    onSuccess: (_, product) => {
      toast.success(`Produto ${product.name} adicionado ao carrinho`)
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })
}

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (args: { id: number; quantity: number }) => await updateCartItem(args.id, args.quantity),
    onSuccess: () => {
      toast.info("Produto atualizado")
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
