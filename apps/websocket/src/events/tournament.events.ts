import { Server, Socket } from "socket.io"
import { SocketEvent, Waypoint } from "interface"
import { SanitizedParticipantMap, SanitizedSeriesMap } from "interface/waypoint"
import { getSocketRoom } from "../utils/getSocketRoom.util"
import {
  getAllParticipant,
  getAllSeries,
  getTournament,
  setAllParticipant,
  setAllSeries,
  setParticipant,
  setSeries,
  setTournament,
} from "../store"
import { Payload } from "interface/ws"

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

  // MATCHES
  socket.on(SocketEvent.Matches, (payload: SanitizedSeriesMap) => {
    const room = getSocketRoom(socket)
    if (!room) return

    setAllSeries(room, payload)
    io.to(room).emit(SocketEvent.Matches, getAllSeries(room))
  })

  socket.on(SocketEvent.SetMatch, (payload: Payload.MatchUpdate) => {
    const room = getSocketRoom(socket)
    if (!room) return

    const { matchId, data } = payload
    setSeries(room, matchId, (series) => ({ ...series, ...data }))
    io.to(room).emit(SocketEvent.SetMatch, payload)
  })

  // PARTICIPANTS

  socket.on(SocketEvent.Participants, (payload: SanitizedParticipantMap) => {
    const room = getSocketRoom(socket)
    if (!room) return

    setAllParticipant(room, payload)
    io.to(room).emit(SocketEvent.Participants, getAllParticipant(room))
  })

  socket.on(SocketEvent.SetParticipant, (payload: Payload.TeamUpdate) => {
    const room = getSocketRoom(socket)
    if (!room) return

    const { teamId, data } = payload
    setParticipant(room, teamId, (participant) => ({ ...participant, ...data }))
    io.to(room).emit(SocketEvent.SetParticipant, payload)
  })
}
