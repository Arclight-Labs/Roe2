import { FastifyReply, FastifyRequest, RouteHandler } from "fastify"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../utils/secrets"
import { RouteGenericInterface } from "fastify/types/route"
import { Room } from "../models/Room.model"

/**
 * Higher order function that acts as a middleware to check auth
 * this will also give you access to the current logged in user
 *
 * Usage:
 * ---
 * ```ts
 * server.get("/", withRoomAuth((req, res, room) => {
 *  //... your code here
 * }))
 *
 * ```
 */

type Fn = (
  req: FastifyRequest,
  res: FastifyReply,
  room: Room
) => void | Promise<RouteGenericInterface["Reply"] | void>

export const withRoomAuth = (fn: Fn): RouteHandler => {
  return async (req, res) => {
    const token =
      (req.headers.roomToken as string) || req.cookies.roomToken || ""
    try {
      if (!token) throw new Error("Unauthorized")
      const room = jwt.verify(token, JWT_SECRET) as Room
      return fn(req, res, room)
    } catch (e) {
      const message = ((e as Error).message as string) || "Invalid room token"
      return res
        .clearCookie(Room.tokenName)
        .status(400)
        .send({ success: false, message })
    }
  }
}
