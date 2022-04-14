import { FastifyPluginCallback } from "fastify"
import { runAsync } from "utils/hooks"
import { Room } from "../models/Room"

interface Params {
  id: string
}
export const room: FastifyPluginCallback = (server, opts, done) => {
  server.get("/:id", async (req, res) => {
    const { id } = req.params as Params

    const promise = Room.findByPk(id, {
      attributes: { exclude: ["password"] },
    })

    const [room, error] = await runAsync(promise)
    if (error || !room) {
      const statusCode = 404
      const err = { message: "Room not found", error, statusCode }
      return res.status(statusCode).send(err)
    }
    res.status(200).send(room.toJSON())
  })

  done()
}
