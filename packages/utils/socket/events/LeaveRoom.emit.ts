import { SocketEvent } from "interface"
import { LeaveRoom } from "interface/ws/SocketEmitter.interface"
import { socket } from "../Socket.instance"

export const leaveRoom: LeaveRoom = (props) => {
  socket.emit(SocketEvent.LeaveRoom, props)
}
