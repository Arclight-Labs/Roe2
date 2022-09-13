import { Notif, SocketEvent } from "interface/ws"
import { socket } from "../Socket.instance"

export const errorEmit: Notif = (accessToken) => (props) => {
  socket.emit(SocketEvent.Error, props, accessToken)
}
