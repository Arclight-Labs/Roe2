import { SocketEvent, Waypoint } from "interface"
import { SanitizedParticipantMap, SanitizedSeriesMap } from "interface/waypoint"
import { Payload } from "interface/ws"
import { Server, Socket } from "socket.io"
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
import { authenticate } from "../utils/authenticate.util"
import { getSocketRoom } from "../utils/getSocketRoom.util"

export const tournamentEvents = (io: Server, socket: Socket) => {
  socket.on(
    SocketEvent.Tournament,
    async (payload: Partial<Waypoint.Tournament>, accessToken: string) => {
      const auth = await authenticate(accessToken, socket)
      if (!auth) return
      const room = getSocketRoom(socket)
      if (!room) return

      setTournament(room, (tour) => ({
        ...tour,
        ...payload,
      }))
      const newTournament = getTournament(room)
      io.to(room).emit(SocketEvent.Tournament, newTournament)
    }
  )

  // MATCHES
  socket.on(
    SocketEvent.Matches,
    async (payload: SanitizedSeriesMap, accessToken: string) => {
      const auth = await authenticate(accessToken, socket)
      if (!auth) return
      const room = getSocketRoom(socket)
      if (!room) return

      setAllSeries(room, payload)
      io.to(room).emit(SocketEvent.Matches, getAllSeries(room))
    }
  )

  socket.on(
    SocketEvent.SetMatch,
    async (payload: Payload.MatchUpdate, accessToken: string) => {
      const auth = await authenticate(accessToken, socket)
      if (!auth) return
      const room = getSocketRoom(socket)
      if (!room) return

      const { matchId, data } = payload
      setSeries(room, matchId, (series) => ({ ...series, ...data }))
      io.to(room).emit(SocketEvent.SetMatch, payload)
    }
  )

  // PARTICIPANTS

  socket.on(
    SocketEvent.Participants,
    async (payload: SanitizedParticipantMap, accessToken: string) => {
      const auth = await authenticate(accessToken, socket)
      if (!auth) return
      const room = getSocketRoom(socket)
      if (!room) return

      setAllParticipant(room, payload)
      io.to(room).emit(SocketEvent.Participants, getAllParticipant(room))
    }
  )

  socket.on(
    SocketEvent.SetParticipant,
    async (payload: Payload.TeamUpdate, accessToken: string) => {
      const auth = await authenticate(accessToken, socket)
      if (!auth) return
      const room = getSocketRoom(socket)
      if (!room) return

      const { teamId, data } = payload
      setParticipant(room, teamId, (participant) => ({
        ...participant,
        ...data,
      }))
      io.to(room).emit(SocketEvent.SetParticipant, payload)
    }
  )
}
