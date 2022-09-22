import { User } from "interface/db"
import { FirestoreConverter, Snap } from "../types"

export const userAdminFC: FirestoreConverter<User> = {
  fromFirestore: (snap: Snap<User>) => snap.data(),
  toFirestore: (user) => user,
}
