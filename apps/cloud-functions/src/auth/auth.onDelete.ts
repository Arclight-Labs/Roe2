import { functions } from "../admin"
import { getDB } from "../firesbase-admin"

export const userDelete = functions.auth.user().onDelete(async (user) => {
  const db = getDB()
  const ref = db.doc(`users/${user.uid}`)
  return ref.delete()
})
