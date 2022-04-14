import { Tournament as TournamentInterface } from "interface"
import { DataTypes, Model } from "sequelize"
import { sequelize } from "../sequelize"

export class Tournament extends Model<TournamentInterface> {}
Tournament.init(
  {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Tournament",
    tableName:
      process.env.NODE_ENV === "development" ? "Tournament_DEV" : "Tournament",
  }
)
