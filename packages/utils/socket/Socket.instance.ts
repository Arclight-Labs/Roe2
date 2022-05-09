import { SocketEvent } from "interface"
import { io } from "socket.io-client"
import {
  errorListen,
  matchesListen,
  pingListen,
  tournamentListen,
  participantsListen,
  setMatchListen,
  setParticipantListen,
} from "./events"

const isDev = import.meta.env.DEV
const SOCKET_PORT = 1337
const DEV_URL = `${window.location.hostname}:${SOCKET_PORT}`
const PROD_URL = `https://servers.acadarena.com`
const SOCKET_URL = isDev ? DEV_URL : PROD_URL
const PATH = isDev ? "/socket.io" : "/roe2/socket.io"
const config = {
  host: SOCKET_URL,
  path: PATH,
}
export const socket = io(SOCKET_URL, {
  ...config,
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
socket.on(SocketEvent.SetMatch, setMatchListen)
socket.on(SocketEvent.SetParticipant, setParticipantListen)
