import type { Primitive } from "firebase-admin/firestore"
import q from "./fsQ"

export default async function findOne<T extends Record<string, unknown>>(
  path: string,
  queryObj: Partial<T> | Record<string, Primitive>
) {
  const query = q<T>(path, queryObj)

  try {
    const qSnap = await query.get()
    const [snap] = qSnap.docs ?? []
    return snap || null
  } catch {
    return null
  }
}
