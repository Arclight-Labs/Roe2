import { Socket } from "socket.io-client"
import { SocketEvent } from "interface"

import {
  errorListen,
  matchesListen,
  pingListen,
  tournamentListen,
  participantsListen,
  setMatchListen,
  setParticipantListen,
  setLiveListen,
} from "./events"

// All websocket listeners
export const listenToSocketEvents = (socket: Socket) => {
  socket.on(SocketEvent.Tournament, tournamentListen)
  socket.on(SocketEvent.Ping, pingListen)
  socket.on(SocketEvent.Error, errorListen)
  socket.on(SocketEvent.Matches, matchesListen)
  socket.on(SocketEvent.Participants, participantsListen)
  socket.on(SocketEvent.SetMatch, setMatchListen)
  socket.on(SocketEvent.SetParticipant, setParticipantListen)
  socket.on(SocketEvent.SetLive, setLiveListen)
}
