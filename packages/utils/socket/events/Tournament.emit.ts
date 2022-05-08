import { SetTournament, SocketEvent } from "interface"
import { socket } from "../Socket.instance"

export const tournament: SetTournament = (payload) => {
  socket.emit(SocketEvent.Tournament, payload)
}
