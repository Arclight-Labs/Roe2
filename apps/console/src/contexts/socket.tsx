import { Tournament } from "interface"
import { createContext, FC, useContext } from "react"
import { io, Socket } from "socket.io-client"
import { useAppDispatch } from "utils/hooks/redux"
import { setAction } from "utils/redux/slice/tournament"

export enum SocketEvent {
  SetTournament = "setTournament",
  Tournament = "tournament", // receives the tournament data
}

const SOCKET_PORT = 1337
const SOCKET_URL = `${window.location.hostname}:${SOCKET_PORT}`

export const socket = io(SOCKET_URL, { reconnection: true })

type SetTournament = (tournament: Partial<Tournament>) => void
type SocketContextActions = {
  setTournament: SetTournament
}

export const SocketContext = createContext<Socket>(socket)
export const SocketContextDispatch = createContext<SocketContextActions>({
  setTournament: () => {},
})

const SocketProvider: FC = ({ children }) => {
  const dispatch = useAppDispatch()

  // Set tournament data
  const setTournament = (payload: Partial<Tournament>) => {
    socket.emit(SocketEvent.SetTournament, payload)
  }

  // Receive tournament
  socket.on(SocketEvent.Tournament, (tournament: Tournament) => {
    dispatch(setAction(tournament))
  })

  return (
    <SocketContext.Provider value={socket}>
      <SocketContextDispatch.Provider value={{ setTournament }}>
        {children}
      </SocketContextDispatch.Provider>
    </SocketContext.Provider>
  )
}

export default SocketProvider

// Hooks
export const useTournamentAction = () => useContext(SocketContextDispatch)
