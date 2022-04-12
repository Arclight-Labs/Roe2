import { Server, Socket } from "socket.io"
import { SocketEvent, Tournament } from "interface"
import { setTournament } from "../store/tournament"

export const tournamentEvents = (io: Server, socket: Socket) => {
  socket.on(SocketEvent.Tournament, (payload: Partial<Tournament>) => {
    const newTournament = setTournament(payload)
    io.emit("tournament", newTournament)
  })
}
