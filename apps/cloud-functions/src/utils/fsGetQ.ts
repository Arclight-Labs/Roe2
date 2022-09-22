import type { Primitive } from "firebase-admin/firestore"
import q from "./fsQ"

export default function getQ<T extends Record<string, unknown>>(
  path: string,
  query: Partial<T> | Record<string, Primitive>
) {
  return q(path, query).get()
}
