import { SocketEvent } from "interface"
import { socket } from "../Socket.instance"

interface Props {
  username: string
  password: string
}
export const joinRoom = (props: Props) => {
  socket.emit(SocketEvent.JoinRoom, props)
}
