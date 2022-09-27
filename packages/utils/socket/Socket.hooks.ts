import { useContext } from "react"
import { SocketContext, SocketContextDispatch } from "./Socket.context"

export const useWsAction = () => useContext(SocketContextDispatch)
export const useActiveSocket = () => useContext(SocketContext)
