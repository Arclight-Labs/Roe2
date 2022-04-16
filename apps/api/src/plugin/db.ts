import fp from "fastify-plugin"
import { ErrMsg } from "utils/api"
import { Room } from "../models/Room"
import { Tournament } from "../models/Tournament"
import { User } from "../models/User"
import { sequelize } from "../sequelize"

export default fp(async (server) => {
  sequelize
    .authenticate()
    .then(() => console.log("Database Connected"))
    .catch((err) =>
      console.error(err.message || "Unable to conect to database", err)
    )

  Room.sync().then(() => console.log("[Table] Room - synced"))
  Tournament.sync().then(() => console.log("[Table] Tournament - synced"))
  User.sync().then(() => console.log("[Table] User - synced"))

  await Room.create({ name: "Default", password: "123123" })
    .then((room) => console.log(room.get()))
    .catch((err) => console.error(ErrMsg(err)))
})
