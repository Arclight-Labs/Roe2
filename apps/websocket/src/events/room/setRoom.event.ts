import { WebsocketRoom } from "interface/ws"
import { setRoom as setRoomInStore } from "../../store"
import { authenticate } from "../../utils/authenticate.util"
import { EventFn } from "../event.hoc"

type SetRoom = (
  room: Partial<WebsocketRoom> & { id: string },
  accessToken: string
) => any

export const setRoom: EventFn<SetRoom> = (socket, io) => {
  return async (room, accessToken) => {
    const auth = await authenticate(accessToken, socket)
    if (!auth) return
    setRoomInStore(room.id, (r) => ({
      ...r,
      ...room,
      roomId: room.id,
    }))
    console.log("[SET] Room:", room.id, room.name)
  }
}
