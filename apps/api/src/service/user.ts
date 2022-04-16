import { User } from "../models/User"
import { Op } from "sequelize"
import hash from "../utils/hash"
import { UserCreateInfer } from "../schema/user"

export const getUser = (idOrUsername: string) =>
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      [Op.or]: [{ _id: idOrUsername }, { username: idOrUsername }],
    },
  })

export const loginUser = (username: string, password: string) =>
  User.findOne({
    attributes: { exclude: ["password"] },
    where: { username, password: hash(password) },
  })

export const createUser = (credentials: UserCreateInfer) =>
  User.create(credentials)
