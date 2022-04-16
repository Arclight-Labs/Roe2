import { useContext } from "react"
import { SocketContextDispatch } from "./Socket.context"

export const useWsAction = () => useContext(SocketContextDispatch)
