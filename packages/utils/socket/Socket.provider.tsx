import { PropsWithChildren } from "react"
import {
  tournament,
  ping,
  errorEmit,
  joinRoom,
  notif,
  leaveRoom,
} from "./events"
import { SocketContextDispatch } from "./Socket.context"
import { SocketContext } from "./Socket.context"
import { socket } from "./Socket.instance"

export const SocketProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <SocketContextDispatch.Provider
      value={{ tournament, ping, error: errorEmit, joinRoom, notif, leaveRoom }}
    >
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </SocketContextDispatch.Provider>
  )
}

export default SocketProvider
