import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie"

import type { User } from "@/types/user"
import type { Order } from "@/types/order"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return price.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL"
  })
}

export function formatCardNumber(value: string) {
  const cleaned = value.replace(/\D/g, "")
  const match = cleaned.match(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/)
  if (!match) return ""
  return [match[1], match[2], match[3], match[4]].filter(Boolean).join(" ")
}

export function formatCPF(value: string) {
  const cleaned = value.replace(/\D/g, "")
  const match = cleaned.match(/(\d{1,3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/)
  if (!match) return ""
  let formatted = match[1]
  if (match[2]) formatted += "." + match[2]
  if (match[3]) formatted += "." + match[3]
  if (match[4]) formatted += "-" + match[4]
  return formatted
}

export function formatCardExpiry(value: string) {
  const cleaned = value.replace(/\D/g, "")
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4)
  }
  return cleaned
}

export function formatCVV(value: string) {
  return value.replace(/\D/g, "").slice(0, 4)
}

export function formatCEP(value: string) {
  const cleaned = value.replace(/\D/g, "")
  const match = cleaned.match(/(\d{1,2})(\d{1,3})?(\d{1,2})?/)
  if (!match) return ""
  let formatted = match[1]
  if (match[2]) formatted += "." + match[2]
  if (match[3]) formatted += "-" + match[3]
  return formatted
}

export function getUserFromCookies() {
  const userCookie = Cookies.get("user")
  const user: User | null = userCookie ? JSON.parse(userCookie) : null
  return user
}

export function getOrdersFromCookies() {
  const ordersCookie = Cookies.get("orders")
  const orders: Order[] = ordersCookie ? JSON.parse(ordersCookie) : []
  return orders
}

export function getOrderFromCookies(orderIndex: number) {
  const orders = getOrdersFromCookies()
  return orders[orderIndex]
}

export function editOrderInCookies(orderIndex: number, updatedOrder: Partial<Order>) {
  const orders = getOrdersFromCookies()
  const updatedOrders = orders.map((order, index) => (index === orderIndex ? { ...order, ...updatedOrder } : order))
  Cookies.set("orders", JSON.stringify(updatedOrders), { expires: 7 })
}