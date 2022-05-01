import { doc } from "firebase/firestore"
import { db } from "./firebase.instance"

export const getRoomRef = (roomId: string) => {
  return doc(db, "rooms", roomId)
}

export const updateRoom = (ref: string) => {}
