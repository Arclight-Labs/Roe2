import { SetRoom } from "interface/ws/SocketEmitter.interface"
import { setRoom as setRoomInStore } from "../../store"
import { EventFn } from "../event.hoc"

export const setRoom: EventFn<SetRoom> = (socket, io) => {
  return (room) => {
    setRoomInStore(room.id, (r) => ({
      ...r,
      ...room,
      roomId: room.id,
    }))
    console.log("[SET] Room:", room.id, room.name)
  }
}
