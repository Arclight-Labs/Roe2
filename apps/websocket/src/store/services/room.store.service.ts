import { WebsocketRoom } from "interface/ws"
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
  if (isFn) {
    const room = payload(rooms[roomId])
    setStore((s) => ({ ...s, rooms: { ...s.rooms, [roomId]: room } }))
    return room
  }
  setStore((s) => ({ ...s, rooms: { ...s.rooms, [roomId]: payload } }))
  return payload
}
