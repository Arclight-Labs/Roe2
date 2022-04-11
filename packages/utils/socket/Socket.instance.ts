import { SocketEvent } from "interface"
import { io } from "socket.io-client"
import { pingListen, tournamentListen } from "./events"

const SOCKET_PORT = 1337
const SOCKET_URL = `${window.location.hostname}:${SOCKET_PORT}`

export const socket = io(SOCKET_URL, { reconnection: true })

socket.on(SocketEvent.Tournament, tournamentListen)
socket.on(SocketEvent.Ping, pingListen)
