import { FastifyPluginCallback } from "fastify"
import { User } from "../models/User"
import { LoginInfer, loginSchema } from "../schema/login"
import { UserCreateInfer, userCreateSchema } from "../schema/user"
import hash from "../utils/hash"
import { Op } from "sequelize"
import { setLoginCookie } from "../utils/setJwtCookie"
import { withAuth } from "../plugin/withAuth"
import { getUser } from "../service/user"

export const userRoutes: FastifyPluginCallback = (server, opts, done) => {
  /**
   * Create new user
   * Route: /users
   */
  server.post("/", async (req, res) => {
    const body = req.body as UserCreateInfer
    const result = userCreateSchema.safeParse(body)
    if (!result.success) return res.status(400).send(result)
    const user = await User.create(body)
    return setLoginCookie(res, user).status(200).send(user.toJSON)
  })

  /**
   * Find user by _id or username
   * Route: /users/:_id
   */
  server.get("/:_id", async (req, res) => {
    const { _id } = req.params as { _id: string }

    const user = await getUser(_id)
    return res.status(!!user ? 200 : 404).send(user?.toJSON())
  })

  done()
}
