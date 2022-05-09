import { SetRoom } from "interface/ws/SocketEmitter.interface"
import { setRoom as setRoomInStore } from "../../store"
import { EventFn } from "../event.hoc"

export const setRoom: EventFn<SetRoom> = (socket, io) => {
  return (room) => {
    setRoomInStore(room.id, {
      ...room,
      listeners: {},
      matches: {},
      participants: {},
      talents: {},
      tournament: null,
      roomId: room.id,
    })
    console.log("Added room:", room.id, room.name)
  }
}
