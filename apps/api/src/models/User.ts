import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../sequelize"

import { UserCredentials } from "interface/db"
import hash from "../utils/hash"

export class User extends Model<
  UserCredentials,
  Optional<UserCredentials, "_id" | "avatar">
> {
  declare _id: string
  declare username: string
  declare avatar: string | null
  declare password: string
}
User.init(
  {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    avatar: { type: DataTypes.STRING, allowNull: true },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value: string) {
        this.setDataValue("password", hash(value))
      },
      get() {
        return undefined
      },
    },
  },
  { sequelize, modelName: "User" }
)
