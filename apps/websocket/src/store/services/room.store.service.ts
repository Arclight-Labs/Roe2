import { DocumentReference } from "firebase-admin/firestore"
import { Room } from "interface"
import { Broadcast, WebsocketRoom } from "interface/ws"
import { getDB } from "utils/firebase/firebase-admin.instance"
import { getStore, setStore } from "../store.server"

type RoomMap = Record<string, WebsocketRoom>
type GetRooms = () => RoomMap
type GetRoom = (roomId: string) => WebsocketRoom | undefined
type SetRooms = (rooms: RoomMap) => void
type SetRoomFn = (state: WebsocketRoom) => WebsocketRoom
type SetRoomPayload = SetRoomFn | WebsocketRoom
type SetRoom = (roomId: string, payload: SetRoomPayload) => WebsocketRoom

export const getRoom: GetRoom = (roomId) => {
  const { rooms } = getStore()
  let room = rooms[roomId]
  if (!room) {
    return Object.values(rooms).find((r) => r.uniqueCode === roomId)
  }
  return room
}

export const getRooms: GetRooms = () => {
  return getStore().rooms
}

export const setRooms: SetRooms = (rooms) => {
  setStore((s) => ({ ...s, rooms }))
}

export const setRoom: SetRoom = (roomId, payload) => {
  const store = getStore()
  const { rooms } = store
  const isFn = typeof payload === "function"
  const db = getDB()
  const batch = db.batch()
  if (isFn) {
    const room = payload(rooms[roomId])
    setStore((s) => ({ ...s, rooms: { ...s.rooms, [roomId]: room } }))
    const roomRef = db.doc(`rooms/${roomId}`) as DocumentReference<Room>
    const liveRef = roomRef
      .collection("live")
      .doc("broadcast") as DocumentReference<Broadcast>
    const { admins, name, uniqueCode, avatar, id, owner, ...liveData } = room
    batch.set(roomRef, { admins, name, uniqueCode, avatar, id, owner })
    batch.set(liveRef, liveData)
    batch.commit().catch((e) => console.log("Failed to save in db", e))
    return room
  }
  const roomRef = db.doc(`rooms/${roomId}`) as DocumentReference<Room>
  const liveRef = roomRef
    .collection("live")
    .doc("broadcast") as DocumentReference<Broadcast>
  const { admins, name, uniqueCode, avatar, id, owner, ...liveData } = payload
  batch.set(roomRef, { admins, name, uniqueCode, avatar, id, owner })
  batch.set(liveRef, liveData)
  batch.commit().catch((e) => console.log("Failed to save in db", e))
  setStore((s) => ({ ...s, rooms: { ...s.rooms, [roomId]: payload } }))
  return payload
}
