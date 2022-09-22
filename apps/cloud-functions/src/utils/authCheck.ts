import type { AuthData } from "firebase-functions/lib/common/providers/https"
import { Err } from "./cfError"

export const authCheck = (auth?: AuthData) => {
  if (!auth) throw new Err("unauthenticated", "login required")
  return auth
}
