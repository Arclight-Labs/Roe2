import { SocketEvent } from "interface"
import { Payload } from "interface/ws"
import { SetMatch, SetMatches } from "interface/ws/SocketEmitter.interface"
import { socket } from "../Socket.instance"

export const setMatches: SetMatches = (accessToken) => (matches) => {
  socket.emit(SocketEvent.Matches, matches, accessToken)
}

export const setMatch: SetMatch = (accessToken) => (matchId, data) => {
  socket.emit(
    SocketEvent.SetMatch,
    { matchId, data } as Payload.MatchUpdate,
    accessToken
  )
}
