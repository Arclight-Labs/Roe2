import fastify from "fastify"
import db from "./plugin/db"
import { room, tournament } from "./routes"
// import { initialize } from "./sequelize"

function createServer() {
  const server = fastify()
  server.register(db)
  server.register(room, { prefix: "room" })
  server.register(tournament, { prefix: "tournament" })
  return server
}

export default createServer
