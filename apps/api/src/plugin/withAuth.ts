import { FastifyReply, FastifyRequest, RouteHandler } from "fastify"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../utils/secrets"
import { RouteGenericInterface } from "fastify/types/route"
import { getUser } from "../service/user"
import { User, User as UserModel } from "../models/User.model"

/**
 * Higher order function that acts as a middleware to check auth
 * this will also give you access to the current logged in user
 *
 * Usage:
 * ---
 * ```ts
 * server.get("/", withAuth((req, res, user) => {
 *  //... your code here
 * }))
 *
 * ```
 */

type Fn = (
  req: FastifyRequest,
  res: FastifyReply,
  user: User
) => void | Promise<RouteGenericInterface["Reply"] | void>

export const withAuth = (fn: Fn): RouteHandler => {
  return async (req, res) => {
    const token = req.headers.authorization || req.cookies.token || ""
    try {
      if (!token) {
        return res
          .status(401)
          .send({ success: false, message: "Login Required" })
      }
      const user = jwt.verify(token, JWT_SECRET) as User
      const updatedUser = await getUser(user._id)
      return fn(req, res, updatedUser || user)
    } catch (e) {
      const message = ((e as Error).message as string) || "Invalid token"
      return res
        .clearCookie(UserModel.tokenName)
        .status(400)
        .send({ success: false, message })
    }
  }
}
