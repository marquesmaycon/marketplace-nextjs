import Cookies from "js-cookie"

import type { User } from "@/types/user"

import { clearCart } from "../cart/actions"
import { clearOrders } from "../orders/actions"

const USER_COOKIE_KEY = "user"

export function getUserFromCookies() {
  const userCookie = Cookies.get(USER_COOKIE_KEY)
  const user: User | null = userCookie ? JSON.parse(userCookie) : null
  return user
}

export async function logoutUser() {
  await clearCart()
  await clearOrders()
  Cookies.remove(USER_COOKIE_KEY)
}
