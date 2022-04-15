import { FastifyReply } from "fastify"
import { User } from "../models/User"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./secrets"
import { Model } from "sequelize"

export const setLoginCookie = <T extends Model = User>(
  res: FastifyReply,
  data: T,
  key = User.tokenName
) => {
  const signature = JWT_SECRET
  const dataParsed = data.toJSON()
  const token = jwt.sign(dataParsed, signature, { expiresIn: "1d" })
  res.setCookie(key, token)
  return res
}
