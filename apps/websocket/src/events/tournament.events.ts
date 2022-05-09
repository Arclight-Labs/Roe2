import { Server, Socket } from "socket.io"
import { SocketEvent, Tournament, Waypoint } from "interface"
import { SanitizedParticipantMap, SanitizedSeriesMap } from "interface/waypoint"
import { getSocketRoom } from "../utils/getSocketRoom.util"
import {
  getAllParticipant,
  getAllSeries,
  getTournament,
  setAllParticipant,
  setAllSeries,
  setTournament,
} from "../store"

export const tournamentEvents = (io: Server, socket: Socket) => {
  socket.on(SocketEvent.Tournament, (payload: Partial<Waypoint.Tournament>) => {
    const room = getSocketRoom(socket)
    if (!room) return
    setTournament(room, (tour) => ({
      ...tour,
      ...payload,
    }))
    const newTournament = getTournament(room)
    io.to(room).emit(SocketEvent.Tournament, newTournament)
  })

  socket.on(SocketEvent.Participants, (payload: SanitizedParticipantMap) => {
    const room = getSocketRoom(socket)
    if (!room) return
    setAllParticipant(room, payload)
    io.emit(SocketEvent.Participants, getAllParticipant(room))
  })

  socket.on(SocketEvent.Matches, (payload: SanitizedSeriesMap) => {
    const room = getSocketRoom(socket)
    if (!room) return
    setAllSeries(room, payload)
    io.emit(SocketEvent.Matches, getAllSeries(room))
  })
}
