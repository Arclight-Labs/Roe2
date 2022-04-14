import { FastifyPluginCallback } from "fastify"
import { User } from "../models/User"
import jwt from "jsonwebtoken"
import { LoginInfer, loginSchema } from "../schema/login"
import { UserCreateInfer, userCreateSchema } from "../schema/user"
import hash from "../utils/hash"
import { Op } from "sequelize"

export const user: FastifyPluginCallback = (server, opts, done) => {
  server.post("/", async (req, res) => {
    const body = req.body as UserCreateInfer
    const result = userCreateSchema.safeParse(body)
    if (!result.success) {
      return res.status(400).send(result)
    }
    const user = await User.create(body)
    return res.status(200).send(user.toJSON)
  })

  server.get("/:_id", async (req, res) => {
    const { _id } = req.params as { _id: string }

    const user = await User.findOne({
      where: { [Op.or]: [{ _id }, { username: _id }] },
      attributes: { exclude: ["password"] },
    })
    return res.status(!!user ? 200 : 404).send(user?.toJSON())
  })

  server.post("/login", async (req, res) => {
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
    console.log(userData)
    const JWT_SECRET = process.env.JWT_SECRET || ""
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: "1d" })
    res.setCookie("token", token, { httpOnly: true, secure: true }).send({
      success: true,
      message: "You are are now logged in",
      data: userData,
    })
  })

  done()
}
