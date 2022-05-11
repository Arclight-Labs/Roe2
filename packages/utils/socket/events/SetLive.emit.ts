import { SocketEvent } from "interface"
import { SetLive } from "interface/ws/SocketEmitter.interface"
import { socket } from "../Socket.instance"

export const setLive: SetLive = (payload) => {
  socket.emit(SocketEvent.SetLive, payload)
}
