import {
  doc,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "@firebase/firestore"
import { collection } from "firebase/firestore"
import { User } from "interface"
import { db } from "./firebase.instance"

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

export const getUserRefById = (uid: string) => {
  return doc(db, `users`, uid).withConverter(converter)
}

export const userColRef = collection(db, "users").withConverter(converter)
