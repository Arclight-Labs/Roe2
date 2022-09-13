import { SocketEvent } from "interface"
import { SetRoom } from "interface/ws/SocketEmitter.interface"
import { socket } from "../Socket.instance"

export const setRoom: SetRoom = (accessToken) => (room) => {
  socket.emit(SocketEvent.SetRoom, room, accessToken)
}
