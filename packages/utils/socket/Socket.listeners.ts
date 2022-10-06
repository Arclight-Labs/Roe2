import { SocketEvent } from "interface"
import { Socket } from "socket.io-client"

import {
  errorListen,
  matchesListen,
  notifListen,
  participantsListen,
  pingListen,
  setLiveListen,
  setMatchListen,
  setParticipantListen,
  tournamentListen,
} from "./events"

// All websocket listeners
export const listenToSocketEvents = (socket: Socket) => {
  socket.on(SocketEvent.Tournament, tournamentListen)
  socket.on(SocketEvent.Ping, pingListen)
  socket.on(SocketEvent.Error, errorListen)
  socket.on(SocketEvent.Notify, notifListen)
  socket.on(SocketEvent.Matches, matchesListen)
  socket.on(SocketEvent.Participants, participantsListen)
  socket.on(SocketEvent.SetMatch, setMatchListen)
  socket.on(SocketEvent.SetParticipant, setParticipantListen)
  socket.on(SocketEvent.SetLive, setLiveListen)
}
