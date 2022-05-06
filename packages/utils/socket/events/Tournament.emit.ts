import { SetTournament, SocketEvent, Waypoint } from "interface"
import { fromHashMap } from "../../general/mapConverter.util"
import { socket } from "../Socket.instance"

export const tournament: SetTournament = (payload) => {
  socket.emit(SocketEvent.Tournament, {
    ...payload,
    matches: fromHashMap(payload.matches ?? new Map()),
    participants: fromHashMap(payload.participants ?? new Map()),
  })
}
