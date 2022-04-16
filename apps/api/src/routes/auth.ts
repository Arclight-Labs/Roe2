/**
 * Root level routes
 */
import { FastifyPluginCallback } from "fastify"
import { withAuth } from "../plugin/withAuth"
import { LoginInfer, loginSchema } from "../schema/login"
import { loginUser } from "../service/user"
import { setLoginCookie } from "../utils/setJwtCookie"

export const authRoutes: FastifyPluginCallback = (server, opts, done) => {
  // Check current logged-in user
  server.get(
    "/me",
    withAuth((req, res, user) => {
      res.status(200).send(user)
    })
  )

  /**
   * Login route
   * This requires username and password
   * inside the request body
   *
   * Route: /user/login
   */
  server.post("/login", async (req, res) => {
    const body = req.body as LoginInfer
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return res.status(400).send(result)
    }
    const username = body.username
    const password = body.password
    const user = await loginUser(username, password)
    if (!user) {
      return res.status(400).send({ success: false, message: "Unauthorized" })
    }

    return setLoginCookie(res, user).send({
      success: true,
      message: "You are are now logged in",
      data: user.toJSON(),
    })
  })

  done()
}
