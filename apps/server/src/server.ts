// import Fastify from "fastify"
import { Server } from "socket.io"
import http from "http"
import { tournamentEvents } from "./events/tournaments"

const PORT = process.env.PORT || 1337

// const sv = Fastify({ logger: true })

// sv.get("/", async (req, tournamentEventsres) => {
//   res.send({ test: new Date() })
// })

// sv.listen(PORT, LOC, (err, address) => {
//   if (err) {
//     sv.log.error(err)
//     process.exit(1)
//   }
//   sv.log.info(`server listening on ${address}`)
// })

const httpServer = http.createServer()
const io = new Server(httpServer, {
  cors: { origin: "*" },
})

io.on("connection", async (socket) => {
  socket.emit("connectSuccess", {
    success: true,
    message: "Connected to server!",
  })
  socket.on("ping", (data: { user: string }) => {
    io.emit("")
  })
  tournamentEvents(io, socket)
})

httpServer.listen(PORT, () => {
  console.log(`listening on  ${PORT}`)
})
