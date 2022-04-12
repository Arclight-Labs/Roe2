import { Tournament, SocketEvent } from "interface"
import { socket } from "../Socket.instance"

export const tournament = (payload: Partial<Tournament>) => {
  socket.emit(SocketEvent.Tournament, payload)
}
