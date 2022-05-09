import { tournamentEvents } from "./events/tournament.events"
import { Server } from "socket.io"
import roomEvents from "./events/room"
import "dotenv/config"
import Fastify from "fastify"

const PORT = process.env.PORT || 1337

const fastify = Fastify()
fastify.register(require("@fastify/cors"), { origin: true })

fastify.get("/", (req, reply) => {
  reply.send("Websocket Server is running!")
})

const io = new Server(fastify.server, {
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

fastify.listen(PORT)
