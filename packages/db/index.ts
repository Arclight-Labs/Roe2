import { Room } from "./models/Room"
import { sequelize } from "./sequelize"

async function main() {
  sequelize
    .authenticate()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error("Unable to connect to database:", err))
  await Room.sync()
  return sequelize
}

main()
