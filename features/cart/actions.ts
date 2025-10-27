import { delay } from "@/lib/utils"
import type { Product } from "@/types/product"

export type CartItem = Product & {
  quantity: number
}

const STORAGE_KEY = "cart_items"

export async function getCart(): Promise<CartItem[]> {
  await delay(300)
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
}

export async function addToCart(item: Product): Promise<void> {
  const current = await getCart()
  const existing = current.find((i) => i.id === item.id)

  const updated = existing
    ? current.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
    : [...current, { ...item, quantity: 1 }]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export async function updateCartItem(id: number, quantity: number): Promise<void> {
  const current = await getCart()
  const updated = current.map((i) => (i.id === id ? { ...i, quantity } : i))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export async function clearCart(): Promise<void> {
  await delay(50)
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
}
