import { Server, Socket } from "socket.io"
import { SocketEvent, Tournament } from "interface"
import { setTournament } from "../store/tournament"
import { SanitizedParticipantMap, SanitizedSeriesMap } from "interface/waypoint"

export const tournamentEvents = (io: Server, socket: Socket) => {
  socket.on(SocketEvent.Tournament, (payload: Partial<Tournament>) => {
    const newTournament = setTournament(payload)
    io.emit(SocketEvent.Tournament, newTournament)
  })

  socket.on(SocketEvent.Participants, (payload: SanitizedParticipantMap) => {
    io.emit(SocketEvent.Participants, payload)
  })

  socket.on(SocketEvent.Matches, (payload: SanitizedSeriesMap) => {
    io.emit(SocketEvent.Matches, payload)
  })
}
