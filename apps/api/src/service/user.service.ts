import { User } from "../models/User.model"
import { Op } from "sequelize"
import { hash } from "utils/api"
import { UserCreateInfer } from "utils/schema/user.schema"

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
