import { UserRecord } from "firebase-functions/v1/auth"
import { User } from "interface"

export function extractBaseUser(user: UserRecord): User {
  return {
    email: user.email ?? "",
    avatar: user.photoURL ?? "",
    uid: user.uid,
    username: "",
    _username: "",
    socialHandle: "",
    type: "default",
  }
}
