import { useContext } from "react"
import { SocketContextDispatch } from "./Socket.context"

export const useTournamentAction = () => useContext(SocketContextDispatch)
