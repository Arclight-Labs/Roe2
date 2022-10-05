import { Socket } from "socket.io"
import { emitNotify } from "../emitters"

type GetSocketRoom = (socket: Socket) => string | null
export const getSocketRoom: GetSocketRoom = (socket) => {
  const [_, room] = Array.from(socket.rooms)
  if (!room) {
    emitNotify(socket, {
      title: "Error!",
      message: "You are not in any room, try to refresh the page",
      color: "red",
    })
    return null
  }
  return room
}
