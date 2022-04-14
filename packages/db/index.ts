import { Room } from "./models/Room"
import { Tournament } from "./models/Tournament"
import { sequelize } from "./sequelize"

/**
 * Initialize database and sync models
 *
 * Current Models:
 * - {@link Room}
 * - {@link Tournament}
 */
export function initialize() {
  // Initialize sequelize
  sequelize
    .authenticate()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error("Unable to connect to database:", err))

  // Initialize all models
  Room.sync().then(() => console.log("Room table synced"))
  Tournament.sync().then(() => console.log("Tournament table synced"))

  /**
   * Return sequelize instance. This package is intended to be exported
   * and should be used with local apps/packages.
   */
  return sequelize
}
