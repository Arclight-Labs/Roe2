import { auth } from "firebase-admin"
import { functions } from "../admin"
import { userAdminFC } from "../converters/user.converter"
import { getDB } from "../firesbase-admin"

export const userCreate = functions.auth.user().onCreate(async (user) => {
  const db = getDB()
  const userList = await auth().listUsers(2)
  const uid = user.uid
  const ref = db.doc(`users/${uid}`).withConverter(userAdminFC)
  const options = { mergeFields: ["uid", "type"] }

  if (userList.users.length > 1) {
    return ref.set({ uid, type: "default" }, options)
  }

  const authClaims = { super_admin: true, admin: true }

  return auth()
    .setCustomUserClaims(user.uid, authClaims)
    .then(() => ref.set({ uid, type: "admin" }, options))
})
