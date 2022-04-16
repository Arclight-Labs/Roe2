import { FastifyPluginCallback } from "fastify"
import { User } from "../models/User"
import { UserCreateInfer, userCreateSchema } from "../schema/user"
import { setLoginCookie } from "../utils/setJwtCookie"
import { getUser } from "../service/user"
import { runAsync } from "utils/hooks"

export const userRoutes: FastifyPluginCallback = (server, opts, done) => {
  /**
   * Create new user
   * Route: /user
   */
  server.post("/", async (req, res) => {
    const body = req.body as UserCreateInfer
    const result = userCreateSchema.safeParse(body)
    if (!result.success) return res.status(400).send(result)

    const promise = User.create(body)
    const [user, error] = await runAsync(promise)
    if (error || !user) {
      const message = "User already exists"
      return res.status(400).send({ success: false, message })
    }

    return setLoginCookie(res, user).status(200).send(user.toJSON())
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
