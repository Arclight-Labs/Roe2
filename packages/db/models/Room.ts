import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../sequelize"

import { RoomInterface } from "interface"

type RoomCreate = Optional<RoomInterface, "id">

export class Room extends Model<RoomInterface, RoomCreate> {}
Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, modelName: "Room" }
)
