import {
  doc,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  updateDoc,
  WithFieldValue,
} from "@firebase/firestore"
import { collection } from "firebase/firestore"
import { User } from "interface"
import { db } from "./firebase.instance"
import { UserUpdateData } from "../models/User.model"

const converter: FirestoreDataConverter<User> = {
  fromFirestore(snap: QueryDocumentSnapshot<User>, options) {
    return snap.data(options)
  },
  toFirestore(data: WithFieldValue<User>) {
    return {
      ...data,
      _username:
        typeof data.username === "string"
          ? data.username.toLowerCase()
          : data._username,
    }
  },
}

export const getUserRef = (uid: string) => {
  return doc(db, `users`, uid).withConverter(converter)
}

export const userColRef = collection(db, "users").withConverter(converter)

export const updateUser = async (uid: string, data: UserUpdateData) => {
  return updateDoc(getUserRef(uid), data)
}
