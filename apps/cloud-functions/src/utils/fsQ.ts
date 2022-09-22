import { Query, WhereFilterOp } from "firebase-admin/firestore"
import col from "./fsCol"

type QueryTuple = [string, WhereFilterOp, any]

export default function q<T extends Record<string, any>>(
  path: string,
  query: Partial<T> | Record<string, any>
) {
  const ref = col<T>(path)
  const entries = Object.entries(query)
  const queries = entries.map<QueryTuple>(([key, val]) => [key, "==", val])
  return queries.reduce<Query<T>>((acc, tuple) => acc.where(...tuple), ref)
}
