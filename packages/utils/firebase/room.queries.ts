import {
  arrayUnion,
  collection,
  doc,
  DocumentReference,
  FirestoreDataConverter,
  getDoc,
  limit,
  PartialWithFieldValue,
  query,
  QueryDocumentSnapshot,
  setDoc,
  SetOptions,
  updateDoc,
  where,
} from "firebase/firestore"
import { Room, User } from "interface"
import { RoomRequestAccess } from "interface/db/Room.interface"
import { Broadcast as Broadcast } from "interface/ws"
import { RoomModel } from "../models/Room.model"
import { db } from "./firebase.instance"
import { getUserRef } from "./user.queries"

export type RoomUpdateData = PartialWithFieldValue<Room>

export const roomFC: FirestoreDataConverter<RoomModel> = {
  fromFirestore(snap: QueryDocumentSnapshot<Room>, options) {
    return new RoomModel(snap.data(options))
  },
  toFirestore(data: PartialWithFieldValue<Room>) {
    return data
  },
}

export const getRoomRef = (roomId: string) => {
  return doc(db, "rooms", roomId).withConverter(roomFC)
}

export const getBroadcastRef = (roomId: string) => {
  const path = `rooms/${roomId}/live/broadcast`
  return doc(db, path) as DocumentReference<Broadcast>
}

export const getBroadcastData = async (roomId: string) => {
  const ref = getBroadcastRef(roomId)
  const snap = await getDoc(ref)
  return snap.data()
}

export const roomColRef = collection(db, "rooms").withConverter(roomFC)

export const getRoomColRefByUniqueCode = (uniqueCode: string) => {
  const ref = roomColRef
  return query(ref, where("uniqueCode", "==", uniqueCode), limit(1))
}

export const updateRoom = async (roomId: string, data: RoomUpdateData) => {
  return updateDoc(getRoomRef(roomId), data)
}

export const setRoom = (
  roomId: string,
  data: RoomUpdateData,
  options: SetOptions = {}
) => {
  return setDoc(getRoomRef(roomId), data, options)
}

export const addRoomAdmins = async (roomId: string, newAdmins: string[]) => {
  return updateDoc(getRoomRef(roomId), {
    admins: arrayUnion(newAdmins),
  })
}

export const requestRoomAccess = async (
  roomId: string,
  roomName: string,
  user: User
) => {
  const roomRef = getRoomRef(roomId)
  const ref = doc(
    collection(roomRef, "requestAccess"),
    user.uid
  ) as DocumentReference<RoomRequestAccess>
  return setDoc(ref, {
    ...user,
    roomId,
    roomName,
  })
}
