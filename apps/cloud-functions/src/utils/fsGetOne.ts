import { QueryDocumentSnapshot } from "firebase-admin/firestore"
import { Err } from "./cfError"
import doc from "./fsDoc"

export default async function getOne<T extends object>(
  ...pathSegments: string[]
) {
  const ref = doc<T>(...pathSegments)
  const snap = await ref.get()
  if (!snap || !snap.exists)
    throw new Err("not-found", "Unable to find document")
  return snap as QueryDocumentSnapshot<T>
}
