import type { Primitive, Query, WhereFilterOp } from "firebase-admin/firestore"
import col from "./fsCol"

type QueryTuple = [string, WhereFilterOp, Primitive]

export default function q<T extends Record<string, unknown>>(
  path: string,
  query: Partial<T> | Record<string, Primitive>
) {
  const ref = col<T>(path)
  const entries = Object.entries(query)
  const queries = entries.map<QueryTuple>(([key, val]) => [key, "==", val])
  return queries.reduce<Query<T>>((acc, tuple) => acc.where(...tuple), ref)
}
