import { tournamentEvents } from "./events/tournament.events"
import { initialize } from "./store"
import { Server } from "socket.io"
import roomEvents from "./events/room"
import http from "http"
import "dotenv/config"

const PORT = process.env.PORT || 1337

initialize()

const httpServer = http.createServer()
const io = new Server(httpServer, {
  cors: { origin: "*" },
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

httpServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
