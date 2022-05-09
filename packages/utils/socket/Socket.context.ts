import { createContext } from "react"
import { Socket } from "socket.io-client"
import { SocketEmitters } from "interface"
import { socket } from "./Socket.instance"

export const SocketContext = createContext<Socket>(socket)

export const SocketContextDispatch = createContext<SocketEmitters>({
  tournament() {},
  ping() {},
  error() {},
  joinRoom() {},
  leaveRoom() {},
  notif() {},
  matches() {},
  participants() {},
  setRoom() {},
  setMatch() {},
  setParticipant() {},
})
