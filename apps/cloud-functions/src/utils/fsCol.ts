import { CollectionReference } from "firebase-admin/firestore"
import { getDB } from "../firesbase-admin"
export default function col<T extends object>(...pathSegments: string[]) {
  const db = getDB()
  return db.collection(pathSegments.join("/")) as CollectionReference<T>
}
