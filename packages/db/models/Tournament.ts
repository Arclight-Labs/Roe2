import { TournamentInterface } from "interface"
import { DataTypes, Model } from "sequelize"
import { sequelize } from "../sequelize"

export class Tournament extends Model<TournamentInterface> {}
Tournament.init(
  {
    name: DataTypes.STRING,
    start_at: DataTypes.DATE,
  },
  { sequelize, modelName: "Tournament" }
)
