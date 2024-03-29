import {
  doc,
  FirestoreDataConverter,
  getDocs,
  limit,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  setDoc,
  SetOptions,
  updateDoc,
  where,
  WithFieldValue,
} from "@firebase/firestore"
import { collection, query } from "firebase/firestore"
import { User } from "interface"
import { UserModel, UserUpdateData } from "../models/User.model"
import { db } from "./firebase.instance"

export const userFC: FirestoreDataConverter<UserModel> = {
  fromFirestore(snap: QueryDocumentSnapshot<User>, options) {
    return new UserModel(snap.data(options))
  },
  toFirestore(data: WithFieldValue<User>) {
    return {
      ...data,
      _username:
        typeof data.username === "string"
          ? data.username.toLowerCase()
          : data._username || "",
    }
  },
}
export const userColRef = collection(db, "users").withConverter(userFC)

export function getUserRef(uid: string) {
  return doc(db, `users`, uid).withConverter(userFC)
}

export async function updateUser(uid: string, data: UserUpdateData) {
  return updateDoc(getUserRef(uid), data)
}

export async function setUser(
  uid: string,
  data: PartialWithFieldValue<User>,
  options: SetOptions = {}
) {
  return setDoc(getUserRef(uid), data, options)
}

export async function getUserByUsername(username: string) {
  const q = query(
    userColRef,
    where("_username", "==", username.toLowerCase()),
    limit(1)
  )
  const snap = await getDocs(q)
  const [doc] = snap.docs
  return doc || null
}

export async function getUsers(username: string, searchLimit: number = 5) {
  const q = query(
    userColRef,
    where("_username", "==", username.toLowerCase()),
    limit(searchLimit)
  )
  const snap = await getDocs(q)
  return snap.docs.map((doc) => doc.data())
}
