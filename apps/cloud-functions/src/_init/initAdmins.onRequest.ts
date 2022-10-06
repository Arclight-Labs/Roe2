import { functions } from "../admin"
import { getAuth } from "../firesbase-admin"

export const admins = functions.https.onRequest(async (req, res) => {
  const email = "jasper@acadarena.com"
  const auth = getAuth()
  try {
    const user = await auth.getUserByEmail(email)
    if (user.customClaims && user.customClaims.admin) {
      res.send({ success: false, message: "User is already an admin" }).end()
    }
    await auth.setCustomUserClaims(user.uid, { admin: true })
    res.send({ success: true, message: "User is now an admin" })
  } catch {
    res.send({ success: false, message: "User does not exist" }).end()
  }
})
