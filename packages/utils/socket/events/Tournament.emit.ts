import { SetTournament, SocketEvent, Waypoint } from "interface"
import { sanitizeHashMap } from "../../general/sanitizeHashMap.util"
import { socket } from "../Socket.instance"

export const tournament: SetTournament = (payload) => {
  socket.emit(SocketEvent.Tournament, {
    ...payload,
    matches: sanitizeHashMap(payload.matches),
    participants: sanitizeHashMap(payload.participants),
  })
}
