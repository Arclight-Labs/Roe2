import { SocketEvent } from "interface"
import { SetMatches } from "interface/ws/SocketEmitter.interface"
import { socket } from "../Socket.instance"

export const setMatches: SetMatches = (matches) => {
  socket.emit(SocketEvent.Matches, matches)
}
