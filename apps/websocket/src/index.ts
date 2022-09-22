import "dotenv/config"
import { createServer } from "http"
import { Server } from "socket.io"
import liveEvents from "./events/live"
import roomEvents from "./events/room"
import { tournamentEvents } from "./events/tournament.events"
import vetoEvents from "./events/veto"

const PORT = process.env.PORT || 1337

const server = createServer()
const io = new Server(server, {
  cors: { origin: true },
  cookie: true,
})

io.on("connection", async (socket) => {
  console.log(`New Connection: ${socket.id}`)

  socket.onAny((eventName: string, ...args: unknown[]) => {
    console.log(
      `[${socket.id}]: emitted ${eventName} with ${JSON.stringify(args[0])}`
    )
  })

  // Events to listen
  socket.on("ping", (data: number) => {
    io.emit("ping", data)
  })
  tournamentEvents(io, socket)
  roomEvents(io, socket)
  liveEvents(io, socket)
  vetoEvents(io, socket)
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
