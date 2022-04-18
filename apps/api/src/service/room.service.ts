import { Room } from "../models/Room.model"
import { Room as RoomInterface } from "interface/db/Room.interface"
import { Op } from "sequelize"
import { hash } from "utils/api"

export const getRoom = (idOrRoomname: string) => {
  return Room.findOne({
    attributes: { exclude: ["password"] },
    where: {
      [Op.or]: [{ _id: idOrRoomname }, { name: idOrRoomname }],
    },
  })
}
export const loginRoom = (username: string, password: string) => {
  const sentinelValue = { [Op.like]: username }
  return Room.findOne({
    attributes: { exclude: ["password"] },
    where: {
      [Op.or]: [{ _id: username }, { name: sentinelValue }],
      password: hash(password),
    },
  })
}

export const updateRoom = async (
  id: string,
  payload: Partial<Omit<RoomInterface, "_id">>
) => {
  const room = await getRoom(id)
  if (!room) throw new Error("Room not found")
  return room.update(payload)
}
