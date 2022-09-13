import { SetTournament, SocketEvent } from "interface"
import { socket } from "../Socket.instance"

export const tournament: SetTournament = (accessToken) => (payload) => {
  socket.emit(SocketEvent.Tournament, payload, accessToken)
}
