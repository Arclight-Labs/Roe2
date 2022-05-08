import { Socket } from "socket.io"
import { emitNotify } from "../emitters"

type GetSocketRoom = (socket: Socket) => string | null
export const getSocketRoom: GetSocketRoom = (socket) => {
  const [room] = Array.from(socket.rooms)
  emitNotify(socket, {
    title: "Error!",
    message: "You are not in any room",
    color: "red",
  })
  return room
}
