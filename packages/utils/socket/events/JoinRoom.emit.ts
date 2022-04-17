import { JoinRoom, SocketEvent, WithAuth } from "interface"
import { socket } from "../Socket.instance"

export const joinRoom: JoinRoom = (props) => {
  socket.emit(SocketEvent.JoinRoom, props)
}
