import { Ping, SocketEvent } from "interface"
import { socket } from "../Socket.instance"

export const ping: Ping = () => {
  socket.emit(SocketEvent.Ping, Date.now())
}
