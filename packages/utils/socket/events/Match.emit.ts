import { SocketEvent } from "interface"
import { Payload } from "interface/ws"
import { SetMatch, SetMatches } from "interface/ws/SocketEmitter.interface"
import { socket } from "../Socket.instance"

export const setMatches: SetMatches = (matches) => {
  socket.emit(SocketEvent.Matches, matches)
}

export const setMatch: SetMatch = (matchId, data) => {
  socket.emit(SocketEvent.SetMatch, { matchId, data } as Payload.MatchUpdate)
}
