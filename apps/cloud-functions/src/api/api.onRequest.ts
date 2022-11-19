import { FastifyServerFactoryHandler } from "fastify/types/serverFactory"
import { functions } from "../admin"
import { roomRoutes } from "./routes/room.route"

export const api = functions.https.onRequest(async (cfReq, cfRes) => {
  // Lazy import to not affect boot time for other cloud functions
  const http = await import("http")
  const { default: Fastify } = await import("fastify")

  let handleRequest: FastifyServerFactoryHandler | null = null

  const fastify = Fastify({
    serverFactory: (handler) => {
      handleRequest = handler
      return http.createServer()
    },
  })

  // Routes
  fastify.get("/api/status", (_, res) => {
    res.status(200).send("Server is running")
    return
  })

  fastify.register(roomRoutes, { prefix: "/api/rooms" })

  fastify.ready((err) => {
    if (err) {
      console.error(err)
      const success = false,
        message = "Unable to initialize server"
      return cfRes.status(500).json({ success, message }).end()
    }

    if (!handleRequest) {
      const success = false,
        message = "Unable to intialize request handler. Please contact admin"
      return cfRes.status(500).json({ success, message }).end()
    }

    handleRequest(cfReq, cfRes)
    return
  })
})
