import fastify from "fastify"
import db from "./plugin/db"
import { room, tournament, user } from "./routes"
import fastifyCookie from "fastify-cookie"
// import { initialize } from "./sequelize"

function createServer() {
  const server = fastify()
  const instance = server
    .register(db)
    .register(fastifyCookie, {
      secret: process.env.COOKIE_SECRET,
      parseOptions: {},
    })
    .register(room, { prefix: "room" })
    .register(tournament, { prefix: "tournament" })
    .register(user, { prefix: "user" })
  return instance
}

export default createServer
