import { type ClassValue,clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { expirations, type PaymentMethod } from "@/features/checkout/form-options"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(ms = 600) {
  return new Promise((res) => setTimeout(res, ms))
}

export function getExpiration(paymentMethod: PaymentMethod) {
  return new Date(new Date().getTime() + expirations[paymentMethod]).toISOString()
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