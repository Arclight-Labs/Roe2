import { SocketEvent } from "interface"
import { SetRoom } from "interface/ws/SocketEmitter.interface"
import { getRoom, setRoom as setRoomInStore } from "../../store"
import { getSocketRoom } from "../../utils/getSocketRoom.util"
import { EventFn } from "../event.hoc"

export const setLive: EventFn<SetRoom> = (socket, io) => {
  return (live) => {
    const room = getSocketRoom(socket)
    if (!room) return
    const roomData = getRoom(room)
    if (!roomData) return
    setRoomInStore(room, { ...roomData, ...live })
    io.to(room).emit(SocketEvent.SetLive, live)
    console.log(`[SET] Live: Pushed by ${socket.id}`)
  }
}
