import { DocumentReference } from "firebase-admin/firestore"
import { getDB } from "../firesbase-admin"

export default function doc<T extends object>(...pathSegments: string[]) {
  const db = getDB()
  return db.doc(pathSegments.join("/")) as DocumentReference<T>
}
