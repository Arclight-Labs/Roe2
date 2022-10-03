import { Notif, SocketEvent } from "interface/ws"
import { socket } from "../Socket.instance"

export const notif: Notif = (accessToken) => (props) => {
  socket.emit(SocketEvent.Notify, props, accessToken)
}
