import fastify from "fastify"
import db from "./plugin/db"
import { roomRoutes, tournamentRoutes, userRoutes, authRoutes } from "./routes"
import fastifyCookie from "fastify-cookie"
import { COOKIE_SECRET } from "./utils/secrets"
import cors from "fastify-cors"
function createServer() {
  const server = fastify()
  const instance = server
    .register(db)
    .register(cors, {
      origin: true,
      credentials: true,
    })
    .register(fastifyCookie, {
      secret: COOKIE_SECRET.split(","),
      parseOptions: { httpOnly: true, path: "/" },
    })
    .register(roomRoutes, { prefix: "room" })
    .register(tournamentRoutes, { prefix: "tournament" })
    .register(userRoutes, { prefix: "user" })
    .register(authRoutes, { prefix: "auth" })
  return instance
}

export default createServer
