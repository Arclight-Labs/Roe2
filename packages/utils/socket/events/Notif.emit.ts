import { Notif, SocketEvent } from "interface/ws"
import { socket } from "../Socket.instance"

export const notif: Notif = (props) => {
  socket.emit(SocketEvent.Error, props)
}
