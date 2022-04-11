import { PropsWithChildren } from "react"
import { tournament, ping } from "./events"
import { SocketContextDispatch } from "./Socket.context"
import { SocketContext } from "./Socket.context"
import { socket } from "./Socket.instance"

export const SocketProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <SocketContextDispatch.Provider value={{ tournament, ping }}>
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </SocketContextDispatch.Provider>
  )
}

export default SocketProvider
