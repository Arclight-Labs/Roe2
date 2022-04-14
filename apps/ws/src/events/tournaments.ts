import { Server, Socket } from "socket.io"
import { SocketEvent, TournamentInterface } from "interface"
import { setTournament } from "../store/tournament"

export const tournamentEvents = (io: Server, socket: Socket) => {
  socket.on(SocketEvent.Tournament, (payload: Partial<TournamentInterface>) => {
    const newTournament = setTournament(payload)
    io.emit("tournament", newTournament)
  })
}
