import { SocketEvent } from "interface"
import { io } from "socket.io-client"
import {
  errorListen,
  matchesListen,
  pingListen,
  tournamentListen,
  participantsListen,
} from "./events"

const SOCKET_PORT = 1337
const SOCKET_URL = `${window.location.hostname}:${SOCKET_PORT}`

export const socket = io(SOCKET_URL, {
  reconnection: true,
  extraHeaders: {
    cookie: "testasdad",
  },
})

// All websocket listeners
socket.on(SocketEvent.Tournament, tournamentListen)
socket.on(SocketEvent.Ping, pingListen)
socket.on(SocketEvent.Error, errorListen)
socket.on(SocketEvent.Matches, matchesListen)
socket.on(SocketEvent.Participants, participantsListen)
