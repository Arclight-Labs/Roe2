import { SocketEvent } from "interface"
import { socket } from "../Socket.instance"

export const ping = () => {
  socket.emit(SocketEvent.Ping, Date.now())
}
