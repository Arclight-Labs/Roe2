import { Waypoint } from "interface"
import { fromHashMap, toHashMap } from "./mapConverter.util"

type FromHashed = (tournament: Waypoint.ApiResHashed) => Waypoint.ApiRes
type ToHashed = (tournament: Waypoint.ApiRes) => Waypoint.ApiResHashed

const fromHashed: FromHashed = (hashedTournament) => {
  return {
    ...hashedTournament,
    matches: fromHashMap(hashedTournament.matches),
    participants: fromHashMap(hashedTournament.participants),
  }
}

const toHashed: ToHashed = (tournament) => {
  return {
    ...tournament,
    matches: toHashMap(tournament.matches),
    participants: toHashMap(tournament.participants),
  }
}

export const tournamentConverter = { fromHashed, toHashed }

export default tournamentConverter
