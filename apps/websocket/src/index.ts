import { tournamentEvents } from "./events/tournament.events"
import { Server } from "socket.io"
import roomEvents from "./events/room"
import { createServer } from "http"
import "dotenv/config"

const PORT = process.env.PORT || 1337

const server = createServer()
const io = new Server(server, {
  cors: { origin: true },
  cookie: true,
})

io.on("connection", async (socket) => {
  console.log(`New Connection: ${socket.id}`)

  socket.onAny((eventName: string, ...args: any[]) => {
    console.log(`[${socket.id}]: emitted ${eventName} with ${args}`)
  })

  // Events to listen
  socket.on("ping", (data: number) => {
    io.emit("ping", data)
  })
  tournamentEvents(io, socket)
  roomEvents(io, socket)
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
