import { SocketEvent } from "interface"
import { Live } from "interface/ws"
import { getRoom, setRoom as setRoomInStore } from "../../store"
import { authenticate } from "../../utils/authenticate.util"
import { getSocketRoom } from "../../utils/getSocketRoom.util"
import { EventFn } from "../event.hoc"

type SetRoom = (room: Partial<Live>, accessToken: string) => Promise<void>

export const setLive: EventFn<SetRoom> = (socket, io) => {
  return async (live, accessToken) => {
    const auth = await authenticate(accessToken, socket)
    if (!auth) return
    const room = getSocketRoom(socket)
    if (!room) return
    const roomData = getRoom(room)
    if (!roomData) return
    setRoomInStore(room, { ...roomData, ...live })
    io.to(room).emit(SocketEvent.SetLive, live)
    console.log(`[SET] Live: Pushed by ${socket.id}`)
  }
}
