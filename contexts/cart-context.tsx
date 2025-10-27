"use client"

import { createContext, ReactNode, useContext } from "react"

import { type CartItem } from "@/features/cart/actions"
import { useGetCart } from "@/features/cart/hooks"

type CartContextType = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: cart, isLoading } = useGetCart()

  const totalItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0
  const totalPrice = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0

  return (
    <CartContext.Provider
      value={{
        items: cart || [],
        totalItems,
        totalPrice,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}