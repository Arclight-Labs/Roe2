import { DataTypes, Model } from "sequelize"
import { sequelize } from "../sequelize"

import { Room as RoomInterface } from "interface/db"
import { Tournament } from "./Tournament"
import hash from "../utils/hash"

type RoomCreate = Pick<RoomInterface, "name" | "password">

export class Room extends Model<RoomInterface, RoomCreate> {}
Room.init(
  {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value: string) {
        this.setDataValue("password", hash(value))
      },
    },
    tournament: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Tournament,
        key: "tournament",
      },
    },
  },
  { sequelize, modelName: "Room" }
)
