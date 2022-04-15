import { FastifyPluginCallback } from "fastify"
import { runAsync } from "utils/hooks"
import { Room } from "../models/Room"
import { withAuth } from "../plugin/withAuth"
import { withRoomAuth } from "../plugin/withRoomAuth"
import { LoginInfer, loginSchema } from "../schema/login"
import { loginRoom, updateRoom } from "../service/room"
import hash from "../utils/hash"
import { setLoginCookie } from "../utils/setJwtCookie"

interface Params {
  id: string
}
export const roomRoutes: FastifyPluginCallback = (server, opts, done) => {
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

  server.post(
    "/authenticate",
    withAuth(async (req, res) => {
      const body = req.body as LoginInfer
      const result = loginSchema.safeParse(body)
      if (!result.success) {
        return res.status(400).send(result)
      }
      const roomname = body.username
      const password = body.password
      const room = await loginRoom(roomname, password)
      if (!room) {
        return res.status(400).send({ success: false, message: "Unauthorized" })
      }

      return setLoginCookie(res, room, Room.tokenName).send({
        success: true,
        message: "You are are now logged in",
        data: room.toJSON(),
      })
    })
  )

  // Update a room
  server.put(
    "/:id",
    withAuth(
      withRoomAuth(async (req, res, room) => {
        const { id } = req.params as Record<string, string>
        const body = req.body as Record<string, string>
        if (id !== room._id) {
          const message = "Permission denied"
          res.clearCookie("roomToken")
          return res.status(403).send({ success: false, message })
        }

        const newRoom = await updateRoom(id, body)
      })
    )
  )

  done()
}
