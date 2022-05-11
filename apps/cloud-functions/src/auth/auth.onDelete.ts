import { db, functions } from "../admin"

export const userDelete = functions.auth.user().onDelete(async (user) => {
  const ref = db.doc(`users/${user.uid}`)
  return ref.delete()
})
