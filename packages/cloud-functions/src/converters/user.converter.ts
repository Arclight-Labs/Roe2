import { FirestoreConverter, Snap } from "../types"
import { User } from "interface/db"
1
export const userAdminFC: FirestoreConverter<User> = {
  fromFirestore: (snap: Snap<User>) => snap.data(),
  toFirestore: (user) => user,
}
