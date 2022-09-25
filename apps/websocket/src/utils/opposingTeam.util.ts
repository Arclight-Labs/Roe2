import { VetoTeam } from "utils/schema/veto.schema"

export const opposingTeam = (team: VetoTeam) =>
  team === "teamA" ? "teamB" : "teamA"
