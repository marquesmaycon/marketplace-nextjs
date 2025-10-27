import Cookies from "js-cookie"

import type { User } from "@/types/user"

const USER_COOKIE_KEY = "user"

export function getUserFromCookies() {
  const userCookie = Cookies.get(USER_COOKIE_KEY)
  const user: User | null = userCookie ? JSON.parse(userCookie) : null
  return user
}
