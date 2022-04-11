import { Server, Socket } from "socket.io"
import { Tournament } from "interface"
import { setTournament } from "../store/tournament"

export const tournamentEvents = (io: Server, socket: Socket) => {
  socket.on("setTournament", (payload: Partial<Tournament>) => {
    const newTournament = setTournament(payload)
    io.emit("tournament", newTournament)
  })
}
