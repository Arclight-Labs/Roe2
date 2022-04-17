import { Notif, SocketEvent } from "interface/ws"
import { socket } from "../Socket.instance"

export const errorEmit: Notif = (props) => {
  socket.emit(SocketEvent.Error, props)
}
