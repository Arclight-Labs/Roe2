import { RouteHandlerMethod } from "fastify"
import { User } from "../models/User"
import { LoginInfer, loginSchema } from "../schema/login"
import hash from "../utils/hash"
import jwt from "jsonwebtoken"

export const withAuth = (fn: RouteHandlerMethod): RouteHandlerMethod => {
  return async (req, res) => {
    const body = req.body as LoginInfer
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return res.status(400).send(result)
    }

    const username = body.username
    const password = hash(body.password)
    const user = await User.findOne({
      where: { username, password },
      attributes: { exclude: ["password"] },
    })

    if (!user) {
      return res.status(400).send({ success: false, message: "Unauthorized" })
    }

    const userData = user.toJSON()
    const JWT_SECRET = process.env.JWT_SECRET || ""
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: "1d" })
    res.setCookie("token", token, { httpOnly: true, secure: true })

    return fn
  }
}
