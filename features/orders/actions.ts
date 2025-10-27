import { delay } from "@/lib/utils"
import type { Order } from "@/types/order"

const ORDER_STORAGE_KEY = "orders"

export type EditOrderProps = { index: number; updates: Partial<Order> }

export async function getOrders(): Promise<Order[]> {
  await delay()
  return JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || "[]")
}

export async function getOrder(orderIndex: number): Promise<Order | null> {
  const orders = await getOrders()
  return orders[orderIndex] || null
}

export async function createOrder(order: Order): Promise<void> {
  await delay()
  const current = await getOrders()
  const updated = [...current, order]
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updated))
}

export async function editOrder({ index, updates }: EditOrderProps): Promise<void> {
  await delay()
  const current = await getOrders()
  const updated = current.map((order, i) => (i === index ? { ...order, ...updates } : order))
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updated))
}
